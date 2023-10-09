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

<script setup>
import useLoginForm from '@/hooks/login-form'
import { useAuthStore } from '@/stores/auth'
import localize from '@/utils/localize'
import messages from '@/utils/messages'
import { inject, onMounted } from 'vue'
import { useMeta } from 'vue-meta'
import { useRoute, useRouter } from 'vue-router'

useMeta({ title: 'Login' })

const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()
const $message = inject('$message')

const login = async values => {
  try {
    await authStore.login(values)
    router.push({ name: 'home' })
  } catch (e) {}
}

const { email, errors, onSubmit, password } = useLoginForm(login)

onMounted(() => {
  if (messages[route.query.message]) {
    $message(localize(messages[route.query.message]))
  }
})
</script>
@/stores/auth
