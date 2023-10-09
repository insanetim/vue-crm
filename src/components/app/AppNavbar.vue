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
            ref="dropdownRef"
            class="dropdown-trigger black-text"
            data-target="dropdown"
            href="#"
          >
            {{ info.name }}
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

<script setup>
import { useAuthStore } from '@/stores/auth'
import { useInfoStore } from '@/stores/info'
import dateFormat from '@/utils/dateFormat'
import localize from '@/utils/localize'
import { useNow } from '@vueuse/core'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const emit = defineEmits(['toggle'])

const authStore = useAuthStore()
const infoStore = useInfoStore()
const router = useRouter()
const dropdown = ref(null)
const dropdownRef = ref(null)
const info = computed(() => infoStore.info)
const now = useNow()

const logout = async () => {
  await authStore.logout()
  router.push({ name: 'login', query: { message: 'logout' } })
}

onMounted(() => {
  dropdown.value = M.Dropdown.init(dropdownRef.value, {
    constrainWidth: false
  })
})

onBeforeUnmount(() => {
  if (dropdown.value && dropdown.value.destroy) {
    dropdown.value.destroy()
  }
})
</script>
@/stores/auth@/stores/info
