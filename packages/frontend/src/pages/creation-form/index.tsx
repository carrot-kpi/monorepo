import React from 'react'
import { ReactElement } from 'react'
import { TemplateComponent } from '@carrot-kpi/react'
import { Template } from '@carrot-kpi/sdk'

interface CreationFormProps {
  template: Template
}

export function CreationForm({ template }: CreationFormProps): ReactElement {
  return (
    <TemplateComponent type="creationForm" template={template} props={{ template }} />
  )
}
