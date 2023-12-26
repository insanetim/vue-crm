import { useForm } from 'vee-validate'
import { boolean, object, string } from 'yup'
import { toTypedSchema } from '@vee-validate/yup'

import type { RegisterValues } from '@/types'
import localize from '@/utils/localize'

export const useRegisterForm = () => {
  const validationSchema = toTypedSchema(
    object({
      agree: boolean().oneOf([true]).required(),
      email: string()
        .email(localize('Message_EmailValid'))
        .required(localize('Message_EmailRequired')),
      name: string().required(localize('Message_EnterName')),
      password: string()
        .min(6, localize('Message_MinLength'))
        .required(localize('Message_EnterPassword')),
    })
  )
  const { errors, defineField, handleSubmit } = useForm<RegisterValues>({
    initialValues: {
      agree: false,
    },
    validationSchema,
  })
  const [agree, agreeAttrs] = defineField('agree')
  const [email, emailAttrs] = defineField('email')
  const [name, nameAttrs] = defineField('name')
  const [password, passwordAttrs] = defineField('password')

  return {
    agree,
    agreeAttrs,
    email,
    emailAttrs,
    name,
    nameAttrs,
    password,
    passwordAttrs,
    errors,
    handleSubmit,
  }
}
