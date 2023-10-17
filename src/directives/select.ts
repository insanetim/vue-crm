import type { Directive } from 'vue'

declare let M: any

export default <Directive<HTMLElement>>{
  mounted(el) {
    M.FormSelect.init(el, {})
  },
  updated(el) {
    M.FormSelect.init(el, {})
  },
  beforeUnmount(el) {
    const instance = M.FormSelect.getInstance(el)

    if (instance && instance.destroy) {
      instance.destroy()
    }
  }
}
