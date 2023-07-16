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
export default {
  props: ['value'],
  data: () => ({
    links: [
      { title: 'Счет', url: '/' },
      { title: 'История', url: '/history' },
      { title: 'Планирование', url: '/planning' },
      { title: 'Новая запись', url: '/record' },
      { title: 'Категории', url: '/categories' }
    ]
  })
}
</script>
