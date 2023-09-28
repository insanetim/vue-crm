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

      <p>
        <label>
          <input
            type="checkbox"
            v-model="agree"
          />
          <span>{{ localize('AcceptRules') }}</span>
        </label>
      </p>
    </div>

    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
        >
          {{ localize('Register') }}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{ localize('HasAccount') }}
        <router-link to="/login">{{ localize('Login') }}</router-link>
      </p>
    </div>
  </form>
</template>

<script setup>
import { useMeta } from 'vue-meta'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

import useRegisterForm from '../hooks/register-form'
import localize from '../utils/localize'

useMeta({ title: 'Register' })

const store = useStore()
const router = useRouter()

const register = async values => {
  try {
    await store.dispatch('auth/register', values)
    router.push('/')
  } catch (e) {}
}

const { agree, email, errors, name, onSubmit, password } = useRegisterForm(register)
</script>
