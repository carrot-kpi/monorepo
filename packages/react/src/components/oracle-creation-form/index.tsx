import React from 'react'
import { Oracle } from '@carrot-kpi/v1-sdk'
import { RemoteComponent } from '../../components/remote-component'

interface OracleCreationFormProps {
  oracle: Oracle
}

export function OracleCreationForm({ oracle }: OracleCreationFormProps) {
  return (
    <RemoteComponent
      code={oracle.template.specification.page}
      scope="creationForm"
      component="./CreationForm"
      props={oracle}
    />
  )
}
