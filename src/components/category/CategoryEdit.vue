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
              :key="category.id"
              :value="category.id"
              v-for="category in categories"
            >
              {{ category.title }}
            </option>
          </select>
          <label>{{ localize('SelectCategory') }}</label>
        </div>

        <div class="input-field">
          <input
            :class="{ invalid: errors.title }"
            id="title"
            type="text"
            v-model="title"
          />
          <label for="title">{{ localize('Title') }}</label>
          <small
            class="helper-text invalid"
            v-if="errors.title"
            >{{ errors.title }}</small
          >
        </div>

        <div class="input-field">
          <input
            :class="{ invalid: errors.limit }"
            id="limit"
            type="number"
            v-model.number="limit"
          />
          <label for="limit">{{ localize('Limit') }}</label>
          <small
            class="helper-text invalid"
            v-if="errors.limit"
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
import { computed, inject, onBeforeUnmount, onMounted, onUpdated, ref, watch } from 'vue'
import { useStore } from 'vuex'

import useCategoryForm from '../../hooks/category-form'
import localize from '../../utils/localize'

const store = useStore()
const $message = inject('$message')
const categories = computed(() => store.getters['category/categories'])
const initCategory = categories.value[0]
const current = ref(initCategory.id)
const select = ref(null)
const selectRef = ref(null)
const { errors, limit, onSubmit, setValues, title } = useCategoryForm(submitHandler, {
  limit: initCategory.limit,
  title: initCategory.title
})

async function submitHandler(values) {
  try {
    await store.dispatch('category/updateCategory', {
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
