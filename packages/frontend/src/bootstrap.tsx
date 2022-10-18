import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { App } from './pages/app'
import { chain as wagmiChain, Chain } from 'wagmi'
import { infuraProvider } from 'wagmi/providers/infura'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { ChainId } from '@carrot-kpi/sdk'
import { CarrotCoreProvider } from '@carrot-kpi/react'
import i18n from 'i18next'
import { resources } from './i18n'
import { CarrotUIProvider } from '@carrot-kpi/ui'

const INFURA_PROJECT_ID = '0ebf4dd05d6740f482938b8a80860d13'

const supportedChains = Object.values(wagmiChain).filter((chain) => {
  return chain.id in ChainId
})

const getConnectors = (chains: Chain[]) => [
  new InjectedConnector({ chains }),
  new WalletConnectConnector({
    chains,
    options: {
      qrcode: true,
    },
  }),
]

__webpack_init_sharing__('default')

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(
  <StrictMode>
    <HashRouter>
      <CarrotCoreProvider
        i18nInstance={i18n}
        i18nResources={resources}
        supportedChains={supportedChains}
        providers={[infuraProvider({ apiKey: INFURA_PROJECT_ID })]}
        getConnectors={getConnectors}
      >
        <CarrotUIProvider>
          <App />
        </CarrotUIProvider>
      </CarrotCoreProvider>
    </HashRouter>
  </StrictMode>
)
