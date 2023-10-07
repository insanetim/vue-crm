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

      <p>
        <label>
          <input
            v-model="agree"
            type="checkbox"
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
        <router-link :to="{ name: 'login' }">
          {{ localize('Login') }}
        </router-link>
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
    router.push({ name: 'home' })
  } catch (e) {}
}

const { agree, email, errors, name, onSubmit, password } =
  useRegisterForm(register)
</script>
