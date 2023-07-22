<template>
  <ul
    class="sidenav app-sidenav"
    :class="{ open: value }"
  >
    <RouterLink
      v-for="link in links"
      :key="link.url"
      :to="link.url"
      custom
      v-slot="{ navigate, isExactActive }"
    >
      <li :class="{ active: isExactActive }">
        <a
          href="#"
          class="waves-effect waves-orange pointer"
          @click="navigate"
          @keypress.enter="navigate"
        >
          {{ link.title }}
        </a>
      </li>
    </RouterLink>
  </ul>
</template>

<script>
import localizeFilter from '@/filters/localize.filter'

export default {
  props: ['value'],
  data: () => ({
    links: [
      { title: localizeFilter('Menu_Bill'), url: '/' },
      { title: localizeFilter('Menu_History'), url: '/history' },
      { title: localizeFilter('Menu_Planning'), url: '/planning' },
      { title: localizeFilter('Menu_NewRecord'), url: '/record' },
      { title: localizeFilter('Menu_Categories'), url: '/categories' }
    ]
  })
}
</script>
