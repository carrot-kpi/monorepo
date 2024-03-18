# @carrot-kpi/react

## 0.81.0

### Minor Changes

- c579660: New environments handling

### Patch Changes

- Updated dependencies [c579660]
  - @carrot-kpi/sdk@1.54.0

## 0.80.1

### Patch Changes

- 3a10552: Rename staging mode to template preview mode, minor fix when loading templates
- Updated dependencies [3a10552]
  - @carrot-kpi/sdk@1.53.1

## 0.80.0

### Minor Changes

- Trigger update.

### Patch Changes

- Updated dependencies
  - @carrot-kpi/sdk@1.53.0

## 0.79.0

### Minor Changes

- 446ccdb: Env-specific template previews

### Patch Changes

- Updated dependencies [446ccdb]
  - @carrot-kpi/sdk@1.52.0

## 0.78.0

### Minor Changes

- 9ba581b: New development environment. Each supported chain config now exposes its specific environment and its own related service URLs.

### Patch Changes

- Updated dependencies [9ba581b]
  - @carrot-kpi/sdk@1.51.0

## 0.77.1

### Patch Changes

- 9699588: Adapt useWagmiPassiveHook to the new wagmi version

## 0.77.0

### Minor Changes

- d404277: Upgraded dependencies and migrate to wagmi v2

### Patch Changes

- Updated dependencies [d404277]
  - @carrot-kpi/sdk@1.50.0

## 0.76.1

### Patch Changes

- bfc99bd: Fix JSON uploader API calls

## 0.76.0

### Minor Changes

- 1840919: Rename data uploader service references to data manager

### Patch Changes

- Updated dependencies [1840919]
  - @carrot-kpi/sdk@1.49.0

## 0.75.0

### Minor Changes

- d00fa77: Implement data fetching from S3 with fallback on direct IPFS fetching. The S3 fetching is subject to the preferDecentralization flag being set to false.

### Patch Changes

- Updated dependencies [d00fa77]
  - @carrot-kpi/sdk@1.48.0

## 0.74.0

### Minor Changes

- 9d3df90: Switch to generic data uploader service instead of using the pinning proxy.

### Patch Changes

- Updated dependencies [9d3df90]
  - @carrot-kpi/sdk@1.47.0

## 0.73.1

### Patch Changes

- 85e23eb: Add onCreateDraft to creation form props
- Updated dependencies [771a9d3]
- Updated dependencies [0aaae6b]
  - @carrot-kpi/sdk@1.46.1

## 0.73.0

### Minor Changes

- 69e1aef: Add useKPITokenTemplateFeatureEnabledFor and useOracleTemplateFeatureEnabledFor hooks.

### Patch Changes

- Updated dependencies [f7d83c5]
- Updated dependencies [69e1aef]
  - @carrot-kpi/sdk@1.46.0

## 0.72.0

### Minor Changes

- e830bfe: Add new useWagmiPassiveHook to use with wagmi hooks in watch mode

## 0.71.2

### Patch Changes

- bdb1ede: Remove the KPI token watch hook from the Page component
- bdb1ede: Remove WithData entities for KPIToken and Oracle, remove hook that fetches data
- Updated dependencies [bdb1ede]
  - @carrot-kpi/sdk@1.45.2

## 0.71.1

### Patch Changes

- b0f0d41: Upgrade dependencies
- Updated dependencies [b0f0d41]
  - @carrot-kpi/sdk@1.45.1

## 0.71.0

### Minor Changes

- d8c2be0: Update dependencies and integrate Polygon Mumbai

### Patch Changes

- Updated dependencies [d8c2be0]
  - @carrot-kpi/sdk@1.45.0

## 0.70.0

### Minor Changes

- 1f4e7aa: Remove partial KPI token from oracle creation form props.

## 0.69.0

### Minor Changes

- 7a1389d: Add on suggested expiration timestamp change callback in oracle
  creation form props.

## 0.68.0

### Minor Changes

- 747ef73: Unify oracle and KPI token internal state updater type into one,
  supporting either a new state or a state updater function. In oracle
  templates, split the state updating and initialization bundle getting
  callbacks.

## 0.67.0

### Minor Changes

- 6fd370d: Improve typings for serializable KPI token and oracle states

## 0.66.1

### Patch Changes

- 236267e: Remove height and padding from fallback wrapper

## 0.66.0

### Minor Changes

- 50a1bbc: Include state and state change handler in KPI token creation form
  types and introduce Serializable type to represent internal template states

### Patch Changes

- 7808812: Remove height and padding from fallback wrapper
- Updated dependencies [50a1bbc]
  - @carrot-kpi/sdk@1.44.0

## 0.65.2

### Patch Changes

- 30ac5c7: Reset result array before filling it again in useResolvedKPITokens
  hook (it avoids resolved KPI tokens accumulation)
- 30ac5c7: Adjust template component style and fallback container styles
- 30ac5c7: New contract deployment addresses
- Updated dependencies [30ac5c7]
- Updated dependencies [30ac5c7]
  - @carrot-kpi/sdk@1.43.2

## 0.65.1

### Patch Changes

- 54e8862: Reset result array before filling it again in useResolvedKPITokens
  hook (it avoids resolved KPI tokens accumulation)
- 54e8862: New contract deployment addresses
- Updated dependencies [54e8862]
- Updated dependencies [54e8862]
  - @carrot-kpi/sdk@1.43.1

## 0.65.0

### Minor Changes

- f1e320a: Add new useResolvedKPITokens hook to fetch and resolve the kpi
  tokens

### Patch Changes

- Updated dependencies [f1e320a]
  - @carrot-kpi/sdk@1.43.0

## 0.64.1

### Patch Changes

- c199128: Upgrade dependencies
- Updated dependencies [c199128]
  - @carrot-kpi/sdk@1.42.2

## 0.64.0

### Minor Changes

- aa54d36: Move core provider from React library to host frontend and split
  entrypoint in library and standalone mode

### Patch Changes

- Updated dependencies [aa54d36]
  - @carrot-kpi/sdk@1.42.1

## 0.63.0

### Minor Changes

- e0c38c9: Adapt logic to work with separate staging/prod services depending
  on the context

### Patch Changes

- Updated dependencies [e0c38c9]
  - @carrot-kpi/sdk@1.42.0

## 0.62.1

### Patch Changes

- 1fb54e1: Force release
- Updated dependencies [1fb54e1]
  - @carrot-kpi/sdk@1.40.1

## 0.62.0

### Minor Changes

- 33fdb2f: Improve react library retrocompatibility
- 33fdb2f: Upgrade dependencies and add Scroll Sepolia testnet support through
  the new Carrot contracts lib

### Patch Changes

- 33fdb2f: Update dependencies
- Updated dependencies [33fdb2f]
- Updated dependencies [33fdb2f]
  - @carrot-kpi/sdk@1.40.0

## 0.61.0

### Minor Changes

- a76a1c9: Improve react library retrocompatibility
- a76a1c9: Upgrade dependencies and add Scroll Sepolia testnet support through
  the new Carrot contracts lib

### Patch Changes

- a76a1c9: Update dependencies
- Updated dependencies [a76a1c9]
- Updated dependencies [a76a1c9]
  - @carrot-kpi/sdk@1.39.0

## 0.60.0

### Minor Changes

- 5704e1b: Improve react library retrocompatibility
- 5704e1b: Upgrade dependencies and add Scroll Sepolia testnet support through
  the new Carrot contracts lib

### Patch Changes

- 5704e1b: Update dependencies
- Updated dependencies [5704e1b]
- Updated dependencies [5704e1b]
  - @carrot-kpi/sdk@1.38.0

## 0.59.0

### Minor Changes

- f93ba88: Improve react library retrocompatibility
- f93ba88: Upgrade dependencies and add Scroll Sepolia testnet support through
  the new Carrot contracts lib

### Patch Changes

- f93ba88: Update dependencies
- Updated dependencies [f93ba88]
- Updated dependencies [f93ba88]
  - @carrot-kpi/sdk@1.37.0

## 0.58.0

### Minor Changes

- 87f1cf0: Improve react library retrocompatibility
- 87f1cf0: Upgrade dependencies and add Scroll Sepolia testnet support through
  the new Carrot contracts lib

### Patch Changes

- 87f1cf0: Update dependencies
- Updated dependencies [87f1cf0]
- Updated dependencies [87f1cf0]
  - @carrot-kpi/sdk@1.36.0

## 0.57.0

### Minor Changes

- 991d3da: Improve react library retrocompatibility
- 991d3da: Upgrade dependencies and add Scroll Sepolia testnet support through
  the new Carrot contracts lib

### Patch Changes

- 991d3da: Update dependencies
- Updated dependencies [991d3da]
- Updated dependencies [991d3da]
  - @carrot-kpi/sdk@1.35.0

## 0.56.0

### Minor Changes

- f476e46: Upgrade dependencies and add Scroll Sepolia testnet support through
  the new Carrot contracts lib

### Patch Changes

- f476e46: Update dependencies
- Updated dependencies [f476e46]
- Updated dependencies [f476e46]
  - @carrot-kpi/sdk@1.34.0

## 0.55.1

### Patch Changes

- c0c59da: Increase default provider timeout to 1 minute

## 0.55.0

### Minor Changes

- 6844bec: Export both cjs and mjs bundles

### Patch Changes

- 6844bec: Use ESBuild + tsc to generate code and typings, and add specific
  .cjs or .mjs extension in SDK package
- Updated dependencies [6844bec]
- Updated dependencies [6844bec]
  - @carrot-kpi/sdk@1.33.2

## 0.54.1

### Patch Changes

- fc779d3: Use ESBuild + tsc to generate code and typings, and add specific
  .cjs or .mjs extension in SDK package
- Updated dependencies [fc779d3]
- Updated dependencies [fc779d3]
  - @carrot-kpi/sdk@1.33.1

## 0.54.0

### Minor Changes

- e23d81e: Upgrade dependencies
- e23d81e: Add optional blacklist param to KPI token hooks
- e23d81e: Flatten React library file structure and make it tree shakeable

### Patch Changes

- Updated dependencies [e23d81e]
- Updated dependencies [e23d81e]
- Updated dependencies [e23d81e]
- Updated dependencies [e23d81e]
- Updated dependencies [e23d81e]
- Updated dependencies [60c6228]
- Updated dependencies [e23d81e]
  - @carrot-kpi/sdk@1.33.0

## 0.53.0

### Minor Changes

- deae513: Upgrade dependencies
- deae513: Add optional blacklist param to KPI token hooks
- deae513: Flatten React library file structure and make it tree shakeable

### Patch Changes

- Updated dependencies [deae513]
- Updated dependencies [deae513]
- Updated dependencies [deae513]
- Updated dependencies [deae513]
- Updated dependencies [deae513]
  - @carrot-kpi/sdk@1.32.0

## 0.52.0

### Minor Changes

- 84ff58a: Upgrade dependencies
- 84ff58a: Add optional blacklist param to KPI token hooks

### Patch Changes

- Updated dependencies [84ff58a]
- Updated dependencies [84ff58a]
  - @carrot-kpi/sdk@1.31.0

## 0.51.3

### Patch Changes

- 0570ebf: Remove double JSON.stringify in useDecentralizedStorageUploader
  hook

## 0.51.2

### Patch Changes

- 49f8897: Remove double JSON.stringify in useDecentralizedStorageUploader
  hook

## 0.51.1

### Patch Changes

- 3f6ba67: - Ignore CHANGELOG files in Prettier and ESLint
  - Make eslint-config-custom private
- Updated dependencies [3f6ba67]
  - @carrot-kpi/sdk@1.30.1

## 0.51.0

### Minor Changes

- 23ff9d9: First changeset

### Patch Changes

- Updated dependencies [23ff9d9]
  - @carrot-kpi/sdk@1.30.0
