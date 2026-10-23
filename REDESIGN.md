# Run More Ads — typographic redesign

23 October 2026. The owner's photograph of the laptop screen is the visual reference. Searches for “The Method”, “Force Distribution”, and “Dark Luxury”, including template, agency, and design searches, did not establish an exact match. The similarly named themethod.webflow.io and themethod.it were different sites. This design is an interpretation of the supplied photograph, not a claim that its original template was found.

## Direction and constraints

- Black canvas continuous with the supplied black logo.
- Large regular-weight grotesque type, tight tracking, compact corner information, thin rules, and generous negative space.
- No photographs, videos, team gallery, loading screen, marquee, count-up, scroll effects, or entrance animation on public pages.
- Only small button press feedback and FAQ indicator transitions; reduced-motion preference disables both.
- Existing static HTML/JavaScript stack, routes, CRM form contract, English default, Azerbaijani switch, social links, and legal copy retained.
- Articles, enquiries, and legal pages receive the same shared visual shell.

## Results provenance

The user explicitly authorised reuse of the results supplied in “PDF portfolyosunu incele”. Those figures were reconstructed from the owner's personal notes, not original platform screenshots; exact campaign dates and client names were not available.

| Selected work | Approximate result | Approximate associated figure |
| --- | --- | --- |
| Hair transplant | 1,730 started messaging conversations | $1,000 Meta ad spend |
| Dental clinic | 430 started messaging conversations | $1,030 Meta ad spend |
| Clothing ecommerce | $11,900 sales | 1,100 orders |

Cost per started conversation is derived from the rounded figures: $1,000 / 1,730 ≈ $0.58; $1,030 / 430 ≈ $2.40. Messaging conversations are not presented as patients, booked consultations, or completed sales. No ecommerce ad spend or ROAS was supplied, so neither is invented. Results are attributed to the founder's selected campaign experience, approximately 2025–2026, rather than to named agency clients.

The owner's previously confirmed agency figures remain $70K+, 50+ brands, founded in Azerbaijan in 2024.

## Quotes

No customer testimonials, names, or identities were supplied. The quote on the site is expressly labelled “Our commitment / Our working standard”, written in the agency's voice. It is not attributed to a customer and makes no invented performance claim.

## Follow-up interaction polish

The owner's follow-up requests small, fast animations, overriding the earlier static-only direction. Added 110–210 ms page, menu, and FAQ transitions with reduced-motion support. The FAQ can reverse mid-animation; Escape closes the mobile menu and returns focus. Hidden mobile navigation is inert. The logo name is one line on every screen, arrows use SVG paths, and FAQ plus/minus controls use CSS strokes with a consistent right inset. The hero retains “You run the business. We run the ads.” and the customer-buying-decision message.

## Follow-up lighting and button shapes

The latest owner feedback replaces the earlier pill actions with restrained 6px corners across navigation, hero, closing, and form buttons. Five stronger circular white light pools are painted on the full-width body canvas, independently of the 1600px content container and section boundaries. Their positions alternate across the page; a minimum 4200px background height keeps them spaced on shorter pages. Gradients fade completely into black without section clipping, filters, images, or continuous animation. Mobile uses a 420px light radius.

Every page runs `entry.js` in the head before its first paint. A black screen overlay fades to transparent in 260ms only after `language.mjs` has applied the selected language. Both language-toggle directions reload through the same entry sequence, as does a direct page load. Native view transitions are disabled to avoid snapshot timing bypassing the black reveal. Back/forward cache restores replay it; a 3-second fallback reveals content if a script or translation request fails. With JavaScript disabled, no overlay is installed. Reduced-motion preferences disable the reveal.

## Implementation

`redesign-site.mjs` renders the new homepage, about and results pages, shares the header/footer, retains completed article/legal/form content, and updates the translation dictionary and sitemap. `dist/assets/run-more-ads/site/method.css` provides the visual system. Unused old Framer/media assets are retained as recoverable source history but are not loaded or referenced by the new pages.
