<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ 'Create' | localize }}</h4>
      </div>

      <form @submit.prevent="submitHandler">
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
          {{ 'Create' | localize }}
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
  data: () => ({
    title: '',
    limit: categoryLimit
  }),
  validations: {
    title: { required },
    limit: { minValue: minValue(categoryLimit) }
  },
  mounted() {
    M.updateTextFields()
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        const category = await this.$store.dispatch('createCategory', {
          title: this.title,
          limit: this.limit
        })

        this.$v.$reset()
        this.title = ''
        this.limit = categoryLimit
        this.$emit('created', category)
        this.$message(localizeFilter('Category_HasBeenCreated'))
      } catch (e) {}
    }
  }
}
</script>
