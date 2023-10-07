<template>
  <div>
    <app-loader v-if="loading" />

    <div
      v-else
      class="app-main-layout"
    >
      <app-navbar @toggle="toggle()" />

      <app-sidebar
        :key="info.locale"
        :is-open="isOpen"
      />

      <main :class="['app-content', { full: !isOpen }]">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link
          v-tooltip="{
            html: 'CreateNewRecord',
            position: 'left'
          }"
          class="btn-floating btn-large blue"
          :to="{ name: 'record' }"
        >
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppNavbar from '@/components/app/AppNavbar.vue'
import AppSidebar from '@/components/app/AppSidebar.vue'
import localize from '@/utils/localize'
import messages from '@/utils/messages'
import { useToggle } from '@vueuse/core'
import { computed, inject, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const loading = ref(true)
const $error = inject('$error')
const info = computed(() => store.getters['info/info'])
const error = computed(() => store.getters.error)
const [isOpen, toggle] = useToggle(true)

watch(error, ({ code }) => {
  $error(localize(messages[code] ?? 'SomethingWentWrong'))
})

onMounted(async () => {
  if (!Object.keys(info.value).length) {
    await store.dispatch('info/fetchInfo')
  }
  loading.value = false
})
</script>
