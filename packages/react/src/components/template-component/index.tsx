import React from 'react'
import { Template } from '@carrot-kpi/sdk'
import { useTemplateModule } from '../../hooks/useTemplateModule'
// import { addBundleForTemplate } from '../../i18n'
import { useEffect, useState } from 'react'
import { TFunction, useTranslation } from 'react-i18next'

interface TemplateComponentProps {
  type: 'creationForm' | 'page'
  template?: Template
  props?: any
}

export function TemplateComponent({
  type,
  template,
  props = {},
}: TemplateComponentProps) {
  const { t: i18NextTranslate } = useTranslation()
  const { loading, bundle, Component } = useTemplateModule(type, template)

  const [t, setT] = useState<TFunction>(() => () => '')

  useEffect(() => {
    if (loading || !template || !bundle || !Component) return
    // const namespace = `${template.specification.cid}`
    // addBundleForTemplate(namespace, bundle)
    setT(() => (key: any, options?: any) => {
      return 'Test'
      // i18NextTranslate(key, { ...options, namespace })
    })
  }, [Component, bundle, i18NextTranslate, loading, template])

  if (loading || !Component) return <>Loading...</>
  return <Component {...props} t={t} />
}
