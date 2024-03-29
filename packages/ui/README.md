# Carrot UI

Carrot UI is an open source React component library that implements Carrot KPI's
design system.

It includes a collection of prebuilt components that are ready for use in
production right out of the box.

The library is generally made to be used on Carrot frontend and templates, but
it is free (as in freedom) to use for anyone.

**NB: THE LIBRARY CURRRENTLY ONLY SUPPORTS ESM, WITH THE ONLY EXCEPTION BEING
THE TAILWIND PRESET, EXPORTED IN BOTH ES AND CJS FORMAT**

## Tech used

The library is developed in React with Typescript, the styling done through
TailwindCSS and the bundling done using Rollup. We have a workflow that tries to
keep under control both the overall formatting of the code to keep it consistent
and the size of the final bundle (even though it is meant to be used with
bundlers that will tree-shake the final result).

## Getting started

As a prerequisite, make sure `react` is currently installed in your project.

For the default (incomplete) installation simply use the following command:

```
// or
yarn add @carrot-kpi/ui
// or
npm install @carrot-kpi/ui
// or
pnpm install @carrot-kpi/ui
```

To make the installation complete you can just install the missing fonts used in
the library through Fontsource:

```
pnpm install @fontsource/ibm-plex-mono
pnpm install @carrot-kpi/switzer-font

// or
yarn add @fontsource/ibm-plex-mono
yarn add @carrot-kpi/switzer-font

// or
npm install @fontsource/ibm-plex-mono
npm install @carrot-kpi/switzer-font

// or
pnpm install @fontsource/ibm-plex-mono
pnpm install @carrot-kpi/switzer-font
```

The library is ready to use after adding the following to your entrypoint:

```
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-mono/700.css";
import "@carrot-kpi/switzer-font/400.css";
import "@carrot-kpi/switzer-font/500.css";
import "@carrot-kpi/switzer-font/700.css";
import "@carrot-kpi/ui/styles.css";
```

## Documentation

The library components are documented using Storybook, but the final result is
still not officially published anywhere as of now.

## TailwindCSS

The library is styled using TailwindCSS. If you want to extend/change the
default styles, this is possible through Tailwind's presets. The library exports
its preset, and you can integrate it in your Tailwind config in the following
way:

```
// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
    ...
    presets: [require("@carrot-kpi/ui/tailwind-preset")],
    ...
};
```
