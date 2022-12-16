# Carrot UI

Carrot UI is an open source React component library that implements Carrot KPI's design system.

It includes a (eventually) comprehensive collection of prebuilt components that are ready for use in production right out of the box.

The library is generally made to be used on Carrot'd frontend and templates, but is free (as in freedom) to use for anyone.

**NB: THE LIBRARY CURRRENTLY ONLY SUPPORTS ESM**

## Tech used

The library is developed with pure Typescript, with the styling done through TailwindCSS and the bundling done through Rollup. We have a workflow that tries to keep under control both the overall formatting of the code to keep it consistent and the size of the final bundle (which is currently minimized).

## Getting started

As a prerequisite, make sure `react` is currently installed in your project.

For the default (incomplete) installation simply use the following command:

```
pnpm install @carrot-kpi/ui
```

To make the installation complete you can just install the missing fonts used in the library through Fontsource:

```
pnpm install @fontsource/ibm-plex-mono
```

In order to use the library in your app, simply wrap it with the exported `CarrotUIProvider`, and add the following in your entrypoint:

```
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@carrot-kpi/ui/styles.css";
```
