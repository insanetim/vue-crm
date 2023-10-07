import localize from '@/utils/localize'
import { toTypedSchema } from '@vee-validate/yup'
import { useForm } from 'vee-validate'
import { boolean, object, string } from 'yup'

export default function useProfileForm(fn, initialValues = {}) {
  const schema = toTypedSchema(
    object({
      isRuLocale: boolean(),
      name: string().required(localize('Message_EnterName'))
    })
  )
  const { errors, handleSubmit, useFieldModel } = useForm({
    initialValues,
    validationSchema: schema
  })
  const [isRuLocale, name] = useFieldModel(['isRuLocale', 'name'])

  const onSubmit = handleSubmit(values => {
    fn(values)
  })

  return { errors, isRuLocale, name, onSubmit }
}
