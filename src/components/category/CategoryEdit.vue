<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ localize('Edit') }}</h4>
      </div>

      <form @submit="onSubmit">
        <div class="input-field">
          <select
            v-model="current"
            v-select
          >
            <option
              v-for="c in categories"
              :key="c.id"
              :value="c.id"
            >
              {{ c.title }}
            </option>
          </select>
          <label>{{ localize('SelectCategory') }}</label>
        </div>

        <div class="input-field">
          <input
            id="title"
            v-model="title"
            v-bind="titleAttrs"
            :class="{ invalid: errors.title }"
            type="text"
          />
          <label for="title">{{ localize('Title') }}</label>
          <small
            v-if="errors.title"
            class="helper-text invalid"
            >{{ errors.title }}</small
          >
        </div>

        <div class="input-field">
          <input
            id="limit"
            v-model.number="limit"
            v-bind="limitAttrs"
            :class="{ invalid: errors.limit }"
            type="number"
          />
          <label for="limit">{{ localize('Limit') }}</label>
          <small
            v-if="errors.limit"
            class="helper-text invalid"
            >{{ errors.limit }}</small
          >
        </div>

        <button
          class="btn waves-effect waves-light"
          type="submit"
        >
          {{ localize('Update') }}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref, watch } from 'vue'

import type { CategoryPersistent, UserCategory } from '@/types'
import type { MessageType } from '@/plugins/message'
import { useCategoryStore } from '@/stores/category'
import { useCategoryForm } from '@/composables/useCategoryForm'
import { useUpdateTextFields } from '@/composables/useUpdateTextFields'
import localize from '@/utils/localize'

const $message = inject('$message') as MessageType
const categoryStore = useCategoryStore()
useUpdateTextFields()

const categories = computed<CategoryPersistent[]>(
  () => categoryStore.categories
)
const initCategory = categories.value[0]
const current = ref(initCategory.id)

const submitHandler = async (values: UserCategory) => {
  try {
    await categoryStore.updateCategory({
      id: current.value,
      ...values,
    })
    $message(localize('Category_HasBeenUpdated'))
  } catch (e) {}
}
const { limit, limitAttrs, title, titleAttrs, errors, onSubmit, setValues } =
  useCategoryForm(submitHandler, {
    limit: initCategory.limit,
    title: initCategory.title,
  })

watch(current, id => {
  const { limit, title } = categories.value.find(
    c => c.id === id
  ) as CategoryPersistent
  setValues({ limit, title })
})
</script>
