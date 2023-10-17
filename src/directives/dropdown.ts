import type { Directive } from 'vue'

declare let M: any

export default <Directive<HTMLElement>>{
  mounted(el) {
    M.Dropdown.init(el, {
      constrainWidth: false
    })
  },
  beforeUnmount(el) {
    const instance = M.Dropdown.getInstance(el)

    if (instance && instance.destroy) {
      instance.destroy()
    }
  }
}
