import type { CurrenciesResponse } from '@/types'
import { currencies } from '@/constants'

export const getCurrencies = async (): Promise<CurrenciesResponse> => {
  const apiKey: string = import.meta.env.VITE_API_KEY
  const apiUrl: string = import.meta.env.VITE_API_URL
  const res = await fetch(
    `${apiUrl}/latest?${new URLSearchParams({
      base: 'USD',
      symbols: currencies.join(','),
    })}`,
    { headers: { apikey: apiKey } }
  )

  return await res.json()
}
