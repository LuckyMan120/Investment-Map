<template>
  <div class="home-page">
    <HomeCarousel />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import HomeCarousel from '~/components/home/HomeCarousel.vue';

export default Vue.extend({
  components: {
    HomeCarousel,
  },
});
</script>
