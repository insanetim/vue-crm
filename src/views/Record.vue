<template>
  <div>
    <div class="page-title">
      <h3>{{ 'Menu_NewRecord' | localize }}</h3>
    </div>

    <Loader v-if="!ready" />

    <p
      class="center"
      v-else-if="!categories.length"
    >
      {{ 'NoCategories' | localize }}.
      <RouterLink to="/categories">{{ 'AddFirst' | localize }}</RouterLink>
    </p>

    <form
      class="form"
      v-else
      @submit.prevent="submitHandler"
    >
      <div class="input-field">
        <select
          ref="select"
          v-model="category"
        >
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.title }}
          </option>
        </select>
        <label>{{ 'SelectCategory' | localize }}</label>
      </div>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="type"
          />
          <span>{{ 'Income' | localize }}</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type"
          />
          <span>{{ 'Outcome' | localize }}</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="$v.amount.$model"
          :class="{ invalid: $v.amount.$error }"
        />
        <label for="amount">{{ 'Amount' | localize }}</label>
        <small
          class="helper-text invalid"
          v-if="$v.amount.$dirty && !$v.amount.minValue"
          >{{ 'Message_MinLength' | localize }} {{ $v.amount.$params.minValue.min }}</small
        >
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="$v.description.$model"
          :class="{ invalid: $v.description.$error }"
        />
        <label for="description">{{ 'Description' | localize }}</label>
        <small
          class="helper-text invalid"
          v-if="$v.description.$dirty && !$v.description.required"
          >{{ 'Message_EnterDescription' | localize }}</small
        >
      </div>

      <button
        class="btn waves-effect waves-light"
        type="submit"
      >
        {{ 'Create' | localize }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
import localizeFilter from '@/filters/localize.filter'
import isReady from '@/helpers/isReady'

export default {
  name: 'record',
  data: () => ({
    select: null,
    category: null,
    type: 'outcome',
    amount: 1,
    description: ''
  }),
  validations: {
    amount: { minValue: minValue(1) },
    description: { required }
  },
  computed: {
    ...mapGetters(['info', 'categories']),
    ready() {
      return isReady(this.$store.getters.categoriesReady)
    },
    canCreateRecord() {
      if (this.type === 'income') {
        return true
      }

      return this.info.bill >= this.amount
    }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch('createRecord', {
            categoryId: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON()
          })

          const bill = this.type === 'income' ? this.info.bill + this.amount : this.info.bill - this.amount
          await this.$store.dispatch('updateInfo', { bill })

          this.$message(localizeFilter('RecordHasBeenCreated'))
          this.$v.$reset()
          this.amount = 1
          this.description = ''
        } catch (e) {}
      } else {
        this.$message(`${localizeFilter('NotEnoughMoney')} (${this.amount - this.info.bill})`)
      }
    }
  },
  async mounted() {
    await this.$store.dispatch('fetchCategories')
  },
  updated() {
    if (this.categories.length && !this.category) {
      this.category = this.categories[0].id
    }
    this.select = M.FormSelect.init(this.$refs.select, {})
    M.updateTextFields()
  },
  beforeDestroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>
