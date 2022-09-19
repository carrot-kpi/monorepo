/// <reference types="react-scripts" />

type Factory = () => { [key: string]: ComponentType<any> }

interface Window {
  [key: string]: {
    init: (arg: any) => {}
    get: (module: any) => Factory
  }
}

declare function __webpack_init_sharing__(arg: string)

declare const __webpack_share_scopes__ = {
  default: any,
}
