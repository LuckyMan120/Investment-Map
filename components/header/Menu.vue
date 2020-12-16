<template>
  <ul class="menu">
    <li class="menu-item">
      <NuxtLink to="/opportunity" class="menu-link">Opportunity</NuxtLink>
    </li>
    <li class="menu-item">
      <nuxt-link to="/impact" class="menu-link">Impact</nuxt-link>
    </li>
    <li class="menu-item">
      <nuxt-link to="/calculator" class="menu-link">Calculator</nuxt-link>
    </li>
    <li class="menu-item">
      <nuxt-link to="/news" class="menu-link">News</nuxt-link>
    </li>
    <li class="menu-item">
      <nuxt-link to="/about" class="menu-link">About</nuxt-link>
    </li>
    <li class="menu-item">
      <nuxt-link to="/contact" class="menu-link">Contact</nuxt-link>
    </li>
    <Search />
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';

import Search from '~/components/header/Search.vue';

export default Vue.extend({
  components: {
    Search,
  },
});
</script>

<style scoped>
.menu {
  list-style: none;
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0;
}

.menu-item {
  margin-right: 65px;
}

.menu-link {
  color: white;
  font-size: 0.975rem;
  text-decoration: none;
  font-weight: bold;
}
</style>
