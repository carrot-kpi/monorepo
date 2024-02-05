# @carrot-kpi/host-frontend

## 0.38.2

### Patch Changes

- f9bbd18: Add wagmi back to the shared dependencies as a singleton

## 0.38.1

### Patch Changes

- 9699588: Remove the augmented chains mapping and use the basic ones provided by wagmi
- Updated dependencies [9699588]
- Updated dependencies [9699588]
  - @carrot-kpi/ui@0.68.1
  - @carrot-kpi/react@0.77.1

## 0.38.0

### Minor Changes

- d404277: Upgraded dependencies and migrate to wagmi v2

### Patch Changes

- Updated dependencies [d404277]
  - @carrot-kpi/react@0.77.0
  - @carrot-kpi/sdk@1.50.0
  - @carrot-kpi/ui@0.68.0

## 0.37.0

### Minor Changes

- 1840919: Rename data uploader service references to data manager

### Patch Changes

- 2831384: UI improvements for the accounts and settings drawer
- Updated dependencies [1840919]
  - @carrot-kpi/react@0.76.0
  - @carrot-kpi/sdk@1.49.0

## 0.36.0

### Minor Changes

- d00fa77: Implement data fetching from S3 with fallback on direct IPFS fetching. The S3 fetching is subject to the preferDecentralization flag being set to false.

### Patch Changes

- Updated dependencies [d00fa77]
  - @carrot-kpi/react@0.75.0
  - @carrot-kpi/sdk@1.48.0

## 0.35.0

### Minor Changes

- 9d3df90: Switch to generic data uploader service instead of using the pinning proxy.
- f706785: Adapt campaigns page to the new designs

### Patch Changes

- Updated dependencies [f706785]
- Updated dependencies [9d3df90]
  - @carrot-kpi/ui@0.67.0
  - @carrot-kpi/react@0.74.0
  - @carrot-kpi/sdk@1.47.0

## 0.34.0

### Minor Changes

- 85e23eb: Implement drafts for campaigns

### Patch Changes

- 771a9d3: Redirect to the home page when switching chain while on the campaign page, to avoid inconsistencies
  Add new account and settings drawer
- Updated dependencies [771a9d3]
- Updated dependencies [771a9d3]
- Updated dependencies [85e23eb]
- Updated dependencies [0aaae6b]
  - @carrot-kpi/ui@0.66.7
  - @carrot-kpi/sdk@1.46.1
  - @carrot-kpi/react@0.73.1

## 0.33.6

### Patch Changes

- f7d83c5: Redirect to the home page when switching chain while on the campaign page, to avoid inconsistencies
- Updated dependencies [f7d83c5]
- Updated dependencies [f7d83c5]
- Updated dependencies [69e1aef]
- Updated dependencies [69e1aef]
  - @carrot-kpi/ui@0.66.6
  - @carrot-kpi/sdk@1.46.0
  - @carrot-kpi/react@0.73.0

## 0.33.5

### Patch Changes

- e830bfe: Increase wait time for the multicall batch to 100ms
- Updated dependencies [e830bfe]
  - @carrot-kpi/react@0.72.0

## 0.33.4

### Patch Changes

- a4008cb: Add dedicated tsconfig for frontend build, add chips in kpi token cards

## 0.33.3

### Patch Changes

- bdb1ede: Remove the KPI token watch hook from the Page component
- Updated dependencies [bdb1ede]
- Updated dependencies [bdb1ede]
- Updated dependencies [bdb1ede]
  - @carrot-kpi/react@0.71.2
  - @carrot-kpi/ui@0.66.5
  - @carrot-kpi/sdk@1.45.2

## 0.33.2

### Patch Changes

- acc813f: Move KPITokenCreationForm to dedicated component to avoid
  unncessary Layout component re-renders, triggering many http calls
- b573a8b: Centered menu items in top navbar.
- Updated dependencies [b573a8b]
  - @carrot-kpi/ui@0.66.4

## 0.33.1

### Patch Changes

- b0f0d41: Upgrade dependencies
- Updated dependencies [b0f0d41]
  - @carrot-kpi/react@0.71.1
  - @carrot-kpi/sdk@1.45.1
  - @carrot-kpi/ui@0.66.1

## 0.33.0

### Minor Changes

- d8c2be0: Update dependencies and integrate Polygon Mumbai

### Patch Changes

- Updated dependencies [d8c2be0]
  - @carrot-kpi/react@0.71.0
  - @carrot-kpi/sdk@1.45.0
  - @carrot-kpi/ui@0.66.0

## 0.32.1

### Patch Changes

- d5cf7e6: Update frontend after React library changes
- Updated dependencies [747ef73]
  - @carrot-kpi/react@0.68.0

## 0.32.0

### Minor Changes

- 6fd370d: Integrate new React library KPI token and oracle state typings

### Patch Changes

- Updated dependencies [ebecad7]
- Updated dependencies [6fd370d]
  - @carrot-kpi/ui@0.65.4
  - @carrot-kpi/react@0.67.0

## 0.31.1

### Patch Changes

- 236267e: Add padding and height to loader fallback
- Updated dependencies [236267e]
- Updated dependencies [236267e]
  - @carrot-kpi/ui@0.65.3
  - @carrot-kpi/react@0.66.1

## 0.31.0

### Minor Changes

- 50a1bbc: Introduce internal state management for KPI token creation forms.

### Patch Changes

- 7808812: Add padding and height to loader fallback
- Updated dependencies [7808812]
- Updated dependencies [50a1bbc]
- Updated dependencies [50a1bbc]
- Updated dependencies [50a1bbc]
  - @carrot-kpi/react@0.66.0
  - @carrot-kpi/ui@0.65.2
  - @carrot-kpi/sdk@1.44.0

## 0.30.0

### Minor Changes

- 36e5288: Allow enabling staging mode while in library mode

### Patch Changes

- 36e5288: Fix minor height and padding issues when loading the template
  components
- Updated dependencies [36e5288]
  - @carrot-kpi/ui@0.65.1

## 0.29.0

### Minor Changes

- 30ac5c7: Remove fullscreen modal in campaign and creation form pages
- 30ac5c7: Add permissioned mode warning when creating campaigns
- 30ac5c7: Add connect wallet button to wallet disconnected modal

### Patch Changes

- 30ac5c7: Fix creation allowance check for connected address while creating
  campaign
- 30ac5c7: Make the campaigns page responsive with flex instead of grid
- 30ac5c7: Add new icon to permissioned mode warning modal, add join discord
  button
- 30ac5c7: Fix height styles when loading on page and create component
- Updated dependencies [30ac5c7]
- Updated dependencies [30ac5c7]
- Updated dependencies [30ac5c7]
- Updated dependencies [30ac5c7]
  - @carrot-kpi/react@0.65.2
  - @carrot-kpi/sdk@1.43.2

## 0.28.0

### Minor Changes

- 54e8862: Remove fullscreen modal in campaign and creation form pages

### Patch Changes

- Updated dependencies [54e8862]
- Updated dependencies [54e8862]
- Updated dependencies [54e8862]
  - @carrot-kpi/react@0.65.1
  - @carrot-kpi/sdk@1.43.1

## 0.27.0

### Minor Changes

- f1e320a: Refactor the all campaigns page to fetch and resolve all the kpi
  tokens
- f1e320a: Fix UI in campaign page and creation form
- f1e320a: Make UI nicer and drop react-query in favor or RTK query
- f1e320a: Update UI in campaigns page to conform to the new enforced max
  width aesthetic

### Patch Changes

- f1e320a: Avoid infinite loop when there are no campaigns in the all
  campaigns page
- Updated dependencies [f1e320a]
- Updated dependencies [f1e320a]
- Updated dependencies [f1e320a]
- Updated dependencies [f1e320a]
- Updated dependencies [f1e320a]
  - @carrot-kpi/ui@0.65.0
  - @carrot-kpi/react@0.65.0
  - @carrot-kpi/sdk@1.43.0

## 0.26.3

### Patch Changes

- c199128: Upgrade dependencies
- Updated dependencies [c199128]
  - @carrot-kpi/react@0.64.1
  - @carrot-kpi/sdk@1.42.2
  - @carrot-kpi/ui@0.63.1

## 0.26.2

### Patch Changes

- cc06ec3: Make templateId prop optional in library mode entrypoint

## 0.26.1

### Patch Changes

- a3c082e: Make KPI token and oracle templates base URL props not required
  anymore

## 0.26.0

### Minor Changes

- 2862952: Fix issue with shared state provider not being present while trying
  to update the shared state

## 0.25.1

### Patch Changes

- dd40303: Fix package.json

## 0.25.0

### Minor Changes

- aa54d36: Move core provider from React library to host frontend and split
  entrypoint in library and standalone mode

### Patch Changes

- Updated dependencies [aa54d36]
- Updated dependencies [aa54d36]
  - @carrot-kpi/sdk@1.42.1
  - @carrot-kpi/react@0.64.0

## 0.24.0

### Minor Changes

- e0c38c9: Adapt logic to work with separate staging/prod services depending
  on the context

### Patch Changes

- Updated dependencies [e0c38c9]
  - @carrot-kpi/react@0.63.0
  - @carrot-kpi/sdk@1.42.0
  - @carrot-kpi/ui@0.63.0

## 0.23.1

### Patch Changes

- 1fb54e1: Force release
- Updated dependencies [1fb54e1]
  - @carrot-kpi/react@0.62.1
  - @carrot-kpi/sdk@1.40.1
  - @carrot-kpi/ui@0.62.1

## 0.23.0

### Minor Changes

- 33fdb2f: Replace WarningBox with extended and more flexible FeedbackBox and
  add size variants and selectability to chips
- 33fdb2f: Improve react library retrocompatibility
- 33fdb2f: Upgrade dependencies and add Scroll Sepolia testnet support through
  the new Carrot contracts lib

### Patch Changes

- 33fdb2f: Fix Frame connector not accepting undefined chain ids on
  getWalletClient
- 33fdb2f: Avoid rerenders in virtualized select component
- 33fdb2f: Update dependencies
- Updated dependencies [33fdb2f]
- Updated dependencies [33fdb2f]
- Updated dependencies [33fdb2f]
- Updated dependencies [33fdb2f]
- Updated dependencies [33fdb2f]
- Updated dependencies [33fdb2f]
- Updated dependencies [33fdb2f]
- Updated dependencies [33fdb2f]
- Updated dependencies [33fdb2f]
- Updated dependencies [33fdb2f]
- Updated dependencies [33fdb2f]
- Updated dependencies [33fdb2f]
  - @carrot-kpi/ui@0.62.0
  - @carrot-kpi/react@0.62.0
  - @carrot-kpi/sdk@1.40.0

## 0.22.0

### Minor Changes

- a76a1c9: Replace WarningBox with extended and more flexible FeedbackBox and
  add size variants and selectability to chips
- a76a1c9: Improve react library retrocompatibility
- a76a1c9: Upgrade dependencies and add Scroll Sepolia testnet support through
  the new Carrot contracts lib

### Patch Changes

- a76a1c9: Update dependencies
- Updated dependencies [a76a1c9]
- Updated dependencies [a76a1c9]
- Updated dependencies [a76a1c9]
- Updated dependencies [a76a1c9]
- Updated dependencies [a76a1c9]
- Updated dependencies [a76a1c9]
- Updated dependencies [a76a1c9]
- Updated dependencies [a76a1c9]
- Updated dependencies [a76a1c9]
- Updated dependencies [a76a1c9]
- Updated dependencies [a76a1c9]
  - @carrot-kpi/ui@0.61.0
  - @carrot-kpi/react@0.61.0
  - @carrot-kpi/sdk@1.39.0

## 0.21.0

### Minor Changes

- 5704e1b: Replace WarningBox with extended and more flexible FeedbackBox and
  add size variants and selectability to chips
- 5704e1b: Improve react library retrocompatibility
- 5704e1b: Upgrade dependencies and add Scroll Sepolia testnet support through
  the new Carrot contracts lib

### Patch Changes

- 5704e1b: Update dependencies
- Updated dependencies [5704e1b]
- Updated dependencies [5704e1b]
- Updated dependencies [5704e1b]
- Updated dependencies [5704e1b]
- Updated dependencies [5704e1b]
- Updated dependencies [5704e1b]
- Updated dependencies [5704e1b]
- Updated dependencies [5704e1b]
- Updated dependencies [5704e1b]
- Updated dependencies [5704e1b]
  - @carrot-kpi/ui@0.60.0
  - @carrot-kpi/react@0.60.0
  - @carrot-kpi/sdk@1.38.0

## 0.20.0

### Minor Changes

- f93ba88: Replace WarningBox with extended and more flexible FeedbackBox and
  add size variants and selectability to chips
- f93ba88: Improve react library retrocompatibility
- f93ba88: Upgrade dependencies and add Scroll Sepolia testnet support through
  the new Carrot contracts lib

### Patch Changes

- f93ba88: Update dependencies
- Updated dependencies [f93ba88]
- Updated dependencies [f93ba88]
- Updated dependencies [f93ba88]
- Updated dependencies [f93ba88]
- Updated dependencies [f93ba88]
- Updated dependencies [f93ba88]
- Updated dependencies [f93ba88]
- Updated dependencies [f93ba88]
- Updated dependencies [f93ba88]
  - @carrot-kpi/ui@0.59.0
  - @carrot-kpi/react@0.59.0
  - @carrot-kpi/sdk@1.37.0

## 0.19.0

### Minor Changes

- 87f1cf0: Replace WarningBox with extended and more flexible FeedbackBox and
  add size variants and selectability to chips
- 87f1cf0: Improve react library retrocompatibility
- 87f1cf0: Upgrade dependencies and add Scroll Sepolia testnet support through
  the new Carrot contracts lib

### Patch Changes

- 87f1cf0: Update dependencies
- Updated dependencies [87f1cf0]
- Updated dependencies [87f1cf0]
- Updated dependencies [87f1cf0]
- Updated dependencies [87f1cf0]
- Updated dependencies [87f1cf0]
- Updated dependencies [87f1cf0]
- Updated dependencies [87f1cf0]
- Updated dependencies [87f1cf0]
  - @carrot-kpi/ui@0.58.0
  - @carrot-kpi/react@0.58.0
  - @carrot-kpi/sdk@1.36.0

## 0.18.0

### Minor Changes

- 991d3da: Improve react library retrocompatibility
- 991d3da: Upgrade dependencies and add Scroll Sepolia testnet support through
  the new Carrot contracts lib

### Patch Changes

- 991d3da: Update dependencies
- Updated dependencies [991d3da]
- Updated dependencies [991d3da]
- Updated dependencies [991d3da]
- Updated dependencies [991d3da]
- Updated dependencies [991d3da]
  - @carrot-kpi/ui@0.57.0
  - @carrot-kpi/react@0.57.0
  - @carrot-kpi/sdk@1.35.0

## 0.17.0

### Minor Changes

- f476e46: Upgrade dependencies and add Scroll Sepolia testnet support through
  the new Carrot contracts lib

### Patch Changes

- f476e46: Update dependencies
- Updated dependencies [f476e46]
- Updated dependencies [f476e46]
- Updated dependencies [f476e46]
- Updated dependencies [f476e46]
  - @carrot-kpi/ui@0.56.0
  - @carrot-kpi/react@0.56.0
  - @carrot-kpi/sdk@1.34.0

## 0.16.3

### Patch Changes

- 9d74c0c: Force release

## 0.16.2

### Patch Changes

- 20b6cbb: Replace video poster require with import
- 20b6cbb: Add poster to hero video, add new Discord link
- Updated dependencies [20b6cbb]
  - @carrot-kpi/ui@0.55.0

## 0.16.1

### Patch Changes

- 266f6cb: Add poster to hero video, add new Discord link
- Updated dependencies [266f6cb]
  - @carrot-kpi/ui@0.54.0

## 0.16.0

### Minor Changes

- e23d81e: Upgrade dependencies
- e23d81e: Use ESBuild instead of Terser to minify build
- e23d81e: Minify CSS
- e23d81e: Flatten React library file structure and make it tree shakeable
- e23d81e: Add dedicated hook for the blacklisted KPI tokens

### Patch Changes

- e23d81e: Replace `__DEV__` env with `__PROD__` and fix carrot domain
  configuration
- e23d81e: Avoid fetching all KPI tokens as featured when the blacklist is
  empty
- Updated dependencies [e23d81e]
- Updated dependencies [e23d81e]
- Updated dependencies [e23d81e]
- Updated dependencies [e23d81e]
- Updated dependencies [e23d81e]
- Updated dependencies [e23d81e]
- Updated dependencies [e23d81e]
- Updated dependencies [e23d81e]
- Updated dependencies [e23d81e]
- Updated dependencies [60c6228]
- Updated dependencies [e23d81e]
  - @carrot-kpi/sdk@1.33.0
  - @carrot-kpi/react@0.54.0
  - @carrot-kpi/ui@0.52.0

## 0.15.0

### Minor Changes

- deae513: Upgrade dependencies
- deae513: Use ESBuild instead of Terser to minify build
- deae513: Minify CSS
- deae513: Flatten React library file structure and make it tree shakeable
- deae513: Add dedicated hook for the blacklisted KPI tokens

### Patch Changes

- deae513: Replace `__DEV__` env with `__PROD__` and fix carrot domain
  configuration
- deae513: Avoid fetching all KPI tokens as featured when the blacklist is
  empty
- Updated dependencies [deae513]
- Updated dependencies [deae513]
- Updated dependencies [deae513]
- Updated dependencies [deae513]
- Updated dependencies [deae513]
- Updated dependencies [deae513]
- Updated dependencies [deae513]
- Updated dependencies [deae513]
- Updated dependencies [deae513]
  - @carrot-kpi/sdk@1.32.0
  - @carrot-kpi/react@0.53.0
  - @carrot-kpi/ui@0.51.0

## 0.14.0

### Minor Changes

- 84ff58a: Upgrade dependencies
- 84ff58a: Add dedicated hook for the blacklisted KPI tokens

### Patch Changes

- 84ff58a: Replace `__DEV__` env with `__PROD__` and fix carrot domain
  configuration
- 84ff58a: Avoid fetching all KPI tokens as featured when the blacklist is
  empty
- Updated dependencies [84ff58a]
- Updated dependencies [84ff58a]
- Updated dependencies [84ff58a]
- Updated dependencies [84ff58a]
  - @carrot-kpi/react@0.52.0
  - @carrot-kpi/sdk@1.31.0
  - @carrot-kpi/ui@0.50.0

## 0.13.0

### Minor Changes

- 4866722: Implement featured KPI tokens hook

### Patch Changes

- Updated dependencies [0570ebf]
  - @carrot-kpi/react@0.51.3

## 0.12.1

### Patch Changes

- 3f6ba67: - Ignore CHANGELOG files in Prettier and ESLint
  - Make eslint-config-custom private
- Updated dependencies [3f6ba67]
  - @carrot-kpi/react@0.51.1
  - @carrot-kpi/sdk@1.30.1
  - @carrot-kpi/ui@0.49.1

## 0.12.0

### Minor Changes

- 23ff9d9: First changeset

### Patch Changes

- Updated dependencies [23ff9d9]
  - @carrot-kpi/react@0.51.0
  - @carrot-kpi/sdk@1.30.0
  - @carrot-kpi/ui@0.49.0
