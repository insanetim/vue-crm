<template>
  <div>
    <div class="page-title">
      <h3>{{ localize('Menu_NewRecord') }}</h3>
    </div>

    <app-loader v-if="!ready"></app-loader>

    <form
      @submit="onSubmit"
      class="form"
      v-else-if="categories.length"
    >
      <div class="input-field">
        <select
          ref="selectRef"
          v-model="category"
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

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            v-model="type"
            value="income"
          />
          <span>{{ localize('Income') }}</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            v-model="type"
            value="outcome"
          />
          <span>{{ localize('Outcome') }}</span>
        </label>
      </p>

      <div class="input-field">
        <input
          :class="{ invalid: errors.amount }"
          id="amount"
          type="number"
          v-model.number="amount"
        />
        <label for="amount">{{ localize('Amount') }}</label>
        <small
          class="helper-text invalid"
          v-if="errors.amount"
          >{{ errors.amount }}</small
        >
      </div>

      <div class="input-field">
        <input
          :class="{ invalid: errors.description }"
          id="description"
          type="text"
          v-model="description"
        />
        <label for="description">{{ localize('Description') }}</label>
        <small
          class="helper-text invalid"
          v-if="errors.description"
          >{{ errors.description }}</small
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

    <p
      class="center"
      v-else
    >
      {{ localize('NoCategories') }}.
      <router-link to="/categories">{{ localize('AddFirst') }}</router-link>
    </p>
  </div>
</template>

<script setup>
import { computed, inject, onBeforeUnmount, onMounted, onUpdated, ref } from 'vue'
import { useMeta } from 'vue-meta'
import { useStore } from 'vuex'

import isReady from '../helpers/isReady'
import useRecordForm from '../hooks/record-form'
import localize from '../utils/localize'

useMeta({ title: 'Menu_NewRecord' })

const store = useStore()
const $message = inject('$message')
const select = ref(null)
const selectRef = ref(null)
const category = ref(null)
const info = computed(() => store.getters['info/info'])
const categories = computed(() => store.getters['category/categories'])
const ready = computed(() => isReady(store.getters['category/categoriesReady']))
const { amount, description, errors, onSubmit, resetForm, type } = useRecordForm(submitHandler)
const canCreateRecord = computed(() => {
  if (type.value === 'income') {
    return true
  }

  return info.value.bill >= amount.value
})

async function submitHandler(values) {
  if (canCreateRecord.value) {
    try {
      await store.dispatch('record/createRecord', {
        categoryId: category.value,
        date: new Date().toJSON(),
        ...values
      })
      const bill = values.type === 'income' ? info.value.bill + values.amount : info.value.bill - values.amount
      await store.dispatch('info/updateInfo', { bill })
      $message(localize('RecordHasBeenCreated'))
      resetForm()
    } catch (e) {}
  } else {
    $message(`${localize('NotEnoughMoney')} (${values.amount - info.value.bill})`)
  }
}

onMounted(async () => {
  await store.dispatch('category/fetchCategories')
})

onUpdated(() => {
  if (categories.value.length && !category.value) {
    category.value = categories.value[0].id
  }
  select.value = M.FormSelect.init(selectRef.value, {})
  M.updateTextFields()
})

onBeforeUnmount(() => {
  if (select.value && select.value.destroy) {
    select.value.destroy()
  }
})
</script>