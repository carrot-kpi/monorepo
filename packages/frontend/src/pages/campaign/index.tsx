import React from 'react'
import { ReactElement } from 'react'
import { useParams } from 'react-router-dom'
import { useKpiToken, TemplateComponent } from '@carrot-kpi/react'
import { useTranslation } from 'react-i18next'

export function Campaign(): ReactElement {
  const { t } = useTranslation()
  const { address: kpiTokenAddress } = useParams()
  const { loading, kpiToken } = useKpiToken(kpiTokenAddress)

  if (loading || !kpiToken) return <>{t('campaign.loading')}...</>
  return (
    <TemplateComponent type="page" template={kpiToken.template} props={{ kpiToken }} />
  )
}
