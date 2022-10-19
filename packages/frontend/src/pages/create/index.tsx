import React, { useCallback } from 'react'
import { useOracleTemplates } from '@carrot-kpi/react'
import { Template } from '@carrot-kpi/sdk'
import { useState } from 'react'
import { CreationForm } from '@carrot-kpi/react'
import { useTranslation } from 'react-i18next'
import { BigNumber } from 'ethers'

export const Create = () => {
  const { t } = useTranslation()
  // FIXME: this should fetch KPI token templates
  const { loading, templates } = useOracleTemplates()
  const [pickedTemplate, setPickedTemplate] = useState<Template | null>(null)

  const handleDone = useCallback((data: string, value: BigNumber) => {
    console.log(data, value.toString())
  }, [])

  if (!!pickedTemplate)
    return <CreationForm template={pickedTemplate} onDone={handleDone} />
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
