<template>
  <div class="investment-result-chart-container">
    <div class="chart-container">
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

    <!--Lines-->
    <div class="lines-container">
      <div
        class="separator"
        :class="{ [`separator--${i + 1}`]: true }"
        v-for="(range, i) in ranges"
        :key="i"
      >
        <span class="separator__line" />
        <span class="separator__text">{{ range }}</span>
      </div>
    </div>

    <button class="info-btn">
      <InfoIcon class="info-btn-icon" />
    </button>
  </div>
</template>

<script>
import InfoIcon from '@/assets/icons/Icon metro-info.svg';

export default {
  name: 'CalculatorChart',
  components: {
    InfoIcon,
  },
  props: {
    items: Array,
    ranges: Array,
  },
  methods: {
    calcWidth(progress) {
      const MAX_PROGRESS = 450; // px
      return `${(progress / 100) * MAX_PROGRESS}px`;
    },
  },
};
</script>

<style lang="scss" scoped>
.chart-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  align-items: center;
  grid-row-gap: 7px;
  padding: 14px 0;
}

.lines-container {
  display: grid;
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  grid-template-columns: 1fr 1px 1fr 1px 1fr 1px 1fr 1px 1fr;
}

.investment-result-chart-container {
  margin-top: 20px;
  background-color: $color-grey-6;
  border-left: 1px solid $color-blue-5;
  position: relative;
  display: grid;
  z-index: 2;

  .investment-result-chart {
    display: flex;
    align-items: center;
    grid-column: 1 / -1;
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
    white-space: nowrap;
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

.separator {
  display: flex;
  flex-direction: column;
  grid-row: 1 / -1;
  align-items: center;
  z-index: -1;

  &--1 {
    grid-column: 2 / 3;
  }

  &--2 {
    grid-column: 4 / 5;
  }

  &--3 {
    grid-column: 6 / 7;
  }

  &--4 {
    grid-column: 8 / 9;
  }

  &__line {
    width: 1px;
    display: block;
    height: 100%;
    background-color: $color-grey-5;
    flex: 1 0 100%;
  }

  &__text {
    font-size: 8px;
    white-space: nowrap;
    color: $color-grey-3;
  }
}

.info-btn {
  position: absolute;
  right: 10px;
  bottom: 10px;
  background: none;
  border: none;
  padding: 0;
  margin: 0;
}
</style>
