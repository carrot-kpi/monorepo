/// <reference types="react-scripts" />

interface Window {
  ethereum?: {
    isMetaMask?: true
    on?: (...args: any[]) => void
    removeListener?: (...args: any[]) => void
    request?: (args: EthereumProviderRequestArguments) => Promise<unknown>
  }
  web3?: {}
  page?: any
  init: (arg: any) => {}
  get: (module: any) => () => {}
}

declare function __webpack_init_sharing__(arg: string)

declare const __webpack_share_scopes__ = {
  default: any,
}
