import type { Locale } from '@/types'
import en from '@/locales/en.json'
import ru from '@/locales/ru.json'
import { useInfoStore } from '@/stores/info'

const locales: Record<Locale, Record<string, string>> = {
  'en-US': en,
  'ru-RU': ru
}

export default function localize(key: string): string {
  const infoStore = useInfoStore()
  const locale: Locale = infoStore.locale ?? 'en-US'

  return locales[locale][key] ?? `[Localize error]: key ${key} not found`
}
