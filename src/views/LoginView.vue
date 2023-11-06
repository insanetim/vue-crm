<template>
  <form
    class="card auth-card"
    @submit="onSubmit"
  >
    <div class="card-content">
      <span class="card-title">{{ localize('CRM_Title') }}</span>
      <div class="input-field">
        <input
          id="email"
          v-model.trim="email"
          :class="{ invalid: errors.email }"
          type="text"
        />
        <label for="email">Email</label>
        <small
          v-if="errors.email"
          class="helper-text invalid"
          >{{ errors.email }}</small
        >
      </div>

      <div class="input-field">
        <input
          id="password"
          v-model.trim="password"
          :class="{ invalid: errors.password }"
          type="password"
        />
        <label for="password">{{ localize('Password') }}</label>
        <small
          v-if="errors.password"
          class="helper-text invalid"
          >{{ errors.password }}</small
        >
      </div>
    </div>

    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
        >
          {{ localize('Login') }}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{ localize('NoAccount') }}
        <router-link :to="{ name: 'register' }">
          {{ localize('Register') }}
        </router-link>
      </p>
    </div>
  </form>
</template>

<script setup lang="ts">
import { inject, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMeta } from 'vue-meta'

import type { Credentials } from '@/types'
import type { MessageType } from '@/plugins/message'
import { useAuthStore } from '@/stores/auth'
import { useLoginForm } from '@/composables/useLoginForm'
import localize from '@/utils/localize'
import messages from '@/utils/messages'

useMeta({ title: 'Login' })
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const $message = inject('$message') as MessageType

const login = async (values: Omit<Credentials, 'name'>) => {
  try {
    await authStore.login(values)
    router.replace({ name: route.query.from?.toString() || 'home' })
  } catch (e) {}
}
const { email, errors, onSubmit, password } = useLoginForm(login)

onMounted(() => {
  const code = route.query.message as keyof typeof messages
  if (messages[code]) {
    $message(localize(messages[code]))
  }
})
</script>
