<template>
  <form
    @submit="onSubmit"
    class="card auth-card"
  >
    <div class="card-content">
      <span class="card-title">{{ localize('CRM_Title') }}</span>
      <div class="input-field">
        <input
          :class="{ invalid: errors.email }"
          id="email"
          type="text"
          v-model.trim="email"
        />
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-if="errors.email"
          >{{ errors.email }}</small
        >
      </div>

      <div class="input-field">
        <input
          :class="{ invalid: errors.password }"
          id="password"
          type="password"
          v-model.trim="password"
        />
        <label for="password">{{ localize('Password') }}</label>
        <small
          class="helper-text invalid"
          v-if="errors.password"
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
        <router-link to="/register">{{ localize('Register') }}</router-link>
      </p>
    </div>
  </form>
</template>

<script setup>
import { inject, onMounted } from 'vue'
import { useMeta } from 'vue-meta'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

import useLoginForm from '../hooks/login-form'
import localize from '../utils/localize'
import messages from '../utils/messages'

useMeta({ title: 'Login' })

const store = useStore()
const route = useRoute()
const router = useRouter()
const $message = inject('$message')

const login = async values => {
  try {
    await store.dispatch('auth/login', values)
    router.push('/')
  } catch (e) {}
}

const { email, errors, onSubmit, password } = useLoginForm(login)

onMounted(() => {
  if (messages[route.query.message]) {
    $message(localize(messages[route.query.message]))
  }
})
</script>
