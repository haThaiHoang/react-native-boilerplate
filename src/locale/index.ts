import 'intl-pluralrules'

import { initReactI18next } from 'react-i18next'

import i18next from 'i18next'

i18next.use(initReactI18next).init({
  lng: 'en',
  resources: {
    en: {
      translation: require('./en.json'),
    },
    vi: {
      translation: require('./vi.json'),
    },
  },
  fallbackLng: 'vi',
})

export default i18next;
