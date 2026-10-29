/* modules/20_journal.js: the cellar journal (bottles, WSET-style tasting notes, label photos, notes and lists on
   any place, passport, map pins). Pages build only (VM.mode === 'gh'); the artifact build shows a short note.

   Storage: signed out, everything lives in this browser (localStorage for records, IndexedDB for label photos).
   Signed in (Supabase magic link, PKCE), the Supabase tables are the source of truth; an in-memory cache is
   mirrored per user in localStorage so the journal opens instantly and offline, and writes that fail for lack of
   a connection wait in an outbox and are replayed.

   ---------------------------------------------------------------------------------------------------------------
   VM.auth   (fills the lead's Auth slot in API.md)
     VM.auth.user                  the signed-in Supabase user ({id, email, ...}) or null. A property, as in API.md.
     VM.auth.currentUser()         the same, as a function
     VM.auth.ready / whenReady     true once the session state is known / Promise<user|null>
     VM.auth.available             sign-in can work here (Pages build with a Supabase project configured)
     VM.auth.onChange(fn)          fn(user|null) now and on every change; returns an unsubscribe function
                                   (same as VM.on('auth', fn); the 'auth' event is sticky)
     VM.auth.signIn(email)         sends a magic link. Promise<{ok, error?}>
     VM.auth.verifyCode(email, c)  signs in with the code from the email (when the email template shows {{ .Token }})
     VM.auth.signOut()             Promise
     VM.auth.client                the supabase-js client, or null until loaded; VM.auth.getClient() loads it

   VM.journal
     available                     false in the artifact build (all reads return empty lists, writes reject)
     mode()                        'local' | 'cloud' | 'off'
     ready                         Promise, resolves once the first data is in memory
     bottles(filter?)              bottle records, newest first. filter: {status, country, appellation_id, site_id,
                                   region_id, style} (exact matches) or a function
     bottle(id), notes(), lists(listName?)
     noteFor(type, id)             the note record or null.  inList(list, type, id) → boolean
     saveBottle(fields)            insert or update (pass id to update). Promise<bottle>
     deleteBottle(id)              Promise
     saveNote(type, id, body)      upsert; an empty body deletes. Promise
     toggleList(list, type, id, on?)  lists: visited | want_to_visit | want_to_taste | favourite. Promise<boolean>
     bottlesFor(id)                bottles from an appellation (and the zones inside it), a site, a region, a country,
                                   or of a grape ('grape-furmint' or 'furmint' with type grape)
     tasted()                      {countries, regions, appellations, sites, grapes}: Sets of ids from tasted bottles
     onChange(fn)                  fn({what, mode}) after any change; returns unsubscribe. Also VM.emit('journal:changed')
     open(tab?), add(fromId?)      navigation: #journal[-tasted|-cellar|-wishlist|-passport|-notes], #journal-new[-from-<id>]

   Records (same shapes locally and in Supabase; user_id is never sent from here except where a unique key needs it)
     bottle: the columns of public.bottles without user_id. grapes are grape ids without the 'grape-' prefix.
     note:   {id, target_type, target_id, body, created_at, updated_at}
     list:   {list, target_type, target_id, note, created_at}
     target_type is country | region | appellation | site | grape; target_id is the bare atlas id
     ('fr-sauternes', 'site-…', 'region-…', 'fr', and for grapes the grape id without 'grape-').
     sat (structured tasting, WSET Systematic Approach style):
       {v: 1, appearance: {clarity, intensity, colour},
        nose: {condition, intensity, development, primary: [], secondary: [], tertiary: []},
        palate: {sweetness, acidity, tannin, alcohol, body, mousse, flavour_intensity, finish,
                 primary: [], secondary: [], tertiary: []},
        conclusions: {quality, readiness}}
       values are the keys in SAT_OPTS below (e.g. 'medium_plus'); empty fields are left out.
   --------------------------------------------------------------------------------------------------------------- */
(() => {
  'use strict';
  if (!window.VM) return;
  const { esc, fold, arr } = VM.util;
  const GH = VM.mode === 'gh';
  const CFG = VM.config || {};
  const SITE_URL = CFG.siteUrl || 'https://tolar-dio.github.io/wine-world/';
  const SB = { ver: '2.117.3', sri: 'sha384-BWcjm9OdFth9TbhCxZPdm+gAOUMAzQy9nmTs12ioXdCcbVnJaPMn+fMUoQCLt60R' };
  const KEY = 'vm:journal:v1:';

  /* ---------- vocabulary ---------- */
  const STYLES = ['red', 'white', 'rose', 'sparkling', 'sweet', 'fortified', 'orange'];
  const STYLE_NAME = { red: 'Red', white: 'White', rose: 'Rosé', sparkling: 'Sparkling', sweet: 'Sweet', fortified: 'Fortified', orange: 'Orange', mixed: 'Unknown style' };
  const STATUS = ['tasted', 'cellar', 'wishlist'];
  const STATUS_NAME = { tasted: 'Tasted', cellar: 'In the cellar', wishlist: 'On the wishlist' };
  const STATUS_SHORT = { tasted: 'Tasted', cellar: 'Cellar', wishlist: 'Wishlist' };
  const LISTS = ['visited', 'want_to_visit', 'want_to_taste', 'favourite'];
  const LIST_NAME = { visited: 'Visited', want_to_visit: 'Want to visit', want_to_taste: 'Want to taste', favourite: 'Favourite' };
  const TARGETS = ['country', 'region', 'appellation', 'site', 'grape', 'event', 'soil', 'term'];
  const STRIP_LISTS = {
    country: ['visited', 'want_to_visit', 'want_to_taste', 'favourite'],
    region: ['visited', 'want_to_visit', 'want_to_taste', 'favourite'],
    appellation: ['visited', 'want_to_visit', 'want_to_taste', 'favourite'],
    site: ['visited', 'want_to_visit', 'favourite'],
    grape: ['want_to_taste', 'favourite']
  };
  const SCORE = [[97, 'Profound'], [94, 'Superb'], [90, 'Outstanding'], [87, 'Very good'], [84, 'Good'], [80, 'Sound'], [70, 'Ordinary'], [60, 'Flawed'], [50, 'Faulty']];
  const scoreWord = r => r == null ? '' : (SCORE.find(s => r >= s[0]) || SCORE[SCORE.length - 1])[1];
  const SIZES = [[187, '187 ml'], [375, '375 ml, half'], [500, '500 ml'], [620, '620 ml, clavelin'], [750, '750 ml'], [1000, '1 litre'], [1500, '1.5 l, magnum'], [3000, '3 l'], [4500, '4.5 l'], [6000, '6 l, imperial']];
  const CURRENCIES = ['USD', 'EUR', 'GBP', 'CHF', 'HUF', 'MDL', 'CAD', 'AUD', 'NZD', 'ZAR', 'JPY', 'SEK', 'NOK', 'DKK', 'CZK', 'PLN', 'RON', 'GEL', 'ARS', 'CLP', 'BRL', 'MXN', 'CNY', 'HKD', 'SGD'];

  /* WSET-style systematic tasting: option keys and short labels */
  const S5 = [['low', 'Low'], ['medium_minus', 'Med−'], ['medium', 'Medium'], ['medium_plus', 'Med+'], ['high', 'High']];
  const P5 = [['light', 'Light'], ['medium_minus', 'Med−'], ['medium', 'Medium'], ['medium_plus', 'Med+'], ['pronounced', 'Pronounced']];
  const SAT_OPTS = {
    'appearance.clarity': [['clear', 'Clear'], ['hazy', 'Hazy']],
    'appearance.intensity': [['pale', 'Pale'], ['medium', 'Medium'], ['deep', 'Deep']],
    'appearance.colour': [['lemon_green', 'Lemon-green'], ['lemon', 'Lemon'], ['gold', 'Gold'], ['amber', 'Amber'], ['pink', 'Pink'], ['salmon', 'Salmon'], ['orange', 'Orange'], ['purple', 'Purple'], ['ruby', 'Ruby'], ['garnet', 'Garnet'], ['tawny', 'Tawny'], ['brown', 'Brown']],
    'nose.condition': [['clean', 'Clean'], ['unclean', 'Unclean']],
    'nose.intensity': P5,
    'nose.development': [['youthful', 'Youthful'], ['developing', 'Developing'], ['fully_developed', 'Fully developed'], ['tired', 'Tired']],
    'palate.sweetness': [['dry', 'Dry'], ['off_dry', 'Off-dry'], ['medium_dry', 'Med-dry'], ['medium_sweet', 'Med-sweet'], ['sweet', 'Sweet'], ['luscious', 'Luscious']],
    'palate.acidity': S5,
    'palate.tannin': S5,
    'palate.alcohol': [['low', 'Low'], ['medium', 'Medium'], ['high', 'High']],
    'palate.body': [['light', 'Light'], ['medium_minus', 'Med−'], ['medium', 'Medium'], ['medium_plus', 'Med+'], ['full', 'Full']],
    'palate.mousse': [['delicate', 'Delicate'], ['creamy', 'Creamy'], ['aggressive', 'Aggressive']],
    'palate.flavour_intensity': P5,
    'palate.finish': [['short', 'Short'], ['medium_minus', 'Med−'], ['medium', 'Medium'], ['medium_plus', 'Med+'], ['long', 'Long']],
    'conclusions.quality': [['faulty', 'Faulty'], ['poor', 'Poor'], ['acceptable', 'Acceptable'], ['good', 'Good'], ['very_good', 'Very good'], ['outstanding', 'Outstanding']],
    'conclusions.readiness': [['too_young', 'Too young'], ['can_age', 'Drink now, can age'], ['drink_now', 'Drink now, will not improve'], ['too_old', 'Too old']]
  };
  const SAT_LABEL = {
    'appearance.clarity': 'Clarity', 'appearance.intensity': 'Intensity', 'appearance.colour': 'Colour',
    'nose.condition': 'Condition', 'nose.intensity': 'Intensity', 'nose.development': 'Development',
    'palate.sweetness': 'Sweetness', 'palate.acidity': 'Acidity', 'palate.tannin': 'Tannin', 'palate.alcohol': 'Alcohol', 'palate.body': 'Body',
    'palate.mousse': 'Mousse', 'palate.flavour_intensity': 'Flavour intensity', 'palate.finish': 'Finish',
    'conclusions.quality': 'Quality', 'conclusions.readiness': 'Readiness'
  };
  const COLOURS = {
    white: ['lemon_green', 'lemon', 'gold', 'amber', 'brown'], rose: ['pink', 'salmon', 'orange'], red: ['purple', 'ruby', 'garnet', 'tawny', 'brown'],
    orange: ['gold', 'amber', 'orange', 'brown'], fortified: ['lemon', 'gold', 'amber', 'ruby', 'garnet', 'tawny', 'brown']
  };
  const colourKeys = st => COLOURS[st === 'sparkling' || st === 'sweet' ? 'white' : st] || ['lemon_green', 'lemon', 'gold', 'amber', 'pink', 'salmon', 'purple', 'ruby', 'garnet', 'tawny', 'brown'];
  const AROMA = {
    primary: [
      ['Floral', ['acacia', 'honeysuckle', 'chamomile', 'elderflower', 'geranium', 'blossom', 'rose', 'violet']],
      ['Green fruit', ['apple', 'gooseberry', 'pear', 'pear drop', 'quince', 'grape']],
      ['Citrus', ['grapefruit', 'lemon', 'lime', 'orange peel', 'lemon peel']],
      ['Stone fruit', ['peach', 'apricot', 'nectarine']],
      ['Tropical fruit', ['banana', 'lychee', 'mango', 'melon', 'passion fruit', 'pineapple']],
      ['Red fruit', ['redcurrant', 'cranberry', 'raspberry', 'strawberry', 'red cherry', 'red plum']],
      ['Black fruit', ['blackcurrant', 'blackberry', 'bramble', 'blueberry', 'black cherry', 'black plum']],
      ['Dried and cooked fruit', ['fig', 'prune', 'raisin', 'sultana', 'kirsch', 'jam', 'baked fruit', 'stewed fruit', 'preserved fruit']],
      ['Herbaceous', ['green pepper', 'grass', 'tomato leaf', 'asparagus', 'blackcurrant leaf']],
      ['Herbal', ['eucalyptus', 'mint', 'medicinal', 'lavender', 'fennel', 'dill']],
      ['Pungent spice', ['black pepper', 'white pepper', 'liquorice']],
      ['Noble rot', ['honey', 'saffron', 'ginger', 'beeswax', 'marmalade']],
      ['Other', ['flint', 'wet stones', 'wet wool', 'rubber']]
    ],
    secondary: [
      ['Yeast and lees', ['biscuit', 'bread', 'toast', 'pastry', 'brioche', 'bread dough', 'cheese']],
      ['Malolactic', ['butter', 'cream']],
      ['Oak', ['vanilla', 'cloves', 'nutmeg', 'coconut', 'butterscotch', 'toasted oak', 'cedar', 'charred wood', 'smoke', 'chocolate', 'coffee', 'resin']]
    ],
    tertiary: [
      ['Oxidative', ['almond', 'marzipan', 'hazelnut', 'walnut', 'toffee', 'caramel']],
      ['Developed fruit', ['dried apricot', 'dried apple', 'dried banana', 'dried fig', 'dried cranberry', 'cooked blackberry', 'cooked plum', 'tar']],
      ['Bottle age, whites', ['petrol', 'kerosene', 'cinnamon', 'candied ginger', 'nutty', 'hay', 'honeyed']],
      ['Bottle age, reds', ['leather', 'forest floor', 'earth', 'mushroom', 'game', 'tobacco', 'wet leaves', 'savoury', 'meaty', 'farmyard']]
    ]
  };
  const TIER_NAME = { primary: 'Primary', secondary: 'Secondary', tertiary: 'Tertiary' };
  const TIER_NOTE = { primary: 'grape and fruit', secondary: 'winemaking', tertiary: 'age' };

  /* ---------- small utilities ---------- */
  const uuid = () => {
    try { if (crypto.randomUUID) return crypto.randomUUID(); } catch (e) { /* older engine */ }
    const b = crypto.getRandomValues(new Uint8Array(16));
    b[6] = (b[6] & 15) | 64; b[8] = (b[8] & 63) | 128;
    const h = [...b].map(x => x.toString(16).padStart(2, '0')).join('');
    return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
  };
  const isUuid = s => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(String(s || ''));
  const nowIso = () => new Date().toISOString();
  const pad2 = n => String(n).padStart(2, '0');
  const today = () => { const d = new Date(); return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`; };
  const YEAR = () => new Date().getFullYear();
  const LS = {
    get(k, d) { try { const v = localStorage.getItem(KEY + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(KEY + k, JSON.stringify(v)); return true; } catch (e) { return false; } },
    del(k) { try { localStorage.removeItem(KEY + k); } catch (e) { /* blocked */ } }
  };
  const debounce = (fn, ms) => {
    let t = 0, last = null;
    const d = (...a) => { last = a; clearTimeout(t); t = setTimeout(() => { t = 0; fn(...a); }, ms); };
    d.flush = () => { if (t) { clearTimeout(t); t = 0; fn(...(last || [])); } };
    d.cancel = () => { clearTimeout(t); t = 0; };
    return d;
  };
  const toast = m => VM.toast(m);
  const plural = (n, one, many) => `${VM.fmt.num(n)} ${n === 1 ? one : (many || one + 's')}`;
  const fmtScore = r => r == null ? '' : (r % 1 ? r.toFixed(1) : String(r));
  const fmtDate = d => { if (!d) return ''; const x = new Date(d + 'T12:00:00'); return isNaN(x) ? d : x.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }); };
  const fmtMoney = (v, cur) => {
    if (v == null) return '';
    try { return new Intl.NumberFormat('en', { style: 'currency', currency: cur || 'USD', maximumFractionDigits: v % 1 ? 2 : 0 }).format(v); } catch (e) { return `${v} ${cur || ''}`.trim(); }
  };
  const sizeName = ml => (SIZES.find(s => s[0] === ml) || [ml, `${ml} ml`])[1];
  const icon = name => ({
    plus: '<svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M8 3v10M3 8h10"/></svg>',
    bottle: '<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round"><path d="M6.6 1.5h2.8v3.1c0 .6.3 1.1.8 1.5.9.7 1.4 1.7 1.4 2.8v5.3a.6.6 0 0 1-.6.6H5a.6.6 0 0 1-.6-.6V8.9c0-1.1.5-2.1 1.4-2.8.5-.4.8-.9.8-1.5z"/><path d="M4.4 9.6h7.2"/></svg>',
    pin: '<svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M8 14.5s-4.5-4.4-4.5-7.8a4.5 4.5 0 0 1 9 0c0 3.4-4.5 7.8-4.5 7.8z"/><circle cx="8" cy="6.6" r="1.6"/></svg>',
    search: '<svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 21 21"/></svg>'
  })[name] || '';
  /* hyphen-aware folding for name matching ("Latour" must not match "Latour-Martillac") */
  const fold2 = s => fold(String(s || '').replace(/-/g, ' x0x ')).replace(/ x0x /g, 'x0x');

  /* ---------- photos in IndexedDB (signed-out journal, and uploads waiting for a connection) ---------- */
  const MEMPH = new Map();
  const IDB = (() => {
    let dbp = null;
    const open = () => dbp || (dbp = new Promise((res, rej) => {
      try {
        const r = indexedDB.open('vm-journal', 1);
        r.onupgradeneeded = () => r.result.createObjectStore('photos');
        r.onsuccess = () => res(r.result);
        r.onerror = () => rej(r.error);
      } catch (e) { rej(e); }
    }));
    const tx = (mode, fn) => open().then(db => new Promise((res, rej) => {
      const t = db.transaction('photos', mode);
      const q = fn(t.objectStore('photos'));
      t.oncomplete = () => res(q ? q.result : true);
      t.onerror = () => rej(t.error);
      t.onabort = () => rej(t.error);
    }));
    return {
      put: (k, v) => tx('readwrite', s => s.put(v, k)).then(() => true).catch(() => { MEMPH.set(k, v); return false; }),
      get: k => MEMPH.has(k) ? Promise.resolve(MEMPH.get(k)) : tx('readonly', s => s.get(k)).catch(() => null),
      del: k => { MEMPH.delete(k); return tx('readwrite', s => s.delete(k)).catch(() => false); }
    };
  })();

  /* ---------- record cleaning (same shapes as the tables) ---------- */
  const str = (v, max = 2000) => { if (v == null) return null; const s = String(v).trim(); return s ? s.slice(0, max) : null; };
  const int = (v, lo, hi) => { if (v == null || v === '') return null; const n = Math.round(Number(v)); return Number.isFinite(n) && n >= lo && n <= hi ? n : null; };
  const dateStr = v => { const s = str(v, 10); return s && /^\d{4}-\d{2}-\d{2}$/.test(s) ? s : null; };
  function cleanBottle(b) {
    b = b || {};
    const o = {};
    o.id = isUuid(b.id) ? String(b.id).toLowerCase() : uuid();
    o.created_at = str(b.created_at, 40) || nowIso();
    o.updated_at = str(b.updated_at, 40) || o.created_at;
    o.status = STATUS.includes(b.status) ? b.status : 'tasted';
    o.producer = str(b.producer, 300);
    o.appellation_name = str(b.appellation_name, 200);
    o.wine = str(b.wine, 300) || o.producer || o.appellation_name || 'Unnamed wine';
    o.vintage = int(b.vintage, 1700, 2100);
    o.appellation_id = str(b.appellation_id, 160);
    o.site_id = str(b.site_id, 200);
    o.region_id = str(b.region_id, 200);
    const c = String(b.country || '').trim().toLowerCase();
    o.country = /^[a-z]{2}$/.test(c) ? c : null;
    o.style = STYLES.includes(b.style) ? b.style : null;
    o.grapes = [...new Set(arr(b.grapes).map(g => String(g).replace(/^grape-/, '').trim()).filter(Boolean))].slice(0, 30);
    o.classification = str(b.classification, 200);
    o.tasted_on = dateStr(b.tasted_on);
    o.where_tasted = str(b.where_tasted, 300);
    o.occasion = str(b.occasion, 300);
    o.with_whom = str(b.with_whom, 300);
    const p = b.price == null || b.price === '' ? NaN : Number(String(b.price).replace(',', '.'));
    o.price = Number.isFinite(p) && p >= 0 && p < 1e8 ? Math.round(p * 100) / 100 : null;
    const cur = String(b.currency || '').trim().toUpperCase();
    o.currency = /^[A-Z]{3}$/.test(cur) ? cur : 'USD';
    o.bottle_ml = int(b.bottle_ml, 50, 30000) ?? 750;
    o.quantity = int(b.quantity, 0, 100000) ?? 1;
    o.drink_from = int(b.drink_from, 1700, 2200);
    o.drink_to = int(b.drink_to, 1700, 2200);
    const r = b.rating == null || b.rating === '' ? NaN : Number(b.rating);
    o.rating = Number.isFinite(r) && r >= 50 && r <= 100 ? Math.round(r * 2) / 2 : null;
    o.would_buy_again = b.would_buy_again === true || b.would_buy_again === false ? b.would_buy_again : null;
    o.sat = b.sat && typeof b.sat === 'object' && !Array.isArray(b.sat) ? b.sat : {};
    o.notes = str(b.notes, 20000);
    o.photo_path = str(b.photo_path, 300);
    return o;
  }
  function cleanNote(n) {
    if (!n || !TARGETS.includes(n.target_type) || !str(n.target_id) || !str(n.body)) return null;
    return { id: isUuid(n.id) ? String(n.id).toLowerCase() : uuid(), target_type: n.target_type, target_id: String(n.target_id).replace(/^grape-/, n.target_type === 'grape' ? '' : 'grape-'), body: String(n.body).slice(0, 20000), created_at: str(n.created_at, 40) || nowIso(), updated_at: str(n.updated_at, 40) || nowIso() };
  }
  function cleanList(l) {
    if (!l || !LISTS.includes(l.list) || !str(l.target_type) || !str(l.target_id)) return null;
    return { list: l.list, target_type: String(l.target_type), target_id: String(l.target_id).replace(/^grape-/, l.target_type === 'grape' ? '' : 'grape-'), note: str(l.note, 2000), created_at: str(l.created_at, 40) || nowIso() };
  }
  const nKey = n => n.target_type + '|' + n.target_id;
  const lKey = l => l.list + '|' + l.target_type + '|' + l.target_id;
  const dupKey = b => [fold(b.producer), fold(b.wine), b.vintage || 'nv', b.status, b.tasted_on || ''].join('|');
  function pruneSat(s) {
    const out = {};
    for (const [k, v] of Object.entries(s || {})) {
      if (k === 'v') continue;
      if (v && typeof v === 'object' && !Array.isArray(v)) {
        const o = {};
        for (const [k2, v2] of Object.entries(v)) {
          if (Array.isArray(v2)) { if (v2.length) o[k2] = [...new Set(v2)]; } else if (v2 != null && v2 !== '') o[k2] = v2;
        }
        if (Object.keys(o).length) out[k] = o;
      }
    }
    return Object.keys(out).length ? { v: 1, ...out } : {};
  }
  const satCount = s => Object.entries(s || {}).reduce((n, [k, v]) => n + (k !== 'v' && v && typeof v === 'object' ? Object.values(v).filter(x => Array.isArray(x) ? x.length : x != null).length : 0), 0);

  /* ---------- the store ---------- */
  const J = {
    mode: GH ? 'local' : 'off', uid: null,
    bottles: [], notes: [], lists: [],
    outbox: [], syncing: false, syncError: null, lastSync: null,
    offer: null, batch: 0, subs: new Set(), warned: false
  };
  let readyRes;
  const ready = new Promise(r => { readyRes = r; });
  const sortBottles = () => J.bottles.sort((a, b) => String(b.tasted_on || b.created_at).localeCompare(String(a.tasted_on || a.created_at)) || String(b.created_at).localeCompare(String(a.created_at)));
  function loadLocal() {
    const d = LS.get('local', null) || {};
    J.bottles = arr(d.bottles).map(cleanBottle);
    J.notes = arr(d.notes).map(cleanNote).filter(Boolean);
    J.lists = arr(d.lists).map(cleanList).filter(Boolean);
    sortBottles();
  }
  function persist() {
    const data = { bottles: J.bottles, notes: J.notes, lists: J.lists, at: nowIso() };
    let ok = true;
    if (J.mode === 'local') ok = LS.set('local', data);
    else if (J.mode === 'cloud' && J.uid) { ok = LS.set('u:' + J.uid, data); LS.set('ob:' + J.uid, J.outbox); }
    if (!ok && !J.warned && J.mode === 'local') { J.warned = true; toast('This browser is not keeping your journal (private browsing?). Export it before you leave.'); }
  }
  function changed(what) {
    if (J.batch) return;
    persist();
    for (const f of [...J.subs]) { try { f({ what, mode: J.mode }); } catch (e) { console.warn('[journal]', e); } }
    VM.emit('journal:changed', { what, mode: J.mode });
    refreshUIWrap(what);
  }
  const put = (list, rec, key) => { const k = key(rec); const i = list.findIndex(x => key(x) === k); if (i >= 0) list[i] = rec; else list.push(rec); return rec; };
  const bKey = b => b.id;

  /* ---------- Supabase: client, auth ---------- */
  const A = { client: null, loading: null, user: null, ready: false, avail: GH && !!(CFG.supabaseUrl && CFG.supabaseAnonKey), error: null };
  let authRes;
  const whenReady = new Promise(r => { authRes = r; });
  function hasStoredSession() {
    try { for (let i = 0; i < localStorage.length; i++) { if (/^sb-.+-auth-token$/.test(localStorage.key(i) || '')) return true; } } catch (e) { /* blocked */ }
    return false;
  }
  function getClient() {
    if (A.client) return Promise.resolve(A.client);
    if (!A.avail) return Promise.reject(new Error('Sign-in is not set up on this copy of the atlas.'));
    if (A.loading) return A.loading;
    A.loading = (async () => {
      let lib = window.__VM_JOURNAL_TEST_SUPABASE || window.supabase;
      if (!lib || !lib.createClient) {
        await new Promise((res, rej) => {
          const s = document.createElement('script');
          s.src = `https://cdn.jsdelivr.net/npm/@supabase/supabase-js@${SB.ver}/dist/umd/supabase.js`;
          s.integrity = SB.sri; s.crossOrigin = 'anonymous'; s.async = true;
          s.onload = res; s.onerror = () => rej(new Error('The sign-in library could not load. Check the connection.'));
          document.head.appendChild(s);
        });
        lib = window.supabase;
      }
      const client = lib.createClient(CFG.supabaseUrl, CFG.supabaseAnonKey, {
        auth: { flowType: 'pkce', detectSessionInUrl: false, persistSession: true, autoRefreshToken: true }
      });
      A.client = client;
      VM.auth.client = client;
      client.auth.onAuthStateChange((ev, session) => { setTimeout(() => onSession(session, ev), 0); });
      return client;
    })();
    A.loading.catch(e => { A.loading = null; A.error = e.message; });
    return A.loading;
  }
  function onSession(session, ev) {
    const u = session && session.user ? session.user : null;
    const prevId = A.user ? A.user.id : null;
    A.user = u;
    VM.auth.user = u;
    const first = !A.ready;
    if (first) { A.ready = true; VM.auth.ready = true; authRes(u); }
    if (prevId !== (u ? u.id : null)) {
      if (u) enterCloud(u); else enterLocal();
      VM.emit('auth', u);
    } else if (first) {
      if (!u) enterLocal();
      VM.emit('auth', u);
    }
  }
  function cleanUrl() {
    try {
      const url = new URL(location.href);
      for (const k of ['code', 'error', 'error_code', 'error_description', 'type']) url.searchParams.delete(k);
      const q = url.searchParams.toString();
      history.replaceState(history.state, '', url.pathname + (q ? '?' + q : '') + url.hash);
    } catch (e) { /* sandboxed */ }
  }
  const redirectURL = () => {
    const here = location.origin + location.pathname;
    const site = String(SITE_URL).replace(/index\.html$/, '');
    return here.replace(/index\.html$/, '').startsWith(site.replace(/\/$/, '')) ? site : here;
  };
  function friendlyAuthError(e) {
    const m = String((e && (e.message || e.error_description)) || e || '');
    if (/rate|too many|429/i.test(m) || (e && e.status === 429)) return 'Too many sign-in emails were asked for. Wait a minute and try again.';
    if (/verifier|both auth code and code verifier/i.test(m)) return 'This sign-in link was opened in a different browser from the one that asked for it. Ask for a new link here, or type the code from the email.';
    if (/expired|invalid/i.test(m)) return 'That sign-in link or code has expired. Ask for a new one.';
    if (/fetch|network|load failed/i.test(m)) return 'No connection to the sign-in service right now.';
    return m || 'Sign-in failed.';
  }
  async function signIn(email) {
    email = String(email || '').trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return { ok: false, error: 'That email address does not look right.' };
    try {
      const c = await getClient();
      LS.set('email', email);
      LS.set('return', 'journal');
      const r = await c.auth.signInWithOtp({ email, options: { emailRedirectTo: redirectURL(), shouldCreateUser: true } });
      if (r.error) return { ok: false, error: friendlyAuthError(r.error) };
      return { ok: true };
    } catch (e) { return { ok: false, error: friendlyAuthError(e) }; }
  }
  async function verifyCode(email, code) {
    email = String(email || '').trim(); code = String(code || '').replace(/\s+/g, '');
    if (!/^\d{6,10}$/.test(code)) return { ok: false, error: 'The code is the six-digit number in the email.' };
    try {
      const c = await getClient();
      const r = await c.auth.verifyOtp({ email, token: code, type: 'email' });
      if (r.error) return { ok: false, error: friendlyAuthError(r.error) };
      return { ok: true };
    } catch (e) { return { ok: false, error: friendlyAuthError(e) }; }
  }
  async function signOut() {
    const uid = J.uid;
    try { const c = await getClient(); await c.auth.signOut({ scope: 'local' }); } catch (e) { /* offline: drop the session anyway */ }
    if (uid) { LS.del('u:' + uid); LS.del('ob:' + uid); }
    for (const v of PURL.values()) if (v.blob) URL.revokeObjectURL(v.url);
    PURL.clear();
    onSession(null, 'SIGNED_OUT');
  }
  async function bootAuth() {
    let url;
    try { url = new URL(location.href); } catch (e) { url = null; }
    const code = url && url.searchParams.get('code');
    const err = url && (url.searchParams.get('error_description') || url.searchParams.get('error'));
    if (err) { cleanUrl(); V.authErr = friendlyAuthError(err); toast(V.authErr); }
    if (code && A.avail) {
      try {
        const c = await getClient();
        const r = await c.auth.exchangeCodeForSession(code);
        cleanUrl();
        if (r.error) throw r.error;
        const s = r.data && r.data.session;
        if (s) onSession(s, 'SIGNED_IN');
        toast(`Signed in${s && s.user && s.user.email ? ' as ' + s.user.email : ''}.`);
        const ret = LS.get('return', 'journal'); LS.del('return');
        if (!location.hash || location.hash === '#') VM.go(ret || 'journal');
        return;
      } catch (e) {
        cleanUrl();
        V.authErr = friendlyAuthError(e);
        toast(V.authErr);
      }
    }
    if (A.avail && hasStoredSession()) {
      try {
        const c = await getClient();
        const { data } = await c.auth.getSession();
        onSession(data && data.session, 'INITIAL_SESSION');
        return;
      } catch (e) { /* fall through to local */ }
    }
    onSession(null, 'NONE');
  }

  /* ---------- cloud sync ---------- */
  const isNet = r => navigator.onLine === false || !r || r.status === 0 || /fetch|network|load failed|timed? ?out/i.test(String((r.error && r.error.message) || r.message || ''));
  async function sbq(p) {
    try { const r = await p; return r || { error: { message: 'empty response' }, status: 0 }; } catch (e) { return { error: { message: String((e && e.message) || e) }, status: 0 }; }
  }
  async function fetchAll(table) {
    const out = [];
    for (let from = 0; from < 100000; from += 1000) {
      const r = await sbq(A.client.from(table).select('*').range(from, from + 999));
      if (r.error) throw r;
      const rows = arr(r.data);
      out.push(...rows);
      if (rows.length < 1000) break;
    }
    return out;
  }
  function enterLocal() {
    J.mode = GH ? 'local' : 'off';
    J.uid = null; J.outbox = []; J.offer = null; J.syncError = null; J.syncing = false;
    if (GH) loadLocal();
    readyRes();
    changed('auth');
  }
  function enterCloud(u) {
    J.mode = 'cloud';
    J.uid = u.id;
    const m = LS.get('u:' + u.id, null);
    J.bottles = m ? arr(m.bottles).map(cleanBottle) : [];
    J.notes = m ? arr(m.notes).map(cleanNote).filter(Boolean) : [];
    J.lists = m ? arr(m.lists).map(cleanList).filter(Boolean) : [];
    J.outbox = arr(LS.get('ob:' + u.id, []));
    sortBottles();
    computeOffer();
    readyRes();
    changed('auth');
    cloudRefresh();
  }
  async function cloudRefresh() {
    if (J.mode !== 'cloud' || !A.client) return;
    const uid = J.uid;
    J.syncing = true; changed('sync');
    try {
      const [b, n, l] = await Promise.all([fetchAll('bottles'), fetchAll('place_notes'), fetchAll('place_lists')]);
      if (J.uid !== uid) return;
      const pend = new Map(J.outbox.map(o => [o.t + ':' + o.key, o.op]));
      const keepUp = (list, t, key) => list.filter(x => pend.get(t + ':' + key(x)) === 'up');
      const merge = (server, local, t, key) => {
        const m = new Map(server.map(x => [key(x), x]));
        for (const x of keepUp(local, t, key)) m.set(key(x), x);
        return [...m.values()].filter(x => pend.get(t + ':' + key(x)) !== 'del');
      };
      J.bottles = merge(b.map(cleanBottle), J.bottles, 'b', bKey);
      J.notes = merge(n.map(cleanNote).filter(Boolean), J.notes, 'n', nKey);
      J.lists = merge(l.map(cleanList).filter(Boolean), J.lists, 'l', lKey);
      sortBottles();
      J.lastSync = nowIso(); J.syncError = null;
    } catch (e) {
      J.syncError = isNet(e) ? 'offline' : String((e && e.error && e.error.message) || 'error');
    }
    J.syncing = false;
    computeOffer();
    changed('sync');
    flushOutbox();
  }
  function queue(t, op, key) {
    J.outbox = J.outbox.filter(o => !(o.t === t && o.key === key));
    J.outbox.push({ t, op, key, at: nowIso() });
    persist();
  }
  let _flushing = null;
  function flushOutbox() {
    if (_flushing || J.mode !== 'cloud' || !A.client || !J.outbox.length) return _flushing || Promise.resolve();
    _flushing = (async () => {
      while (J.outbox.length && J.mode === 'cloud') {
        const o = J.outbox[0];
        const r = await pushOp(o);
        if (r === 'net') { J.syncError = 'offline'; break; }
        J.outbox.shift();
        persist();
      }
      if (!J.outbox.length) J.syncError = null;
    })().finally(() => { _flushing = null; changed('sync'); });
    return _flushing;
  }
  async function pushOp(o) {
    if (o.t === 'b') {
      if (o.op === 'del') return delBottleRemote(o.key);
      const b = J.bottles.find(x => x.id === o.key);
      return b ? pushBottle(b) : true;
    }
    if (o.t === 'n') {
      const [type, id] = o.key.split('|');
      const n = J.notes.find(x => nKey(x) === o.key);
      return o.op === 'del' || !n ? delNoteRemote(type, id) : pushNote(n);
    }
    if (o.t === 'l') {
      const [list, type, id] = o.key.split('|');
      const l = J.lists.find(x => lKey(x) === o.key);
      return o.op === 'del' || !l ? delListRemote(list, type, id) : pushList(l);
    }
    return true;
  }
  function permanent(r, what) {
    const m = (r && r.error && r.error.message) || 'unknown error';
    console.warn('[journal] ' + what + ': ' + m);
    toast(`Could not save ${what}: ${m}`);
    return false;
  }
  async function uploadLocalPhoto(path) {
    const blob = await IDB.get(path);
    if (!blob) return null;
    const dest = `${J.uid}/${path.replace(/^local\//, '')}`;
    const r = await sbq(A.client.storage.from('labels').upload(dest, blob, { contentType: blob.type || 'image/jpeg', cacheControl: '31536000', upsert: true }));
    if (r.error) return isNet(r) ? 'net' : (permanent(r, 'the label photo'), 'keep');
    const cached = PURL.get(path);
    if (cached) PURL.set(dest, cached);
    IDB.del(path);
    return dest;
  }
  async function pushBottle(b) {
    if (b.photo_path && b.photo_path.startsWith('local/')) {
      const p = await uploadLocalPhoto(b.photo_path);
      if (p === 'net') return 'net';
      if (p === null) b.photo_path = null;
      else if (p !== 'keep') {
        const old = b.photo_path;
        for (const x of J.bottles) if (x.photo_path === old) x.photo_path = p;
      }
    }
    const row = { ...b };
    if (row.photo_path && row.photo_path.startsWith('local/')) row.photo_path = null;
    const r = await sbq(A.client.from('bottles').upsert(row).select().single());
    if (r.error) return isNet(r) ? 'net' : permanent(r, 'the bottle');
    if (r.data) {
      const fresh = cleanBottle(r.data);
      if (b.photo_path && b.photo_path.startsWith('local/')) fresh.photo_path = b.photo_path;
      put(J.bottles, fresh, bKey);
      sortBottles();
    }
    return true;
  }
  async function delBottleRemote(id) {
    const r = await sbq(A.client.from('bottles').delete().eq('id', id));
    if (r.error) return isNet(r) ? 'net' : permanent(r, 'the deletion');
    return true;
  }
  async function pushNote(n) {
    const r = await sbq(A.client.from('place_notes').upsert({ ...n, user_id: J.uid }, { onConflict: 'user_id,target_type,target_id' }).select().single());
    if (r.error) return isNet(r) ? 'net' : permanent(r, 'the note');
    if (r.data) { const c = cleanNote(r.data); if (c) put(J.notes, c, nKey); }
    return true;
  }
  async function delNoteRemote(type, id) {
    const r = await sbq(A.client.from('place_notes').delete().eq('target_type', type).eq('target_id', id));
    if (r.error) return isNet(r) ? 'net' : permanent(r, 'the note');
    return true;
  }
  async function pushList(l) {
    const r = await sbq(A.client.from('place_lists').upsert({ ...l, user_id: J.uid }, { onConflict: 'user_id,list,target_type,target_id', ignoreDuplicates: true }));
    if (r.error) return isNet(r) ? 'net' : permanent(r, 'the list');
    return true;
  }
  async function delListRemote(list, type, id) {
    const r = await sbq(A.client.from('place_lists').delete().eq('list', list).eq('target_type', type).eq('target_id', id));
    if (r.error) return isNet(r) ? 'net' : permanent(r, 'the list');
    return true;
  }
  /* run a remote write now, or queue it when offline or when older writes are still waiting */
  async function remote(t, op, key, fn) {
    if (J.mode !== 'cloud') return;
    if (!A.client || J.outbox.length) { queue(t, op, key); flushOutbox(); return; }
    const r = await fn();
    if (r === 'net') { queue(t, op, key); J.syncError = 'offline'; }
  }

  /* ---------- photos: URLs ---------- */
  const PURL = new Map();   /* path -> {url, exp, blob} */
  async function photoURL(path) {
    if (!path) return null;
    const c = PURL.get(path);
    if (c && (!c.exp || c.exp > Date.now() + 60000)) return c.url;
    if (path.startsWith('local/')) {
      const blob = await IDB.get(path);
      if (!blob) return null;
      const url = URL.createObjectURL(blob);
      PURL.set(path, { url, exp: 0, blob: true });
      return url;
    }
    if (J.mode !== 'cloud' || !A.client) return null;
    const r = await sbq(A.client.storage.from('labels').createSignedUrl(path, 3600));
    const u = r && r.data && r.data.signedUrl;
    if (!u) return null;
    PURL.set(path, { url: u, exp: Date.now() + 3600e3 });
    return u;
  }
  async function warmPhotos(paths) {
    const need = [...new Set(paths.filter(p => p && !p.startsWith('local/') && !(PURL.get(p) && PURL.get(p).exp > Date.now() + 60000)))];
    if (!need.length || J.mode !== 'cloud' || !A.client) return;
    const r = await sbq(A.client.storage.from('labels').createSignedUrls(need, 3600));
    for (const x of arr(r && r.data)) if (x && x.signedUrl && x.path) PURL.set(x.path, { url: x.signedUrl, exp: Date.now() + 3600e3 });
  }
  async function fillPhotos(root) {
    const imgs = [...root.querySelectorAll('img[data-photo]')];
    if (!imgs.length) return;
    await warmPhotos(imgs.map(i => i.dataset.photo));
    for (const img of imgs) {
      const u = await photoURL(img.dataset.photo);
      if (u && img.isConnected) { img.src = u; img.classList.add('on'); } else img.classList.add('none');
    }
  }
  async function removePhoto(path) {
    if (!path || J.bottles.some(b => b.photo_path === path)) return;
    const c = PURL.get(path);
    if (c && c.blob) URL.revokeObjectURL(c.url);
    PURL.delete(path);
    if (path.startsWith('local/')) { IDB.del(path); return; }
    if (J.mode === 'cloud' && A.client) await sbq(A.client.storage.from('labels').remove([path]));
  }
  async function resizeImage(file, max = 1600) {
    let src;
    try { src = await createImageBitmap(file, { imageOrientation: 'from-image' }); } catch (e) {
      src = await new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = URL.createObjectURL(file); });
    }
    const w = src.width || src.naturalWidth, h = src.height || src.naturalHeight;
    if (!w || !h) throw new Error('empty image');
    const k = Math.min(1, max / Math.max(w, h));
    const c = document.createElement('canvas');
    c.width = Math.round(w * k); c.height = Math.round(h * k);
    const x = c.getContext('2d');
    x.fillStyle = '#fff'; x.fillRect(0, 0, c.width, c.height);
    x.drawImage(src, 0, 0, c.width, c.height);
    if (src.close) src.close();
    const blob = await new Promise(r => c.toBlob(r, 'image/jpeg', 0.84));
    if (!blob) throw new Error('encode failed');
    return blob;
  }

  /* ---------- public writes ---------- */
  function ensureOn() { if (J.mode === 'off') throw new Error('The journal lives on the full site.'); }
  async function saveBottle(fields, opts = {}) {
    ensureOn();
    const prev = fields.id ? J.bottles.find(x => x.id === fields.id) : null;
    const b = cleanBottle({ ...(prev || {}), ...fields, id: fields.id || uuid(), created_at: (prev && prev.created_at) || fields.created_at, updated_at: nowIso() });
    const oldPhoto = prev && prev.photo_path && prev.photo_path !== b.photo_path ? prev.photo_path : null;
    put(J.bottles, b, bKey);
    sortBottles();
    if (!opts.quiet) changed('bottles');
    await remote('b', 'up', b.id, () => pushBottle(b));
    if (oldPhoto) removePhoto(oldPhoto);
    if (!opts.quiet) changed('bottles');
    return { ...(J.bottles.find(x => x.id === b.id) || b) };
  }
  async function deleteBottle(id) {
    ensureOn();
    const b = J.bottles.find(x => x.id === id);
    if (!b) return;
    J.bottles = J.bottles.filter(x => x.id !== id);
    changed('bottles');
    await remote('b', 'del', id, () => delBottleRemote(id));
    if (b.photo_path) removePhoto(b.photo_path);
    changed('bottles');
  }
  const normTarget = (type, id) => [type, String(id || '').replace(type === 'grape' ? /^grape-/ : /^$/, '')];
  async function saveNote(type, id, body, opts = {}) {
    ensureOn();
    [type, id] = normTarget(type, id);
    const key = type + '|' + id;
    const prev = J.notes.find(n => nKey(n) === key);
    const text = String(body || '').replace(/\s+$/, '');
    if (!text.trim()) {
      if (!prev) return null;
      J.notes = J.notes.filter(n => nKey(n) !== key);
      if (!opts.quiet) changed('notes');
      await remote('n', 'del', key, () => delNoteRemote(type, id));
      return null;
    }
    const n = cleanNote({ id: prev ? prev.id : uuid(), target_type: type, target_id: id, body: text, created_at: prev ? prev.created_at : nowIso(), updated_at: nowIso() });
    if (!n) return null;
    put(J.notes, n, nKey);
    if (!opts.quiet) changed('notes');
    await remote('n', 'up', key, () => pushNote(n));
    return { ...n };
  }
  const inList = (list, type, id) => { [type, id] = normTarget(type, id); return J.lists.some(l => l.list === list && l.target_type === type && l.target_id === id); };
  async function toggleList(list, type, id, on, opts = {}) {
    ensureOn();
    if (!LISTS.includes(list)) throw new Error('Unknown list ' + list);
    [type, id] = normTarget(type, id);
    const has = inList(list, type, id);
    const want = on == null ? !has : !!on;
    if (want === has) return want;
    const key = `${list}|${type}|${id}`;
    if (want) {
      const l = cleanList({ list, target_type: type, target_id: id, created_at: nowIso() });
      J.lists.push(l);
      if (!opts.quiet) changed('lists');
      await remote('l', 'up', key, () => pushList(l));
    } else {
      J.lists = J.lists.filter(l => lKey(l) !== key);
      if (!opts.quiet) changed('lists');
      await remote('l', 'del', key, () => delListRemote(list, type, id));
    }
    return want;
  }

  /* ---------- moving a signed-out journal into the account ---------- */
  function localPending() {
    const d = LS.get('local', null) || {};
    return { bottles: arr(d.bottles).map(cleanBottle), notes: arr(d.notes).map(cleanNote).filter(Boolean), lists: arr(d.lists).map(cleanList).filter(Boolean) };
  }
  function computeOffer() {
    if (J.mode !== 'cloud') { J.offer = null; return; }
    const L = localPending();
    const total = L.bottles.length + L.notes.length + L.lists.length;
    if (!total) { J.offer = null; return; }
    const ids = new Set(J.bottles.map(b => b.id)), keys = new Set(J.bottles.map(dupKey));
    const nb = L.bottles.filter(b => !ids.has(b.id) && !keys.has(dupKey(b)));
    const nn = L.notes.filter(n => { const c = J.notes.find(x => nKey(x) === nKey(n)); return !c || !fold(c.body).includes(fold(n.body)); });
    const nl = L.lists.filter(l => !inList(l.list, l.target_type, l.target_id));
    J.offer = { L, nb, nn, nl, dup: L.bottles.length - nb.length, total };
  }
  async function uploadLocal() {
    const o = J.offer;
    if (!o || J.mode !== 'cloud') return;
    J.batch++;
    try {
      for (const b of o.nb) await saveBottle(b, { quiet: true });
      for (const n of o.nn) {
        const c = J.notes.find(x => nKey(x) === nKey(n));
        await saveNote(n.target_type, n.target_id, c ? `${c.body}\n\n${n.body}` : n.body, { quiet: true });
      }
      for (const l of o.nl) await toggleList(l.list, l.target_type, l.target_id, true, { quiet: true });
    } finally { J.batch--; }
    LS.del('local');
    J.offer = null;
    changed('bottles');
    toast(`Added ${plural(o.nb.length, 'bottle')}${o.nn.length ? `, ${plural(o.nn.length, 'note')}` : ''}${o.nl.length ? ` and ${plural(o.nl.length, 'list entry', 'list entries')}` : ''} to your account.${o.dup ? ` ${plural(o.dup, 'duplicate')} skipped.` : ''}`);
  }

  /* ---------- atlas lookups ---------- */
  const D2 = { regionApps: new Map(), regionName: new Map(), appGrapes: null };
  const ent = id => { try { return VM.data.entity(id); } catch (e) { return null; } };
  const grapeName = g => (VM.data.grapeById(g) || {}).name || String(g).replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  function placeName(type, id) {
    if (!id) return '';
    if (type === 'grape') return grapeName(String(id).replace(/^grape-/, ''));
    if (type === 'country') return VM.data.countryName(id);
    if (type === 'appellation') return (VM.data.indexById.get(id) || {}).name || (ent(id) || {}).name || id;
    if (type === 'region') return (VM.data.regionById.get(id) || {}).name || D2.regionName.get(id) || id.replace(/^region-[a-z]{2}-/, '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    if (type === 'site') return (siteOf(id) || {}).name || id;
    const e = ent(type === 'event' && !/^event-/.test(id) ? 'event-' + id : id);
    return (e && e.name) || id;
  }
  const hashOf = (type, id) => type === 'grape' ? 'grape-' + String(id).replace(/^grape-/, '') : id;
  const within = (appId, target) => !!appId && (appId === target || VM.data.ancestry(appId).some(a => a.id === target));
  async function loadRegionApps(iso) {
    if (!iso) return;
    const c = await VM.data.content(iso);
    for (const r of arr(c && c.regions)) {
      if (D2.regionApps.has(r.id)) continue;
      D2.regionApps.set(r.id, new Set(arr(r.app_ids)));
      if (r.name) D2.regionName.set(r.id, r.name);
    }
  }
  /* the most specific content region that lists the appellation (or one of its parents) */
  async function regionFor(appId) {
    const iso = VM.data.isoOf(appId);
    if (!iso) return null;
    await loadRegionApps(iso);
    const c = await VM.data.content(iso);
    const chain = [appId, ...VM.data.ancestry(appId).map(a => a.id).reverse()];
    let best = null;
    for (const r of arr(c && c.regions)) {
      const ids = arr(r.app_ids);
      chain.forEach((x, i) => { if (ids.includes(x)) { const sc = i * 10000 + ids.length; if (!best || sc < best.sc) best = { id: r.id, sc }; } });
    }
    return best ? best.id : null;
  }
  async function grapesFor(appId) {
    await VM.data.loadGlobals();
    if (!D2.appGrapes) {
      D2.appGrapes = new Map();
      for (const [g, apps] of Object.entries(VM.data.varieties || {})) for (const a of arr(apps)) { if (!D2.appGrapes.has(a)) D2.appGrapes.set(a, []); D2.appGrapes.get(a).push(g); }
    }
    const chain = [appId, ...VM.data.ancestry(appId).map(a => a.id).reverse()];
    for (const id of chain) {
      const l = D2.appGrapes.get(id);
      if (!l || !l.length) continue;
      const f = VM.data.feature(id);
      const order = arr(f && f.varieties).map(v => (VM.data.grapeFor(v) || {}).id).filter(Boolean);
      const rank = g => { const i = order.indexOf(g); return i < 0 ? 999 : i; };
      return [...l].sort((a, b) => rank(a) - rank(b) || grapeName(a).localeCompare(grapeName(b)));
    }
    return [];
  }
  function bottlePos(b) {
    const s = b.site_id && siteOf(b.site_id);
    if (s && s.lon != null) return { lp: [s.lon, s.lat], place: b.site_id, type: 'site' };
    const a = b.appellation_id && ent(b.appellation_id);
    if (a && Array.isArray(a.lp)) return { lp: a.lp, place: b.appellation_id, type: 'appellation' };
    const r = b.region_id && VM.data.regionById.get(b.region_id);
    if (r && Array.isArray(r.lp)) return { lp: r.lp, place: b.region_id, type: 'region' };
    const m = b.country && VM.data.countries[b.country];
    if (m && m.bbox) return { lp: [(m.bbox[0] + m.bbox[2]) / 2, (m.bbox[1] + m.bbox[3]) / 2], place: b.country, type: 'country' };
    return null;
  }
  function placePos(type, id) {
    if (type === 'site') { const s = siteOf(id); return s && s.lon != null ? [s.lon, s.lat] : null; }
    if (type === 'region') { const r = VM.data.regionById.get(id); return r && r.lp ? r.lp : null; }
    if (type === 'appellation') { const a = ent(id); return a && Array.isArray(a.lp) ? a.lp : null; }
    if (type === 'country') { const m = VM.data.countries[id]; return m && m.bbox ? [(m.bbox[0] + m.bbox[2]) / 2, (m.bbox[1] + m.bbox[3]) / 2] : null; }
    return null;
  }
  function bottlesFor(id, type) {
    type = type || VM.data.typeOf(id);
    if (type === 'grape') { const g = String(id).replace(/^grape-/, ''); return J.bottles.filter(b => b.grapes.includes(g)); }
    if (type === 'country') return J.bottles.filter(b => b.country === id);
    if (type === 'site') return J.bottles.filter(b => b.site_id === id);
    if (type === 'region') { const apps = D2.regionApps.get(id); return J.bottles.filter(b => b.region_id === id || (apps && b.appellation_id && apps.has(b.appellation_id))); }
    if (type === 'appellation') return J.bottles.filter(b => within(b.appellation_id, id) || (b.site_id && within((siteOf(b.site_id) || {}).app, id)));
    return [];
  }
  function tasted() {
    const out = { countries: new Set(), regions: new Set(), appellations: new Set(), sites: new Set(), grapes: new Set() };
    for (const b of J.bottles) {
      if (b.status !== 'tasted') continue;
      if (b.country) out.countries.add(b.country);
      if (b.region_id) out.regions.add(b.region_id);
      if (b.appellation_id) out.appellations.add(b.appellation_id);
      if (b.site_id) out.sites.add(b.site_id);
      for (const g of b.grapes) out.grapes.add(g);
    }
    return out;
  }
  const bTitle = b => [b.producer, b.wine && b.wine !== b.producer ? b.wine : ''].filter(Boolean).join(' ') || b.wine;
  const bVint = b => b.vintage ? String(b.vintage) : 'NV';
  const bApp = b => b.appellation_id ? placeName('appellation', b.appellation_id) : (b.appellation_name || '');
  const copyB = b => ({ ...b, grapes: [...b.grapes], sat: JSON.parse(JSON.stringify(b.sat || {})) });

  /* ---------- the public objects ---------- */
  Object.assign(VM.auth, {
    user: null, ready: false, available: A.avail, client: null,
    currentUser: () => A.user,
    whenReady,
    onChange(fn) { return VM.on('auth', fn); },
    signIn, verifyCode, signOut, getClient
  });
  VM.journal = {
    get available() { return J.mode !== 'off'; },
    mode: () => J.mode,
    ready,
    bottles(filter) {
      let l = J.bottles;
      if (typeof filter === 'function') l = l.filter(filter);
      else if (filter && typeof filter === 'object') l = l.filter(b => Object.entries(filter).every(([k, v]) => b[k] === v));
      return l.map(copyB);
    },
    bottle(id) { const b = J.bottles.find(x => x.id === id); return b ? copyB(b) : null; },
    notes() { return J.notes.map(n => ({ ...n })); },
    lists(list) { return J.lists.filter(l => !list || l.list === list).map(l => ({ ...l })); },
    noteFor(type, id) { [type, id] = normTarget(type, id); const n = J.notes.find(x => x.target_type === type && x.target_id === id); return n ? { ...n } : null; },
    inList, saveBottle, deleteBottle, saveNote, toggleList,
    bottlesFor(id, type) { return bottlesFor(id, type).map(copyB); },
    tasted,
    onChange(fn) { J.subs.add(fn); return () => J.subs.delete(fn); },
    open(tab) { VM.go(tab ? 'journal-' + tab : 'journal'); },
    add(fromId) { VM.go(fromId ? 'journal-new-from-' + fromId : 'journal-new'); },
    exportJSON: () => exportData(),
    LISTS: [...LISTS], STYLES: [...STYLES], SAT_OPTS
  };

  /* ---------- map: "My bottles" and "Places" ---------- */
  const ML = { on: { bottles: VM.store.get('jr-pins', true) !== false, places: VM.store.get('jr-places', true) !== false }, bound: false, retry: 0 };
  const PIN_LAYERS = ['jr-place', 'jr-pin-ring', 'jr-pin', 'jr-cluster', 'jr-cluster-n'];
  function pinFC() {
    const features = [];
    let missing = 0;
    for (const b of J.bottles) {
      const p = bottlePos(b);
      if (!p) { if (b.appellation_id || b.site_id || b.country) missing++; continue; }
      features.push({ type: 'Feature', properties: { id: b.id, style: b.style || 'mixed', place: p.place, ptype: p.type, status: b.status }, geometry: { type: 'Point', coordinates: p.lp } });
    }
    return { fc: { type: 'FeatureCollection', features }, missing };
  }
  function placeFC() {
    const seen = new Map();
    for (const l of J.lists) {
      if (l.list !== 'visited' && l.list !== 'want_to_visit') continue;
      if (!['site', 'appellation', 'region', 'country'].includes(l.target_type)) continue;
      const k = l.target_type + '|' + l.target_id;
      const cur = seen.get(k);
      if (cur && cur.visited) continue;
      const lp = placePos(l.target_type, l.target_id);
      if (!lp) continue;
      seen.set(k, { visited: l.list === 'visited', lp, type: l.target_type, id: l.target_id });
    }
    return { type: 'FeatureCollection', features: [...seen.values()].map(x => ({ type: 'Feature', properties: { id: x.id, type: x.type, v: x.visited ? 1 : 0 }, geometry: { type: 'Point', coordinates: x.lp } })) };
  }
  function pinPaint(T) {
    const st = ['match', ['get', 'style']];
    for (const s of STYLES) st.push(s, T['w-' + s] || T['w-mixed']);
    st.push(T['w-mixed']);
    const r = ['interpolate', ['linear'], ['zoom'], 1, 4, 5, 5.5, 10, 7];
    return {
      ring: { 'circle-radius': ['interpolate', ['linear'], ['zoom'], 1, 6.2, 5, 7.8, 10, 9.6], 'circle-color': T.text, 'circle-opacity': 0.9 },
      pin: { 'circle-radius': r, 'circle-color': st, 'circle-stroke-color': T.panel, 'circle-stroke-width': 1.6 },
      cluster: { 'circle-radius': ['step', ['get', 'point_count'], 10, 5, 11.5, 20, 13.5], 'circle-color': T.panel, 'circle-stroke-color': T.accent, 'circle-stroke-width': 2 },
      clusterN: { 'text-color': T.text },
      place: {
        'circle-radius': ['interpolate', ['linear'], ['zoom'], 1, 3, 6, 4.5, 12, 6],
        'circle-color': ['case', ['==', ['get', 'v'], 1], T.highlight, T.panel],
        'circle-stroke-color': T.highlight, 'circle-stroke-width': ['case', ['==', ['get', 'v'], 1], 1.2, 2],
        'circle-opacity': 0.95
      }
    };
  }
  function addMapLayers() {
    const m = VM.map;
    if (!m || !m.getLayer('anchor-top') || J.mode === 'off') return;
    const T = VM.tokens(), P = pinPaint(T);
    const vis = k => (ML.on[k] ? 'visible' : 'none');
    try {
      if (!m.getSource('jr-bottles')) m.addSource('jr-bottles', { type: 'geojson', data: pinFC().fc, cluster: true, clusterRadius: 30, clusterMaxZoom: 13 });
      if (!m.getSource('jr-places')) m.addSource('jr-places', { type: 'geojson', data: placeFC() });
      const add = l => { if (!m.getLayer(l.id)) m.addLayer(l, 'anchor-top'); };
      add({ id: 'jr-place', type: 'circle', source: 'jr-places', layout: { visibility: vis('places') }, paint: P.place });
      add({ id: 'jr-pin-ring', type: 'circle', source: 'jr-bottles', filter: ['!', ['has', 'point_count']], layout: { visibility: vis('bottles') }, paint: P.ring });
      add({ id: 'jr-pin', type: 'circle', source: 'jr-bottles', filter: ['!', ['has', 'point_count']], layout: { visibility: vis('bottles') }, paint: P.pin });
      add({ id: 'jr-cluster', type: 'circle', source: 'jr-bottles', filter: ['has', 'point_count'], layout: { visibility: vis('bottles') }, paint: P.cluster });
      add({ id: 'jr-cluster-n', type: 'symbol', source: 'jr-bottles', filter: ['has', 'point_count'], layout: { visibility: vis('bottles'), 'text-field': ['to-string', ['get', 'point_count']], 'text-font': ['atlas-regular'], 'text-size': 12, 'text-allow-overlap': true, 'text-ignore-placement': true }, paint: P.clusterN });
    } catch (e) { console.warn('[journal] map layers', e.message); }
  }
  function updateMap() {
    const m = VM.map;
    if (!m || J.mode === 'off') return;
    if (!m.getSource('jr-bottles')) { addMapLayers(); return; }
    const { fc, missing } = pinFC();
    m.getSource('jr-bottles').setData(fc);
    m.getSource('jr-places').setData(placeFC());
    if (missing && ML.retry < 8) { ML.retry++; setTimeout(updateMap, 2500); } else if (!missing) ML.retry = 0;
  }
  const updateMapSoon = debounce(updateMap, 120);
  function repaintMap() {
    const m = VM.map;
    if (!m || !m.getLayer('jr-pin')) return;
    const P = pinPaint(VM.tokens());
    const set = (id, obj) => { for (const [k, v] of Object.entries(obj)) m.setPaintProperty(id, k, v); };
    set('jr-pin-ring', P.ring); set('jr-pin', P.pin); set('jr-cluster', P.cluster); set('jr-cluster-n', P.clusterN); set('jr-place', P.place);
  }
  function setLayer(k, on) {
    ML.on[k] = !!on;
    VM.store.set(k === 'bottles' ? 'jr-pins' : 'jr-places', !!on);
    const m = VM.map;
    if (!m) return;
    const ids = k === 'bottles' ? ['jr-pin-ring', 'jr-pin', 'jr-cluster', 'jr-cluster-n'] : ['jr-place'];
    for (const id of ids) if (m.getLayer(id)) m.setLayoutProperty(id, 'visibility', on ? 'visible' : 'none');
  }
  function mapHits(m, x, y, touch) {
    const layers = PIN_LAYERS.filter(l => m.getLayer(l) && m.getLayoutProperty(l, 'visibility') !== 'none' && l !== 'jr-cluster-n' && l !== 'jr-pin-ring');
    if (!layers.length) return [];
    const r = touch ? 13 : 6;
    try { return m.queryRenderedFeatures([[x - r, y - r], [x + r, y + r]], { layers }); } catch (e) { return []; }
  }
  /* another module holds the map taps (VM.map.captureTap, e.g. a study quiz): stay out of the way */
  const capturing = () => { const a = document.getElementById('app'); return !!(a && a.dataset.capture); };
  const rank = f => f.layer.id === 'jr-cluster' ? 0 : f.layer.id === 'jr-pin' ? 1 : 2;
  async function onMapHit(hits) {
    const m = VM.map;
    const f = hits.sort((a, b) => rank(a) - rank(b))[0];
    if (f.layer.id === 'jr-place') { VM.open(f.properties.type, f.properties.id); return; }
    if (f.layer.id === 'jr-pin') { VM.go('journal-bottle-' + f.properties.id); return; }
    const src = m.getSource('jr-bottles');
    const cid = f.properties.cluster_id;
    let leaves = [];
    try { leaves = await src.getClusterLeaves(cid, 200, 0); } catch (e) { leaves = []; }
    const places = new Set(leaves.map(x => x.properties.place));
    if (places.size === 1 && leaves.length) { const l = leaves[0].properties; VM.open(l.ptype, l.place); return; }
    let z = m.getZoom() + 2;
    try { z = await src.getClusterExpansionZoom(cid); } catch (e) { /* keep default */ }
    m.easeTo({ center: f.geometry.coordinates, zoom: Math.min(z + 0.2, 14), duration: VM.reducedMotion() ? 0 : 500 });
  }
  function bindMap() {
    const m = VM.map;
    if (!m || ML.bound) return;
    ML.bound = true;
    addMapLayers();
    updateMap();
    /* taps on our pins: a capture-phase click on #map runs before MapLibre's own listener on the canvas
       container, so the profile underneath does not open as well (MapLibre already swallows clicks after drags) */
    const el = document.getElementById('map');
    let down = null;
    el.addEventListener('pointerdown', e => { down = { x: e.clientX, y: e.clientY }; }, true);
    el.addEventListener('click', e => {
      if (J.mode === 'off' || !VM.map || capturing()) return;
      if (down && Math.hypot(e.clientX - down.x, e.clientY - down.y) > 6) return;
      const rc = m.getCanvas().getBoundingClientRect();
      const hits = mapHits(m, e.clientX - rc.left, e.clientY - rc.top, !matchMedia('(hover: hover) and (pointer: fine)').matches);
      if (!hits.length) return;
      e.stopPropagation(); e.preventDefault();
      onMapHit(hits);
    }, true);
    /* hover: our mousemove runs after the core's (registered later), and its frame callback after the core's,
       so it can take over the shared tooltip while the pointer is on a pin */
    setTimeout(() => {
      let raf = 0, pt = null;
      m.on('mousemove', e => {
        if (!matchMedia('(hover: hover) and (pointer: fine)').matches || capturing()) return;
        pt = e.point;
        if (raf) return;
        raf = requestAnimationFrame(() => {
          raf = 0;
          const hits = mapHits(m, pt.x, pt.y, false);
          if (!hits.length) return;
          const f = hits.sort((a, b) => rank(a) - rank(b))[0];
          let name = '', meta = '';
          if (f.layer.id === 'jr-pin') { const b = J.bottles.find(x => x.id === f.properties.id); if (!b) return; name = `${bTitle(b)} ${bVint(b)}`; meta = [STATUS_SHORT[b.status], bApp(b)].filter(Boolean).join(' · '); }
          else if (f.layer.id === 'jr-cluster') { name = plural(f.properties.point_count, 'bottle'); meta = 'Your journal · tap to open'; }
          else { name = placeName(f.properties.type, f.properties.id); meta = f.properties.v ? 'Visited' : 'Want to visit'; }
          const tip = document.getElementById('tip');
          if (!tip) return;
          tip.innerHTML = `<div class="t-name">${esc(name)}</div><div class="t-meta">${esc(meta)}</div>`;
          tip.hidden = false;
          const W = document.getElementById('app').clientWidth;
          tip.style.left = Math.min(pt.x, W - tip.offsetWidth - 24) + 'px'; tip.style.top = pt.y + 'px';
          m.getCanvas().style.cursor = 'pointer';
        });
      });
    }, 0);
    /* a basemap switch that replaces the style drops our sources: put them back */
    const readd = debounce(() => { if (VM.map && !VM.map.getSource('jr-bottles') && VM.map.getLayer('anchor-top')) { addMapLayers(); updateMap(); } }, 80);
    m.on('styledata', readd);
  }

  /* ---------- sites and region names without waiting for the map's second wave ---------- */
  const SITEX = new Map();
  let _sitesP = null;
  function sitesReady() {
    if (VM.data.siteById && VM.data.siteById.size) return Promise.resolve();
    if (!_sitesP) _sitesP = VM.data.json('data/geo/_sites.geojson').then(fc => {
      for (const f of arr(fc && fc.features)) { const p = f.properties || {}; const c = (f.geometry && f.geometry.coordinates) || []; SITEX.set(p.id, { ...p, lon: c[0], lat: c[1] }); }
    }).catch(() => {});
    return _sitesP;
  }
  const siteOf = id => (id && ((VM.data.siteById && VM.data.siteById.get(id)) || SITEX.get(id))) || null;

  /* ---------- navigation helpers ---------- */
  function quietHash(h) {
    try { history.replaceState(history.state, '', '#' + h); } catch (e) { /* sandboxed */ }
    try { if (typeof APP === 'object' && APP) APP.cur = h; } catch (e) { /* no core */ }
  }
  function replaceRoute(h) {
    try {
      if (typeof APP === 'object' && APP) {
        APP._opts = { back: true };
        if (Array.isArray(APP.hist) && APP.hist[APP.hist.length - 1] === h) APP.hist.pop();
      }
    } catch (e) { /* no core */ }
    if (location.hash.slice(1) === h) VM.panel.refresh(); else location.replace('#' + h);
  }
  const goBack = fallback => { const b = document.getElementById('back'); if (b && !b.hidden) VM.back(); else replaceRoute(fallback || 'journal'); };

  /* ---------- view state ---------- */
  const TABS = ['tasted', 'cellar', 'wishlist', 'passport', 'notes'];
  const TAB_NAME = { tasted: 'Tasted', cellar: 'Cellar', wishlist: 'Wishlist', passport: 'Passport', notes: 'Notes' };
  const V = {
    tab: TABS.includes(VM.store.get('jr-tab', 'tasted')) ? VM.store.get('jr-tab', 'tasted') : 'tasted',
    q: '', signinOpen: false, sentTo: null, authErr: null, busy: false,
    offerLater: false
  };
  const CUR = { el: null, kind: null, arg: '' };

  /* ---------- small renderers ---------- */
  const swatch = st => `<i class="sw" style="background:var(--w-${STYLES.includes(st) ? st : 'mixed'})" aria-hidden="true"></i>`;
  function drinkState(b) {
    const y = YEAR();
    if (!b.drink_from && !b.drink_to) return null;
    if (b.drink_to && y > b.drink_to) return ['past', 'Past its window'];
    if (b.drink_from && y < b.drink_from) return ['hold', `Hold until ${b.drink_from}`];
    return ['ready', b.drink_to ? `Drink now to ${b.drink_to}` : 'Ready to drink'];
  }
  const windowText = b => b.drink_from && b.drink_to ? `${b.drink_from}–${b.drink_to}` : b.drink_from ? `from ${b.drink_from}` : b.drink_to ? `to ${b.drink_to}` : '';
  function rowHTML(b, o = {}) {
    if (o.mixed) o = { cellar: b.status === 'cellar', wish: b.status === 'wishlist', tag: b.status !== 'tasted' ? STATUS_SHORT[b.status] : '' };
    const meta = o.tag ? [o.tag] : [];
    if (o.cellar) { const d = drinkState(b); meta.push(...[bApp(b), b.bottle_ml !== 750 ? sizeName(b.bottle_ml) : '', d ? d[1] : ''].filter(Boolean)); }
    else if (o.wish) meta.push(...[bApp(b), b.country ? VM.data.countryName(b.country) : ''].filter(Boolean));
    else meta.push(...[bApp(b), b.tasted_on ? fmtDate(b.tasted_on) : '', b.where_tasted || ''].filter(Boolean));
    const right = o.cellar ? `×${b.quantity}` : o.wish ? (b.price != null ? fmtMoney(b.price, b.currency) : '') : (b.rating != null ? fmtScore(b.rating) : '');
    const f = fold([b.producer, b.wine, b.vintage, bApp(b), b.country ? VM.data.countryName(b.country) : '', b.where_tasted, b.with_whom, b.occasion, b.grapes.map(grapeName).join(' '), b.notes].join(' '));
    return `<li data-f="${esc(f)}"><a class="row jr-row" href="#journal-bottle-${esc(b.id)}">
      <span class="jr-thumb" style="--sw:var(--w-${b.style || 'mixed'})">${b.photo_path ? `<img data-photo="${esc(b.photo_path)}" alt="">` : icon('bottle')}</span>
      <span class="row-name">${esc(bTitle(b))} <span class="vm-num jr-vint">${esc(bVint(b))}</span><small>${esc(meta.join(' · ') || STYLE_NAME[b.style || 'mixed'])}</small></span>
      <span class="row-meta">${esc(right)}</span></a></li>`;
  }
  function accountHTML() {
    if (!A.avail) return `<p class="note jr-acct-note">Saved in this browser only.</p>`;
    if (!A.ready) return `<div class="jr-acct"><span class="vm-grow jr-muted">Checking your account…</span></div>`;
    if (J.mode === 'cloud') {
      const st = J.syncing ? ['', 'Syncing…'] : J.outbox.length ? ['warn', `${plural(J.outbox.length, 'change')} waiting for a connection`] : J.syncError ? ['warn', 'Could not reach your account; showing the copy on this device'] : ['ok', 'Synced with your account'];
      return `<div class="jr-acct"><span class="jr-dot ${st[0]}" aria-hidden="true"></span><span class="vm-grow">Signed in as <b>${esc((A.user && A.user.email) || 'you')}</b><small>${esc(st[1])}</small></span><button type="button" class="btn small ghost" data-act="signout">Sign out</button></div>`;
    }
    const err = V.authErr ? `<p class="jr-err" role="alert">${esc(V.authErr)}</p>` : '';
    if (V.sentTo) {
      return `<div class="jr-acct jr-acct-col">${err}<p class="jr-acct-p">We sent a sign-in link to <b>${esc(V.sentTo)}</b>. Open it on this device and the journal will sign you in.</p>
        <form class="jr-code" data-form="code"><label class="vm-field vm-grow"><span>Or type the code from the email</span><input class="vm-input vm-num" name="code" inputmode="numeric" autocomplete="one-time-code" maxlength="10" placeholder="123456"></label><button type="submit" class="btn small solid">Sign in</button></form>
        <p class="note"><button type="button" class="linkish" data-act="signin-again">Use another email, or send the link again</button></p></div>`;
    }
    if (V.signinOpen) {
      return `<form class="jr-acct jr-acct-col" data-form="signin">${err}<label class="vm-field"><span>Email</span><input class="vm-input" type="email" name="email" autocomplete="email" inputmode="email" required value="${esc(LS.get('email', ''))}" placeholder="you@example.com"></label>
        <p class="note">No password: we email you a link. Your journal then lives in your account and follows you to any device. Only you can read it.</p>
        <div class="btn-row"><button type="submit" class="btn small solid"${V.busy ? ' disabled' : ''}>${V.busy ? 'Sending…' : 'Email me a link'}</button><button type="button" class="btn small ghost" data-act="signin-cancel">Cancel</button></div></form>`;
    }
    return `<div class="jr-acct">${err}<span class="vm-grow">Saved in this browser only.<small>Sign in to keep the journal in your account, on every device.</small></span><button type="button" class="btn small" data-act="signin">Sign in</button></div>`;
  }
  function offerHTML() {
    const o = J.offer;
    if (!o || V.offerLater || J.mode !== 'cloud' || !(o.nb.length + o.nn.length + o.nl.length)) return '';
    const parts = [o.nb.length ? plural(o.nb.length, 'bottle') : '', o.nn.length ? plural(o.nn.length, 'note') : '', o.nl.length ? plural(o.nl.length, 'list entry', 'list entries') : ''].filter(Boolean);
    return `<div class="vm-card alt jr-offer"><p><b>This browser holds ${esc(parts.join(', '))} from before you signed in.</b> Add them to your account?${o.dup ? ` ${esc(plural(o.dup, 'bottle'))} already there will be skipped.` : ''}</p>
      <div class="btn-row"><button type="button" class="btn small solid" data-act="upload">Add to my account</button><button type="button" class="btn small ghost" data-act="offer-later">Not now</button></div></div>`;
  }
  /* an empty journal: how to add the first bottle */
  function firstHTML() {
    if (J.bottles.length || J.mode === 'off' || (J.mode === 'cloud' && (J.syncing || !J.lastSync))) return '';
    return `<div class="jr-first"><p class="jr-lk">Your first bottle</p>
      <ol class="jr-steps">
        <li><span>Tap <b>Add a bottle</b> below, or open any appellation, cru, region or grape on the map and tap <b>Bottle</b> under its title.</span></li>
        <li><span>Choose the appellation from the atlas. The country, region and style fill in, and the grapes it allows are offered as suggestions.</span></li>
        <li><span>Mark it tasted, in the cellar or on the wishlist. Add a rating, a photo of the label or a full structured tasting note when you like.</span></li>
      </ol>
      <p class="note">Each bottle becomes a pin on the map, and what you taste stamps the passport.</p></div>`;
  }
  function tabsHTML(tab) {
    const n = s => J.bottles.filter(b => b.status === s).length;
    const count = { tasted: n('tasted'), cellar: J.bottles.filter(b => b.status === 'cellar').reduce((a, b) => a + (b.quantity || 0), 0), wishlist: n('wishlist') };
    return `<div class="vm-tabs jr-tabs" role="tablist" aria-label="Journal sections">${TABS.map(t => `<button type="button" role="tab" id="jr-tab-${t}" aria-controls="jr-panel" aria-selected="${t === tab}" tabindex="${t === tab ? 0 : -1}" data-tab="${t}">${TAB_NAME[t]}${count[t] ? ` <span class="vm-num">${count[t]}</span>` : ''}</button>`).join('')}</div>`;
  }
  function filterHTML(n) { return n > 5 ? `<label class="sr" for="jr-q">Filter bottles</label><input id="jr-q" class="filter jr-filter" type="search" placeholder="Filter ${n} bottles" autocomplete="off" value="${esc(V.q)}">` : ''; }
  function listTab(status) {
    const list = J.bottles.filter(b => b.status === status);
    const addBtn = `<button type="button" class="linkish" data-act="new" data-status="${status}">add one</button>`;
    if (!list.length) {
      if (!J.bottles.length && status === 'tasted' && firstHTML()) return '';
      const t = { tasted: 'No tasting notes yet.', cellar: 'Nothing in the cellar yet.', wishlist: 'The wishlist is empty.' }[status];
      return `<p class="vm-empty jr-empty">${t} Tap a place on the map and ${addBtn}, or ${status === 'wishlist' ? 'note a wine you would like to find' : 'start from scratch'}.</p>`;
    }
    let out = filterHTML(list.length);
    if (status === 'cellar') {
      const btl = list.reduce((a, b) => a + (b.quantity || 0), 0);
      const ready = list.filter(b => (drinkState(b) || [])[0] === 'ready').reduce((a, b) => a + (b.quantity || 0), 0);
      const val = {};
      for (const b of list) if (b.price != null) val[b.currency] = (val[b.currency] || 0) + b.price * (b.quantity || 0);
      const cur = Object.entries(val).sort((a, b) => b[1] - a[1]);
      out += VM.h.ledger([{ k: 'Bottles', v: VM.fmt.num(btl), s: plural(list.length, 'wine') }, { k: 'Ready now', v: VM.fmt.num(ready), s: 'by drink window' }, cur.length ? { k: 'Value', v: fmtMoney(cur[0][1], cur[0][0]), s: cur.length > 1 ? `plus ${cur.length - 1} other ${cur.length > 2 ? 'currencies' : 'currency'}` : 'at purchase' } : null].filter(Boolean));
      const rk = b => { const d = drinkState(b); return d ? { past: 0, ready: 1, hold: 2 }[d[0]] : 3; };
      const sorted = [...list].sort((a, b) => rk(a) - rk(b) || (a.drink_to || 9999) - (b.drink_to || 9999) || bTitle(a).localeCompare(bTitle(b)));
      return out + `<ul class="list jr-list">${sorted.map(b => rowHTML(b, { cellar: true })).join('')}</ul>`;
    }
    if (status === 'wishlist') return out + `<ul class="list jr-list">${list.map(b => rowHTML(b, { wish: true })).join('')}</ul>`;
    const groups = new Map();
    for (const b of list) { const y = b.tasted_on ? b.tasted_on.slice(0, 4) : 'Undated'; if (!groups.has(y)) groups.set(y, []); groups.get(y).push(b); }
    return out + [...groups].map(([y, l]) => `<div class="jr-group"><h3 class="jr-year"><span>${esc(y)}</span><span class="vm-num">${l.length}</span></h3><ul class="list jr-list">${l.map(b => rowHTML(b)).join('')}</ul></div>`).join('');
  }
  function notesTab() {
    let out = '';
    const notes = [...J.notes].sort((a, b) => String(b.updated_at).localeCompare(String(a.updated_at)));
    out += VM.h.sec(`Notes on places${notes.length ? ' · ' + notes.length : ''}`);
    out += notes.length ? `<ul class="list jr-notes">${notes.map(n => `<li><a class="row" href="#${esc(hashOf(n.target_type, n.target_id))}"><span class="row-name">${esc(placeName(n.target_type, n.target_id))}<small>${esc(n.target_type === 'appellation' ? 'Appellation' : n.target_type.charAt(0).toUpperCase() + n.target_type.slice(1))}</small><span class="jr-excerpt">${esc(n.body.slice(0, 180))}${n.body.length > 180 ? '…' : ''}</span></span><span class="row-meta">${esc(fmtDate(String(n.updated_at).slice(0, 10)))}</span></a></li>`).join('')}</ul>`
      : `<p class="vm-empty jr-empty">Every country, region, appellation, site and grape profile has a small notes field under its title. What you write there gathers here.</p>`;
    for (const L of LISTS) {
      const items = J.lists.filter(l => l.list === L);
      if (!items.length) continue;
      out += VM.h.sec(`${LIST_NAME[L]} · ${items.length}`) + `<ul class="chips jr-chiplist">${items.map(l => `<li><a class="chip" href="#${esc(hashOf(l.target_type, l.target_id))}">${esc(placeName(l.target_type, l.target_id))}</a></li>`).join('')}</ul>`;
    }
    if (!J.lists.length) out += VM.h.sec('Lists') + `<p class="vm-empty jr-empty">Mark places as visited or want to visit, and appellations or grapes you want to taste, from their profiles.</p>`;
    return out;
  }
  function footHTML() {
    return `<div class="jr-foot">
      ${VM.h.sec('On the map')}
      <div class="toggles"><label class="tog" for="jr-ly-b"><span>My bottles<small>pins coloured by style</small></span><input type="checkbox" id="jr-ly-b" data-ly="bottles" ${ML.on.bottles ? 'checked' : ''}></label>
      <label class="tog" for="jr-ly-p"><span>Places<small>visited and want to visit</small></span><input type="checkbox" id="jr-ly-p" data-ly="places" ${ML.on.places ? 'checked' : ''}></label></div>
      ${VM.h.sec('Your data')}
      <div class="btn-row"><button type="button" class="btn small ghost" data-act="export-json">Export JSON</button><button type="button" class="btn small ghost" data-act="export-csv">Export CSV</button><label class="btn small ghost jr-file">Import JSON<input type="file" accept="application/json,.json" class="sr" data-act="import"></label></div>
      <p class="src">${J.mode === 'cloud' ? 'Stored in your Vitis Mundi account (Supabase, private to you) with a copy on this device for offline use.' : 'Stored in this browser. Clearing site data erases it, so export now and then, or sign in.'} Exports include notes and lists; label photos stay in ${J.mode === 'cloud' ? 'your account' : 'this browser'}.</p>
    </div>`;
  }
  function mainHTML(tab) {
    const body = tab === 'passport' ? `<div class="jr-pass" data-pass="1"><p class="jr-muted">Opening the passport…</p></div>` : tab === 'notes' ? notesTab() : listTab(tab);
    return `<div class="head"><p class="eyebrow">Your cellar book</p><h2 class="title">Cellar journal</h2></div>
      ${accountHTML()}${offerHTML()}${firstHTML()}
      <div class="btn-row jr-addrow"><button type="button" class="btn solid" data-act="new">${icon('plus')} Add a bottle</button></div>
      ${tabsHTML(tab)}<div class="jr-panel" id="jr-panel" role="tabpanel" aria-labelledby="jr-tab-${tab}">${body}</div>${footHTML()}`;
  }

  /* ---------- the bottle card ---------- */
  const optLabel = (path, v) => ((SAT_OPTS[path] || []).find(o => o[0] === v) || [v, String(v || '').replace(/_/g, ' ')])[1];
  function satSummary(sat) {
    if (!satCount(sat)) return '';
    const g = (sec, k) => sat[sec] && sat[sec][k];
    const lo = (p, v) => optLabel(p, v).toLowerCase().replace('med−', 'medium−').replace('med+', 'medium+');
    const rows = [];
    const ap = [g('appearance', 'clarity') && lo('appearance.clarity', g('appearance', 'clarity')), [g('appearance', 'intensity') && lo('appearance.intensity', g('appearance', 'intensity')), g('appearance', 'colour') && lo('appearance.colour', g('appearance', 'colour'))].filter(Boolean).join(' ')].filter(Boolean);
    if (ap.length) rows.push(['Appearance', ap.join(', ')]);
    const ar = sec => ['primary', 'secondary', 'tertiary'].flatMap(t => arr(g(sec, t)));
    const nose = [g('nose', 'condition') && lo('nose.condition', g('nose', 'condition')), g('nose', 'intensity') && `${lo('nose.intensity', g('nose', 'intensity'))} intensity`, g('nose', 'development') && lo('nose.development', g('nose', 'development'))].filter(Boolean);
    if (nose.length || ar('nose').length) rows.push(['Nose', [nose.join(', '), ar('nose').join(', ')].filter(Boolean).join('; ')]);
    const pl = [['sweetness', ''], ['acidity', ' acidity'], ['tannin', ' tannin'], ['alcohol', ' alcohol'], ['body', ' body'], ['mousse', ' mousse'], ['flavour_intensity', ' flavour intensity'], ['finish', ' finish']]
      .map(([k, s]) => g('palate', k) ? lo('palate.' + k, g('palate', k)) + s : null).filter(Boolean);
    if (pl.length || ar('palate').length) rows.push(['Palate', [pl.join(', '), ar('palate').join(', ')].filter(Boolean).join('; ')]);
    const cc = [g('conclusions', 'quality') && `${optLabel('conclusions.quality', g('conclusions', 'quality'))} quality`, g('conclusions', 'readiness') && optLabel('conclusions.readiness', g('conclusions', 'readiness')).toLowerCase()].filter(Boolean);
    if (cc.length) rows.push(['Conclusion', cc.join('; ')]);
    return VM.h.sec('Systematic tasting') + `<dl class="vm-kv jr-satsum">${rows.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v.charAt(0).toUpperCase() + v.slice(1))}.</dd>`).join('')}</dl>`;
  }
  function cardHTML(b) {
    const site = siteOf(b.site_id);
    const sameRegion = b.region_id && b.appellation_id && fold(placeName('region', b.region_id)) === fold(placeName('appellation', b.appellation_id));
    const crumbs = [b.country && VM.h.link(b.country, VM.data.countryName(b.country)), b.region_id && !sameRegion && VM.h.link(b.region_id, placeName('region', b.region_id)),
      b.appellation_id ? VM.h.link(b.appellation_id, placeName('appellation', b.appellation_id)) : b.appellation_name ? esc(b.appellation_name) : '',
      b.site_id && site ? VM.h.link(b.site_id, site.name) : ''].filter(Boolean);
    const ds = drinkState(b);
    let out = `<div class="head"><p class="eyebrow">${esc(STATUS_NAME[b.status])}${b.style ? `<span class="sep">·</span>${swatch(b.style)} ${esc(STYLE_NAME[b.style])}` : ''}</p>
      <h2 class="title jr-btitle">${esc(bTitle(b))} <span class="jr-tv">${esc(bVint(b))}</span></h2>${b.classification ? `<p class="tagline jr-class">${esc(b.classification)}</p>` : ''}</div>`;
    if (crumbs.length) out += `<p class="crumbs">${crumbs.join('<span class="gt">›</span>')}</p>`;
    if (b.photo_path) out += `<figure class="jr-photo-big"><img data-photo="${esc(b.photo_path)}" alt="Label of ${esc(bTitle(b))}"></figure>`;
    out += VM.h.ledger([
      b.rating != null && { k: 'Rating', v: fmtScore(b.rating), s: scoreWord(b.rating) },
      { k: 'Vintage', v: bVint(b), s: b.vintage ? `${YEAR() - b.vintage} years old` : 'non-vintage' },
      b.status === 'cellar' && { k: 'In the cellar', v: `×${b.quantity}`, s: sizeName(b.bottle_ml) },
      b.status !== 'cellar' && b.bottle_ml !== 750 && { k: 'Bottle', v: sizeName(b.bottle_ml).split(',')[0] },
      b.price != null && { k: 'Price', v: fmtMoney(b.price, b.currency), s: b.currency },
      (b.drink_from || b.drink_to) && { k: 'Drink', v: windowText(b), s: ds ? ds[1] : '' }
    ].filter(Boolean).slice(0, 6));
    const facts = [
      b.tasted_on && ['Tasted', fmtDate(b.tasted_on)], b.where_tasted && ['Where', b.where_tasted], b.with_whom && ['With', b.with_whom], b.occasion && ['Occasion', b.occasion],
      b.would_buy_again != null && ['Buy again', b.would_buy_again ? 'Yes' : 'No']
    ].filter(Boolean);
    if (facts.length) out += `<dl class="vm-kv jr-facts">${facts.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('')}</dl>`;
    if (b.notes) out += `<div class="prose jr-notes-prose">${VM.util.prose(b.notes)}</div>`;
    if (b.grapes.length) out += VM.h.sec('Grapes') + `<ul class="chips">${b.grapes.map(g => `<li><a class="chip" href="#grape-${esc(g)}">${esc(grapeName(g))}</a></li>`).join('')}</ul>`;
    out += satSummary(b.sat);
    const acts = [`<a class="btn" href="#journal-edit-${esc(b.id)}">Edit</a>`];
    if (bottlePos(b)) acts.push(`<button type="button" class="btn ghost" data-act="show-map">${icon('pin')} On the map</button>`);
    if (b.status === 'cellar') acts.push(`<button type="button" class="btn ghost" data-act="opened">Opened one</button>`);
    if (b.status === 'wishlist') acts.push(`<button type="button" class="btn ghost" data-act="bought">Bought it</button>`);
    out += `<div class="btn-row jr-cardacts">${acts.join('')}</div>`;
    out += `<p class="src jr-meta">Added ${esc(fmtDate(String(b.created_at).slice(0, 10)))}${b.updated_at && b.updated_at.slice(0, 10) !== b.created_at.slice(0, 10) ? `, edited ${esc(fmtDate(String(b.updated_at).slice(0, 10)))}` : ''}. <button type="button" class="linkish jr-del" data-act="delete">Delete this bottle</button></p>`;
    return out;
  }

  /* ---------- the add / edit form ---------- */
  let F = null;   /* form state */
  const pillsHTML = (name, opts, cur, label, by) => `<div class="jr-pills" role="radiogroup" ${by ? `aria-labelledby="${esc(by)}"` : `aria-label="${esc(label)}"`} data-pills="${esc(name)}">${opts.map(([k, l]) => `<button type="button" role="radio" aria-checked="${cur === k}" data-v="${esc(k)}">${esc(l)}</button>`).join('')}</div>`;
  const satGet = path => { const [a, b] = path.split('.'); return F.sat[a] && F.sat[a][b]; };
  function satSet(path, v) {
    const [a, b] = path.split('.');
    F.sat[a] = F.sat[a] || {};
    if (v == null || (Array.isArray(v) && !v.length)) delete F.sat[a][b]; else F.sat[a][b] = v;
  }
  function satRow(path, opts) {
    const id = 'jr-' + path.replace('.', '-');
    return `<div class="jr-satrow" data-row="${esc(path)}"><span class="jr-satl" id="${id}">${esc(SAT_LABEL[path])}</span>${pillsHTML('sat:' + path, opts || SAT_OPTS[path], satGet(path), SAT_LABEL[path], id)}</div>`;
  }
  function aromaHTML(sec) {
    return `<div class="jr-aromas" data-sec="${sec}">${['primary', 'secondary', 'tertiary'].map(t => {
      const cur = arr(satGet(`${sec}.${t}`));
      const extra = cur.filter(x => !AROMA[t].some(g => g[1].includes(x)));
      return `<details class="jr-tier" data-tier="${t}"><summary><span>${TIER_NAME[t]}<small>${TIER_NOTE[t]}</small></span><span class="jr-picked" data-picked="${sec}.${t}">${esc(cur.join(', '))}</span></summary>
        ${AROMA[t].map(([g, list]) => `<div class="jr-agroup"><span class="jr-agl">${esc(g)}</span><div class="jr-chips">${list.map(x => `<button type="button" class="jr-chip" aria-pressed="${cur.includes(x)}" data-aroma="${sec}.${t}" data-v="${esc(x)}">${esc(x)}</button>`).join('')}</div></div>`).join('')}
        <div class="jr-agroup"><span class="jr-agl">Your own</span><div class="jr-chips" data-own="${sec}.${t}">${extra.map(x => `<button type="button" class="jr-chip" aria-pressed="true" data-aroma="${sec}.${t}" data-v="${esc(x)}">${esc(x)}</button>`).join('')}<input class="jr-own" type="text" enterkeyhint="done" placeholder="add a word" aria-label="Add your own ${TIER_NAME[t].toLowerCase()} descriptor" data-ownin="${sec}.${t}"></div></div>
      </details>`;
    }).join('')}</div>`;
  }
  function satHTML() {
    const n = satCount(F.sat);
    return `<details class="jr-sat"${n ? ' open' : ''}><summary><span>Structured tasting<small>WSET Systematic Approach</small></span><span class="vm-num jr-satn">${n ? n + ' noted' : ''}</span></summary>
      <fieldset class="jr-satg"><legend>Appearance</legend>${satRow('appearance.clarity')}${satRow('appearance.intensity')}<div data-colours>${colourRow()}</div></fieldset>
      <fieldset class="jr-satg"><legend>Nose</legend>${satRow('nose.condition')}${satRow('nose.intensity')}<div class="jr-satrow jr-satrow-col"><span class="jr-satl">Aroma characteristics</span>${aromaHTML('nose')}</div>${satRow('nose.development')}</fieldset>
      <fieldset class="jr-satg"><legend>Palate</legend>${satRow('palate.sweetness')}${satRow('palate.acidity')}${satRow('palate.tannin')}${satRow('palate.alcohol')}${satRow('palate.body')}<div data-mousse${F.style === 'sparkling' ? '' : ' hidden'}>${satRow('palate.mousse')}</div>${satRow('palate.flavour_intensity')}
        <div class="jr-satrow jr-satrow-col"><span class="jr-satl">Flavour characteristics <button type="button" class="linkish jr-same" data-act="same-nose">same as the nose</button></span><div data-palate-aromas>${aromaHTML('palate')}</div></div>${satRow('palate.finish')}</fieldset>
      <fieldset class="jr-satg"><legend>Conclusions</legend>${satRow('conclusions.quality')}${satRow('conclusions.readiness')}</fieldset>
      <p class="src">After the WSET Level 3 Systematic Approach to Tasting Wine. Tap a choice again to clear it.</p></details>`;
  }
  const colourRow = () => satRow('appearance.colour', SAT_OPTS['appearance.colour'].filter(o => colourKeys(F.style).includes(o[0]) || o[0] === satGet('appearance.colour')));
  function appRowHTML() {
    if (F.appellation_id || F.appellation_name) return `<span class="jr-picked-place"><a href="#${esc(F.appellation_id || '')}" class="jr-pp-name" tabindex="-1">${esc(F.appellation_id ? placeName('appellation', F.appellation_id) : F.appellation_name)}</a><small>${esc([F.region_id ? placeName('region', F.region_id) : '', F.country ? VM.data.countryName(F.country) : ''].filter(Boolean).join(' · '))}</small></span><button type="button" class="btn small ghost" data-act="pick-app">Change</button><button type="button" class="icon-btn" data-act="clear-app" aria-label="Remove the appellation">×</button>`;
    return `<button type="button" class="btn small jr-pickbtn" data-act="pick-app">${icon('search')} Choose from the atlas</button>`;
  }
  function siteRowHTML() {
    const s = siteOf(F.site_id);
    if (F.site_id) return `<span class="jr-picked-place"><span class="jr-pp-name">${esc(s ? s.name : F.site_id)}</span><small>${esc(s ? [KINDN[s.kind] || 'Site', s.class].filter(Boolean).join(' · ') : '')}</small></span><button type="button" class="btn small ghost" data-act="pick-site">Change</button><button type="button" class="icon-btn" data-act="clear-site" aria-label="Remove the site">×</button>`;
    return `<button type="button" class="btn small ghost jr-pickbtn" data-act="pick-site">${icon('search')} Choose a cru, vineyard or estate</button>`;
  }
  const KINDN = { grand_cru: 'Grand cru', premier_cru: 'Premier cru', cru: 'Cru', vineyard: 'Vineyard', mga: 'MGA', lieu_dit: 'Lieu-dit', village: 'Village', estate: 'Estate', chateau: 'Château', quinta: 'Quinta', house: 'House', cellar: 'Cellar', historic: 'Historic site', museum: 'Museum', landscape: 'Landscape' };
  function grapesHTML() {
    const sel = F.grapes, sug = arr(F._suggest).filter(g => !sel.includes(g)).slice(0, 12);
    return `<div class="jr-chips">${sel.map(g => `<button type="button" class="jr-chip" aria-pressed="true" data-grape="${esc(g)}">${esc(grapeName(g))}</button>`).join('')}${sug.map(g => `<button type="button" class="jr-chip jr-sug" aria-pressed="false" data-grape="${esc(g)}">${esc(grapeName(g))}</button>`).join('')}<button type="button" class="jr-chip jr-addchip" data-act="pick-grape">${icon('plus')} grape</button></div>
      ${sug.length ? `<p class="jr-hint">Suggested from what ${esc(placeName('appellation', F.appellation_id) || 'the appellation')} allows. Tap to add.</p>` : ''}`;
  }
  function ratingHTML() {
    const r = F.rating;
    return `<div class="jr-rating${r == null ? ' unset' : ''}"><div class="jr-rtop"><span class="jr-flabel" id="jr-rl">Rating</span><output class="jr-score" for="jr-r" aria-live="polite">${r == null ? '<span class="jr-muted">Not rated</span>' : `<b class="vm-num">${fmtScore(r)}</b> <span>${esc(scoreWord(r))}</span>`}</output>${r != null ? '<button type="button" class="linkish" data-act="clear-rating">clear</button>' : ''}</div>
      <input id="jr-r" class="vm-range" type="range" min="50" max="100" step="1" value="${r == null ? 88 : r}" aria-labelledby="jr-rl" aria-valuetext="${r == null ? 'Not rated' : `${fmtScore(r)}, ${scoreWord(r)}`}">
      <div class="jr-scale vm-num" aria-hidden="true"><span>50</span><span>80</span><span>90</span><span>100</span></div></div>`;
  }
  function photoHTML() {
    const has = F._photoURL || F.photo_path;
    return `<div class="jr-photo"><div class="jr-ph-prev">${F._photoURL ? `<img src="${esc(F._photoURL)}" alt="Label photo">` : F.photo_path ? `<img data-photo="${esc(F.photo_path)}" alt="Label photo">` : `<span class="jr-ph-empty">${icon('bottle')}</span>`}</div>
      <div class="jr-ph-act"><label class="btn small ghost jr-file">Take a photo<input type="file" accept="image/*" capture="environment" class="sr" data-photo-in></label><label class="btn small ghost jr-file">Choose a photo<input type="file" accept="image/*" class="sr" data-photo-in></label>${has ? '<button type="button" class="linkish" data-act="photo-remove">remove</button>' : ''}
      <p class="jr-hint">${F._photoBusy ? 'Preparing the photo…' : 'Resized to 1,600 px before it is saved.'}</p></div></div>`;
  }
  function formHTML() {
    const b = F, isNew = !F._edit;
    const cs = Object.entries(VM.data.countries || {}).map(([k, v]) => [k, v.name || VM.data.countryName(k)]).sort((a, c) => a[1].localeCompare(c[1]));
    if (b.country && !cs.some(c => c[0] === b.country)) cs.unshift([b.country, VM.data.countryName(b.country)]);
    return `<form class="jr-form" novalidate data-status="${esc(b.status)}">
      <div class="head"><p class="eyebrow">${isNew ? 'New bottle' : 'Edit bottle'}</p><h2 class="title">${isNew ? 'Add a bottle' : esc(bTitle(b))}</h2></div>
      <div class="seg jr-seg3" role="radiogroup" aria-label="Status">${STATUS.map(s => `<label><input type="radio" name="status" value="${s}" ${b.status === s ? 'checked' : ''}>${STATUS_SHORT[s]}</label>`).join('')}</div>
      <p class="jr-err" data-err hidden role="alert"></p>
      <label class="vm-field"><span>Wine</span><input class="vm-input" name="wine" value="${esc(b.wine || '')}" placeholder="Cuvée or label name" autocomplete="off" autocapitalize="words" enterkeyhint="next"></label>
      <label class="vm-field"><span>Producer</span><input class="vm-input" name="producer" value="${esc(b.producer || '')}" placeholder="Who made it" autocomplete="off" autocapitalize="words" enterkeyhint="next"></label>
      <div class="jr-vrow"><label class="vm-field"><span>Vintage</span><input class="vm-input vm-num" name="vintage" value="${b.vintage || ''}" inputmode="numeric" maxlength="4" placeholder="${YEAR() - 3}" autocomplete="off" ${b._nv ? 'disabled' : ''}></label>
        <label class="jr-check"><input type="checkbox" name="nv" ${b._nv ? 'checked' : ''}><span>Non-vintage</span></label></div>
      <div class="vm-field"><span>Appellation</span><div class="jr-pickrow" data-slot="app">${appRowHTML()}</div></div>
      <label class="vm-field jr-country"><span>Country</span><select class="vm-select" name="country"><option value="">Not set</option>${cs.map(([k, n]) => `<option value="${esc(k)}" ${b.country === k ? 'selected' : ''}>${esc(n)}</option>`).join('')}</select></label>
      <div class="vm-field"><span>Cru, vineyard or estate <i>optional</i></span><div class="jr-pickrow" data-slot="site">${siteRowHTML()}</div></div>
      <div class="vm-field"><span id="jr-stl">Style</span><div class="jr-pills jr-styles" role="radiogroup" aria-labelledby="jr-stl" data-pills="style">${STYLES.map(s => `<button type="button" role="radio" aria-checked="${b.style === s}" data-v="${s}">${swatch(s)}${STYLE_NAME[s]}</button>`).join('')}</div></div>
      <div class="vm-field"><span>Grapes</span><div data-slot="grapes">${grapesHTML()}</div></div>
      <div data-for="tasted">
        <div class="jr-2col"><label class="vm-field"><span>Tasted on</span><input class="vm-input" type="date" name="tasted_on" value="${esc(b.tasted_on || '')}" max="${today()}"></label>
        <label class="vm-field"><span>Where</span><input class="vm-input" name="where_tasted" value="${esc(b.where_tasted || '')}" placeholder="Home, a restaurant, the cellar door" autocomplete="off"></label></div>
        <div class="jr-2col"><label class="vm-field"><span>With whom</span><input class="vm-input" name="with_whom" value="${esc(b.with_whom || '')}" autocomplete="off"></label>
        <label class="vm-field"><span>Occasion</span><input class="vm-input" name="occasion" value="${esc(b.occasion || '')}" autocomplete="off"></label></div>
        <div data-slot="rating">${ratingHTML()}</div>
        <div class="vm-field"><span id="jr-bal">Would buy again</span><div class="seg jr-seg3" role="radiogroup" aria-labelledby="jr-bal">${[['yes', 'Yes'], ['no', 'No'], ['', 'Not sure']].map(([v, l]) => `<label><input type="radio" name="wba" value="${v}" ${(b.would_buy_again === true && v === 'yes') || (b.would_buy_again === false && v === 'no') || (b.would_buy_again == null && v === '') ? 'checked' : ''}>${l}</label>`).join('')}</div></div>
      </div>
      <label class="vm-field"><span>Notes</span><textarea class="vm-textarea" name="notes" rows="4" placeholder="${b.status === 'tasted' ? 'How it tasted, what it went with, what you will remember' : b.status === 'cellar' ? 'Where it came from, when to open it' : 'Why you want it, where to find it'}">${esc(b.notes || '')}</textarea></label>
      <div class="vm-field"><span>Label photo</span><div data-slot="photo">${photoHTML()}</div></div>
      <details class="jr-more"${b.status !== 'tasted' || b.price != null || b.drink_from || b.drink_to || b.classification || b.bottle_ml !== 750 ? ' open' : ''}><summary><span>Purchase and cellaring<small>price, size, quantity, drink window</small></span></summary>
        <div class="jr-2col"><label class="vm-field"><span>Price</span><input class="vm-input vm-num" name="price" inputmode="decimal" value="${b.price ?? ''}" autocomplete="off"></label>
        <label class="vm-field"><span>Currency</span><select class="vm-select" name="currency">${[...new Set([b.currency || 'USD', ...CURRENCIES])].map(c => `<option ${c === (b.currency || 'USD') ? 'selected' : ''}>${c}</option>`).join('')}</select></label></div>
        <div class="jr-2col"><label class="vm-field"><span>Bottle size</span><select class="vm-select" name="bottle_ml">${(SIZES.some(s => s[0] === b.bottle_ml) ? SIZES : [[b.bottle_ml, `${b.bottle_ml} ml`], ...SIZES]).map(([v, l]) => `<option value="${v}" ${v === b.bottle_ml ? 'selected' : ''}>${l}</option>`).join('')}</select></label>
        <label class="vm-field"><span>Quantity</span><input class="vm-input vm-num" name="quantity" type="number" min="0" max="9999" inputmode="numeric" value="${b.quantity ?? 1}"></label></div>
        <div class="jr-2col"><label class="vm-field"><span>Drink from</span><input class="vm-input vm-num" name="drink_from" inputmode="numeric" maxlength="4" value="${b.drink_from || ''}" placeholder="${YEAR()}"></label>
        <label class="vm-field"><span>Drink until</span><input class="vm-input vm-num" name="drink_to" inputmode="numeric" maxlength="4" value="${b.drink_to || ''}" placeholder="${YEAR() + 10}"></label></div>
        <label class="vm-field"><span>Classification</span><input class="vm-input" name="classification" value="${esc(b.classification || '')}" placeholder="e.g. Premier Cru Classé (1855), Riserva" autocomplete="off"></label>
      </details>
      <div data-for="tasted">${satHTML()}</div>
      <div class="jr-savebar"><button type="submit" class="btn solid">${isNew ? 'Save bottle' : 'Save changes'}</button><button type="button" class="btn ghost" data-act="cancel">Cancel</button></div>
    </form>`;
  }
  function slot(name, html) { const el = CUR.el && CUR.el.querySelector(`[data-slot="${name}"]`); if (el) { el.innerHTML = html; fillPhotos(el); } }
  async function setApp(id) {
    const e = ent(id);
    F.appellation_id = id;
    F.appellation_name = placeName('appellation', id);
    F.country = (e && e.country) || VM.data.isoOf(id) || F.country;
    if (e && STYLES.includes(e.style) && (!F.style || F._autoStyle)) { F.style = e.style; F._autoStyle = true; }
    slot('app', appRowHTML()); syncFormBits();
    const [reg, gr] = await Promise.all([regionFor(id).catch(() => null), grapesFor(id).catch(() => [])]);
    if (F.appellation_id !== id) return;
    F.region_id = reg || null;
    F._suggest = gr;
    slot('app', appRowHTML()); slot('grapes', grapesHTML());
  }
  function syncFormBits() {
    const el = CUR.el; if (!el || !F) return;
    const form = el.querySelector('.jr-form'); if (!form) return;
    form.dataset.status = F.status;
    const sel = form.querySelector('select[name="country"]');
    if (sel && F.country) { if (!sel.querySelector(`option[value="${F.country}"]`)) sel.insertAdjacentHTML('beforeend', `<option value="${esc(F.country)}">${esc(VM.data.countryName(F.country))}</option>`); sel.value = F.country; }
    for (const b of form.querySelectorAll('[data-pills="style"] button')) b.setAttribute('aria-checked', String(b.dataset.v === F.style));
    const col = form.querySelector('[data-colours]'); if (col) col.innerHTML = colourRow();
    const mo = form.querySelector('[data-mousse]'); if (mo) mo.hidden = F.style !== 'sparkling';
    const n = form.querySelector('.jr-satn'); if (n) { const c = satCount(F.sat); n.textContent = c ? c + ' noted' : ''; }
  }
  function newForm(b, from) {
    const base = b ? copyB(b) : cleanBottle({ status: V.newStatus || (V.tab === 'cellar' || V.tab === 'wishlist' ? V.tab : 'tasted') });
    F = { ...base, _edit: !!b, _nv: !!b && !b.vintage, _suggest: [], _autoStyle: !b || !b.style, sat: JSON.parse(JSON.stringify(base.sat || {})) };
    if (!b) { F.tasted_on = F.status === 'tasted' ? today() : null; F.wine = ''; }
    F._from = from || null;
    V.newStatus = null;
  }
  async function applyFrom(id) {
    const t = VM.data.typeOf(id);
    if (t === 'appellation') await setApp(id);
    else if (t === 'site') { await sitesReady(); const s = siteOf(id); F.site_id = id; F.country = (s && s.country) || VM.data.isoOf(id); slot('site', siteRowHTML()); if (s && s.app) await setApp(s.app); else syncFormBits(); }
    else if (t === 'region') { F.region_id = id; F.country = VM.data.isoOf(id); slot('app', appRowHTML()); syncFormBits(); }
    else if (t === 'country') { F.country = id; syncFormBits(); }
    else if (t === 'grape') { const g = id.replace(/^grape-/, ''); if (!F.grapes.includes(g)) F.grapes.push(g); slot('grapes', grapesHTML()); }
  }
  async function pick(types, label, placeholder) {
    const r = await VM.search.pick({ types, label, placeholder });
    if (VM.isPhone() && CUR.kind === 'form') VM.panel.snap('full');
    return CUR.kind === 'form' && F ? r : null;
  }
  async function storePhoto(blob) {
    const name = uuid() + '.jpg';
    if (J.mode === 'cloud' && A.client && navigator.onLine !== false) {
      const dest = `${J.uid}/${name}`;
      const r = await sbq(A.client.storage.from('labels').upload(dest, blob, { contentType: 'image/jpeg', cacheControl: '31536000', upsert: false }));
      if (!r.error) { PURL.set(dest, { url: URL.createObjectURL(blob), exp: Date.now() + 3600e3, blob: true }); return dest; }
      if (!isNet(r)) { toast('The photo could not be uploaded: ' + ((r.error && r.error.message) || 'error')); }
    }
    const p = 'local/' + name;
    await IDB.put(p, blob);
    PURL.set(p, { url: URL.createObjectURL(blob), exp: 0, blob: true });
    return p;
  }
  function formErr(msg, focus) {
    const el = CUR.el && CUR.el.querySelector('[data-err]');
    if (el) { el.textContent = msg; el.hidden = !msg; }
    if (msg && focus) { const i = CUR.el.querySelector(`[name="${focus}"]`); if (i) i.focus(); }
  }
  async function submitForm(form) {
    const val = n => { const i = form.querySelector(`[name="${n}"]`); return i ? i.value : ''; };
    const fields = {
      id: F._edit ? F.id : undefined, status: F.status,
      wine: val('wine'), producer: val('producer'),
      vintage: form.querySelector('[name="nv"]').checked ? null : val('vintage'),
      appellation_id: F.appellation_id, appellation_name: F.appellation_name, site_id: F.site_id, region_id: F.region_id,
      country: val('country') || F.country, style: F.style, grapes: F.grapes, classification: val('classification'),
      tasted_on: F.status === 'tasted' ? val('tasted_on') : F.tasted_on, where_tasted: val('where_tasted'), occasion: val('occasion'), with_whom: val('with_whom'),
      price: val('price'), currency: val('currency'), bottle_ml: val('bottle_ml'), quantity: val('quantity'),
      drink_from: val('drink_from'), drink_to: val('drink_to'), rating: F.rating,
      would_buy_again: (form.querySelector('[name="wba"]:checked') || {}).value === 'yes' ? true : (form.querySelector('[name="wba"]:checked') || {}).value === 'no' ? false : null,
      sat: pruneSat(F.sat), notes: val('notes'), photo_path: F.photo_path
    };
    if (!str(fields.wine) && !str(fields.producer) && !fields.appellation_id) return formErr('Give the wine a name, a producer or an appellation.', 'wine');
    const vy = String(fields.vintage || '').trim();
    if (vy && !(+vy >= 1700 && +vy <= YEAR() + 1)) return formErr(`The vintage should be a year between 1700 and ${YEAR() + 1}, or tick non-vintage.`, 'vintage');
    for (const k of ['drink_from', 'drink_to']) { const v = String(fields[k] || '').trim(); if (v && !(+v >= 1700 && +v <= 2200)) return formErr('The drink window takes years, such as 2030.', k); }
    if (fields.drink_from && fields.drink_to && +fields.drink_from > +fields.drink_to) return formErr('The drink window ends before it starts.', 'drink_to');
    if (String(fields.price || '').trim() && !Number.isFinite(Number(String(fields.price).replace(',', '.')))) return formErr('The price should be a number.', 'price');
    formErr('');
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true; btn.textContent = 'Saving…';
    try {
      if (F._photoBlob) fields.photo_path = await storePhoto(F._photoBlob);
      else if (F._photoRemoved) fields.photo_path = null;
      const saved = await saveBottle(fields);
      F = null; CUR.kind = null;
      toast(fields.id ? 'Saved.' : `${bTitle(saved)} is in your ${saved.status === 'cellar' ? 'cellar' : saved.status === 'wishlist' ? 'wishlist' : 'journal'}.`);
      replaceRoute('journal-bottle-' + saved.id);
    } catch (e) {
      btn.disabled = false; btn.textContent = F && F._edit ? 'Save changes' : 'Save bottle';
      formErr('Could not save: ' + (e.message || e));
    }
  }
  function bindForm(el) {
    const form = el.querySelector('.jr-form');
    form.addEventListener('submit', e => { e.preventDefault(); submitForm(form); });
    form.addEventListener('input', e => {
      const t = e.target;
      if (t.id === 'jr-r') { F.rating = +t.value; updateRating(); return; }
      if (t.name === 'country') F.country = t.value || null;
      if (t.name === 'vintage') t.value = t.value.replace(/\D/g, '').slice(0, 4);
      if (t.dataset && t.dataset.ownin != null) return;
    });
    form.addEventListener('change', async e => {
      const t = e.target;
      if (t.name === 'status') { F.status = t.value; if (F.status === 'tasted' && !F.tasted_on) { F.tasted_on = today(); const d = form.querySelector('[name="tasted_on"]'); if (d && !d.value) d.value = F.tasted_on; } if (F.status !== 'tasted') { const m = form.querySelector('.jr-more'); if (m) m.open = true; } syncFormBits(); }
      if (t.name === 'nv') { const v = form.querySelector('[name="vintage"]'); v.disabled = t.checked; if (t.checked) v.value = ''; F._nv = t.checked; }
      if (t.name === 'country') F.country = t.value || null;
      if (t.matches('[data-photo-in]') && t.files && t.files[0]) {
        const file = t.files[0]; t.value = '';
        F._photoBusy = true; slot('photo', photoHTML());
        try {
          const blob = await resizeImage(file);
          if (!F) return;
          if (F._photoURL) URL.revokeObjectURL(F._photoURL);
          F._photoBlob = blob; F._photoURL = URL.createObjectURL(blob); F._photoRemoved = false;
        } catch (er) { toast('That photo could not be read. Try a JPEG or PNG.'); }
        if (F) { F._photoBusy = false; slot('photo', photoHTML()); }
      }
    });
    form.addEventListener('keydown', e => {
      const t = e.target;
      if (t.dataset && t.dataset.ownin && e.key === 'Enter') {
        e.preventDefault();
        const w = t.value.trim().toLowerCase().slice(0, 40);
        if (!w) return;
        const path = t.dataset.ownin, cur = arr(satGet(path));
        if (!cur.includes(w)) satSet(path, [...cur, w]);
        t.value = '';
        const box = form.querySelector(`[data-own="${path}"]`);
        t.insertAdjacentHTML('beforebegin', `<button type="button" class="jr-chip" aria-pressed="true" data-aroma="${esc(path)}" data-v="${esc(w)}">${esc(w)}</button>`);
        const pk = form.querySelector(`[data-picked="${path}"]`); if (pk) pk.textContent = arr(satGet(path)).join(', ');
        syncFormBits();
        if (box) t.focus();
      }
      if (t.matches && t.matches('.jr-pills [role="radio"]') && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
        const all = [...t.parentElement.querySelectorAll('[role="radio"]')];
        const n = all[(all.indexOf(t) + (e.key === 'ArrowRight' ? 1 : -1) + all.length) % all.length];
        n.focus(); e.preventDefault();
      }
    });
    form.addEventListener('click', async e => {
      const pill = e.target.closest('.jr-pills [role="radio"]');
      if (pill) {
        const group = pill.parentElement.dataset.pills, v = pill.dataset.v;
        const on = pill.getAttribute('aria-checked') !== 'true';
        for (const b of pill.parentElement.querySelectorAll('[role="radio"]')) b.setAttribute('aria-checked', String(on && b === pill));
        if (group === 'style') { F.style = on ? v : null; F._autoStyle = false; syncFormBits(); }
        else if (group.startsWith('sat:')) { satSet(group.slice(4), on ? v : null); syncFormBits(); }
        return;
      }
      const ar = e.target.closest('[data-aroma]');
      if (ar) {
        const path = ar.dataset.aroma, v = ar.dataset.v, cur = arr(satGet(path));
        const on = ar.getAttribute('aria-pressed') !== 'true';
        satSet(path, on ? [...cur, v] : cur.filter(x => x !== v));
        ar.setAttribute('aria-pressed', String(on));
        const pk = form.querySelector(`[data-picked="${path}"]`); if (pk) pk.textContent = arr(satGet(path)).join(', ');
        syncFormBits();
        return;
      }
      const gr = e.target.closest('[data-grape]');
      if (gr) { const g = gr.dataset.grape; F.grapes = F.grapes.includes(g) ? F.grapes.filter(x => x !== g) : [...F.grapes, g]; slot('grapes', grapesHTML()); const nb = form.querySelector(`[data-grape="${CSS.escape(g)}"]`); if (nb) nb.focus(); return; }
      const act = e.target.closest('[data-act]');
      if (!act) return;
      const a = act.dataset.act;
      if (a === 'cancel') { F = null; CUR.kind = null; goBack('journal'); }
      else if (a === 'pick-app') { const r = await pick(['appellation'], 'Pick the appellation', 'Search appellations'); if (r) await setApp(r.id); }
      else if (a === 'clear-app') { F.appellation_id = null; F.appellation_name = null; F.region_id = null; F._suggest = []; slot('app', appRowHTML()); slot('grapes', grapesHTML()); }
      else if (a === 'pick-site') {
        const r = await pick(['site'], 'Pick the cru, vineyard or estate', 'Search sites and estates');
        if (r) { await sitesReady(); F.site_id = r.id; const s = siteOf(r.id); slot('site', siteRowHTML()); if (s && s.app && !F.appellation_id) await setApp(s.app); else if (s && !F.country) { F.country = s.country; syncFormBits(); } }
      }
      else if (a === 'clear-site') { F.site_id = null; slot('site', siteRowHTML()); }
      else if (a === 'pick-grape') { const r = await pick(['grape'], 'Pick a grape', 'Search grapes and synonyms'); if (r) { const g = String(r.id).replace(/^grape-/, ''); if (!F.grapes.includes(g)) F.grapes.push(g); slot('grapes', grapesHTML()); } }
      else if (a === 'clear-rating') { F.rating = null; updateRating(); }
      else if (a === 'photo-remove') { if (F._photoURL) URL.revokeObjectURL(F._photoURL); F._photoURL = null; F._photoBlob = null; F._photoRemoved = !!F.photo_path; F.photo_path = null; slot('photo', photoHTML()); }
      else if (a === 'same-nose') {
        for (const t of ['primary', 'secondary', 'tertiary']) satSet('palate.' + t, arr(satGet('nose.' + t)).slice());
        const box = form.querySelector('[data-palate-aromas]'); if (box) box.innerHTML = aromaHTML('palate');
        syncFormBits();
      }
    });
  }
  /* update the rating read-out in place (re-rendering the slider would end a drag) */
  function updateRating() {
    const box = CUR.el && CUR.el.querySelector('.jr-rating');
    if (!box || !F) return;
    const r = F.rating;
    box.classList.toggle('unset', r == null);
    box.querySelector('.jr-score').innerHTML = r == null ? '<span class="jr-muted">Not rated</span>' : `<b class="vm-num">${fmtScore(r)}</b> <span>${esc(scoreWord(r))}</span>`;
    const inp = box.querySelector('#jr-r');
    inp.setAttribute('aria-valuetext', r == null ? 'Not rated' : `${fmtScore(r)}, ${scoreWord(r)}`);
    if (r == null) inp.value = 88;
    let clr = box.querySelector('[data-act="clear-rating"]');
    if (r != null && !clr) box.querySelector('.jr-rtop').insertAdjacentHTML('beforeend', '<button type="button" class="linkish" data-act="clear-rating">clear</button>');
    if (r == null && clr) clr.remove();
  }

  /* ---------- rendering the views ---------- */
  function offHTML() {
    return `<div class="head"><p class="eyebrow">Your cellar book</p><h2 class="title">Cellar journal</h2></div>
      <p class="prose jr-off">The journal of bottles, tasting notes, label photos and places lives on the full Vitis Mundi site, where it can save what you write and follow you between devices. This copy of the atlas is a sealed preview with no storage.</p>
      <div class="btn-row"><a class="btn solid" href="${esc(SITE_URL)}#journal" target="_blank" rel="noopener noreferrer">Open the full site</a></div>`;
  }
  async function renderJournal(el, ctx) {
    CUR.el = el; CUR.arg = (ctx && ctx.arg) || ''; CUR.kind = null;
    if (!GH) { CUR.kind = 'off'; el.innerHTML = offHTML(); return; }
    await Promise.race([ready, VM.util.sleep(2500)]);
    if (CUR.el !== el) return;
    const arg = CUR.arg;
    let m;
    if ((m = arg.match(/^bottle-([0-9a-f-]{36})$/))) return showCard(el, m[1]);
    if ((m = arg.match(/^edit-([0-9a-f-]{36})$/))) return showForm(el, m[1], null);
    if (arg === 'new' || /^new-/.test(arg)) {
      const rest = arg.slice(4);
      if (STATUS.includes(rest)) V.newStatus = rest;
      return showForm(el, null, rest.startsWith('from-') ? rest.slice(5) : null);
    }
    if (arg.startsWith('from-')) return showFrom(el, arg.slice(5));
    const tab = TABS.includes(arg) ? arg : V.tab;
    return showMain(el, tab);
  }
  function showMain(el, tab) {
    V.tab = tab; VM.store.set('jr-tab', tab);
    CUR.kind = 'main';
    el.innerHTML = mainHTML(tab);
    bindMain(el);
    fillPhotos(el);
    if (tab === 'passport') renderPassport(el.querySelector('[data-pass]'));
    if (V.q) applyFilter(el);
  }
  function showCard(el, id) {
    const b = J.bottles.find(x => x.id === id);
    CUR.kind = 'card'; CUR.id = id;
    if (!b) {
      el.innerHTML = `<div class="head"><p class="eyebrow">Cellar journal</p><h2 class="title">Not found</h2></div><p class="vm-empty jr-empty">${J.mode === 'cloud' && J.syncing ? 'Still loading your journal…' : 'This bottle is not in your journal on this device.'}</p><div class="btn-row"><a class="btn" href="#journal">Open the journal</a></div>`;
      return;
    }
    VM.panel.setCrumb('Cellar journal');
    el.innerHTML = cardHTML(b);
    fillPhotos(el);
    bindRoot(el);
  }
  /* the sheet body is shared by every view and profile: one delegated listener, active only while it shows the journal */
  const BOUND = new WeakSet();
  const isMine = el => CUR.el === el && el.dataset.view === 'journal';
  function bindRoot(el) {
    if (BOUND.has(el)) return;
    BOUND.add(el);
    el.addEventListener('click', e => {
      if (!isMine(el)) return;
      if (CUR.kind === 'main') mainClick(e, el);
      else if (CUR.kind === 'card') { const a = e.target.closest('[data-act]'); if (a) cardAction(a, CUR.id); }
    });
    el.addEventListener('submit', e => { if (isMine(el) && CUR.kind === 'main') mainSubmit(e, el); });
  }
  function showForm(el, editId, from) {
    const b = editId ? J.bottles.find(x => x.id === editId) : null;
    if (editId && !b) return showCard(el, editId);
    CUR.kind = 'form';
    newForm(b, from);
    el.innerHTML = formHTML();
    fillPhotos(el);
    bindForm(el);
    if (b && b.appellation_id) grapesFor(b.appellation_id).then(g => { if (F && F.appellation_id === b.appellation_id) { F._suggest = g; slot('grapes', grapesHTML()); } }).catch(() => {});
    if (from) applyFrom(from).catch(e => console.warn('[journal]', e));
    else if (!b && !VM.isPhone()) { const w = el.querySelector('[name="wine"]'); if (w) w.focus({ preventScroll: true }); }
  }
  async function showFrom(el, id) {
    CUR.kind = 'from'; CUR.id = id;
    const type = VM.data.typeOf(id);
    if (type === 'region') await loadRegionApps(VM.data.isoOf(id));
    const pid = type === 'grape' ? id.replace(/^grape-/, '') : id;
    const l = bottlesFor(pid, type);
    el.innerHTML = `<div class="head"><p class="eyebrow">Your bottles ${type === 'grape' ? 'of' : 'from'}</p><h2 class="title">${esc(placeName(type, pid))}</h2></div>
      <p class="crumbs"><a href="#journal">Cellar journal</a><span class="gt">›</span><a href="#${esc(hashOf(type, pid))}">${esc(placeName(type, pid))}</a></p>
      ${l.length ? `<ul class="list jr-list">${l.map(b => rowHTML(b, { mixed: true })).join('')}</ul>` : `<p class="vm-empty jr-empty">No bottles from here yet.</p>`}
      <div class="btn-row"><a class="btn" href="#journal-new-from-${esc(hashOf(type, pid))}">${icon('plus')} Add a bottle from here</a></div>`;
    fillPhotos(el);
  }
  function applyFilter(el) {
    const f = fold(V.q);
    for (const li of el.querySelectorAll('.jr-panel .jr-list > li')) li.hidden = !!f && !li.dataset.f.includes(f);
    for (const g of el.querySelectorAll('.jr-group')) g.hidden = ![...g.querySelectorAll('li')].some(li => !li.hidden);
  }
  function rerender() {
    const el = CUR.el;
    if (!el || !el.isConnected || el.dataset.view !== 'journal') return;
    if (CUR.kind === 'form' || CUR.kind === 'off' || !CUR.kind) return;
    const ae = document.activeElement;
    if (ae && el.contains(ae) && /^(INPUT|TEXTAREA|SELECT)$/.test(ae.tagName)) return;
    const st = el.scrollTop;
    if (CUR.kind === 'main') showMain(el, V.tab);
    else if (CUR.kind === 'card') showCard(el, CUR.id);
    else if (CUR.kind === 'from') showFrom(el, CUR.id);
    el.scrollTop = st;
  }
  function bindMain(el) {
    const tabs = [...el.querySelectorAll('.jr-tabs [role="tab"]')];
    const row = el.querySelector('.jr-tabs');
    if (row) {
      const ovr = () => { row.dataset.ovl = row.scrollLeft > 2 ? '1' : '0'; row.dataset.ovr = row.scrollLeft + row.clientWidth < row.scrollWidth - 2 ? '1' : '0'; };
      row.addEventListener('scroll', ovr, { passive: true });
      const sel = row.querySelector('[aria-selected="true"]');
      requestAnimationFrame(() => { if (sel && sel.offsetLeft + sel.offsetWidth > row.clientWidth) row.scrollLeft = sel.offsetLeft - 24; ovr(); });
    }
    const go = t => { quietHash('journal-' + t); showMain(el, t); const b = el.querySelector(`#jr-tab-${t}`); if (b) b.focus(); };
    for (const b of tabs) {
      b.addEventListener('click', () => go(b.dataset.tab));
      b.addEventListener('keydown', e => {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        e.preventDefault();
        const i = TABS.indexOf(b.dataset.tab);
        go(TABS[(i + (e.key === 'ArrowRight' ? 1 : -1) + TABS.length) % TABS.length]);
      });
    }
    const q = el.querySelector('#jr-q');
    if (q) q.addEventListener('input', () => { V.q = q.value; applyFilter(el); });
    for (const c of el.querySelectorAll('[data-ly]')) c.addEventListener('change', () => setLayer(c.dataset.ly, c.checked));
    const imp = el.querySelector('input[data-act="import"]');
    if (imp) imp.addEventListener('change', () => { const f = imp.files && imp.files[0]; imp.value = ''; if (f) importFile(f); });
    bindRoot(el);
  }
  async function mainSubmit(e, el) {
      const f = e.target.closest('form[data-form]');
      if (!f) return;
      e.preventDefault();
      if (f.dataset.form === 'signin') {
        const email = f.querySelector('[name="email"]').value;
        V.busy = true; V.authErr = null; rerenderAcct(el);
        const r = await signIn(email);
        V.busy = false;
        if (r.ok) { V.sentTo = email.trim(); V.signinOpen = false; } else V.authErr = r.error;
        rerenderAcct(el);
        const c = el.querySelector('[name="code"]'); if (c && !VM.isPhone()) c.focus();
      } else if (f.dataset.form === 'code') {
        const btn = f.querySelector('button'); btn.disabled = true;
        const r = await verifyCode(V.sentTo, f.querySelector('[name="code"]').value);
        btn.disabled = false;
        if (r.ok) { V.sentTo = null; V.authErr = null; toast('Signed in.'); } else { V.authErr = r.error; rerenderAcct(el); }
      }
  }
  async function mainClick(e, el) {
      const a = e.target.closest('[data-act]');
      if (!a || a.tagName === 'INPUT') return;
      const act = a.dataset.act;
      if (act === 'new') { if (a.dataset.status) V.newStatus = a.dataset.status; else V.newStatus = V.tab === 'cellar' || V.tab === 'wishlist' ? V.tab : null; VM.go('journal-new'); }
      else if (act === 'signin') { V.signinOpen = true; V.authErr = null; rerenderAcct(el); const i = el.querySelector('[name="email"]'); if (i) i.focus(); getClient().catch(() => {}); }
      else if (act === 'signin-cancel') { V.signinOpen = false; V.authErr = null; rerenderAcct(el); }
      else if (act === 'signin-again') { V.sentTo = null; V.signinOpen = true; rerenderAcct(el); }
      else if (act === 'signout') { a.disabled = true; await signOut(); toast('Signed out. The journal on this device is back to the one kept in this browser.'); }
      else if (act === 'upload') { a.disabled = true; await uploadLocal(); }
      else if (act === 'offer-later') { V.offerLater = true; rerender(); }
      else if (act === 'export-json') download(`vitis-mundi-journal-${today()}.json`, 'application/json', JSON.stringify(exportData(), null, 1));
      else if (act === 'export-csv') download(`vitis-mundi-bottles-${today()}.csv`, 'text/csv;charset=utf-8', toCSV());
  }
  function rerenderAcct(el) {
    const box = el.querySelector('.jr-acct, .jr-acct-note');
    if (!box) return rerender();
    box.outerHTML = accountHTML();
  }
  async function cardAction(a, id) {
    const b = J.bottles.find(x => x.id === id);
    if (!b) return;
    const act = a.dataset.act;
    if (act === 'show-map') {
      const p = bottlePos(b);
      if (!p) return;
      if (!ML.on.bottles) setLayer('bottles', true);
      VM.flyTo({ lon: p.lp[0], lat: p.lp[1], zoom: p.type === 'site' ? 12 : p.type === 'country' ? 5 : 8.6 });
      if (VM.map && VM.map.pulse) VM.map.pulse(p.lp[0], p.lp[1]);
      if (VM.isPhone()) VM.panel.snap('peek');
    } else if (act === 'opened') {
      let n;
      if (b.quantity > 1) {
        await saveBottle({ ...b, quantity: b.quantity - 1 });
        n = await saveBottle({ ...b, id: undefined, created_at: undefined, status: 'tasted', quantity: 1, tasted_on: today(), rating: null, sat: {} });
      } else n = await saveBottle({ ...b, status: 'tasted', quantity: 1, tasted_on: today() });
      toast('Opened. Add your tasting note.');
      VM.go('journal-edit-' + n.id);
    } else if (act === 'bought') {
      await saveBottle({ ...b, status: 'cellar', quantity: Math.max(1, b.quantity || 1) });
      toast('Moved to the cellar.');
    } else if (act === 'delete') {
      if (a.dataset.armed !== '1') {
        a.dataset.armed = '1'; a.textContent = 'Tap again to delete for good';
        setTimeout(() => { if (a.isConnected) { a.dataset.armed = ''; a.textContent = 'Delete this bottle'; } }, 4000);
        return;
      }
      const st = b.status;
      await deleteBottle(id);
      toast('Deleted.');
      CUR.kind = null;
      replaceRoute('journal-' + st);
    }
  }

  /* ---------- export and import ---------- */
  function exportData() {
    return { app: 'Vitis Mundi cellar journal', version: 1, exported_at: nowIso(), mode: J.mode, bottles: J.bottles.map(copyB), notes: J.notes.map(n => ({ ...n })), lists: J.lists.map(l => ({ ...l })) };
  }
  function download(name, type, text) {
    try {
      const blob = new Blob([text], { type });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob); a.download = name; a.rel = 'noopener';
      document.body.appendChild(a); a.click();
      setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
      toast(`Saved ${name}`);
    } catch (e) { toast('This browser blocked the download.'); }
  }
  function toCSV() {
    const cols = ['id', 'status', 'producer', 'wine', 'vintage', 'appellation', 'appellation_id', 'site_id', 'region_id', 'country', 'style', 'grapes', 'classification', 'tasted_on', 'where_tasted', 'with_whom', 'occasion', 'price', 'currency', 'bottle_ml', 'quantity', 'drink_from', 'drink_to', 'rating', 'would_buy_again', 'notes', 'sat_json', 'photo_path', 'created_at', 'updated_at'];
    const cell = v => {
      if (v == null) return '';
      let s = typeof v === 'string' ? v : String(v);
      if (typeof v === 'string' && /^[=+\-@\t\r]/.test(s)) s = "'" + s;   /* keep spreadsheets from running formulas */
      return /[",\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
    };
    const rows = J.bottles.map(b => cols.map(c => cell(c === 'appellation' ? bApp(b) : c === 'grapes' ? b.grapes.map(grapeName).join('; ') : c === 'sat_json' ? (satCount(b.sat) ? JSON.stringify(b.sat) : '') : c === 'would_buy_again' ? (b.would_buy_again == null ? '' : b.would_buy_again ? 'yes' : 'no') : b[c])).join(','));
    return '﻿' + [cols.join(','), ...rows].join('\r\n') + '\r\n';
  }
  async function importFile(file) {
    if (J.mode === 'off') return;
    let d;
    try { d = JSON.parse(await file.text()); } catch (e) { toast('That file is not JSON from this journal.'); return; }
    const bottles = Array.isArray(d) ? d : arr(d && d.bottles);
    const notes = Array.isArray(d) ? [] : arr(d && d.notes), lists = Array.isArray(d) ? [] : arr(d && d.lists);
    if (!bottles.length && !notes.length && !lists.length) { toast('Nothing to import in that file.'); return; }
    let nb = 0, nu = 0, nn = 0, nl = 0, skip = 0;
    const okPhoto = p => p && ((J.mode === 'cloud' && p.startsWith(J.uid + '/')) || p.startsWith('local/'));
    J.batch++;
    try {
      for (const raw of bottles) {
        const c = cleanBottle(raw);
        if (!okPhoto(c.photo_path)) c.photo_path = null;
        const ex = J.bottles.find(x => x.id === c.id);
        if (ex) { if (String(c.updated_at) > String(ex.updated_at)) { await saveBottle({ ...c, photo_path: c.photo_path || ex.photo_path }, { quiet: true }); nu++; } else skip++; continue; }
        if (J.bottles.some(x => dupKey(x) === dupKey(c))) { skip++; continue; }
        await saveBottle(c, { quiet: true }); nb++;
      }
      for (const raw of notes) {
        const n = cleanNote(raw); if (!n) continue;
        const ex = J.notes.find(x => nKey(x) === nKey(n));
        if (ex && fold(ex.body).includes(fold(n.body))) continue;
        await saveNote(n.target_type, n.target_id, ex ? `${ex.body}\n\n${n.body}` : n.body, { quiet: true }); nn++;
      }
      for (const raw of lists) {
        const l = cleanList(raw); if (!l || inList(l.list, l.target_type, l.target_id)) continue;
        await toggleList(l.list, l.target_type, l.target_id, true, { quiet: true }); nl++;
      }
    } finally { J.batch--; }
    changed('bottles');
    toast(`Imported ${plural(nb, 'bottle')}${nu ? `, updated ${nu}` : ''}${nn ? `, ${plural(nn, 'note')}` : ''}${nl ? `, ${plural(nl, 'list entry', 'list entries')}` : ''}${skip ? `; ${skip} already here` : ''}.`);
  }

  /* ---------- passport ---------- */
  const STOP = new Set(['chateau', 'domaine', 'de', 'du', 'des', 'd', 'la', 'le', 'les', 'l', 'et', 'and']);
  const toks = s => fold(s).split(' ').filter(Boolean);
  const seqIn = (hay, seq) => { if (!seq.length) return false; for (let i = 0; i + seq.length <= hay.length; i++) { let ok = true; for (let j = 0; j < seq.length; j++) if (hay[i + j] !== seq[j]) { ok = false; break; } if (ok) return true; } return false; };
  function nameSeqs(name, kind) {
    const base = String(name).replace(/\([^)]*\)/g, ' ').replace(/\b(Port Lodge|Wine Lodge|Lodge|Caves)\b/gi, ' ').trim();
    const parts = base.split(/\s+and\s+/i);
    const out = [];
    for (const p of parts) {
      const t = toks(p);
      const core = t.filter(x => !STOP.has(x));
      if (!core.length) continue;
      if (kind === 'site' && core.length === 1) { if (t.join(' ').length >= 5) out.push(t); }
      else out.push(kind === 'site' ? core : t.filter((x, i) => !(i === 0 && STOP.has(x))));
      if (kind !== 'site' && /\bd ?alba$/.test(fold(p))) out.push(toks(p.replace(/\s+d['’]Alba$/i, '')));
    }
    return out;
  }
  const TIER_RX = [[/Premier Cru Sup/i, 'Sup.'], [/Premier/i, '1er'], [/Deuxi/i, '2e'], [/Troisi/i, '3e'], [/Quatri/i, '4e'], [/Cinqui/i, '5e']];
  let _classics = null;
  async function classics() {
    if (_classics) return _classics;
    await Promise.race([VM.data.loadIndex(), VM.util.sleep(10000)]);
    await sitesReady();
    const sites = (VM.data.sites && VM.data.sites.length) ? VM.data.sites : [...SITEX.values()];
    const idx = VM.data.index || [], has = id => VM.data.indexById.has(id);
    const SBX = new Set(['fr-sauternes', 'fr-barsac']);
    const tier = c => { const t = TIER_RX.find(r => r[0].test(c || '')); return t ? t[1] : ''; };
    const trank = m => ['Sup.', '1er', '2e', '3e', '4e', '5e'].indexOf(m.tier);
    const siteM = (s, kind = 'site') => ({ id: s.id, name: s.name, link: s.id, kind, app: s.app, tier: tier(s.class), seqs: nameSeqs(s.name, kind === 'site' ? 'site' : 'place') });
    const appM = a => ({ id: a.id, name: a.name, link: a.id, kind: 'app', seqs: [] });
    const L = [];
    const medoc = sites.filter(s => /1855/.test(s.class || '') && !SBX.has(s.app)).map(s => siteM(s)).sort((a, b) => trank(a) - trank(b) || a.name.localeCompare(b.name));
    if (medoc.length) L.push({ id: '1855m', title: 'Bordeaux 1855: the red wines', sub: 'The Médoc growths and Haut-Brion, with Mouton promoted in 1973', members: medoc, apps: new Set(['fr-bordeaux', 'fr-bordeaux-superieur', 'fr-medoc', 'fr-haut-medoc', 'fr-pauillac', 'fr-margaux', 'fr-saint-julien', 'fr-saint-estephe', 'fr-pessac-leognan', 'fr-graves', 'fr-listrac-medoc', 'fr-moulis-en-medoc']) });
    const saut = sites.filter(s => /1855/.test(s.class || '') && SBX.has(s.app)).map(s => siteM(s)).sort((a, b) => trank(a) - trank(b) || a.name.localeCompare(b.name));
    if (saut.length) L.push({ id: '1855s', title: 'Bordeaux 1855: Sauternes and Barsac', sub: "Yquem, the first growths and the second growths of the sweet wines", members: saut, apps: new Set(['fr-sauternes', 'fr-barsac', 'fr-bordeaux', 'fr-bordeaux-superieur']) });
    const bgc = idx.filter(a => a.country === 'fr' && a.subcat === 'Grand Cru' && !a.fine && !/^fr-alsace/.test(a.id) && a.parent !== 'fr-chablis-grand-cru' && !(/^fr-corton-/.test(a.id) && a.id !== 'fr-corton-charlemagne')).map(appM).sort((a, b) => a.name.localeCompare(b.name));
    if (bgc.length) L.push({ id: 'bgc', title: 'Burgundy grand crus', sub: 'The grand cru appellations of the Côte d’Or, and Chablis Grand Cru', members: bgc });
    const cgc = sites.filter(s => /chelle des crus 100/.test(s.class || '')).map(s => siteM(s, 'village')).sort((a, b) => a.name.localeCompare(b.name));
    if (cgc.length) L.push({ id: 'cgc', title: 'Champagne grand cru villages', sub: 'The seventeen villages rated 100 per cent on the old échelle des crus', members: cgc, apps: new Set(['fr-champagne', 'fr-coteaux-champenois', 'fr-rose-des-riceys']), strict: true });
    const communes = new Map();
    for (const s of sites) {
      const m = /^MGA \(Barolo DOCG\), (.+)$/.exec(s.class || '');
      if (!m) continue;
      for (const c of m[1].split(/\s+and\s+/)) { const k = c.trim(); if (!communes.has(k)) communes.set(k, []); communes.get(k).push(s.id); }
    }
    if (communes.size) L.push({ id: 'barolo', title: 'The communes of Barolo', sub: 'The eleven villages whose hills may grow Barolo', members: [...communes].map(([c, ids]) => ({ id: 'barolo:' + slugOf(c), name: c, link: 'it-barolo', kind: 'commune', mga: new Set(ids), seqs: c === 'Barolo' ? [] : nameSeqs(c, 'place') })).sort((a, b) => b.mga.size - a.mga.size), apps: new Set(['it-barolo']), strict: true });
    const rh = ['fr-cote-rotie', 'fr-condrieu', 'fr-chateau-grillet', 'fr-saint-joseph', 'fr-crozes-hermitage', 'fr-hermitage', 'fr-cornas', 'fr-saint-peray', 'fr-chateauneuf-du-pape', 'fr-gigondas', 'fr-vacqueyras', 'fr-vinsobres', 'fr-rasteau', 'fr-cairanne', 'fr-beaumes-de-venise', 'fr-lirac', 'fr-tavel'].filter(has);
    if (rh.length) L.push({ id: 'rhone', title: 'Rhône crus', sub: 'The named crus of the northern and southern Rhône', members: rh.map(id => appM(VM.data.indexById.get(id))) });
    const bj = ['fr-saint-amour', 'fr-julienas', 'fr-chenas', 'fr-moulin-a-vent', 'fr-fleurie', 'fr-chiroubles', 'fr-morgon', 'fr-regnie', 'fr-brouilly', 'fr-cote-de-brouilly'].filter(has);
    if (bj.length) L.push({ id: 'beaujolais', title: 'Beaujolais crus', sub: 'The ten crus, north to south', members: bj.map(id => appM(VM.data.indexById.get(id))) });
    const agc = idx.filter(a => /^fr-alsace-grand-cru-/.test(a.id)).map(a => ({ ...appM(a), name: a.name.replace(/^Alsace grand cru\s+/i, '') })).sort((a, b) => a.name.localeCompare(b.name));
    if (agc.length) L.push({ id: 'alsace', title: 'Alsace grand crus', sub: 'The fifty-one grand cru vineyards', members: agc });
    const tok = sites.filter(s => s.class === 'Tokaj PDO settlement').map(s => siteM(s, 'village')).sort((a, b) => a.name.localeCompare(b.name));
    if (tok.length) L.push({ id: 'tokaj', title: 'Tokaj villages', sub: 'The settlements of the Tokaj wine region in Hungary', members: tok, apps: new Set(['hu-tokaj', 'sk-vinohradnicka-oblast-tokaj']) });
    const port = sites.filter(s => s.kind === 'house' && s.app === 'pt-porto').map(s => siteM(s)).sort((a, b) => a.name.localeCompare(b.name));
    if (port.length) L.push({ id: 'port', title: 'Port houses', sub: 'The lodges of Vila Nova de Gaia', members: port, apps: new Set(['pt-porto', 'pt-douro']) });
    for (const list of L) {
      if (!list.apps) continue;
      const names = new Set([...list.apps].map(id => fold(placeName('appellation', id))));
      for (const m of list.members) if (m.kind !== 'site' && names.has(fold(m.name))) m.seqs = [];
    }
    _classics = L;
    return L;
  }
  const slugOf = s => fold(s).replace(/ /g, '-');
  function bottleInfo(b) {
    const site = siteOf(b.site_id);
    const chain = new Set();
    for (const a of [b.appellation_id, site && site.app]) if (a) { chain.add(a); for (const x of VM.data.ancestry(a)) chain.add(x.id); }
    return { b, site, chain, t: toks([b.producer, b.wine].join(' ')), tx: toks([b.producer, b.wine, b.classification, site && site.name, site && site.class].join(' ')) };
  }
  function hitMember(L, m, inf) {
    if (m.kind === 'app') return inf.chain.has(m.id);
    if (inf.b.site_id === m.id) return true;
    if (m.kind === 'commune' && inf.b.site_id && m.mga.has(inf.b.site_id)) return true;
    const allowed = L.apps ? (inf.chain.size ? [...inf.chain].some(x => L.apps.has(x)) : !L.strict) : true;
    if (!allowed || !m.seqs.length) return false;
    if (m.kind === 'site') {
      if (inf.b.appellation_id && m.app && !inf.chain.has(m.app) && !VM.data.ancestry(m.app).some(a => a.id === inf.b.appellation_id)) return false;
      return m.seqs.some(s => s.every(x => inf.t.includes(x)) && (s.length > 1 || seqIn(inf.t, s)));
    }
    return m.seqs.some(s => seqIn(inf.tx, s));
  }
  async function passportData() {
    const L = await classics();
    const infos = J.bottles.map(bottleInfo);
    return L.map(list => {
      let tasted = 0, other = 0;
      const members = list.members.map(m => {
        let st = '';
        for (const inf of infos) if (hitMember(list, m, inf)) { if (inf.b.status === 'tasted') { st = 'tasted'; break; } st = st || inf.b.status; }
        if (st === 'tasted') tasted++; else if (st) other++;
        return { ...m, st };
      });
      return { ...list, members, tasted, other };
    });
  }
  /* small world map: equirectangular, 84°N to 58°S */
  let _world = null;
  async function worldPaths() {
    if (_world) return _world;
    const fc = await VM.data.json('data/base/countries_low.geojson');
    const out = [];
    for (const f of arr(fc && fc.features)) {
      const iso = String((f.properties || {}).iso2 || '').toLowerCase();
      const g = f.geometry; if (!g) continue;
      const polys = g.type === 'Polygon' ? [g.coordinates] : g.type === 'MultiPolygon' ? g.coordinates : [];
      let d = '';
      for (const poly of polys) for (const ring of poly) {
        let last = null; const pts = [];
        for (const [x, y] of ring) { if (y < -58) continue; if (!last || Math.abs(x - last[0]) + Math.abs(y - last[1]) > 0.6) { pts.push([x, y]); last = [x, y]; } }
        if (pts.length < 3) continue;
        d += 'M' + pts.map(([x, y]) => `${(x + 180).toFixed(1)} ${(84 - y).toFixed(1)}`).join('L') + 'Z';
      }
      if (d) out.push({ iso, d, name: (f.properties || {}).name || iso });
    }
    _world = out;
    return out;
  }
  function chartMonths(list) {
    const dated = list.filter(b => b.tasted_on).map(b => b.tasted_on.slice(0, 7)).sort();
    if (!dated.length) return '';
    const now = new Date();
    const end = `${now.getFullYear()}-${pad2(now.getMonth() + 1)}`;
    let start = dated[0];
    const ym = s => { const [y, m] = s.split('-').map(Number); return y * 12 + m - 1; };
    const span = ym(end) - ym(start);
    const byYear = span > 35;
    if (!byYear && span < 11) { const s = ym(end) - 11; start = `${Math.floor(s / 12)}-${pad2((s % 12) + 1)}`; }
    const bins = [];
    if (byYear) { for (let y = +start.slice(0, 4); y <= now.getFullYear(); y++) bins.push({ k: String(y), lab: String(y), n: 0 }); }
    else for (let i = ym(start); i <= ym(end); i++) { const k = `${Math.floor(i / 12)}-${pad2((i % 12) + 1)}`; bins.push({ k, lab: new Date(Math.floor(i / 12), i % 12, 15).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }), n: 0 }); }
    for (const d of dated) { const k = byYear ? d.slice(0, 4) : d; const bn = bins.find(x => x.k === k); if (bn) bn.n++; }
    const max = Math.max(1, ...bins.map(x => x.n));
    const far = i => i >= 3 && i <= bins.length - 4;
    const tick = i => i === 0 || i === bins.length - 1 || (far(i) && (byYear ? bins.length <= 12 || i % 5 === 0 : bins[i].k.endsWith('-01') && bins.length <= 30));
    return `${VM.h.sec('Tasting timeline')}<p class="note jr-chart-sub">Bottles tasted ${byYear ? 'per year' : 'per month'}; ${plural(dated.length, 'dated tasting')}.</p>
      <div class="jr-bars" role="img" aria-label="${esc(bins.filter(x => x.n).map(x => `${x.lab}: ${x.n}`).join('; '))}">${bins.map((x, i) => `<div class="jr-bar" data-tip="${esc(`${x.lab}: ${plural(x.n, 'bottle')}`)}"><i style="height:${x.n ? Math.max(6, Math.round(x.n / max * 100)) : 0}%"></i>${tick(i) ? `<span>${esc(byYear ? x.lab : x.lab.replace(/ (\d{4})$/, ' ’$1').replace(/’(\d\d)(\d\d)/, '’$2'))}</span>` : ''}</div>`).join('')}</div>`;
  }
  function styleBars(list) {
    const c = {};
    for (const b of list) if (b.style) c[b.style] = (c[b.style] || 0) + 1;
    const rows = Object.entries(c).sort((a, b) => b[1] - a[1]);
    if (!rows.length) return '';
    const max = rows[0][1];
    const avg = s => { const r = list.filter(b => b.style === s && b.rating != null).map(b => b.rating); return r.length ? r.reduce((a, b) => a + b, 0) / r.length : null; };
    return VM.h.sec('Favourite styles') + `<ul class="jr-hbars">${rows.map(([s, n]) => { const a = avg(s); return `<li><span class="jr-hb-l">${swatch(s)}${esc(STYLE_NAME[s])}</span><span class="jr-hb-b"><i style="width:${Math.round(n / max * 100)}%;background:var(--w-${s})"></i></span><span class="jr-hb-n vm-num">${n}${a != null ? `<small>avg ${fmtScore(Math.round(a * 10) / 10)}</small>` : ''}</span></li>`; }).join('')}</ul>`;
  }
  async function suggestions() {
    await Promise.race([VM.data.loadIndex(), VM.util.sleep(8000)]);
    const idx = (VM.data.index || []).filter(a => !a.fine && Array.isArray(a.lp));
    if (!idx.length) return [];
    const mine = new Set(J.bottles.map(b => b.appellation_id).filter(Boolean));
    const favs = new Map();
    for (const l of J.lists) if (l.list === 'favourite' && l.target_type === 'appellation') favs.set(l.target_id, 3);
    for (const b of J.bottles) if (b.appellation_id && !favs.has(b.appellation_id)) favs.set(b.appellation_id, b.rating >= 90 ? 2 : b.status === 'tasted' ? 1 : 0.5);
    const seeds = [...favs].sort((a, b) => b[1] - a[1]).slice(0, 6).map(x => x[0]).filter(id => VM.data.indexById.get(id));
    if (!seeds.length) return [];
    const skip = new Set(mine);
    for (const s of seeds) { for (const a of VM.data.ancestry(s)) skip.add(a.id); for (const c of VM.data.children(s)) skip.add(c.id); }
    const out = [], seen = new Set();
    const push = (id, why, seed) => { if (seen.has(id) || skip.has(id)) return; seen.add(id); out.push({ id, why, seed }); };
    const attrs = await VM.data.attrs().catch(() => null);
    const near = [];
    for (const s of seeds) {
      const a = VM.data.indexById.get(s);
      const kx = Math.cos(a.lp[1] * Math.PI / 180);
      near.push(idx.filter(x => x.id !== s && !skip.has(x.id) && (x.area || 0) <= Math.max(3000, (a.area || 0) * 4))
        .map(x => ({ x, d: Math.hypot((x.lp[0] - a.lp[0]) * kx, x.lp[1] - a.lp[1]) * 111 }))
        .filter(o => o.d < 70 && !VM.data.ancestry(o.x.id).some(p => p.id === s))
        .sort((p, q) => ((q.x.prof || 0) - (p.x.prof || 0)) || (p.d - q.d)).slice(0, 2).map(o => [o.x.id, s]));
    }
    let twins = [];
    if (attrs && attrs.rows) {
      const cols = ['gst', 'gdd', 'hi', 'prec', 'gsp', 'dtr'].filter(c => attrs.cols.includes(c));
      const rows = Object.keys(attrs.rows).filter(k => k !== '_cols').map(k => attrs.get(k)).filter(r => r && !r.fine && cols.every(c => r[c] != null));
      const st = {};
      for (const c of cols) { const v = rows.map(r => r[c]); const m = v.reduce((a, b) => a + b, 0) / v.length; st[c] = [m, Math.sqrt(v.reduce((a, b) => a + (b - m) ** 2, 0) / v.length) || 1]; }
      twins = seeds.map(s => {
        const r = attrs.get(s);
        if (!r || !cols.every(c => r[c] != null)) return [];
        return rows.filter(x => x.id !== s && x.country !== r.country && !skip.has(x.id) && VM.data.indexById.has(x.id) && ((VM.data.indexById.get(x.id) || {}).area || 0) <= Math.max(3000, ((VM.data.indexById.get(s) || {}).area || 0) * 4))
          .map(x => ({ id: x.id, d: Math.sqrt(cols.reduce((a, c) => a + ((x[c] - r[c]) / st[c][1]) ** 2, 0) / cols.length) }))
          .sort((a, b) => a.d - b.d).slice(0, 2).map(o => [o.id, s]);
      });
    }
    for (let i = 0; i < seeds.length && out.length < 6; i++) {
      for (const [id, s] of (twins[i] || [])) push(id, 'twin', s);
      for (const [id, s] of (near[i] || [])) push(id, 'near', s);
    }
    return out.slice(0, 6);
  }
  async function renderPassport(box) {
    if (!box) return;
    const T = J.bottles.filter(b => b.status === 'tasted');
    const ts = tasted();
    await Promise.all([...ts.countries].map(loadRegionApps)).catch(() => {});
    let html = VM.h.ledger([
      { k: 'Countries', v: VM.fmt.num(ts.countries.size) }, { k: 'Regions', v: VM.fmt.num(ts.regions.size) }, { k: 'Appellations', v: VM.fmt.num(ts.appellations.size) },
      { k: 'Grapes', v: VM.fmt.num(ts.grapes.size) }, { k: 'Bottles tasted', v: VM.fmt.num(T.length) }, { k: 'In the cellar', v: VM.fmt.num(J.bottles.filter(b => b.status === 'cellar').reduce((a, b) => a + b.quantity, 0)) }
    ]);
    if (!T.length) html += `<p class="vm-empty jr-empty">The passport fills in as you log tastings: each country, region, appellation and grape you taste gets stamped, and the classic lists below tick off.</p>`;
    html += `<div class="jr-world" data-world><div class="jr-world-ph"></div></div>`;
    const byC = {};
    for (const b of T) if (b.country) byC[b.country] = (byC[b.country] || 0) + 1;
    const cr = Object.entries(byC).sort((a, b) => b[1] - a[1]);
    if (cr.length) {
      const max = cr[0][1];
      html += `<ul class="jr-hbars jr-countries">${cr.map(([c, n]) => `<li><a class="jr-hb-l" href="#${esc(c)}">${esc(VM.data.countryName(c))}</a><span class="jr-hb-b"><i style="width:${Math.round(n / max * 100)}%"></i></span><span class="jr-hb-n vm-num">${n}</span></li>`).join('')}</ul>`;
    }
    const chips = (title, ids, type) => ids.length ? VM.h.sec(`${title} · ${ids.length}`) + `<ul class="chips jr-stamps">${ids.map(id => `<li><a class="chip" href="#${esc(hashOf(type, id))}">${esc(placeName(type, id))}</a></li>`).join('')}</ul>` : '';
    html += chips('Regions', [...ts.regions].sort((a, b) => placeName('region', a).localeCompare(placeName('region', b))), 'region');
    html += chips('Appellations', [...ts.appellations].sort((a, b) => placeName('appellation', a).localeCompare(placeName('appellation', b))), 'appellation');
    html += chips('Grapes', [...ts.grapes].sort((a, b) => grapeName(a).localeCompare(grapeName(b))), 'grape');
    html += chartMonths(T) + styleBars(T);
    html += VM.h.sec('The classic lists') + `<div class="jr-classics" data-classics><p class="jr-muted">Reading the atlas…</p></div>`;
    html += `<div data-next></div>`;
    box.innerHTML = html;
    worldPaths().then(paths => {
      const w = box.querySelector('[data-world]');
      if (!w || !paths.length) { if (w) w.remove(); return; }
      const inJ = new Set(J.bottles.map(b => b.country).filter(Boolean));
      const wine = new Set(Object.keys(VM.data.countries || {}));
      w.innerHTML = `<svg viewBox="0 0 360 142" role="img" aria-label="World map: ${esc(ts.countries.size ? 'tasted in ' + [...ts.countries].map(c => VM.data.countryName(c)).join(', ') : 'no countries tasted yet')}">${paths.map(p => `<path d="${p.d}" class="${ts.countries.has(p.iso) ? 'on' : inJ.has(p.iso) ? 'some' : wine.has(p.iso) ? 'wine' : ''}">${ts.countries.has(p.iso) || inJ.has(p.iso) ? `<title>${esc(VM.data.countryName(p.iso))}</title>` : ''}</path>`).join('')}</svg>
        <p class="jr-legend"><span><i class="on"></i>Tasted</span><span><i class="some"></i>In the cellar or wishlist</span><span><i class="wine"></i>Wine country in the atlas</span></p>`;
    }).catch(() => { const w = box.querySelector('[data-world]'); if (w) w.remove(); });
    passportData().then(lists => {
      const c = box.querySelector('[data-classics]');
      if (!c) return;
      c.innerHTML = lists.map(L => `<details class="jr-classic"><summary><span class="jr-cl-t">${esc(L.title)}<small>${esc(L.sub)}</small></span><span class="jr-cl-n vm-num">${L.tasted}<span>/${L.members.length}</span></span><span class="jr-prog" aria-hidden="true"><i style="width:${(L.tasted / L.members.length * 100).toFixed(1)}%"></i>${L.other ? `<b style="left:${(L.tasted / L.members.length * 100).toFixed(1)}%;width:${(L.other / L.members.length * 100).toFixed(1)}%"></b>` : ''}</span></summary>
        <ul class="jr-members">${L.members.map(m => `<li class="${m.st ? 'st-' + m.st : ''}"><a href="#${esc(m.link)}"><i class="jr-mk" aria-hidden="true"></i>${esc(m.name)}${m.tier ? `<small class="vm-num">${esc(m.tier)}</small>` : ''}${m.st ? `<span class="sr"> (${m.st === 'tasted' ? 'tasted' : m.st === 'cellar' ? 'in your cellar' : 'on your wishlist'})</span>` : ''}</a></li>`).join('')}</ul>
        ${L.other ? `<p class="jr-hint">${plural(L.other, 'more')} waiting in your cellar or wishlist.</p>` : ''}</details>`).join('');
    }).catch(e => { console.warn('[journal] classics', e); });
    suggestions().then(list => {
      const n = box.querySelector('[data-next]');
      if (!n || !list.length) return;
      n.innerHTML = VM.h.sec('Next to explore') + `<p class="note">Appellations you have not met yet: ${list.some(x => x.why === 'twin') ? 'climate twins of your favourites elsewhere in the world, and ' : ''}neighbours of the places you drink.</p>
        <ul class="list">${list.map(x => { const a = VM.data.indexById.get(x.id) || {}; return `<li><a class="row" href="#${esc(x.id)}"><span class="row-name">${esc(a.name || x.id)}<small>${esc(x.why === 'twin' ? `climate twin of ${placeName('appellation', x.seed)}` : `next door to ${placeName('appellation', x.seed)}`)} · ${esc(VM.data.countryName(a.country))}</small></span><span class="row-meta">${esc(a.cat || '')}</span></a></li>`; }).join('')}</ul>`;
    }).catch(() => {});
  }

  /* ---------- profile sections: lists, notes, bottles ---------- */
  const MOUNT = new Set(), PENDING = new Set();
  const STRIP_LABEL = { visited: 'Visited', want_to_visit: 'To visit', want_to_taste: 'To taste', favourite: 'Favourite' };
  const targetOf = e => [e.type, e.type === 'grape' ? (e.gid || String(e.id).replace(/^grape-/, '')) : e.id];
  function renderPlace(m) {
    const [type, id] = targetOf(m.e);
    const note = J.notes.find(n => n.target_type === type && n.target_id === id);
    const editing = m.open || !!note;
    const nid = 'jr-note-' + Math.random().toString(36).slice(2, 8);
    m.el.innerHTML = `<div class="jr-strip" role="group" aria-label="Your lists">${STRIP_LISTS[type].map(l => `<button type="button" class="jr-tg" aria-pressed="${inList(l, type, id)}" data-list="${l}" aria-label="${esc(LIST_NAME[l])}">${esc(STRIP_LABEL[l])}</button>`).join('')}${editing ? '' : `<button type="button" class="jr-tg jr-tg-add" data-act="note">${icon('plus')}Note</button>`}<a class="jr-tg jr-tg-add" href="#journal-new-from-${esc(hashOf(type, id))}">${icon('plus')}Bottle</a></div>
      ${editing ? `<div class="jr-noteed"><label class="jr-nl" for="${nid}">Your note</label><textarea id="${nid}" class="jr-nta" rows="2" placeholder="What you know about ${esc(placeName(type, id))}, who to visit, what you drank">${esc(note ? note.body : '')}</textarea><span class="jr-nst" aria-live="polite"></span></div>` : ''}`;
    m.el.classList.add('jr-sec');
    const strip = m.el.querySelector('.jr-strip');
    const ovr = () => { strip.dataset.ovl = strip.scrollLeft > 2 ? '1' : '0'; strip.dataset.ovr = strip.scrollLeft + strip.clientWidth < strip.scrollWidth - 2 ? '1' : '0'; };
    strip.addEventListener('scroll', ovr, { passive: true });
    requestAnimationFrame(ovr);
    const ta = m.el.querySelector('textarea');
    if (ta) {
      const st = m.el.querySelector('.jr-nst');
      const fit = () => { ta.style.height = 'auto'; ta.style.height = Math.min(320, ta.scrollHeight + 2) + 'px'; };
      requestAnimationFrame(fit);
      const save = debounce(v => {
        saveNote(type, id, v).then(() => { if (st.isConnected) st.textContent = v.trim() ? 'Saved' : 'Removed'; }).catch(e => { if (st.isConnected) st.textContent = 'Not saved: ' + e.message; });
        PENDING.delete(save);
      }, 700);
      ta.addEventListener('input', () => { fit(); st.textContent = 'Saving…'; PENDING.add(save); save(ta.value); });
      ta.addEventListener('blur', () => { save.flush(); if (!ta.value.trim()) { m.open = false; setTimeout(() => { if (m.el.isConnected && document.activeElement !== ta) renderPlace(m); }, 150); } });
      if (m.focus) { m.focus = false; ta.focus(); }
    }
  }
  function placeSection(el, e) {
    if (J.mode === 'off' || !STRIP_LISTS[e.type]) return false;
    const m = { el, e, kind: 'place', open: false };
    MOUNT.add(m);
    el.addEventListener('click', ev => {
      const t = ev.target.closest('[data-list], [data-act="note"]');
      if (!t) return;
      const [type, id] = targetOf(e);
      if (t.dataset.act === 'note') { m.open = true; m.focus = true; renderPlace(m); return; }
      const l = t.dataset.list;
      const on = t.getAttribute('aria-pressed') !== 'true';
      t.setAttribute('aria-pressed', String(on));
      toggleList(l, type, id, on).catch(err => { t.setAttribute('aria-pressed', String(!on)); toast(err.message); });
    });
    renderPlace(m);
  }
  async function renderBottlesSec(m) {
    const [type, id] = targetOf(m.e);
    if (type === 'region') await loadRegionApps(VM.data.isoOf(id));
    if (type === 'appellation' || type === 'site') await sitesReady();
    const l = bottlesFor(id, type);
    if (!l.length) { m.el.innerHTML = ''; m.el.hidden = true; return false; }
    m.el.hidden = false;
    m.el.innerHTML = VM.h.sec(`Your bottles ${type === 'grape' ? 'of this grape' : 'from here'} · ${l.length}`) + `<ul class="list jr-list">${l.slice(0, 5).map(b => rowHTML(b, { mixed: true })).join('')}</ul>` + (l.length > 5 ? `<p class="note jr-more-link"><a href="#journal-from-${esc(hashOf(type, id))}">All ${l.length} in your journal</a></p>` : '');
    fillPhotos(m.el);
    return true;
  }
  function bottlesSection(el, e) {
    if (J.mode === 'off') return false;
    const m = { el, e, kind: 'bottles' };
    MOUNT.add(m);
    return renderBottlesSec(m);
  }
  function refreshSections(what) {
    for (const m of [...MOUNT]) {
      if (!m.el.isConnected) { MOUNT.delete(m); continue; }
      if (m.kind === 'place') {
        const ta = m.el.querySelector('textarea');
        if (ta && document.activeElement === ta) {
          const [type, id] = targetOf(m.e);
          for (const b of m.el.querySelectorAll('[data-list]')) b.setAttribute('aria-pressed', String(inList(b.dataset.list, type, id)));
        } else if (what !== 'sync' || !ta) renderPlace(m);
      } else if (what !== 'notes' && what !== 'lists') renderBottlesSec(m);
    }
  }
  const flushNotes = () => { for (const s of [...PENDING]) s.flush(); };

  /* ---------- keeping the screen in step ---------- */
  let _what = null;
  const refreshUI = debounce(() => {
    const what = _what; _what = null;
    updateMapSoon();
    refreshSections(what);
    rerender();
  }, 50);
  function refreshUIWrap(what) { _what = _what && _what !== what ? 'all' : what; refreshUI(); }

  /* ---------- start ---------- */
  VM.panel.register('journal', {
    title: 'Cellar journal', crumb: 'Cellar journal', snap: 'full', render: renderJournal,
    onClose() { flushNotes(); CUR.el = null; CUR.kind = null; }
  });
  VM.nav.add({ id: 'journal', label: 'Cellar', icon: icon('bottle'), order: 10, title: 'Your cellar journal: bottles, notes and lists' });
  if (GH) {
    VM.panel.addSection(['country', 'region', 'appellation', 'site', 'grape'], placeSection, { id: 'journal-place', slot: 'hero', order: 58 });
    VM.panel.addSection(['country', 'region', 'appellation', 'site', 'grape'], bottlesSection, { id: 'journal-bottles', slot: 'top', order: 58 });
    VM.on('map:ready', () => bindMap());
    VM.on('theme', () => repaintMap());
    VM.on('data:index', () => { updateMapSoon(); refreshSections('bottles'); });
    VM.on('profile:open', flushNotes);
    addEventListener('online', () => { if (J.mode === 'cloud') { flushOutbox(); cloudRefresh(); } });
    addEventListener('pagehide', flushNotes);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') flushNotes();
      else if (J.mode === 'cloud' && (!J.lastSync || Date.now() - Date.parse(J.lastSync) > 5 * 60e3)) cloudRefresh();
    });
    const start = () => bootAuth().catch(e => { console.warn('[journal] auth', e); if (!A.ready) onSession(null, 'NONE'); });
    /* after every module has registered its listeners: the 'auth' event is sticky and replays to late subscribers */
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true }); else setTimeout(start, 0);
  } else {
    readyRes();
    A.ready = true; VM.auth.ready = true; authRes(null);
  }
  if (GH) ready.then(() => { if (J.bottles.some(b => b.site_id)) sitesReady().then(updateMapSoon); });
})();
