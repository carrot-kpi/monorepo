import React from 'react'
import { KpiToken } from '@carrot-kpi/v1-sdk'
import { RemoteComponent } from '../../components/remote-component'

interface KpiTokenPageProps {
  kpiToken: KpiToken
}

export function KpiTokenPage({ kpiToken }: KpiTokenPageProps) {
  return (
    <RemoteComponent code={kpiToken.template.specification.page} scope="page" component="./Page" props={kpiToken} />
  )
}
