import { i18n } from 'i18next'

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
