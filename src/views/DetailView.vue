<template>
  <div>
    <app-loader v-if="loading" />

    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link
          class="breadcrumb"
          :to="{ name: 'history' }"
        >
          {{ localize('Menu_History') }}
        </router-link>
        <a
          class="breadcrumb"
          @click.prevent
        >
          {{ localize(record.type === 'income' ? 'Income' : 'Outcome') }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div
            :class="[
              'card',
              {
                red: record.type === 'outcome',
                green: record.type === 'income'
              }
            ]"
          >
            <div class="card-content white-text">
              <p>{{ localize('Description') }}: {{ record.description }}</p>
              <p>
                {{ localize('Amount') }}: {{ currencyFormat(record.amount) }}
              </p>
              <p>{{ localize('Category') }}: {{ record.categoryName }}</p>
              <small>{{ dateFormat(record.date, 'datetime') }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <p
      v-else
      class="center"
    >
      Запись с id={{ id }} не найдена
    </p>
  </div>
</template>

<script setup>
import currencyFormat from '@/utils/currencyFormat'
import dateFormat from '@/utils/dateFormat'
import localize from '@/utils/localize'
import { onMounted, ref } from 'vue'
import { useMeta } from 'vue-meta'
import { useStore } from 'vuex'

useMeta({ title: 'Detail_Title' })

const { id } = defineProps({
  id: {
    required: true,
    type: String
  }
})
const store = useStore()
const record = ref(null)
const loading = ref(true)

onMounted(async () => {
  const currentRecord = await store.dispatch('record/fetchRecordById', id)

  if ('categoryId' in currentRecord) {
    const category = await store.dispatch(
      'category/fetchCategoryById',
      currentRecord.categoryId
    )
    record.value = {
      ...currentRecord,
      categoryName: category.title
    }
  }

  loading.value = false
})
</script>
