import { useInfoStore } from '@/stores/info'

const currencyFormat = (value: number, currency = 'UAH') => {
  const infoStore = useInfoStore()
  const locale = infoStore.locale ?? 'ru-RU'
  const formatter = new Intl.NumberFormat(locale, {
    currency,
    style: 'currency',
  })

  return formatter.format(value)
}

export default currencyFormat
