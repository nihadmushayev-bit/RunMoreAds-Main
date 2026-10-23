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

## Hero performance-panel experiment

The owner's latest reference is a compact performance window. The hero heading is reduced to reserve a right-hand panel on desktop; below 981px the card follows the headline, copy, and primary CTA. It uses the existing selected hair-transplant figures: approximately 1,730 started conversations, $1,000 ad spend, and derived $0.58 per conversation. Two horizontal bars compare the recorded healthcare conversation totals (1,730 and 430), with their associated approximate spend shown beside each campaign. No monthly series, ROAS, or patient counts have been invented.

The panel floats within a reserved gutter by ±3px, with ±0.2° rotation over eight seconds. Hover and keyboard focus pause it; reduced-motion disables it. The card links to the full hair-transplant result and carries a visible approximate-figures/source note. All text is available in English and Azerbaijani. This is the single continuous motion explicitly requested for this experiment; existing page-entry, menu, and FAQ behavior remains intact.

## Implementation

### Review — 24 October 2026

The owner requested another language and mobile review. The Turkish picker now names the Azerbaijani option “Azerbaycan”. All visible arrow glyphs in footer, contact, back, 404 and legacy fallback links are converted to the same SVG stroke family as the CTA buttons. Text labels remain separate for translation. Footer legal links wrap and use an 11px label size. Mobile summary metrics fit their columns; case-detail metrics stack in aligned rows. The longer Azerbaijani method heading scales to fit narrow screens.

Contextual heading keys now render “GERÇEK RAKAMLAR / ÇALIŞMA YÖNTEMİ” and “REAL RƏQƏMLƏR / BİZİM YANAŞMAMIZ” without a shared-word collision. Localised page descriptions and social titles match the selected language. Obsolete stock-video claims in the beauty article and terms are replaced with current descriptions; article links lead directly to the real results index. Review dates use 24 October 2026 in the owner's Asia/Baku time zone.

Validation covered 24 HTML pages, internal page/asset references, remaining arrow glyphs, and active Azerbaijani/Turkish translation-key coverage: no broken references, visible arrow glyphs, or missing keys remained. Browser checks covered English, Turkish and Azerbaijani at 320px and 1440px, including the footer, navigation, case metrics, blog and terms. The enquiry payload identifiers and CRM destination are unchanged; no submission was created during the review.

The language experiment moves selection to an outlined header control between About and the contact CTA. The current language is shown in the trigger; only the other two appear in the vertical desktop list. Names and order follow the current page language: English offers Azerbaijani / Turkish, Turkish offers Azerbaycan / İngilizce, and Azerbaijani offers İngiliscə / Türkcə. Link language metadata describes the displayed label; hreflang describes its destination. At widths up to 1000px, the control moves above Results in the mobile navigation and reveals unframed options side by side. The menu breakpoint and its inert state use the same 1000px threshold. The old footer switch is removed. Turkish translation covers all 256 existing visible translation keys across the completed routes plus dynamic form/navigation messages. Form payload identifiers are unchanged. Quoted text is translated with punctuation preserved. The language query, keyboard controls, and page-entry reveal are retained across navigation.

The shared results rows now use equal 18–32px horizontal insets for headings, metrics, and arrows. Hover/focus uses a transparent white gradient fading to zero at both edges, replacing the opaque rectangle that interrupted the page lighting. The divider contrast is reduced. Below 701px each row stacks its title, metric, and contextual information, preserving readable text and safe edge spacing in both languages. The same rules apply to the homepage and results index.

`redesign-site.mjs` renders the new homepage, about and results pages, shares the header/footer, retains completed article/legal/form content, and updates the translation dictionary and sitemap. `dist/assets/run-more-ads/site/method.css` provides the visual system. Unused old Framer/media assets are retained as recoverable source history but are not loaded or referenced by the new pages.
