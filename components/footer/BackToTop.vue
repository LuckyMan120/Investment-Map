<template>
  <div class="back-to-top">
    <b-container>
      <button class="back-to-top-btn" @click="scrollToTop">
        <span class="back-to-top-text">Back to top</span>
        <fa :icon="faAngleDoubleUp" />
      </button>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons';

export default Vue.extend({
  computed: {
    faAngleDoubleUp: () => faAngleDoubleUp,
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    },
  },
});
</script>

<style scoped>
.back-to-top > div {
  position: relative;
}

.back-to-top-btn {
  background-color: #2275c3;
  border-radius: 7px 7px 0 0;
  text-decoration: none;
  font-size: 1rem;
  color: white;
  position: absolute;
  top: -10px;
  right: 0;
  padding: 5px 10px;
  transition: top 0.3s;
  z-index: -1;
  border: none;

  &:focus,
  &:active {
    outline: none;
  }
}

.back-to-top-btn:hover {
  top: -34px;
}

.back-to-top-text {
  font-weight: 700;
  display: inline-block;
  margin-right: 5px;
}
</style>
