# Run More Ads — Main Website

Main agency website: https://runmoreads.online (also www.runmoreads.online).

The booking funnel is a separate project and repository at https://letwork.runmoreads.online.

## Run locally

Requires Node.js. No dependencies or build step.

```sh
npm start
```

Open http://127.0.0.1:4173.

## Deployment

Import this repository into Vercel. Use Other, no build command, output directory `dist`. The settings are also supplied in `vercel.json`.

English is the default. The footer globe link reloads the same page in Azerbaijani using `?lang=az`. Internal links preserve the selected language. Translations are in `dist/assets/run-more-ads/site/translations-az.json`.

## Enquiries and assets

The booking form sends validated enquiries to the existing Base44 CRM; it does not email or reserve a calendar slot. The public endpoint is configured in `dist/assets/run-more-ads/site/crm-config.json`; no secret key is included. Service and budget identifiers remain stable across languages.

Videos are stock footage; case studies are explicitly labeled creative concepts rather than client campaign results. Team portraits are generated illustrative people. `media-sources.json` records the video sources and license links. Logo supplied by the owner.
