import { useInfoStore } from '@/stores/info'

export default function dateFormat(value, format = 'date') {
  const infoStore = useInfoStore()
  const locale = infoStore.locale ?? 'ru-RU'
  const options = {}

  if (format.includes('date')) {
    options.day = '2-digit'
    options.month = 'long'
    options.year = 'numeric'
  }

  if (format.includes('time')) {
    options.hour = '2-digit'
    options.minute = '2-digit'
    options.second = '2-digit'
  }

  return Intl.DateTimeFormat(locale, options).format(new Date(value))
}
