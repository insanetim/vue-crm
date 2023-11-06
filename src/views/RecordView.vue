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
          v-model="category"
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

<script setup lang="ts">
import { computed, inject, onMounted, onUpdated, ref } from 'vue'
import { useMeta } from 'vue-meta'

import type { MessageType } from '@/plugins/message'
import { useCategoryStore } from '@/stores/category'
import { useInfoStore } from '@/stores/info'
import { useRecordStore } from '@/stores/record'
import { useRecordForm } from '@/composables/useRecordForm'
import localize from '@/utils/localize'
import type { CategoryPersistent, UserInfo } from '@/types'

declare let M: any
type RecordValues = {
  amount: number
  description: string
  type: string
}

useMeta({ title: 'Menu_NewRecord' })
const infoStore = useInfoStore()
const recordStore = useRecordStore()
const categoryStore = useCategoryStore()
const $message = inject('$message') as MessageType

const loading = ref(true)
const category = ref<string>('')
const info = computed<UserInfo | null>(() => infoStore.info)
const categories = computed<CategoryPersistent[]>(
  () => categoryStore.categories
)
const canCreateRecord = computed(() => {
  if (type.value === 'income') {
    return true
  }

  return info.value!.bill >= (amount.value as number)
})

const submitHandler = async (values: RecordValues) => {
  if (canCreateRecord.value) {
    try {
      await recordStore.createRecord({
        ...values,
        categoryId: category.value,
        date: new Date().toJSON()
      })
      const bill =
        values.type === 'income'
          ? info.value!.bill + values.amount
          : info.value!.bill - values.amount
      await infoStore.updateInfo({ bill })
      $message(localize('RecordHasBeenCreated'))
      resetForm()
    } catch (e) {}
  } else {
    $message(
      `${localize('NotEnoughMoney')} (${values.amount - info.value!.bill})`
    )
  }
}
const { amount, description, errors, onSubmit, resetForm, type } =
  useRecordForm(submitHandler)

onMounted(async () => {
  await categoryStore.fetchCategories()
  loading.value = false
})

onUpdated(() => {
  if (categories.value.length && !category.value) {
    category.value = categories.value[0].id
  }
  M.updateTextFields()
})
</script>
