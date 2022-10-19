import { i18n } from 'i18next'

export const CARROT_KPI_REACT_I18N_NAMESPACE = '@carrot-kpi/react'

export interface TemplateBundle {
  [language: string]: { [key: string]: string }
}

export const addBundleForTemplate = (
  i18nInstance: i18n,
  namespace: string,
  bundle: TemplateBundle
) => {
  Object.entries(bundle).forEach(([language, keys]) => {
    i18nInstance.addResourceBundle(language, namespace, keys)
  })
}
