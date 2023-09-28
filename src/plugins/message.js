import localize from '../utils/localize'

export default {
  install(app) {
    const message = html => {
      M.toast({ html })
    }
    app.provide('$message', message)

    const error = html => {
      M.toast({ html: `[${localize('Error')}]: ${html}` })
    }
    app.provide('$error', error)
  }
}
