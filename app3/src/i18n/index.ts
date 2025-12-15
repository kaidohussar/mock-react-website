import { createContentstorageI18n } from '@contentstorage/vue-i18n-plugin'
import contentStorageConfig from '../../contentstorage.config.js'

import en from './locales/EN.json'
import fr from './locales/FR.json'
import es from './locales/ES.json'

const savedLanguage = localStorage.getItem('selectedLanguage') || 'en'

const i18n = createContentstorageI18n({
  contentKey: contentStorageConfig.contentKey,
  legacy: false,
  locale: savedLanguage,
  fallbackLocale: 'en',
  messages: {
    en,
    es,
    fr,
  },
})

export default i18n
