# Run More Ads — Main Website

Main agency site: https://runmoreads.online (also www.runmoreads.online).
The separate booking funnel remains at https://letwork.runmoreads.online.

## Run locally

Requires Node.js. No dependencies or build step.

```sh
npm start
```

Open http://127.0.0.1:4173. Vercel uses Other, no build command, and `dist` as the output directory, as specified in `vercel.json`.

## Design and content

The October 2026 redesign interprets the owner's photograph of “The Method”: black background, oversized type, thin rules, static numbers, and no photography or video. There is no team gallery, loading screen, marquee, count-up, or scroll animation. A later polish adds short page crossfades, a 260ms entry fade from black, an interruptible FAQ reveal, and an animated mobile menu. These transitions respect reduced-motion preferences. Logo text stays on one line, and button arrows are SVG paths.

`redesign-site.mjs` generates the homepage, about, and results pages, and updates completed enquiry, article, and legal pages to use the shared shell. Run `node redesign-site.mjs` after editing its content. Base styling is in `dist/assets/run-more-ads/site/method.css`; `polish.css` adds short interactions, 6px button corners, and circular white lighting on one continuous full-width page background.

`REDESIGN.md` documents the reference research, selected campaign figures, and their limitations. Results are reconstructed from the founder's personal campaign records, approximate, and attributed accordingly. Started messaging conversations are not represented as patients or sales. The agency quote is expressly its own working standard, not a customer testimonial. No customer quotes or identities are invented.

Unused original media/Framer assets remain for recovery but are not loaded or referenced by the redesigned public pages. The only visible image is the owner's logo.

## Languages

English is the default on all domains. The footer globe link reloads the same page in Azerbaijani with `?lang=az`; the English link removes that parameter. Internal page links preserve the selected language. The dictionary is in `dist/assets/run-more-ads/site/translations-az.json`.

## Enquiries

The booking form preserves its Base44 CRM endpoint and payload. It sends validated enquiries directly to the CRM, does not email them, and does not reserve a calendar slot. The public endpoint is in `dist/assets/run-more-ads/site/crm-config.json`; no secret key is included. Service and budget identifiers remain stable across languages. A separate calendar link opens the existing funnel.
