<template>
  <div class="shell">
    <!--calculator shell-->
    <div v-if="!info" class="calc-shell">
      <!--Tabs-->
      <ul class="tabs">
        <li
          v-for="(tab, i) in tabs"
          :key="i"
          class="tab"
          :class="{ 'tab--active': tab.name === modelValue }"
          @click="setSelectedTab(i)"
        >
          {{ tab.text }}
        </li>
      </ul>

      <!--Cards-->
      <transition-group name="tr-slide" mode="out-in" tag="div" class="card">
        <slot></slot>
        <!--
          slots should be passed as an html element(div is preferred) with the following format:
          <div v-show="activeTab === 'tab-name'" key="tab-name"> content </div>
          active tab is the v-model that binds to tab <Tabs> component
         -->
      </transition-group>
    </div>
    <!--Info shell-->
    <div
      v-else
      class="info-shell"
      :class="{
        'info-shell-no-sidebar': sidebarInfo === null || !isSideBarShown,
      }"
    >
      <button class="info-shell-btn" @click="$emit('back')">
        Back to calculator
        <img
          class="info-shell-btn-icon"
          src="~assets/icons/icon-enter.png"
          alt="enter icon"
        />
      </button>

      <!--Main info-->
      <div v-if="mainInfo" class="card main-info-card">
        <div class="info-content-container">
          <header class="main-info-header">
            <h2 class="main-header-info-title">{{ mainInfo.title }}</h2>
            <div class="info-header">
              <span class="info-header-title">County</span>
              <span class="info-header-title-value">{{
                mainInfo.country
              }}</span>
              <span class="info-header-subtitle">GEO ID</span>
              <span class="info-header-subtitle-value">{{
                mainInfo.geoId
              }}</span>
            </div>
          </header>

          <div class="info-content">
            <span
              v-for="(row, i) in mainInfo.rows"
              :key="i"
              class="info-content-row"
              ref="mainInfoRow"
            >
              <span class="info-content-row-text">
                {{ row.text }}
              </span>
              <span class="info-content-row-value">{{ row.value }}</span>
            </span>
          </div>
        </div>
      </div>

      <!--Side bar info-->
      <div
        v-if="sidebarInfo"
        v-show="isSideBarShown"
        class="card side-bar-info-card"
      >
        <button @click="isSideBarShown = false" class="card-close-btn">
          <img
            class="card-close-btn-icon"
            src="~assets/icons/icon-close.png"
            alt="close icon"
          />
        </button>

        <div class="info-content-container">
          <header class="info-header">
            <span class="info-header-title">County</span>
            <span class="info-header-title-value">{{
              sidebarInfo.country
            }}</span>
            <span class="info-header-subtitle">GEO ID</span>
            <span class="info-header-subtitle-value">{{
              sidebarInfo.geoId
            }}</span>
          </header>

          <div class="info-content">
            <span
              v-for="(row, i) in sidebarInfo.rows"
              :key="i"
              class="info-content-row side-bar-content-row"
              :style="{ minHeight: `${mainInfoHeights[i]}px` }"
            >
              <span class="info-content-row-value">{{ row.value }}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  model: {
    prop: 'modelValue',
    event: 'update:modelValue',
  },
  props: {
    tabs: {
      type: Array /* [ { text: 'some thing', name: 'some-thing' } ] - name should be matched with the slot */,
      required: true,
      validator(arr) {
        return arr.every(
          (step: any) =>
            step.text &&
            typeof step.text === 'string' &&
            step.name &&
            (typeof step.name === 'string' || typeof step.name === 'number')
        );
      },
    },
    modelValue: {
      type: String || Number, // Model value
      required: true,
    },
    info: Boolean,
    mainInfo: Object || null,
    sidebarInfo: Object || null,
  },
  data: () => ({
    mainInfoHeights: [],
    isSideBarShown: true,
  }),
  created() {
    // Update v-model tab to the first passed tab if v-model value is not valid
    if (this.tabs?.length > 0) {
      // @ts-ignore: Unreachable code error
      if (!this.tabs.some((tab) => tab.name === this.modelValue)) {
        // @ts-ignore: Unreachable code error
        this.$emit('update:modelValue', this.tabs[0].name);
      }
    }
  },
  mounted() {
    // get heights of the each main info rows
    // @ts-ignore: Unreachable code error
    this.$refs.mainInfoRow.forEach((row) => {
      // get element height and save
      // @ts-ignore: Unreachable code error
      this.mainInfoHeights.push(row.getBoundingClientRect().height);
    });
  },
  methods: {
    setSelectedTab(i: any) {
      // @ts-ignore: Unreachable code error
      this.$emit('update:modelValue', this.tabs[i].name);
    },
  },
});
</script>

<style scoped lang="scss">
.calc-shell {
  display: flex;
}

.tabs {
  display: flex;
  flex-direction: column;
  order: 2;
  margin: 0;
  z-index: 1;
  transform: translateX(-5px);
  padding: 30px 0 0 0;
}

.tab {
  background-color: $color-blue-3;
  padding: 25px 14px;
  list-style-type: none;
  border-radius: 0 25px 25px 0;
  line-height: 1.1;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  transition: all 0.1s ease-in-out;
  cursor: pointer;
  color: $color-grey-4;
  font-weight: bold;

  &--active {
    background-color: $color-blue-4;
    color: $color-white;
  }

  &:hover {
    transform: translateX(5px);
  }
}

.card {
  border-radius: 16px;
  border: 1px solid $color-grey-3;
  padding: 20px;
  z-index: 2;
  min-width: 300px;
  min-height: 400px;
  max-height: calc(100vh - 140px);
  overflow: auto;
  overflow-x: hidden;
}

// info shell
.info-shell {
  display: grid;
  grid-template-columns: 650px 180px;
  grid-template-rows: auto auto;
  grid-column-gap: 15px;
  grid-row-gap: 35px;
  grid-auto-flow: revert;

  .card {
    min-width: unset;
    padding: 10px;
  }
}

.info-shell-no-sidebar {
  grid-template-columns: 650px;
}

.info-shell-btn {
  border-radius: 16px;
  font-weight: bold;
  background-color: $color-blue-6;
  border: none;
  grid-column: 1 / -1;
  width: max-content;
  padding: 10px 15px;
  justify-self: flex-end;
  display: flex;
  align-items: center;
  color: $color-white;
}

.info-shell-btn-icon {
  height: 17px;
  margin-left: 12px;
}

.card-close-btn {
  background: none;
  border: none;
  padding: 0;
  border-radius: 100px;
  height: 27px;
  width: 27px;
  align-self: flex-end;
  margin-bottom: 10px;
}

.card-close-btn-icon {
  height: 100%;
  width: 100%;
}

.side-bar-info-card,
.main-info-card {
  display: flex;
  flex-direction: column;
}

.side-bar-info-card {
  grid-column: 2 / -1;
}

.info-header {
  display: flex;
  flex-wrap: wrap;
  border-bottom: 1px solid $color-grey-3;
  padding-bottom: 15px;
  flex: 1 0 50%;

  .info-header-title {
    color: $color-blue-3;
    font-size: 0.9rem;
    margin-bottom: 5px;
  }

  .info-header-title-value {
    color: $color-blue-3;
    font-weight: bold;
    font-size: 0.9rem;
    margin-bottom: 5px;
    margin-left: auto;
  }

  .info-header-subtitle {
    font-size: 0.6rem;
    color: $color-blue-3;
  }

  .info-header-subtitle-value {
    font-size: 0.6rem;
    margin-left: auto;
  }
}

.info-content-container {
  padding: 0 16px 20px 16px;
}

.info-content {
  margin-top: 25px;
  display: flex;
  flex-direction: column;

  & > * + * {
    margin-top: 14px;
  }
}

.info-content-row {
  display: flex;
  justify-content: space-between;
}

.side-bar-content-row {
  font-size: 0.9rem;
  text-align: center;

  .info-content-row-value {
    margin-left: 0;
  }
}

.info-content-row-text {
  color: $color-grey-3;
  flex: 0 0 85%;
}

.info-content-row-value {
  color: $color-blue-1;
  font-weight: 500;
  flex: 1 1 15%;
  margin-left: 10px;
}

.main-info-card {
  .main-info-header {
    margin-top: 37px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid $color-grey-3;
    padding-bottom: 15px;
    align-items: center;

    .main-header-info-title {
      color: $color-blue-3;
      flex: 1 0 50%;
      margin-bottom: 0;
      line-height: 1.1;
    }

    .info-header {
      border-bottom: none;
      padding-bottom: 0;
      display: grid;
      grid-template-columns: repeat(2, auto);
      grid-template-rows: repeat(2, auto);
      max-width: 126px;
    }
  }
}
</style>
