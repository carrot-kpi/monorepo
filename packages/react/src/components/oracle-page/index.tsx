import React from 'react'
import { Oracle } from '@carrot-kpi/v1-sdk'
import { RemoteComponent } from '../../components/remote-component'

interface OraclePageProps {
  oracle: Oracle
}

export function OraclePage({ oracle }: OraclePageProps) {
  return <RemoteComponent code={oracle.template.specification.page} scope="page" component="./Page" props={oracle} />
}
