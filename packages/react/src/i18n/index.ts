import { Resource, i18n } from 'i18next'
import { initReactI18next } from 'react-i18next'

export const initializeI8n = (i18nInstance: i18n, resources: Resource) => {
  i18nInstance.use(initReactI18next).init({
    resources,
    // TODO: remove once a language detector is used
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })
}

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
