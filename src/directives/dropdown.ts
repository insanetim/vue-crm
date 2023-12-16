import type { Directive } from 'vue'

export default <Directive<HTMLElement>>{
  mounted(el) {
    window.M.Dropdown.init(el, {
      constrainWidth: false,
    })
  },
  beforeUnmount(el) {
    const instance = window.M.Dropdown.getInstance(el)

    if (instance && instance.destroy) {
      instance.destroy()
    }
  },
}
