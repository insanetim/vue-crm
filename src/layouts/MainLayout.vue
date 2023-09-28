<template>
  <div>
    <app-loader v-if="loading"></app-loader>

    <div
      class="app-main-layout"
      v-else
    >
      <app-navbar @toggle="isOpen = !isOpen"></app-navbar>

      <app-sidebar
        :isOpen="isOpen"
        :key="info.locale"
      ></app-sidebar>

      <main :class="['app-content', { full: !isOpen }]">
        <div class="app-page">
          <router-view></router-view>
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link
          class="btn-floating btn-large blue"
          to="/record"
          v-tooltip="{
            html: 'CreateNewRecord',
            position: 'left'
          }"
        >
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, inject, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'

import AppNavbar from '../components/app/AppNavbar.vue'
import AppSidebar from '../components/app/AppSidebar.vue'
import localize from '../utils/localize'
import messages from '../utils/messages'

const store = useStore()
const isOpen = ref(true)
const loading = ref(true)
const $error = inject('$error')
const info = computed(() => store.getters['info/info'])
const error = computed(() => store.getters.error)

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
