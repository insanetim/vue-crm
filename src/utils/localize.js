import en from '@/locales/en.json'
import ru from '@/locales/ru.json'
import { useInfoStore } from '@/stores/info'

const locales = {
  'en-US': en,
  'ru-RU': ru
}

export default function localize(key) {
  const infoStore = useInfoStore()
  const locale = infoStore.locale ?? 'en-US'

  return locales[locale][key] ?? `[Localize error]: key ${key} not found`
}
