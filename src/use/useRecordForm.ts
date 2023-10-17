import { useForm } from 'vee-validate'
import { number, object, string } from 'yup'
import { toTypedSchema } from '@vee-validate/yup'

import type { CallbackFunction } from '@/types'
import localize from '@/utils/localize'

export function useRecordForm(fn: CallbackFunction) {
  const schema = toTypedSchema(
    object({
      amount: number().min(1, `${localize('Message_MinLength')} 1`),
      description: string().required(localize('Message_EnterDescription')),
      type: string().required()
    })
  )
  const { errors, handleSubmit, resetForm, useFieldModel } = useForm({
    initialValues: {
      amount: 1,
      description: '',
      type: 'outcome'
    },
    validationSchema: schema
  })
  const [amount, description, type] = useFieldModel([
    'amount',
    'description',
    'type'
  ])

  const onSubmit = handleSubmit(values => {
    fn(values)
  })

  return { amount, description, errors, onSubmit, resetForm, type }
}
