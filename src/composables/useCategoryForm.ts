import type { Ref } from 'vue'
import { useForm, type BaseFieldProps, type GenericObject } from 'vee-validate'
import { number, object, string } from 'yup'
import { toTypedSchema } from '@vee-validate/yup'

import type { UserCategory } from '@/types'
import { categoryLimit } from '@/constants'
import localize from '@/utils/localize'

type UseCategoryForm = Pick<
  ReturnType<typeof useForm<UserCategory>>,
  'errors' | 'setValues' | 'handleSubmit'
> & {
  limit: Ref<number>
  limitAttrs: Ref<BaseFieldProps & GenericObject>
  title: Ref<string>
  titleAttrs: Ref<BaseFieldProps & GenericObject>
}

export const useCategoryForm = (
  initialValues: Partial<UserCategory> = {}
): UseCategoryForm => {
  const validationSchema = toTypedSchema(
    object({
      limit: number()
        .min(categoryLimit, `${localize('Message_MinLength')} ${categoryLimit}`)
        .required(),
      title: string().required(localize('Message_CategoryTitle')),
    })
  )

  const { errors, defineField, setValues, handleSubmit } =
    useForm<UserCategory>({
      initialValues: {
        limit: initialValues.limit ?? categoryLimit,
        title: initialValues.title ?? '',
      },
      validationSchema,
    })
  const [limit, limitAttrs] = defineField('limit')
  const [title, titleAttrs] = defineField('title')

  return {
    limit,
    limitAttrs,
    title,
    titleAttrs,
    errors,
    setValues,
    handleSubmit,
  }
}
