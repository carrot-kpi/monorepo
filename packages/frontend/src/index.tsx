import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { App } from './pages/app'
import { store } from './state'
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import Web3ReactManager from './components/web3-manager'
import { CoreProvider } from '@carrot-kpi/react'
import { MultiChainLinksUpdater } from './state/multi-chain-links/updater'
import { WEB3_NETWORK_CONTEXT_NAME } from '@carrot-kpi/core-sdk'

const Web3ProviderNetwork = createWeb3ReactRoot(WEB3_NETWORK_CONTEXT_NAME)

function getLibrary(provider: any): Web3Provider {
  return new Web3Provider(provider, 'any')
}

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(
  <StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
        <Provider store={store}>
          <CoreProvider>
            <HashRouter>
              <MultiChainLinksUpdater />
              <Web3ReactManager>
                <App />
              </Web3ReactManager>
            </HashRouter>
          </CoreProvider>
        </Provider>
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  </StrictMode>
)
