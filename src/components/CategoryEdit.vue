<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ 'Edit' | localize }}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select
            ref="select"
            v-model="current"
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

        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="$v.title.$model"
            :class="{ invalid: $v.title.$error }"
          />
          <label for="name">{{ 'Title' | localize }}</label>
          <small
            class="helper-text invalid"
            v-if="$v.title.$dirty && !$v.title.required"
            >{{ 'Message_CategoryTitle' | localize }}</small
          >
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="$v.limit.$model"
            :class="{ invalid: $v.limit.$error }"
          />
          <label for="limit">{{ 'Limit' | localize }}</label>
          <small
            class="helper-text invalid"
            v-if="$v.limit.$dirty && !$v.limit.minValue"
            >{{ 'Message_MinLength' | localize }} {{ $v.limit.$params.minValue.min }}</small
          >
        </div>

        <button
          class="btn waves-effect waves-light"
          type="submit"
        >
          {{ 'Update' | localize }}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'
import localizeFilter from '@/filters/localize.filter'
import { categoryLimit } from '@/constants'

export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    select: null,
    title: '',
    limit: categoryLimit,
    current: null
  }),
  validations: {
    title: { required },
    limit: { minValue: minValue(categoryLimit) }
  },
  watch: {
    current(id) {
      const { title, limit } = this.categories.find(c => c.id === id)
      this.title = title
      this.limit = limit
    }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        await this.$store.dispatch('updateCategory', {
          id: this.current,
          title: this.title,
          limit: this.limit
        })
        this.$message(localizeFilter('Category_HasBeenUpdated'))
      } catch (e) {}
    }
  },
  created() {
    const { id, title, limit } = this.categories[0]
    this.current = id
    this.title = title
    this.limit = limit
  },
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select, {})
    M.updateTextFields()
  },
  updated() {
    this.select = M.FormSelect.init(this.$refs.select, {})
  },
  beforeDestroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>
