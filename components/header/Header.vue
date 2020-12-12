<template>
  <div class="header">
    <div class="header-container">
      <Logo />
      <Spacer />
      <Menu />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Logo from '~/components/header/Logo.vue';
import Menu from '~/components/header/Menu.vue';

export default Vue.extend({
  components: {
    Logo,
    Menu,
  },
});
</script>

<style scoped>
.header {
  display: flex;
  height: 78px;
  justify-content: center;
  background-color: #062155;
}

.header-container {
  width: 80%;
  display: flex;
}
</style>
