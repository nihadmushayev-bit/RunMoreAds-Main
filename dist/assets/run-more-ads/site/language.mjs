// Query-based language selection: English remains the default.
const requested = new URL(location.href).searchParams.get('lang');
const language = ['tr', 'az'].includes(requested) ? requested : 'en';
document.documentElement.lang = language;
const dictionary = language === 'en' ? {} : await fetch('/assets/run-more-ads/site/translations-' + language + '.json')
  .then(response => { if (!response.ok) throw new Error('Translation unavailable'); return response.json(); })
  .catch(() => ({}));
const normalize = value => value.replace(/\s+/g, ' ').trim();
function translate(value) {
  const key = normalize(value);
  let replacement = dictionary[key];
  if (replacement === undefined && key.startsWith('“') && key.endsWith('”') && Object.hasOwn(dictionary, key.slice(1, -1))) {
    replacement = '“' + dictionary[key.slice(1, -1)] + '”';
  }
  return replacement === undefined ? value : value.replace(/\S[\s\S]*\S|\S/, replacement);
}
function updatePage() {
  for (const link of document.querySelectorAll('a[href]:not([data-language])')) {
    if (link.hasAttribute('download')) continue;
    const raw = link.getAttribute('href');
    if (!raw || raw.startsWith('#')) continue;
    const url = new URL(raw, location.href);
    if (url.origin !== location.origin || !/^https?:$/.test(url.protocol)) continue;
    if (language === 'en') url.searchParams.delete('lang');
    else url.searchParams.set('lang', language);
    if (link.href !== url.href) link.href = url.href;
  }
  if (language === 'en') return;
  document.title = translate(document.title);
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      return node.parentElement?.closest('script,style,textarea,code,pre,svg,[data-no-translate],[contenteditable]')
        ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
    }
  });
  let node;
  while ((node = walker.nextNode())) {
    const translated = translate(node.nodeValue);
    if (translated !== node.nodeValue) node.nodeValue = translated;
  }
  for (const element of document.querySelectorAll('[placeholder],[aria-label],[title]')) {
    if (element.closest('[data-no-translate]')) continue;
    for (const attribute of ['placeholder', 'aria-label', 'title']) {
      if (!element.hasAttribute(attribute)) continue;
      const original = element.getAttribute(attribute);
      const replacement = translate(original);
      if (replacement !== original) element.setAttribute(attribute, replacement);
    }
  }
}
if (document.readyState === 'loading') await new Promise(resolve => document.addEventListener('DOMContentLoaded', resolve, {once:true}));
const picker = document.querySelector('.language-picker');
const toggle = picker?.querySelector('.language-toggle');
const options = picker?.querySelector('.language-options');
const labels = {
  en: {en:'English', tr:'Turkish', az:'Azerbaijani'},
  tr: {en:'İngilizce', tr:'Türkçe', az:'Azerbaycan Türkçesi'},
  az: {en:'İngiliscə', tr:'Türkcə', az:'Azərbaycanca'}
}[language];
const alternatives = {en:['az','tr'], tr:['az','en'], az:['en','tr']}[language];
function setLanguageMenu(open, focusToggle = false) {
  if (!picker || !toggle || !options) return;
  picker.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
  options.inert = !open;
  if (focusToggle) toggle.focus();
}
if (picker) {
  picker.querySelector('.language-current').textContent = labels[language];
  toggle.setAttribute('aria-label', language === 'en' ? 'Choose language' : 'Dil seçin');
  options.replaceChildren();
  for (const code of alternatives) {
    const link = document.createElement('a');
    link.dataset.language = code;
    link.lang = language;
    link.hreflang = code;
    const url = new URL(location.href);
    url.hash = '';
    if (code === 'en') url.searchParams.delete('lang');
    else url.searchParams.set('lang', code);
    link.href = url.href;
    link.textContent = labels[code];
    options.append(link);
  }
  toggle.addEventListener('click', () => setLanguageMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('pointerdown', event => {
    if (!picker.contains(event.target)) setLanguageMenu(false);
  });
  picker.addEventListener('focusout', event => {
    if (!picker.contains(event.relatedTarget)) setLanguageMenu(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && picker.classList.contains('open')) {
      event.preventDefault();
      event.stopPropagation();
      setLanguageMenu(false, true);
    }
  }, true);
  picker.addEventListener('keydown', event => {
    const links = [...options.querySelectorAll('a')];
    const index = links.indexOf(document.activeElement);
    if (document.activeElement === toggle && ['ArrowDown','ArrowUp'].includes(event.key)) {
      event.preventDefault();
      setLanguageMenu(true);
      links[event.key === 'ArrowDown' ? 0 : links.length - 1].focus();
    } else if (index >= 0 && ['ArrowDown','ArrowRight','ArrowUp','ArrowLeft','Home','End'].includes(event.key)) {
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? links.length - 1
        : (index + (['ArrowDown','ArrowRight'].includes(event.key) ? 1 : -1) + links.length) % links.length;
      links[next].focus();
    }
  });
  window.addEventListener('rma:navigation-closed', () => setLanguageMenu(false));
  matchMedia('(max-width:1000px)').addEventListener('change', () => setLanguageMenu(false));
}
updatePage();
window.dispatchEvent(new Event('rma:page-ready'));
let queued = false;
new MutationObserver(() => {
  if (queued) return;
  queued = true;
  requestAnimationFrame(() => {queued = false; updatePage();});
}).observe(document.body, {childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['aria-label','placeholder','title']});
window.addEventListener('click', event => {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const link = event.target.closest?.('a[href]');
  if (!link || link.target === '_blank' || link.hasAttribute('download')) return;
  const url = new URL(link.href, location.href);
  if (url.origin !== location.origin) return;
  if (link.hasAttribute('data-language') || (language !== 'en' && url.pathname !== location.pathname)) {
    event.preventDefault();
    event.stopImmediatePropagation();
    location.assign(url.href);
  }
}, true);
