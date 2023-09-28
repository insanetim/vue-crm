import store from '../store'

export default function currencyFormat(value, currency = 'UAH') {
  const locale = store.getters['info/info'].locale ?? 'ru-RU'
  const formatter = new Intl.NumberFormat(locale, {
    currency,
    style: 'currency'
  })

  return formatter.format(value)
}
