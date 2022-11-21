import React, { Suspense, useEffect, useState } from 'react'
import {
  Chain,
  ChainProviderFn,
  Client,
  configureChains,
  Connector,
  createClient,
  WagmiConfig,
} from 'wagmi'
import { ReactNode } from 'react'
import { resources } from '../../i18n/resources'
import { CARROT_KPI_REACT_I18N_NAMESPACE, i18next } from '../../i18n'
import { IpfsService } from '@carrot-kpi/sdk'

interface CarrotCoreProviderProps {
  children: ReactNode
  i18nResources: {
    [languageCode: string]: { [namespace: string]: { [key: string]: string } }
  }
  i18nDefaultNamespace: string
  supportedChains: Chain[]
  providers: ChainProviderFn[]
  getConnectors: (chains: Chain[]) => Connector[]
  ipfsGateway?: string
}

export const CarrotCoreProvider = ({
  children,
  i18nResources,
  i18nDefaultNamespace,
  supportedChains,
  providers,
  getConnectors,
  ipfsGateway,
}: CarrotCoreProviderProps) => {
  const [client, setClient] = useState<Client<any, any> | null>(null)

  useEffect(() => {
    const { provider, chains, webSocketProvider } = configureChains(
      supportedChains,
      providers
    )
    setClient(
      createClient({
        autoConnect: true,
        connectors: getConnectors(chains),
        provider,
        webSocketProvider,
      })
    )
  }, [getConnectors, providers, supportedChains])

  useEffect(() => {
    Object.entries(i18nResources).forEach(([language, keys]) => {
      i18next.addResourceBundle(language, i18nDefaultNamespace, keys)
    })
    Object.entries(resources).forEach(([language, keys]) => {
      i18next.addResourceBundle(language, CARROT_KPI_REACT_I18N_NAMESPACE, keys)
    })
  }, [i18nDefaultNamespace, i18nResources])

  if (!client) return <></>
  if (!!ipfsGateway) IpfsService.gateway = ipfsGateway
  return (
    <WagmiConfig client={client}>
      <Suspense fallback="Loading">{children}</Suspense>
    </WagmiConfig>
  )
}
