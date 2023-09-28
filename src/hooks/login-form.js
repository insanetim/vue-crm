import { toTypedSchema } from '@vee-validate/yup'
import { useForm } from 'vee-validate'
import { object, string } from 'yup'

import localize from '../utils/localize'

const MIN_LENGTH = 6

export default function useLoginForm(fn) {
  const schema = toTypedSchema(
    object({
      email: string().required(localize('Message_EmailRequired')).email(localize('Message_EmailValid')),
      password: string()
        .required(localize('Message_EnterPassword'))
        .min(MIN_LENGTH, `${localize('Message_MinLength')} ${MIN_LENGTH}`)
    })
  )
  const { errors, handleSubmit, useFieldModel } = useForm({
    validationSchema: schema
  })
  const [email, password] = useFieldModel(['email', 'password'])

  const onSubmit = handleSubmit(values => {
    fn(values)
  })

  return { email, errors, onSubmit, password }
}
