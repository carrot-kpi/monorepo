<p align="center">
    <img src=".github/static/logo.svg" alt="Carrot logo"/>
</p>

<br />

<p align="center">
    Carrot is a web3 protocol trying to make incentivization easier and more capital
    efficient.
</p>

<br />

<p align="center">
    <img src="https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0" alt="License: GPL v3">
    <img src="https://github.com/carrot-kpi/v1-monorepo/actions/workflows/ci.yml/badge.svg" alt="CI">
</p>

# Carrot frontend monorepo

A monorepo for (most of) Carrot v1 frontend packages. All the packages are
written in Typescript and managed through `yarn` workspaces and `turborepo`.

## Packages

The monorepo contains the following packages under the `packages` folder:

- `@carrot-kpi/frontend`: the official implementation of the Carrot frontend
  orchestrator, handling the various registered templates. Implemented using
  Typescript and React.
- `@carrot-kpi/react`: utility library making it easier to interact with Carrot
  from a React application. It mainly exports utility hooks and components that
  make it easier to work with (mainly render) templates. The library is
  obviously meant to be used with React only as a frontend tech.
- `@carrot-kpi/sdk`: A general purpose SDK meant to make working with Carrot
  (from both the browser and Node) easier. It mainly exports classes
  representing the main Carrot entities (templates, KPI tokens, oracles etc etc)
  as well as a few utility functions and a `Fetcher` class to fetch data from
  the underlying protocol.
- `@carrot-kpi/subgraph`: The official implementation of the Carrot KPI
  subgraph. Carrot is built to work even without a subgraph, but in order to
  make the experience snappier, a subgraph implementatino is provided too.
- `@carrot-kpi/ui`: a React implementation of the Carrot design system. Built
  with Typescript and documented with Storybook. The library is used extensively
  in the frontend to implement the various UI components.
- `@carrot-kpi/shared-state`: an utility library that implements a shared state
  store with Redux to be shared between the frontend's orchestrator and the
  various templates running on Carrot.
- `@carrot-kpi/eslint-config-custom`: a custom ESLint configuration that exports
  ESlint configs for all the other packages. The per-project ESLint configs are
  adapted started from a base configuration with sane defaults to enforce
  consistency in the codebase.
- `@carrot-kpi/tsconfig`: this package has the exact same concept and goal as
  the `eslint-config-custom` one, but applied to Typescript configuration.

In order to get started just clone the repo and run `yarn install`.

More information on how to contribute will be added in a future
`CONTRIBUTING.md` file
