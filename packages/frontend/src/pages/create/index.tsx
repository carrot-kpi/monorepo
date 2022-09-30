import React from 'react'
import { useOracleTemplates } from '@carrot-kpi/react'
import { Template } from '@carrot-kpi/sdk'
import { useState } from 'react'
import { CreationForm } from '../creation-form'

export const Create = () => {
  // FIXME: this should fetch KPI token templates
  const { loading, templates } = useOracleTemplates()
  const [pickedTemplate, setPickedTemplate] = useState<Template | null>(null)

  if (!!pickedTemplate) return <CreationForm template={pickedTemplate} />
  return (
    <>
      {loading && <>Loading...</>}
      {!loading && templates.length > 0 && (
        <ul>
          {templates.map((template: any) => (
            <div key={template.id}>
              <ul>
                <li>Title: {template.specification.name}</li>
                <li>Version: {template.version.toString()}</li>
                <li>ID: {template.id.toString()}</li>
                <li>Description: {template.specification.description}</li>
              </ul>
              <button
                onClick={() => {
                  setPickedTemplate(template)
                }}
              >
                Use
              </button>
            </div>
          ))}
        </ul>
      )}
      {!loading && templates.length === 0 && <>No KPI token templates</>}
    </>
  )
}
