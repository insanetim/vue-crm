import type { Directive } from 'vue'

export default <Directive<HTMLElement>>{
  mounted(el) {
    window.M.FormSelect.init(el, {})
  },
  updated(el) {
    window.M.FormSelect.init(el, {})
  },
  beforeUnmount(el) {
    const instance = window.M.FormSelect.getInstance(el)

    if (instance && instance.destroy) {
      instance.destroy()
    }
  }
}
