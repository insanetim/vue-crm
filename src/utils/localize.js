import en from '../locales/en.json'
import ru from '../locales/ru.json'
import store from '../store'

const locales = {
  'en-US': en,
  'ru-RU': ru
}

export default function localize(key) {
  const locale = store.getters['info/info'].locale ?? 'en-US'

  return locales[locale][key] ?? `[Localize error]: key ${key} not found`
}
