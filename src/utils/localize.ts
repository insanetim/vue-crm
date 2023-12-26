import type { Locale } from '@/types'
import { useInfoStore } from '@/stores/info'
import en from '@/locales/en.json'
import ru from '@/locales/ru.json'

const locales: Record<Locale, Record<string, string>> = {
  'en-US': en,
  'ru-RU': ru,
}

const localize = (key: string): string => {
  const infoStore = useInfoStore()
  const locale: Locale = infoStore.locale ?? 'en-US'

  return locales[locale][key] ?? `[Localize error]: key ${key} not found`
}

export default localize
