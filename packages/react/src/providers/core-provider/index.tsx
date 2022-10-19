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
import { resources } from '../../i18n/resources'
import { CARROT_KPI_REACT_I18N_NAMESPACE } from '../../i18n'

interface CarrotCoreProviderProps {
  children: ReactNode
  i18nInstance: i18n
  i18nResources: {
    [languageCode: string]: { [namespace: string]: { [key: string]: string } }
  }
  i18nDefaultNamespace: string
  supportedChains: Chain[]
  providers: ChainProviderFn[]
  getConnectors: (chains: Chain[]) => Connector[]
}

export const CarrotCoreProvider = ({
  children,
  i18nInstance,
  i18nResources,
  i18nDefaultNamespace,
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
    defaultNS: i18nDefaultNamespace,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })
  Object.entries(resources).forEach(([language, keys]) => {
    i18nInstance.addResourceBundle(language, CARROT_KPI_REACT_I18N_NAMESPACE, keys)
  })

  return <WagmiConfig client={client}>{children}</WagmiConfig>
}
