import { useInfoStore } from '@/stores/info'

export default function currencyFormat(value: number, currency = 'UAH') {
  const infoStore = useInfoStore()
  const locale = infoStore.locale ?? 'ru-RU'
  const formatter = new Intl.NumberFormat(locale, {
    currency,
    style: 'currency',
  })

  return formatter.format(value)
}
