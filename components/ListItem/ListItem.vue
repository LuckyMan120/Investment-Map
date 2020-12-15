<template>
  <ul class="items" :class="{ small, bold }">
    <li v-for="(item, i) in items" :key="i" class="item">
      <p :style="{ color }" v-html="item"></p>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    small: Boolean,
    bold: Boolean,
    color: String,
  },
});
</script>

<style lang="scss" scoped>
.items {
  padding: 0 2px 0 0;
}

.item {
  font-size: 1.3rem;
  list-style-type: none;
  display: flex;
  margin-bottom: 25px;
  line-height: 1.5;

  & > p {
    margin-bottom: 0;
  }

  &:last-of-type {
    margin-bottom: 0;
  }

  &::before {
    content: '';
    background: url('~assets/icons/check-icon.png');
    background-repeat: no-repeat;
    display: block;
    background-size: cover;
    flex: 0 0 50px;
    height: 50px;
    margin-right: 90px;
  }
}

// small style
.small {
  .item {
    &::before {
      flex: 0 0 40px;
      height: 40px;
      margin-right: 70px;
    }
  }
}

// bold style
.bold {
  .item {
    font-weight: bold;
  }
}
</style>
