import { toTypedSchema } from '@vee-validate/yup'
import { useForm } from 'vee-validate'
import { boolean, object, string } from 'yup'

import localize from '../utils/localize'

export default function useRegisterForm(fn) {
  const schema = toTypedSchema(
    object({
      agree: boolean().oneOf([true]),
      email: string().required(localize('Message_EmailRequired')).email(localize('Message_EmailValid')),
      name: string().required(localize('Message_EnterName')),
      password: string().required(localize('Message_EnterPassword')).min(6, localize('Message_MinLength'))
    })
  )
  const { errors, handleSubmit, useFieldModel } = useForm({
    initialValues: {
      agree: false
    },
    validationSchema: schema
  })
  const [agree, email, name, password] = useFieldModel(['agree', 'email', 'name', 'password'])

  const onSubmit = handleSubmit(values => {
    fn(values)
  })

  return { agree, email, errors, name, onSubmit, password }
}
