import React, { useEffect, useState } from 'react'
import { useKpiTokens } from '@carrot-kpi/react'
import { Link } from 'react-router-dom'
import { chain, useAccount, useConnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { useTranslation } from 'react-i18next'
import { KpiToken } from '@carrot-kpi/sdk'
import { GridPatternBg } from '../../components/ui/GridPatternBg'
import { Button } from '@carrot-kpi/ui'
import { PageWrapper } from '../../components/ui/PageWrapper'
import { MainTitle } from '../../components/ui/MainTitle'
import { PlusSignPattern } from '../../components/ui/PlusSignPattern'
import { FeaturedCampaings } from '../../components/FeaturedCampaigns'
import { DXdaoSideLink } from './hero/DXdaoSideLink'
import { CardHorizontal } from './hero/CardsHorizontal'

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
      <div className="relative bg-carrot-orange">
        <GridPatternBg />
        <PageWrapper>
          <div className="relative py-24 space-y-12">
            <MainTitle>Featured campaigns</MainTitle>
            <CardHorizontal>
              <FeaturedCampaings />
            </CardHorizontal>
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
        <div className="absolute left-4 top-1/3">
          <DXdaoSideLink />
        </div>
        <PlusSignPattern y="top" x="left" />
        <PlusSignPattern y="top" x="right" />
        <PlusSignPattern y="bottom" x="left" />
        <PlusSignPattern y="bottom" x="right" />
      </div>
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
