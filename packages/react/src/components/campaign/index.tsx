import React from 'react'
import { ReactElement } from 'react'
import { TemplateComponent } from '../template-component'
import { useTranslation } from 'react-i18next'
import { useKpiToken } from '../../hooks'
import { CARROT_KPI_REACT_I18N_NAMESPACE } from '../../i18n'

interface CampaignProps {
  address?: string
  customBaseUrl?: string
}

export function Campaign({ address, customBaseUrl }: CampaignProps): ReactElement {
  const { t } = useTranslation(CARROT_KPI_REACT_I18N_NAMESPACE)
  const { loading, kpiToken } = useKpiToken(address)

  if (loading || !kpiToken) return <>{t('loading')}...</>
  return (
    <TemplateComponent
      type="page"
      template={kpiToken.template}
      customBaseUrl={customBaseUrl}
      props={{ kpiToken }}
    />
  )
}
