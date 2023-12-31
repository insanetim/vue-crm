import type { Directive } from 'vue'

import localize from '@/utils/localize'

type ValueShape = {
  html: string
  position?: string
}

export default <Directive<HTMLElement, ValueShape>>{
  mounted(el, { modifiers, value }) {
    window.M.Tooltip.init(el, {
      ...value,
      html: modifiers.noloc ? value.html : localize(value.html),
    })
  },
  beforeUnmount(el) {
    const instance = window.M.Tooltip.getInstance(el)

    if (instance && instance.destroy) {
      instance.destroy()
    }
  },
}
