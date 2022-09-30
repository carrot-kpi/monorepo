import React from 'react'
import { useOracleTemplates } from '@carrot-kpi/react'
import { Template } from '@carrot-kpi/sdk'
import { useState } from 'react'
import { CreationForm } from '../creation-form'
import { useTranslation } from 'react-i18next'

export const Create = () => {
  const { t } = useTranslation()
  // FIXME: this should fetch KPI token templates
  const { loading, templates } = useOracleTemplates()
  const [pickedTemplate, setPickedTemplate] = useState<Template | null>(null)

  if (!!pickedTemplate) return <CreationForm template={pickedTemplate} />
  return (
    <>
      {loading && <>{t('create.loading')}...</>}
      {!loading && templates.length > 0 && (
        <ul>
          {templates.map((template: any) => (
            <div key={template.id}>
              <ul>
                <li>
                  {t('create.template.title')}: {template.specification.name}
                </li>
                <li>
                  {t('create.template.version')}: {template.version.toString()}
                </li>
                <li>
                  {t('create.template.id')}: {template.id.toString()}
                </li>
                <li>
                  {t('create.template.description')}: {template.specification.description}
                </li>
              </ul>
              <button
                onClick={() => {
                  setPickedTemplate(template)
                }}
              >
                {t('create.template.use')}
              </button>
            </div>
          ))}
        </ul>
      )}
      {!loading && templates.length === 0 && <>{t('create.noKpiToken')}</>}
    </>
  )
}
