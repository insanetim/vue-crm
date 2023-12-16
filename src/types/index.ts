import { currencies } from '@/constants/index'

export type CallbackFunction = (...args: any[]) => void

export type Currencies = (typeof currencies)[number]

export type CurrenciesResponse = {
  base: 'USD'
  date: string
  rates: Record<Currencies, number>
  success: boolean
  timestamp: number
}

export type Credentials = {
  email: string
  password: string
  name: string
}

export type Locale = 'en-US' | 'ru-RU'

export type UserInfo = {
  bill: number
  locale: Locale
  name: string
}

export type UserCategory = {
  limit: number
  title: string
}

export type CategoryPersistent = UserCategory & {
  id: string
}

export type UserRecord = {
  amount: number
  categoryId: string
  date: string
  description: string
  type: string
}

export type RecordPersistent = UserRecord & {
  id: string
}
