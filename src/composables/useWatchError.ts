import type { FirebaseError } from 'firebase/app'
import { computed, inject, watch } from 'vue'

import type { MessageType } from '@/plugins/message'
import { useAppStore } from '@/stores/app'
import localize from '@/utils/localize'
import messages from '@/utils/messages'

export const useWatchError = () => {
  const appStore = useAppStore()
  const $error = inject('$error') as MessageType
  const error = computed<FirebaseError | null>(() => appStore.error)

  watch(error, error => {
    const code = error?.code as keyof typeof messages
    $error(localize(messages[code] ?? 'SomethingWentWrong'))
  })
}
