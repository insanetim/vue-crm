import { useForm } from 'vee-validate'
import { mixed, number, object, string } from 'yup'
import { toTypedSchema } from '@vee-validate/yup'

import type { RecordValues } from '@/types'
import localize from '@/utils/localize'

export const useRecordForm = () => {
  const validationSchema = toTypedSchema(
    object({
      amount: number()
        .min(1, `${localize('Message_MinLength')} 1`)
        .required(),
      description: string().required(localize('Message_EnterDescription')),
      type: mixed().oneOf(['outcome', 'income']).required(),
    })
  )
  const { errors, defineField, handleSubmit } = useForm<RecordValues>({
    initialValues: {
      amount: 1,
      description: '',
      type: 'outcome',
    },
    validationSchema,
  })
  const [amount, amountAttrs] = defineField('amount')
  const [description, descriptionAttrs] = defineField('description')
  const [type, typeAttrs] = defineField('type')

  return {
    amount,
    amountAttrs,
    description,
    descriptionAttrs,
    type,
    typeAttrs,
    errors,
    handleSubmit,
  }
}
