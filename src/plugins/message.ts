import type { Plugin } from 'vue'

import localize from '@/utils/localize'

export type MessageType = (html: string) => void

export default <Plugin>{
  install(app) {
    const message: MessageType = html => {
      window.M.toast({ html })
    }
    app.provide('$message', message)

    const error: MessageType = html => {
      window.M.toast({ html: `[${localize('Error')}]: ${html}` })
    }
    app.provide('$error', error)
  },
}
