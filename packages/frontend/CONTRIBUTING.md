# Contributing

This document contains detailed information on how to get started contributing
on the Carrot KPI host frontend, which is developed with React using Typescript,
with `yarn` as the package manager of choice.

## General info

This app acts as an host to the various Carrot templates through Webpack 5
Module Federation, a solution built to make it possible to pull in remote
components at runtime from third parties.

The app is built using Create React App with Typescript and `craco` (used to add
module federation capabilities and other goodies to the end build), with some
Rollup sprinkled on top to make it possible to build the app as a library (read
below to know more).

## Getting started

The first step to get started is installing the package's dependencies using
`yarn` (our package manager of choice). You should run the following command
from the root of the package:

```
yarn install
```

### Setting up envs

An `INFURA_PROJECT_ID` env is required in order to start up the host frontend
locally or build it for a release. The env is an infura project ID to be used
for RPC access for various blockchains. You can get one
[here](https://www.infura.io/).

The following optional envs can also be specified:

- `WALLETCONNECT_PROJECT_ID`: a WalletConnect v2 project ID is required in order
  to enable WalletConnect based wallet connections. You can get one by
  registering [here](https://cloud.walletconnect.com).
- `FATHOM_SITE_ID`: id of an existing Fathom site, used to initialize the
  anonymous tracking (this env must be defined but can be left empty if you're
  not building a production bundle). You can get one by registering
  [here](https://app.usefathom.com).
- `FATHOM_API_KEY`: secret API key for the Fathom APIs. You can get one by
  registering [here](https://app.usefathom.com).

If the `FATHOM_*` environment variables are not defined, the script will still
work; however, it will skip the events synchronization process. Instead, it will
only generate the output files.

After you have these envs, you should create a `.env` file in the root of the
package (or copy the `.env.example` available at the root of the package) and
paste the values there.

## Running modes

The frontend supports 3 different running modes: **dev**, **staging** and
**production**.

In production mode the frontend will fetch templates data directly from the
blockchain (or the subgraph if not in decentralization mode) and in the case of
templates from decentralized storage option, directly using the CIDs specified
on-chain in the manager contracts. This should in general result in a stabler
experience, as only stable templates should be allowed to reach the on-chain
state.

Optionally, templates can also specify a `previewUrl` key in their `base.json`
specification file, that expects `development` and `staging` as sub-keys. When
the frontend is running in staging or dev mode the template's federated modules
(both **page** and **creation form**) will be loaded from that URL instead of
the on-chain specified decentralized storage CIDs.

This helps while testing out new features as it means that each template
developer can potentially set up a CI flow to build the template's frontend at
each commit and serve it through a static server (using services such as
[**Vercel**](https://vercel.com/carrot-kpi) or
[**Netlify**](https://www.netlify.com/) for example). It's then possible to add
the hosting URL in the `base.json` file under the `previewUrl` key, and any host
frontend instance running in staging or dev mode will try to load the template's
frontend from there instead of the IPFS CID specified on-chain (which, again,
contains the latest **stable** and **Carrot Labs checked** version of the
template at hand).

It's clear then that staging and dev modes can be used to test out bleeding-edge
features of Carrot that have reached a certain maturity stage but that are **not
yet ready for production**.

> **Warning**: we recognize the risk that template developers could potentially
> push malicious code in staging or dev mode template builds, and as such the
> mode itself is limited to only interact with testnets. Additionally, a warning
> will be visible while the frontend is running in staging mode encouraging the
> user to excercise maximum caution.

Dev mode is simply a flag that is set to true in the shared state. Its role is
either to be read by templates or other libraries to tell them they can use dev
mode specific functionality (such as local machine hosted infrastructure that is
spun up by Carrot Scripts).

## Start a local dev build

Two different commands are available to start a local dev build:

- `start`: this will start a local Webpack dev server serving the app built to
  run in standard mode, which means the template federated modules will be
  loaded from decentralized storage options using the on-chain specified cids.
- `start:staging`: this will start a local Webpack dev server serving the app
  built to run in staging mode, which means the template federated modules will
  be loaded from the specified `stagingURL` derived from the template's on-chain
  `base.json`. Read more about staging mode in the section above.

## Building modes

The frontend supports 3 different build modes: **library**, **staging** and
**production**.

In production mode the frontend will be built to an optimized app ready to be
released in production, and all the available features will be enabled.

Staging or dev mode will pretty much result in the same build, but with
`previewUrl` template loading enabled (see the "running modes" section above for
more details).

Some features of the app are cut off depending on the chosen mode thanks to a
`__BUILDING_MODE__` global set to whatever the `BUILDING_MODE` env is at build
time (but validated so that only values that make sense can be set).

The library mode on the other hand builds the frontend to a library that can
then be used to test out templates locally. The utility is for template
developers to be able to run the full Carrot host frontend in template
playgrounds, to test out template frontends locally through the help of Carrot
Scripts. This gives them an exact view of how their template would look and
behave in production on their local machine, without having to publish anything.
Needless to say, this improves developer experience.

The production and staging builds are handled by Webpack through Create React
App, while library builds are handled by Rollup.

Various pieces of the app would not be functional in library mode, so we use the
`__BUILDING_MODE__` global in order to remove those pieces from the end bundle
at build time. When building in library mode through Rollup, the
`__BUILDING_MODE__` is set to `library` by default, while when building in
production, staging and dev mode through Webpack it's set based on the
`BUILDING_MODE` env.

## Building

Three different commands are available to build the host frontend:

- `build:production`: this will build the host frontend in production mode. The
  build's output will be placed under the `build` folder, which will contain a
  frontend app ready to be published. In this build, both
  `WALLETCONNECT_PROJECT_ID` and `FATHOM_SITE_ID` envs are required to enable
  WalletConnect and Fathom privacy preserving tracking respectively.
- `build:staging`: this will build the host frontend in staging mode. The
  build's output will be placed under the `build` folder, which will contain a
  frontend app ready to be published. In this build the
  `WALLETCONNECT_PROJECT_ID` and `FATHOM_SITE_ID` envs are optional and will
  activate either WalletConnect or Fathom privacy preserving tracking features
  only if specified.
- `build:dev`: this will build the host frontend in dev mode. The build's output
  will be placed under the `build` folder, which will contain a frontend app
  ready to be published. In this build the `WALLETCONNECT_PROJECT_ID` and
  `FATHOM_SITE_ID` envs are optional and will activate either WalletConnect or
  Fathom privacy preserving tracking features only if specified.
- `build:library`: this will bundle the app in library format, ready to be
  consumed by template developers that want functional playground modes for
  their template frontends. The end bundle is put under `dist` and the
  `package.json` is configured in order to make the library accessible to
  developers. In fact the library can be published to `npm` as soon as the
  `dist` folder is available.

## Checking the build's size

In order to keep the standalone-built app as lean as possible while keeping all
the features, `size-limit` is used to check the output's size under the `build`
folder. The current size limit for the folder at the time of writing is `5Mb`.

Size limit's config is visible in the `.size-limit.json` file.

## Linting

In order to keep the code consistent, linting is applied using Prettier and
ESLint. The configuration is slightly customized from the base
`eslint-config-custom` to work with React.

## Adding envs

In case you're building a new feature and it requires adding an env, you do the
following:

1. If the env is required for the dapp to work correctly, update the
   `./craco.config.js` and `rollup.config.mjs` files to reflect it.
2. Add its name to the `.env.example` file (obviously, do not add the env's
   value to the example file)
3. Update the `./src/react-app-env.d.ts` file to add the env's name to the
   augmented `global` namespace.
4. Update the `turbo.json` file at the root of the monorepo to add the env to
   the `globalEnv` key.

## Running end to end tests

End to end tests are executed using Playwright and Synpress. In order to execute
them locally, start by setting all the required envs that are needed to build
and run the frontend as described in the sections above, and after having done
that simply run the following command from the root of the monorepo (running
from the root of the monorepo ensures the latest monorepo linked packages are
used).

```
yarn test:e2e
```
