import { onMounted } from 'vue'

export const useUpdateTextFields = () => {
  onMounted(() => {
    window.M.updateTextFields()
  })
}
