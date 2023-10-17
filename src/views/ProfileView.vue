<template>
  <div>
    <div class="page-title">
      <h3>{{ localize('ProfileTitle') }}</h3>
    </div>

    <form
      class="form"
      @submit="onSubmit"
    >
      <div class="input-field">
        <input
          id="name"
          v-model.trim="name"
          :class="{ invalid: errors.name }"
          type="text"
        />
        <label for="name">{{ localize('Name') }}</label>
        <small
          v-if="errors.name"
          class="helper-text invalid"
          >{{ errors.name }}</small
        >
      </div>

      <div class="switch">
        <label>
          English
          <input
            v-model="isRuLocale"
            type="checkbox"
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

<script setup lang="ts">
import { computed } from 'vue'
import { useMeta } from 'vue-meta'

import type { UserInfo } from '@/types'
import { useInfoStore } from '@/stores/info'
import { useProfileForm } from '@/use/useProfileForm'
import { useUpdateTextFields } from '@/use/useUpdateTextFields'
import localize from '@/utils/localize'

type ProfileValues = {
  isRuLocale: boolean
  name: string
}

useMeta({ title: 'ProfileTitle' })
const infoStore = useInfoStore()
useUpdateTextFields()

const info = computed<UserInfo | null>(() => infoStore.info)

const submitHandler = async ({ isRuLocale, name }: ProfileValues) => {
  try {
    await infoStore.updateInfo({
      locale: isRuLocale ? 'ru-RU' : 'en-US',
      name
    })
  } catch (e) {}
}
const { errors, isRuLocale, name, onSubmit } = useProfileForm(submitHandler, {
  isRuLocale: info.value?.locale === 'ru-RU',
  name: info.value?.name
})
</script>

<style scoped>
.switch {
  margin-bottom: 2rem;
}
</style>
