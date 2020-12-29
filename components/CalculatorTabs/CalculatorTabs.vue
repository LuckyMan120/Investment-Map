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
      <transition-group
        name="tr-slide"
        mode="out-in"
        tag="div"
        class="card"
        :class="{ 'hide-card-overflow': isTransitioning }"
        @before-leave="isTransitioning = true"
        @after-enter="isTransitioning = false"
      >
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
            <h2 class="main-header-info-title">
              {{ mainInfo.data.statename }}
            </h2>
            <div class="info-header">
              <div class="info-header__country">
                <span class="info-header-title">County</span>
                <span class="info-header-title-value">{{
                  mainInfo.countyName
                }}</span>
              </div>

              <div class="info-header__geo">
                <span class="info-header-subtitle">GEO ID</span>
                <span class="info-header-subtitle-value">{{
                  mainInfo.geoId
                }}</span>
              </div>
            </div>
          </header>

          <div v-for="i in 1" :key="i" class="info-content-main">
            <span ref="mainInfoText" class="info-content-row-text">
              Urbanized / Total Population
            </span>
            <span class="info-content-row-value">{{
              mainInfo.data.population
            }}</span>

            <span ref="mainInfoText" class="info-content-row-text">
              Number of people with college degree or higher / total population
            </span>
            <span class="info-content-row-value">{{
              mainInfo.data.degree
            }}</span>

            <span ref="mainInfoText" class="info-content-row-text">
              Single family unit housing structures (%)
            </span>
            <span class="info-content-row-value">{{
              mainInfo.data.single
            }}</span>

            <span ref="mainInfoText" class="info-content-row-text">
              2-9 Unit housing structures (%)
            </span>
            <span class="info-content-row-value">{{
              mainInfo.data.medium
            }}</span>

            <span ref="mainInfoText" class="info-content-row-text">
              10 or more unit housing structures (%)
            </span>
            <span class="info-content-row-value">{{
              mainInfo.data.expand
            }}</span>

            <span ref="mainInfoText" class="info-content-row-text">
              Median household income
            </span>
            <span class="info-content-row-value">{{
              mainInfo.data.income
            }}</span>

            <span ref="mainInfoText" class="info-content-row-text">
              Number of people aged 25 or older who have a bachelor's degree,<br />master's
              degree, professional school degree, or doctorate degree, divided
              by the total number of people aged 25 or older in a tract (%)
            </span>
            <span class="info-content-row-value">{{
              parseFloat(mainInfo.data.degrees * 100).toFixed(2)
            }}</span>

            <span ref="mainInfoText" class="info-content-row-text">
              The median gross rent for renter-occupied housing units with two
              bedrooms that pay cash rent (from the 2011-2015 ACS)
            </span>
            <span class="info-content-row-value">{{
              mainInfo.data.house_count
            }}</span>

            <span ref="mainInfoText" class="info-content-row-text">
              Average annualized job growth rate over the time period 2004 to
              2013 (%)
            </span>
            <span class="info-content-row-value">{{
              parseFloat(mainInfo.data.job_growth_rate * 100).toFixed(2)
            }}</span>

            <span ref="mainInfoText" class="info-content-row-text">
              Number of jobs per square mile in each tract
            </span>
            <span class="info-content-row-value">{{
              parseFloat(mainInfo.data.per_square_job).toFixed()
            }}</span>

            <span ref="mainInfoText" class="info-content-row-text">
              Number of residents per square mile
            </span>
            <span class="info-content-row-value">{{
              parseFloat(mainInfo.data.residents_count).toFixed()
            }}</span>
          </div>
        </div>
      </div>

      <!--Side bar info-->
      <div
        v-if="sideInfo"
        v-show="isSideBarShown"
        class="card side-bar-info-card"
      >
        <button class="card-close-btn" @click="close">
          <img
            class="card-close-btn-icon"
            src="~assets/icons/icon-close.png"
            alt="close icon"
          />
        </button>

        <div class="info-content-container">
          <header class="info-header">
            <div class="info-header__country">
              <span class="info-header-title">County</span>
              <span class="info-header-title-value">{{
                sideInfo.countyname
              }}</span>
            </div>

            <div class="info-header__geo">
              <span class="info-header-subtitle">GEO ID</span>
              <span class="info-header-subtitle-value">{{
                sideInfo.geoid
              }}</span>
            </div>
          </header>

          <div v-for="i in 1" :key="i" class="info-content-side">
            <span ref="sideInfoText" class="info-content-row-value">{{
              sideInfo.population
            }}</span>

            <span ref="sideInfoText" class="info-content-row-value">{{
              sideInfo.degree
            }}</span>

            <span ref="sideInfoText" class="info-content-row-value">{{
              sideInfo.single
            }}</span>

            <span ref="sideInfoText" class="info-content-row-value">{{
              sideInfo.medium
            }}</span>

            <span ref="sideInfoText" class="info-content-row-value">{{
              sideInfo.expand
            }}</span>

            <span ref="sideInfoText" class="info-content-row-value">{{
              sideInfo.income
            }}</span>

            <span ref="sideInfoText" class="info-content-row-value">{{
              parseFloat(sideInfo.degrees * 100).toFixed(2)
            }}</span>

            <span ref="sideInfoText" class="info-content-row-value">{{
              sideInfo.house_count
            }}</span>

            <span ref="sideInfoText" class="info-content-row-value">{{
              parseFloat(sideInfo.job_growth_rate * 100).toFixed(2)
            }}</span>

            <span ref="sideInfoText" class="info-content-row-value">{{
              parseFloat(sideInfo.per_square_job).toFixed()
            }}</span>

            <span ref="sideInfoText" class="info-content-row-value">{{
              parseFloat(sideInfo.residents_count).toFixed()
            }}</span>
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
    changeStatus: Boolean,
  },
  data: () => ({
    mainInfoHeights: [],
    isSideBarShown: false,
    isTransitioning: false,
    sideInfo: null,
  }),
  watch: {
    changeStatus() {
      this.sideInfo = this.sidebarInfo;
      this.isSideBarShown = true;
    },
    info() {
      this.isSideBarShown = false;
    },
    sideInfo() {
      this.handleUpdateHeights();
    },
  },
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
    this.handleUpdateHeights();
  },
  methods: {
    setSelectedTab(i: any) {
      // @ts-ignore: Unreachable code error
      this.$emit('update:modelValue', this.tabs[i].name);
    },
    close() {
      this.isSideBarShown = false;
      this.sideInfo = null;
    },
    handleUpdateHeights() {
      if (this.info) {
        setTimeout(() => {
          // get heights of the each main info rows
          if (this.$refs.mainInfoText && this.$refs.mainInfoText.length > 0) {
            this.mainInfoTextHeights = [];
            this.$refs.mainInfoText.forEach((row) => {
              // get element height and save
              this.mainInfoTextHeights.push(row.getBoundingClientRect().height);
            });
          }

          if (this.$refs.sideInfoText && this.$refs.sideInfoText.length > 0) {
            // set height of each element
            this.$refs.sideInfoText.forEach((row, i) => {
              if (this.mainInfoTextHeights[i]) {
                row.style = `min-height: ${this.mainInfoTextHeights[i]}px`;
              }
            });
          }
        }, 0);
      }
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
  overflow-y: auto;
  overflow-x: hidden;
}

.hide-card-overflow {
  overflow: hidden;
}

// info shell
.info-shell {
  display: grid;
  grid-template-columns: 650px minmax(180px, auto);
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
  flex-direction: column;
  border-bottom: 1px solid $color-grey-3;
  padding-bottom: 15px;

  &__country,
  &__geo {
    display: flex;
    justify-content: space-between;
  }

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
    margin-left: 10px;
  }

  .info-header-subtitle {
    font-size: 0.6rem;
    color: $color-blue-3;
  }

  .info-header-subtitle-value {
    font-size: 0.6rem;
    margin-left: 10px;
  }
}

.info-content-container {
  padding: 0 16px 20px 16px;
}

.info-content-side {
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.9rem;

  & > * + * {
    margin-top: 14px;
  }
}

.info-content-main {
  margin-top: 25px;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-column-gap: 25px;
  grid-row-gap: 14px;
}

.info-content-row-text {
  color: $color-grey-3;
}

.info-content-row-value {
  color: $color-blue-1;
  font-weight: 500;
  white-space: nowrap;
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
    }
  }
}
</style>
