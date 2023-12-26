import type { FirebaseError } from 'firebase/app'

import { useAppStore } from '@/stores/app'

const useErrorHandler = (error: FirebaseError) => {
  const appStore = useAppStore()
  appStore.setError(error)
  throw error
}

export default useErrorHandler
