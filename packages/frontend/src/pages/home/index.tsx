import React, { useEffect, useState } from 'react'
import { useKpiTokens } from '@carrot-kpi/react'
import { Link } from 'react-router-dom'
import { chain, useAccount, useConnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { useTranslation } from 'react-i18next'
import { KpiToken } from '@carrot-kpi/sdk'
import { LineSquaresGridBg } from '../../components/LineSquaresGridBg'
import { Button } from '@carrot-kpi/ui'
import { PageWrapper } from '../../components/PageWrapper'
import { MainTitle } from '../../components/Text'

export const Home = () => {
  const { t } = useTranslation()
  const { isConnected } = useAccount()
  const { connect, connectors, isLoading, pendingConnector, error } = useConnect({
    connector: new InjectedConnector({
      chains: [chain.sepolia, chain.goerli],
    }),
  })
  const { loading, kpiTokens } = useKpiTokens()

  const [kpiTokensArray, setKpiTokensArray] = useState<KpiToken[]>([])

  useEffect(() => {
    setKpiTokensArray(Object.values(kpiTokens))
  }, [kpiTokens])

  return (
    <>
      <PageWrapper bgColor="bg-carrot-orange">
        <LineSquaresGridBg />
        <div className="py-24 space-y-12">
          <MainTitle>Featured campaigns</MainTitle>
          <div className="flex justify-between space-x-5 overflow-x-auto md:space-x-0 xl:overflow-hidden xl:mr-0 xl:space-x-20 2xl:space-x-32">
            <div className="bg-black rounded-2xl h-96 w-80"></div>
            <div className="bg-black rounded-2xl h-96 w-80"></div>
            <div className="bg-black rounded-2xl h-96 w-80"></div>
          </div>
          <div className="flex flex-col space-x-0 space-y-6 md:space-y-0 md:flex-row md:space-x-8">
            <Button variant="primary" size="standard">
              All campaigns
            </Button>
            <Button variant="secondary" size="standard">
              Create campaign
            </Button>
          </div>
        </div>
      </PageWrapper>
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
      {!loading && kpiTokensArray.length > 0 && (
        <ul>
          {kpiTokensArray.map((token) => (
            <li key={token.address}>
              {token.specification.title}{' '}
              <Link to={`/campaigns/${token.address}`}>
                <button>{t('home.viewCampaign')}</button>
              </Link>
            </li>
          ))}
        </ul>
      )}
      {!loading && kpiTokensArray.length === 0 && <>{t('home.noKpiToken')}</>}
    </>
  )
}
