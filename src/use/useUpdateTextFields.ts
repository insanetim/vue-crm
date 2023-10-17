import { onMounted } from 'vue'

declare let M: any

export function useUpdateTextFields() {
  onMounted(() => {
    M.updateTextFields()
  })
}
