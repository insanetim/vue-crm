import { useForm } from 'vee-validate'
import { boolean, object, string } from 'yup'
import { toTypedSchema } from '@vee-validate/yup'

import type { CallbackFunction } from '@/types'
import localize from '@/utils/localize'

type InitialValues = {
  isRuLocale?: boolean
  name?: string
}

export function useProfileForm(
  fn: CallbackFunction,
  initialValues: InitialValues = {}
) {
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
