import i18n, { Resource } from 'i18next'
import { initReactI18next } from 'react-i18next'

export const initializeI8n = (resources: Resource) => {
  i18n.use(initReactI18next).init({
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

export const addBundleForTemplate = (namespace: string, bundle: TemplateBundle) => {
  Object.entries(bundle).forEach(([language, keys]) => {
    i18n.addResourceBundle(language, namespace, keys)
  })
}
