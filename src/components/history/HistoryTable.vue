<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>{{ localize('Amount') }}</th>
        <th>{{ localize('Date') }}</th>
        <th>{{ localize('Category') }}</th>
        <th>{{ localize('Type') }}</th>
        <th>{{ localize('Open') }}</th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="(record, idx) in records"
        :key="record.id"
      >
        <td>{{ idx + 1 }}</td>
        <td>{{ currencyFormat(record.amount) }}</td>
        <td>{{ dateFormat(record.date, 'datetime') }}</td>
        <td>{{ record.categoryName }}</td>
        <td>
          <span :class="['white-text badge', record.typeClass]">
            {{ record.typeText }}
          </span>
        </td>
        <td>
          <button
            v-tooltip="{ html: 'OpenRecord' }"
            class="btn-small btn"
            @click="$router.push({ name: 'detail', params: { id: record.id } })"
          >
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import currencyFormat from '../../utils/currencyFormat'
import dateFormat from '../../utils/dateFormat'
import localize from '../../utils/localize'

defineProps({
  records: {
    required: true,
    type: Array
  }
})
</script>
