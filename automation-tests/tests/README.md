# Carrot QA Automation Repository

## Table of Contents

-   [Description](#description)
-   [Prerequisites](#prerequisites)
-   [UI Tests](#ui-tests)

## Description

Repository containing automation tests for Carrot web app.

## Prerequisites

-   Node version _(16.x, 18.x, 20.x\)_
-   Playwright

## Installation

```
Yarn i -y
```

## UI Tests

### Local env

First, inside `packages/frontend/.env` file put `INFURA_PROJECT_ID`

Set `baseUrl` inside the `automation-tests>playwright.config.ts` to 'localhost:3000` 

Navigate to root and run 
```
yarn build:frontend-library
```

Open second terminal, navigate to `packages/frontend` and run 
```
yarn start:staging
```
Run tests 
```
yarn test:smoke
yarn test:connectWallet
```

### Stage env
Run smoke test on STAGE env
```
yarn test:smoke
```