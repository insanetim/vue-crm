import { useForm } from 'vee-validate'
import { boolean, object, string } from 'yup'
import { toTypedSchema } from '@vee-validate/yup'

import type { ProfileValues } from '@/types'
import localize from '@/utils/localize'

export const useProfileForm = (initialValues: Partial<ProfileValues> = {}) => {
  const validationSchema = toTypedSchema(
    object({
      isRuLocale: boolean().required(),
      name: string().required(localize('Message_EnterName')),
    })
  )
  const { errors, defineField, handleSubmit } = useForm<ProfileValues>({
    initialValues,
    validationSchema,
  })
  const [isRuLocale, isRuLocaleAttrs] = defineField('isRuLocale')
  const [name, nameAttrs] = defineField('name')

  return { isRuLocale, isRuLocaleAttrs, name, nameAttrs, errors, handleSubmit }
}
