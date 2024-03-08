# @carrot-kpi/sdk

## 1.52.1

### Patch Changes

- 00cf8c4: Handle cases in which a feature is not present on the manager smart contract.

## 1.52.0

### Minor Changes

- 446ccdb: Env-specific template previews

## 1.51.0

### Minor Changes

- 9ba581b: New development environment. Each supported chain config now exposes its specific environment and its own related service URLs.

## 1.50.0

### Minor Changes

- d404277: Upgraded dependencies and migrate to wagmi v2

## 1.49.0

### Minor Changes

- 1840919: Rename data uploader service references to data manager

## 1.48.0

### Minor Changes

- d00fa77: Implement data fetching from S3 with fallback on direct IPFS fetching. The S3 fetching is subject to the preferDecentralization flag being set to false.

## 1.47.0

### Minor Changes

- 9d3df90: Switch to generic data uploader service instead of using the pinning proxy.

## 1.46.1

### Patch Changes

- 771a9d3: Rename enumerate to enumerateTemplates for the manager contract abis
- 0aaae6b: Fix an issue with the getKPITokenTemplateFeatureEnabledFor subgraph query, caused by a typo in the entity name

## 1.46.0

### Minor Changes

- 69e1aef: Add fetchKPITokenTemplateFeatureEnabledFor and fetchOracleTemplateFeatureEnabledFor to both on-chain and subgraph fetchers.

### Patch Changes

- f7d83c5: Rename enumerate to enumerateTemplates for the manager contract abis

## 1.45.2

### Patch Changes

- bdb1ede: Remove WithData entities for KPIToken and Oracle, remove hook that fetches data

## 1.45.1

### Patch Changes

- b0f0d41: Upgrade dependencies

## 1.45.0

### Minor Changes

- d8c2be0: Update dependencies and integrate Polygon Mumbai

## 1.44.0

### Minor Changes

- 50a1bbc: Split KPITokenSpecification and FullKPITokenSpecification into 2
  different types, respectively without and with the ipfsHash property

## 1.43.2

### Patch Changes

- 30ac5c7: New contract deployment addresses
- 30ac5c7: Update KPI token ABI

## 1.43.1

### Patch Changes

- 54e8862: New contract deployment addresses
- 54e8862: Update KPI token ABI

## 1.43.0

### Minor Changes

- f1e320a: Make UI nicer and drop react-query in favor or RTK query

## 1.42.3

### Patch Changes

- f0f88a9: Update subgraph URL for Gnosis and add Sepolia subgraph

## 1.42.2

### Patch Changes

- c199128: Upgrade dependencies

## 1.42.1

### Patch Changes

- aa54d36: Drastically reduce number of eth_getChainId calls

## 1.42.0

### Minor Changes

- e0c38c9: Adapt logic to work with separate staging/prod services depending
  on the context

## 1.41.1

### Patch Changes

- c046978: Fix format decimals functions behavior when no decimal is actually
  there

## 1.41.0

### Minor Changes

- e0b5e47: Add commify option in format decimal number and format currency
  amount utility functions

## 1.40.1

### Patch Changes

- 1fb54e1: Force release

## 1.40.0

### Minor Changes

- 33fdb2f: Upgrade dependencies and add Scroll Sepolia testnet support through
  the new Carrot contracts lib

### Patch Changes

- 33fdb2f: Update dependencies

## 1.39.0

### Minor Changes

- a76a1c9: Upgrade dependencies and add Scroll Sepolia testnet support through
  the new Carrot contracts lib

### Patch Changes

- a76a1c9: Update dependencies

## 1.38.0

### Minor Changes

- 5704e1b: Upgrade dependencies and add Scroll Sepolia testnet support through
  the new Carrot contracts lib

### Patch Changes

- 5704e1b: Update dependencies

## 1.37.0

### Minor Changes

- f93ba88: Upgrade dependencies and add Scroll Sepolia testnet support through
  the new Carrot contracts lib

### Patch Changes

- f93ba88: Update dependencies

## 1.36.0

### Minor Changes

- 87f1cf0: Upgrade dependencies and add Scroll Sepolia testnet support through
  the new Carrot contracts lib

### Patch Changes

- 87f1cf0: Update dependencies

## 1.35.0

### Minor Changes

- 991d3da: Upgrade dependencies and add Scroll Sepolia testnet support through
  the new Carrot contracts lib

### Patch Changes

- 991d3da: Update dependencies

## 1.34.0

### Minor Changes

- f476e46: Upgrade dependencies and add Scroll Sepolia testnet support through
  the new Carrot contracts lib

### Patch Changes

- f476e46: Update dependencies

## 1.33.2

### Patch Changes

- 6844bec: Force release
- 6844bec: Use ESBuild + tsc to generate code and typings, and add specific
  .cjs or .mjs extension in SDK package

## 1.33.1

### Patch Changes

- fc779d3: Force release
- fc779d3: Use ESBuild + tsc to generate code and typings, and add specific
  .cjs or .mjs extension in SDK package

## 1.33.0

### Minor Changes

- e23d81e: Make the SDK package tree shakeable
- e23d81e: Upgrade dependencies
- e23d81e: Support CJS
- e23d81e: Implement the KPI tokens blacklist filters in the fetcher

### Patch Changes

- e23d81e: Move tests in dedicated tests folder
- e23d81e: Flattened module structure
- 60c6228: Force release

## 1.32.0

### Minor Changes

- deae513: Make the SDK package tree shakeable
- deae513: Upgrade dependencies
- deae513: Implement the KPI tokens blacklist filters in the fetcher

### Patch Changes

- deae513: Move tests in dedicated tests folder
- deae513: Flattened module structure

## 1.31.0

### Minor Changes

- 84ff58a: Upgrade dependencies
- 84ff58a: Implement the KPI tokens blacklist filters in the fetcher

## 1.30.1

### Patch Changes

- 3f6ba67: - Ignore CHANGELOG files in Prettier and ESLint
  - Make eslint-config-custom private

## 1.30.0

### Minor Changes

- 23ff9d9: First changeset
