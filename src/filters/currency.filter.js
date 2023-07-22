import store from '@/store'

export default function currencyFilter(value, currency = 'UAH') {
  const locale = store.getters.info.locale ?? 'ru-RU'

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  }).format(value)
}
