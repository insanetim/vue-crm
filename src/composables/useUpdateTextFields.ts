import { onMounted } from 'vue'

export function useUpdateTextFields() {
  onMounted(() => {
    window.M.updateTextFields()
  })
}
