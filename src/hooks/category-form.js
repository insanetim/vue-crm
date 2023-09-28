import { toTypedSchema } from '@vee-validate/yup'
import { useForm } from 'vee-validate'
import { number, object, string } from 'yup'

import { categoryLimit } from '../constants'
import localize from '../utils/localize'

export default function useCategoryForm(fn, initialValues = {}) {
  const schema = toTypedSchema(
    object({
      limit: number().min(categoryLimit, `${localize('Message_MinLength')} ${categoryLimit}`),
      title: string().required(localize('Message_CategoryTitle'))
    })
  )
  const { errors, handleSubmit, resetForm, setValues, useFieldModel } = useForm({
    initialValues: {
      limit: initialValues.limit ?? categoryLimit,
      title: initialValues.title ?? ''
    },
    validationSchema: schema
  })
  const [limit, title] = useFieldModel(['limit', 'title'])

  const onSubmit = handleSubmit(values => {
    fn(values)
  })

  return { errors, limit, onSubmit, resetForm, setValues, title }
}
