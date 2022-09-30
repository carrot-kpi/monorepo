import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { App } from './pages/app'
import { configureChains, chain as wagmiChain, createClient, WagmiConfig } from 'wagmi'
import { infuraProvider } from 'wagmi/providers/infura'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { ChainId } from '@carrot-kpi/sdk'
import { INFURA_PROJECT_ID } from '@carrot-kpi/sdk'

const supportedChains = Object.values(wagmiChain).filter((chain) => {
  return chain.id in ChainId
})

const { provider, chains, webSocketProvider } = configureChains(supportedChains, [
  infuraProvider({ apiKey: INFURA_PROJECT_ID }),
])

const client = createClient({
  autoConnect: true,
  connectors: [
    new InjectedConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
})

__webpack_init_sharing__('default')

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(
  <StrictMode>
    <HashRouter>
      <WagmiConfig client={client}>
        <App />
      </WagmiConfig>
    </HashRouter>
  </StrictMode>
)
