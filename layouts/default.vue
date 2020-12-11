<template>
  <div class="page-container">
    <Header />
    <Nuxt />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Header from '~/components/header/Header.vue';

export default Vue.extend({
  components: {
    Header,
  },
});
</script>
