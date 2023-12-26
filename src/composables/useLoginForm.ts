import { useForm } from 'vee-validate'
import { object, string } from 'yup'
import { toTypedSchema } from '@vee-validate/yup'

import type { Credentials } from '@/types'
import { passwordMinLength } from '@/constants/index'
import localize from '@/utils/localize'

export const useLoginForm = () => {
  const validationSchema = toTypedSchema(
    object({
      email: string()
        .email(localize('Message_EmailValid'))
        .required(localize('Message_EmailRequired')),
      password: string()
        .min(
          passwordMinLength,
          `${localize('Message_MinLength')} ${passwordMinLength}`
        )
        .required(localize('Message_EnterPassword')),
    })
  )
  const { errors, defineField, handleSubmit } = useForm<
    Omit<Credentials, 'name'>
  >({
    validationSchema,
  })
  const [email, emailAttrs] = defineField('email')
  const [password, passwordAttrs] = defineField('password')

  return { email, emailAttrs, password, passwordAttrs, errors, handleSubmit }
}
