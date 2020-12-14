<template>
  <div class="page-container">
    <Header />
    <Nuxt />
    <Footer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Header from '~/components/header/Header.vue';
import Footer from '~/components/footer/Footer.vue';

export default Vue.extend({
  components: {
    Header,
    Footer,
  },
});
</script>
