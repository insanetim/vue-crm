<template>
  <div>
    <div class="page-title">
      <h3>{{ localize('ProfileTitle') }}</h3>
    </div>

    <form
      @submit="onSubmit"
      class="form"
    >
      <div class="input-field">
        <input
          :class="{ invalid: errors.name }"
          id="name"
          type="text"
          v-model.trim="name"
        />
        <label for="name">{{ localize('Name') }}</label>
        <small
          class="helper-text invalid"
          v-if="errors.name"
          >{{ errors.name }}</small
        >
      </div>

      <div class="switch">
        <label>
          English
          <input
            type="checkbox"
            v-model="isRuLocale"
          />
          <span class="lever"></span>
          Русский
        </label>
      </div>

      <button
        class="btn waves-effect waves-light"
        type="submit"
      >
        {{ localize('Update') }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useMeta } from 'vue-meta'
import { useStore } from 'vuex'

import useProfileForm from '../hooks/profile-form'
import localize from '../utils/localize'

useMeta({ title: 'ProfileTitle' })

const store = useStore()
const info = computed(() => store.getters['info/info'])
const { errors, isRuLocale, name, onSubmit } = useProfileForm(submitHandler, {
  isRuLocale: info.value.locale === 'ru-RU',
  name: info.value.name
})

async function submitHandler({ isRuLocale, name }) {
  try {
    await store.dispatch('info/updateInfo', {
      locale: isRuLocale ? 'ru-RU' : 'en-US',
      name
    })
  } catch (e) {}
}

onMounted(() => {
  M.updateTextFields()
})
</script>

<style scoped>
.switch {
  margin-bottom: 2rem;
}
</style>
