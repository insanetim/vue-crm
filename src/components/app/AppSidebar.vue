<template>
  <ul :class="['sidenav app-sidenav', { open: isOpen }]">
    <router-link
      v-for="link in links"
      :key="link.url"
      :to="{ path: link.url }"
      v-slot="{ navigate, isExactActive, href }"
      custom
    >
      <li :class="{ active: isExactActive }">
        <a
          :href="href"
          class="waves-effect waves-orange pointer"
          @click="navigate"
          @keypress.enter="navigate()"
        >
          {{ link.title }}
        </a>
      </li>
    </router-link>
  </ul>
</template>

<script setup lang="ts">
import localize from '@/utils/localize'

type PropTypes = {
  isOpen: boolean
}

defineProps<PropTypes>()

const links = [
  { title: localize('Menu_Bill'), url: '/' },
  { title: localize('Menu_History'), url: '/history' },
  { title: localize('Menu_Planning'), url: '/planning' },
  { title: localize('Menu_NewRecord'), url: '/record' },
  { title: localize('Menu_Categories'), url: '/categories' },
] as const
</script>
