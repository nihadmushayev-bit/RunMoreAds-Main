// URL-based language selection keeps English as the default on every domain.
const language = new URL(location.href).searchParams.get('lang') === 'az' ? 'az' : 'en';
document.documentElement.lang = language;
const dictionary = language === 'az'
  ? await fetch('/assets/run-more-ads/site/translations-az.json').then(response => {
    if (!response.ok) throw new Error('Translation file could not be loaded');
    return response.json();
  }) : {};
const normalize = value => value.replace(/\s+/g, ' ').trim();
const translate = value => Object.hasOwn(dictionary, normalize(value)) ? dictionary[normalize(value)] : value;
const globe = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c5 5 5 13 0 18M12 3c-5 5-5 13 0 18"/></svg>';
const target = new URL(location.href);
target.hash = '';
if (language === 'en') target.searchParams.set('lang', 'az');
else target.searchParams.delete('lang');

function updatePage() {
  for (const footer of document.querySelectorAll('footer')) {
    if (footer.querySelector('.rma-language-row')) continue;
    const row = document.createElement('div');
    row.className = 'rma-language-row';
    const link = document.createElement('a');
    link.className = 'rma-language-switch';
    link.href = target.href;
    link.hreflang = language === 'en' ? 'az' : 'en';
    link.lang = link.hreflang;
    link.innerHTML = globe + '<span>' + (language === 'en' ? 'Azərbaycan dili' : 'English') + '</span>';
    row.append(link);
    footer.append(row);
  }
  for (const link of document.querySelectorAll('a[href]')) {
    if (link.classList.contains('rma-language-switch') || link.hasAttribute('download')) continue;
    const raw = link.getAttribute('href');
    if (!raw || raw.startsWith('#')) continue;
    const url = new URL(raw, location.href);
    if (url.origin !== location.origin || !/^https?:$/.test(url.protocol)) continue;
    if (language === 'az') url.searchParams.set('lang', 'az');
    else url.searchParams.delete('lang');
    if (link.href !== url.href) link.href = url.href;
  }
  if (language !== 'az') return;
  document.title = translate(document.title);
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      return node.parentElement?.closest('script,style,textarea,code,pre,svg,.rma-language-switch,[contenteditable]')
        ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
    }
  });
  let node;
  while ((node = walker.nextNode())) {
    const original = node.nodeValue;
    const key = normalize(original);
    if (!Object.hasOwn(dictionary, key)) continue;
    const replacement = original.replace(/\S[\s\S]*\S|\S/, dictionary[key]);
    if (replacement !== original) node.nodeValue = replacement;
  }
  for (const element of document.querySelectorAll('[placeholder],[aria-label],[title]')) {
    if (element.closest('.rma-language-switch')) continue;
    for (const attribute of ['placeholder', 'aria-label', 'title']) {
      if (!element.hasAttribute(attribute)) continue;
      const original = element.getAttribute(attribute);
      const replacement = translate(original);
      if (replacement !== original) element.setAttribute(attribute, replacement);
    }
  }
}

if (document.readyState === 'loading') await new Promise(resolve => document.addEventListener('DOMContentLoaded', resolve, { once: true }));
updatePage();
let queued = false;
new MutationObserver(() => {
  if (queued) return;
  queued = true;
  requestAnimationFrame(() => { queued = false; updatePage(); });
}).observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['aria-label','placeholder','title'] });

// Preserve the selected language when navigating between retained and standalone pages.
window.addEventListener('click', event => {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const link = event.target.closest?.('a[href]');
  if (!link || link.target === '_blank' || link.hasAttribute('download')) return;
  const url = new URL(link.href, location.href);
  if (url.origin !== location.origin) return;
  if (link.classList.contains('rma-language-switch') || (language === 'az' && url.pathname !== location.pathname)) {
    event.preventDefault();
    event.stopImmediatePropagation();
    location.assign(url.href);
  }
}, true);
