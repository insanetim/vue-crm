<template>
  <div>
    <div class="page-title">
      <h3>{{ localize('Menu_NewRecord') }}</h3>
    </div>

    <app-loader v-if="loading" />

    <form
      v-else-if="categories.length"
      class="form"
      @submit="onSubmit"
    >
      <div class="input-field">
        <select
          ref="selectRef"
          v-model="category"
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

      <p>
        <label>
          <input
            v-model="type"
            class="with-gap"
            name="type"
            type="radio"
            value="income"
          />
          <span>{{ localize('Income') }}</span>
        </label>
      </p>

      <p>
        <label>
          <input
            v-model="type"
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
          />
          <span>{{ localize('Outcome') }}</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          v-model.number="amount"
          :class="{ invalid: errors.amount }"
          type="number"
        />
        <label for="amount">{{ localize('Amount') }}</label>
        <small
          v-if="errors.amount"
          class="helper-text invalid"
          >{{ errors.amount }}</small
        >
      </div>

      <div class="input-field">
        <input
          id="description"
          v-model="description"
          :class="{ invalid: errors.description }"
          type="text"
        />
        <label for="description">{{ localize('Description') }}</label>
        <small
          v-if="errors.description"
          class="helper-text invalid"
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
      v-else
      class="center"
    >
      {{ localize('NoCategories') }}.
      <router-link :to="{ name: 'categories' }">
        {{ localize('AddFirst') }}
      </router-link>
    </p>
  </div>
</template>

<script setup>
import useRecordForm from '@/hooks/record-form'
import localize from '@/utils/localize'
import {
  computed,
  inject,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  ref
} from 'vue'
import { useMeta } from 'vue-meta'
import { useStore } from 'vuex'

useMeta({ title: 'Menu_NewRecord' })

const store = useStore()
const $message = inject('$message')
const loading = ref(true)
const select = ref(null)
const selectRef = ref(null)
const category = ref(null)
const info = computed(() => store.getters['info/info'])
const categories = computed(() => store.getters['category/categories'])
const { amount, description, errors, onSubmit, resetForm, type } =
  useRecordForm(submitHandler)
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
      const bill =
        values.type === 'income'
          ? info.value.bill + values.amount
          : info.value.bill - values.amount
      await store.dispatch('info/updateInfo', { bill })
      $message(localize('RecordHasBeenCreated'))
      resetForm()
    } catch (e) {}
  } else {
    $message(
      `${localize('NotEnoughMoney')} (${values.amount - info.value.bill})`
    )
  }
}

onMounted(async () => {
  await store.dispatch('category/fetchCategories')
  loading.value = false
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
