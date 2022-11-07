import React from 'react'
import { ReactElement } from 'react'
import { TemplateComponent } from '../template-component'
import { Template } from '@carrot-kpi/sdk'
import { BigNumber } from 'ethers'
import { Address } from 'wagmi'

interface CreationFormProps {
  template?: Template
  onDone: (to: Address, data: string, value: BigNumber) => void
}

export function CreationForm({ template, onDone }: CreationFormProps): ReactElement {
  return (
    <TemplateComponent
      type="creationForm"
      template={template}
      props={{ template, onDone }}
    />
  )
}
