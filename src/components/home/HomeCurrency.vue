<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">{{ localize('CurrencyAmountTitle') }}</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>{{ localize('Currency') }}</th>
              <th>{{ localize('CurrencyType') }}</th>
              <th>{{ localize('Date') }}</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="cur in currencies"
              :key="cur"
            >
              <td>{{ cur }}</td>
              <td>{{ parseFloat(rates[cur].toFixed(5)) }}</td>
              <td>{{ dateFormat(date, 'date') }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { currencies } from '../../constants'
import dateFormat from '../../utils/dateFormat'
import localize from '../../utils/localize'

defineProps({
  date: {
    required: true,
    type: String
  },
  rates: {
    required: true,
    type: Object
  }
})
</script>
