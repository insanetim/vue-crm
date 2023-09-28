import localize from '../utils/localize'

export default {
  beforeUnmount(el) {
    const tooltip = M.Tooltip.getInstance(el)

    if (tooltip && tooltip.destroy) {
      tooltip.destroy()
    }
  },
  mounted(el, { modifiers, value }) {
    M.Tooltip.init(el, {
      ...value,
      html: modifiers.noloc ? value.html : localize(value.html)
    })
  }
}
