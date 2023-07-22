import localizeFilter from '@/filters/localize.filter'

export default {
  bind(el, { value, modifiers }) {
    M.Tooltip.init(el, {
      ...value,
      html: modifiers.noloc ? value.html : localizeFilter(value.html)
    })
  },
  unbind(el) {
    const tooltip = M.Tooltip.getInstance(el)

    if (tooltip && tooltip.destroy) {
      tooltip.destroy()
    }
  }
}
