import React from 'react'
import { useKpiTokens } from '@carrot-kpi/react'
import { Link } from 'react-router-dom'
import { chain, useAccount, useConnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { useTranslation } from 'react-i18next'

export const Home = () => {
  const { t } = useTranslation()
  const { isConnected } = useAccount()
  const { connect, connectors, isLoading, pendingConnector, error } = useConnect({
    connector: new InjectedConnector({
      chains: [chain.goerli],
    }),
  })
  const { loading, kpiTokens } = useKpiTokens()

  return (
    <>
      {!isConnected &&
        connectors.map((connector) => (
          <button
            disabled={!connector.ready}
            key={connector.id}
            onClick={() => connect({ connector })}
          >
            {connector.name}
            {!connector.ready && ' (unsupported)'}
            {isLoading && connector.id === pendingConnector?.id && ' (connecting)'}
          </button>
        ))}
      {!!error && error.message}
      {isConnected && (
        <Link to="/create">
          <button>{t('home.createKpiToken')}</button>
        </Link>
      )}
      {loading && <>{t('home.loading')}...</>}
      {!loading && kpiTokens.length > 0 && (
        <ul>
          {kpiTokens.map((token: any) => (
            <li key={token.address}>
              {token.description.title}{' '}
              <Link to={`/campaigns/${token.address}`}>
                <button>{t('home.viewCampaign')}</button>
              </Link>
            </li>
          ))}
        </ul>
      )}
      {!loading && kpiTokens.length === 0 && <>{t('home.noKpiToken')}</>}
    </>
  )
}
