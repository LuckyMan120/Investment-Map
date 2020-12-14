<template>
  <div class="footer">
    <BackToTop />
    <FooterSocial />
    <FooterAbout />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import FooterSocial from '~/components/footer/FooterSocial.vue';
import FooterAbout from '~/components/footer/FooterAbout.vue';
import BackToTop from '~/components/footer/BackToTop.vue';

export default Vue.extend({
  components: {
    FooterSocial,
    FooterAbout,
    BackToTop,
  },
});
</script>

<style scoped>
.footer {
  position: relative;
  z-index: 1;
  padding: 0;
}
</style>
