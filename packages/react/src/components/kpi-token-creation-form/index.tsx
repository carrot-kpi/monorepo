import React from 'react'
import { KpiToken } from '@carrot-kpi/v1-sdk'
import { RemoteComponent } from '../../components/remote-component'

interface KpiTokenCreationFormProps {
  kpiToken: KpiToken
}

export function KpiTokenCreationForm({ kpiToken }: KpiTokenCreationFormProps) {
  return (
    <RemoteComponent
      code={kpiToken.template.specification.creationForm}
      scope="creationForm"
      component="./CreationForm"
      props={kpiToken}
    />
  )
}
