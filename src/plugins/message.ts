import type { Plugin } from 'vue'
import localize from '@/utils/localize'

declare let M: any

export type MessageType = (html: string) => void

export default <Plugin>{
  install(app) {
    const message: MessageType = html => {
      M.toast({ html })
    }
    app.provide('$message', message)

    const error: MessageType = html => {
      M.toast({ html: `[${localize('Error')}]: ${html}` })
    }
    app.provide('$error', error)
  }
}
