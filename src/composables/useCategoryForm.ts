import { useForm } from 'vee-validate'
import { number, object, string } from 'yup'
import { toTypedSchema } from '@vee-validate/yup'

import type { CallbackFunction } from '@/types'
import { categoryLimit } from '@/constants'
import localize from '@/utils/localize'

type InitialValues = {
  limit?: number
  title?: string
}

export function useCategoryForm(
  fn: CallbackFunction,
  initialValues: InitialValues = {}
) {
  const schema = toTypedSchema(
    object({
      limit: number().min(
        categoryLimit,
        `${localize('Message_MinLength')} ${categoryLimit}`
      ),
      title: string().required(localize('Message_CategoryTitle'))
    })
  )
  const { errors, handleSubmit, resetForm, setValues, useFieldModel } = useForm(
    {
      initialValues: {
        limit: initialValues.limit ?? categoryLimit,
        title: initialValues.title ?? ''
      },
      validationSchema: schema
    }
  )
  const [limit, title] = useFieldModel(['limit', 'title'])

  const onSubmit = handleSubmit(values => {
    fn(values)
  })

  return { errors, limit, onSubmit, resetForm, setValues, title }
}
