<template>
  <ul :class="['sidenav app-sidenav', { open: isOpen }]">
    <router-link
      :key="link.url"
      :to="link.url"
      custom
      v-for="link in links"
      v-slot="{ navigate, isExactActive, href }"
    >
      <li :class="{ active: isExactActive }">
        <a
          :href="href"
          @click="navigate"
          @keypress.enter="navigate"
          class="waves-effect waves-orange pointer"
        >
          {{ link.title }}
        </a>
      </li>
    </router-link>
  </ul>
</template>

<script setup>
import localize from '../../utils/localize'

defineProps({
  isOpen: {
    default: true,
    required: true,
    type: Boolean
  }
})
const links = [
  { title: localize('Menu_Bill'), url: '/' },
  { title: localize('Menu_History'), url: '/history' },
  { title: localize('Menu_Planning'), url: '/planning' },
  { title: localize('Menu_NewRecord'), url: '/record' },
  { title: localize('Menu_Categories'), url: '/categories' }
]
</script>
