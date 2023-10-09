<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ localize('Edit') }}</h4>
      </div>

      <form @submit="onSubmit">
        <div class="input-field">
          <select
            ref="selectRef"
            v-model="current"
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

<script setup>
import useCategoryForm from '@/hooks/category-form'
import { useCategoryStore } from '@/stores/category'
import localize from '@/utils/localize'
import {
  computed,
  inject,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  ref,
  watch
} from 'vue'

const categoryStore = useCategoryStore()
const $message = inject('$message')
const categories = computed(() => categoryStore.categories)
const initCategory = categories.value[0]
const current = ref(initCategory.id)
const select = ref(null)
const selectRef = ref(null)
const { errors, limit, onSubmit, setValues, title } = useCategoryForm(
  submitHandler,
  {
    limit: initCategory.limit,
    title: initCategory.title
  }
)

async function submitHandler(values) {
  try {
    await categoryStore.updateCategory({
      id: current.value,
      ...values
    })
    $message(localize('Category_HasBeenUpdated'))
  } catch (e) {}
}

watch(current, id => {
  const { limit, title } = categories.value.find(c => c.id === id)
  setValues({ limit, title })
})

onMounted(() => {
  select.value = M.FormSelect.init(selectRef.value, {})
  M.updateTextFields()
})

onUpdated(() => {
  select.value = M.FormSelect.init(selectRef.value, {})
})

onBeforeUnmount(() => {
  if (select.value && select.value.destroy) {
    select.value.destroy()
  }
})
</script>
@/stores/category
