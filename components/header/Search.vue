<template>
  <div class="search-container">
    <button class="search-button" @click="isInputShown = !isInputShown">
      <fa :icon="faSearch" size="lg" color="#fff" />
    </button>

    <input
      v-if="isInputShown"
      class="search-input"
      type="text"
      placeholder="Start typing..."
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default Vue.extend({
  data: () => ({
    isInputShown: false,
  }),
  computed: {
    faSearch: () => faSearch,
  },
});
</script>

<style scoped lang="scss">
.search-container {
  display: flex;
  align-items: center;
}

.search-button {
  background: none;
  border: none;
  border-radius: 500px;
  width: 40px;
  height: 40px;
  order: 2;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
}

.search-input {
  border-radius: 100px;
  padding: 5px 10px;
  font-size: 14px;
  border: none;
  min-width: 200px;
  margin-right: 10px;

  &:focus {
    outline: none;
  }
}
</style>
