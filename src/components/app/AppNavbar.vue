<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a
          href="#"
          @click.prevent="emit('toggle')"
        >
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{ dateFormat(now, 'datetime') }}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
            href="#"
            class="dropdown-trigger black-text"
            data-target="dropdown"
            v-dropdown
          >
            {{ info?.name }}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul
            id="dropdown"
            class="dropdown-content"
          >
            <li>
              <router-link
                class="black-text"
                :to="{ name: 'profile' }"
              >
                <i class="material-icons">account_circle</i>
                {{ localize('ProfileTitle') }}
              </router-link>
            </li>
            <li
              class="divider"
              tabindex="-1"
            ></li>
            <li>
              <a
                class="black-text"
                href="#"
                @click.prevent="logout"
              >
                <i class="material-icons">assignment_return</i>
                {{ localize('Exit') }}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useNow } from '@vueuse/core'

import { useAuthStore } from '@/stores/auth'
import { useInfoStore } from '@/stores/info'
import dateFormat from '@/utils/dateFormat'
import localize from '@/utils/localize'
import type { UserInfo } from '@/types'

type EmitTypes = {
  (e: 'toggle'): void
}

const emit = defineEmits<EmitTypes>()

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const infoStore = useInfoStore()
const now = useNow()

const info = computed<UserInfo | null>(() => infoStore.info)

const logout = async () => {
  await authStore.logout()
  router.replace({
    name: 'login',
    query: { message: 'logout', from: route.name?.toString() },
  })
}
</script>
