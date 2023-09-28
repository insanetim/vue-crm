<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a
          @click.prevent="$emit('toggle')"
          href="#"
        >
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{ dateFormat(date, 'datetime') }}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
            class="dropdown-trigger black-text"
            data-target="dropdown"
            href="#"
            ref="dropdownRef"
          >
            {{ info.name }}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul
            class="dropdown-content"
            id="dropdown"
          >
            <li>
              <router-link
                class="black-text"
                to="/profile"
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
                @click.prevent="logout"
                class="black-text"
                href="#"
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
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

import dateFormat from '../../utils/dateFormat'
import localize from '../../utils/localize'

const store = useStore()
const router = useRouter()
const date = ref(new Date())
const dropdown = ref(null)
const dropdownRef = ref(null)
const interval = ref(null)
const info = computed(() => store.getters['info/info'])

const logout = async () => {
  await store.dispatch('auth/logout')
  router.push('/login?message=logout')
}

onMounted(() => {
  interval.value = setInterval(() => {
    date.value = new Date()
  }, 1000)
  dropdown.value = M.Dropdown.init(dropdownRef.value, {
    constrainWidth: false
  })
})

onBeforeUnmount(() => {
  clearInterval(interval.value)
  if (dropdown.value && dropdown.value.destroy) {
    dropdown.value.destroy()
  }
})
</script>
