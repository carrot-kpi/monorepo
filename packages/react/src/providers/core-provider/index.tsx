import React from 'react'
import {
  Chain,
  ChainProviderFn,
  configureChains,
  Connector,
  createClient,
  WagmiConfig,
} from 'wagmi'
import { ReactNode } from 'react'
import { i18n } from 'i18next'
import { initReactI18next } from 'react-i18next'

interface CarrotCoreProviderProps {
  children: ReactNode
  i18nInstance: i18n
  i18nResources: { [languageCode: string]: { translation: { [key: string]: string } } }
  supportedChains: Chain[]
  providers: ChainProviderFn[]
  getConnectors: (chains: Chain[]) => Connector[]
}

export const CarrotCoreProvider = ({
  children,
  i18nInstance,
  i18nResources,
  supportedChains,
  providers,
  getConnectors,
}: CarrotCoreProviderProps) => {
  const { provider, chains, webSocketProvider } = configureChains(
    supportedChains,
    providers
  )

  const client = createClient({
    autoConnect: true,
    connectors: getConnectors(chains),
    provider,
    webSocketProvider,
  })

  i18nInstance.use(initReactI18next).init({
    resources: i18nResources,
    // TODO: remove once a language detector is used
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })

  return <WagmiConfig client={client}>{children}</WagmiConfig>
}
