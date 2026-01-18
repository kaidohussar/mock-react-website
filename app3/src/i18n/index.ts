import { createContentstorageI18n } from '@contentstorage/vue-i18n-plugin'

const fileNameToLocaleModuleDict = import.meta.glob<{ default: Record<string, string> }>('./locales/*.json', {
  eager: true,
})

const messages: { [P: string]: Record<string, string> } = {}
Object.entries(fileNameToLocaleModuleDict)
  .map(([fileName, localeModule]) => {
    const fileNameParts = fileName.split('/')
    const fileNameWithoutPath = fileNameParts[fileNameParts.length - 1]
    const localeName = fileNameWithoutPath.split('.json')[0]

    return [localeName, localeModule.default] as const
  })
  .forEach((localeNameLocaleMessagesTuple) => {
    messages[localeNameLocaleMessagesTuple[0]] = localeNameLocaleMessagesTuple[1]
  })

export default createContentstorageI18n({
  contentKey: '4b74b66d-6deb-446b-b0a2-45abd6ca2851/24b7414c-560b-4984-a32b-3a8219e17dc1',
  legacy: false,
  locale: 'EN',
  fallbackLocale: 'EN',
  messages,
})
