import { useForm } from 'vee-validate'
import { object, string } from 'yup'
import { toTypedSchema } from '@vee-validate/yup'

import type { CallbackFunction } from '@/types'
import { passwordMinLength } from '@/constants/index'
import localize from '@/utils/localize'

export function useLoginForm(fn: CallbackFunction) {
  const schema = toTypedSchema(
    object({
      email: string()
        .required(localize('Message_EmailRequired'))
        .email(localize('Message_EmailValid')),
      password: string()
        .required(localize('Message_EnterPassword'))
        .min(
          passwordMinLength,
          `${localize('Message_MinLength')} ${passwordMinLength}`
        ),
    })
  )
  const { errors, handleSubmit, defineField } = useForm({
    validationSchema: schema,
  })
  const [email, emailAttrs] = defineField('email')
  const [password, passwordAttrs] = defineField('password')

  const onSubmit = handleSubmit(values => {
    fn(values)
  })

  return { email, emailAttrs, password, passwordAttrs, errors, onSubmit }
}
