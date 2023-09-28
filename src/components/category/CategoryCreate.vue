<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ localize('Create') }}</h4>
      </div>

      <form @submit="onSubmit">
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
          {{ localize('Create') }}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { inject, onMounted } from 'vue'
import { useStore } from 'vuex'

import useCategoryForm from '../../hooks/category-form'
import localize from '../../utils/localize'

const store = useStore()
const $message = inject('$message')
const { errors, limit, onSubmit, resetForm, title } = useCategoryForm(submitHandler)

async function submitHandler(values) {
  try {
    await store.dispatch('category/createCategory', values)
    resetForm()
    $message(localize('Category_HasBeenCreated'))
  } catch (e) {}
}

onMounted(() => {
  M.updateTextFields()
})
</script>
