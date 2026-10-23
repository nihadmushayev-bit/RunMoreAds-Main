const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const mobile = matchMedia('(max-width: 700px)');
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');

function setMenu(open, restoreFocus = false) {
  if (!toggle || !nav) return;
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  nav.classList.toggle('open', open);
  nav.inert = mobile.matches && !open;
  if (restoreFocus) toggle.focus();
}
toggle?.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') setMenu(false, true);
});
document.addEventListener('pointerdown', event => {
  if (mobile.matches && nav?.classList.contains('open') && !event.target.closest('.site-header')) setMenu(false);
});
nav?.addEventListener('click', event => { if (event.target.closest('a')) setMenu(false); });
mobile.addEventListener('change', () => setMenu(false));
setMenu(false);
for (const link of nav?.querySelectorAll('a') ?? []) {
  if (!link.hash && link.pathname.replace(/\/$/, '') === location.pathname.replace(/\/$/, '')) link.setAttribute('aria-current','page');
}

// Keep native details/summary semantics. Only the local answer's size changes.
for (const details of document.querySelectorAll('.faq details')) {
  const summary = details.querySelector('summary');
  if (!summary) continue;
  const answer = document.createElement('div');
  answer.className = 'faq-answer';
  while (summary.nextSibling) answer.append(summary.nextSibling);
  details.append(answer);
  let expanded = details.open;
  let animation;
  let feedback;
  summary.setAttribute('aria-expanded', String(expanded));

  summary.addEventListener('click', event => {
    event.preventDefault();
    const from = details.getBoundingClientRect().height;
    expanded = !expanded;
    animation?.cancel();
    feedback?.cancel();
    summary.setAttribute('aria-expanded', String(expanded));
    if (reducedMotion.matches || !details.animate) {
      details.open = expanded;
      details.style.removeProperty('overflow');
      return;
    }
    details.open = true;
    const border = parseFloat(getComputedStyle(details).borderTopWidth) + parseFloat(getComputedStyle(details).borderBottomWidth);
    const collapsed = summary.getBoundingClientRect().height + border;
    const to = collapsed + (expanded ? answer.getBoundingClientRect().height : 0);
    details.style.overflow = 'hidden';
    const current = details.animate({height:[`${from}px`,`${to}px`]}, {duration:210,easing:'cubic-bezier(.2,.7,.3,1)'});
    animation = current;
    feedback = answer.animate(expanded ? {opacity:[0,1],transform:['translateY(-3px)','none']} : {opacity:[1,0]}, {duration:expanded ? 190 : 140,easing:'ease-out',fill:'both'});
    current.onfinish = () => {
      if (animation !== current) return;
      details.open = expanded;
      details.style.removeProperty('overflow');
      feedback?.cancel();
      animation = null;
    };
  });
}
