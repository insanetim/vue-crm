import { useForm } from 'vee-validate'
import { mixed, number, object, string } from 'yup'
import { toTypedSchema } from '@vee-validate/yup'

import type { CallbackFunction } from '@/types'
import localize from '@/utils/localize'

export function useRecordForm(fn: CallbackFunction) {
  const schema = toTypedSchema(
    object({
      amount: number().min(1, `${localize('Message_MinLength')} 1`),
      description: string().required(localize('Message_EnterDescription')),
      type: mixed().oneOf(['outcome', 'income']),
    })
  )
  const { errors, handleSubmit, resetForm, defineField } = useForm({
    initialValues: {
      amount: 1,
      description: '',
      type: 'outcome',
    },
    validationSchema: schema,
  })
  const [amount, amountAttrs] = defineField('amount')
  const [description, descriptionAttrs] = defineField('description')
  const [type, typeAttrs] = defineField('type')

  const onSubmit = handleSubmit(values => {
    fn(values)
  })

  return {
    amount,
    amountAttrs,
    description,
    descriptionAttrs,
    type,
    typeAttrs,
    errors,
    onSubmit,
    resetForm,
  }
}
