<template>
  <div class="investment-result-chart-container">
    <div class="investment-result-chart" v-for="(item, i) in items" :key="i">
      <div
        class="investment-result-chart-bar"
        :style="{ width: calcWidth(item.progress) }"
      >
        {{ item.value }}
      </div>
      <div class="investment-result-chart-text">
        <span class="investment-result-chart-title">{{ item.title }}</span>
        <span class="investment-result-chart-subtitle">{{
          item.subtitle
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CalculatorChart',
  props: {
    items: Array,
  },
  methods: {
    calcWidth(progress) {
      const MAX_PROGRESS = 410; // px
      return `${(progress / 100) * MAX_PROGRESS}px`;
    },
  },
};
</script>

<style lang="scss" scoped>
.investment-result-chart-container {
  margin-top: 20px;
  background-color: $color-grey-6;
  padding: 14px 0;
  border-left: 1px solid $color-blue-5;

  .investment-result-chart {
    display: flex;
    align-items: center;
  }

  .investment-result-chart-bar {
    background: linear-gradient(to right, $color-blue-6, $color-blue-3);
    font-size: 0.8rem;
    font-weight: bold;
    color: $color-white;
    line-height: 1.1;
    align-items: center;
    padding: 12px;
    border-radius: 0 100px 100px 0;
    margin-right: 11px;
    text-align: right;
    margin-bottom: 7px;
    white-space: nowrap;

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  .investment-result-chart-text {
    display: flex;
    flex-direction: column;
  }

  .investment-result-chart-title {
    color: $color-blue-3;
    font-size: 0.8rem;
    font-weight: bold;
  }

  .investment-result-chart-subtitle {
    font-size: 0.65rem;
    color: $color-blue-6;
  }
}
</style>
