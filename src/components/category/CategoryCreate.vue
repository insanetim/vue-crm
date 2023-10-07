<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ localize('Create') }}</h4>
      </div>

      <form @submit="onSubmit">
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
          {{ localize('Create') }}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import useCategoryForm from '@/hooks/category-form'
import localize from '@/utils/localize'
import { inject, onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const $message = inject('$message')
const { errors, limit, onSubmit, resetForm, title } =
  useCategoryForm(submitHandler)

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
