<template>
  <div class="shell">
    <h2 class="title">{{ title }}</h2>

    <div class="separator" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    title: String,
  },
});
</script>

<style lang="scss" scoped>
.shell {
  display: flex;
  align-items: center;
  margin-bottom: 60px;
  margin-top: 20px;
}

.title {
  font-size: 2.275rem;
  font-weight: bold;
  margin-right: 55px;
  color: $color-blue-1;
  white-space: nowrap;
}

.separator {
  height: 6px;
  width: 100%;
  border-top: 1px solid $color-blue-1;
  border-bottom: 3px solid $color-blue-1;
}
</style>
