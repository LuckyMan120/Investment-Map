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
    <div v-else class="info-shell">
      <button class="info-shell-btn" @click="$emit('back')">
        Back to calculator
        <img
          class="info-shell-btn-icon"
          src="~assets/icons/icon-enter.png"
          alt="enter icon"
        />
      </button>

      <!--Main info-->
      <div class="card main-info-card">
        <div class="info-content-container">
          <header class="main-info-header">
            <h2 class="main-header-info-title">Alabama</h2>
            <div class="info-header">
              <span class="info-header-title">County</span>
              <span class="info-header-title-value">Chilton</span>
              <span class="info-header-subtitle">GEO ID</span>
              <span class="info-header-subtitle-value">01021060102</span>
            </div>
          </header>

          <div class="info-content">
            <span class="info-content-row">
              <span class="info-content-row-text">
                Urbanised / Total Population
              </span>
              <span class="info-content-row-value">0/6303</span>
            </span>

            <span class="info-content-row">
              <span class="info-content-row-text">
                Number of people with college degree or higher
              </span>
              <span class="info-content-row-value">276</span>
            </span>

            <span class="info-content-row">
              <span class="info-content-row-text">
                Single family unit housing structures (%)
              </span>
              <span class="info-content-row-value">65.63</span>
            </span>

            <span class="info-content-row">
              <span class="info-content-row-text">
                2 -9 Unit housing structure (%)
              </span>
              <span class="info-content-row-value">5.47</span>
            </span>

            <span class="info-content-row">
              <span class="info-content-row-text">
                10 or more Unit housing structure (%)
              </span>
              <span class="info-content-row-value">0</span>
            </span>

            <span class="info-content-row">
              <span class="info-content-row-text">
                Median household income
              </span>
              <span class="info-content-row-value">$32,301</span>
            </span>

            <span class="info-content-row">
              <span class="info-content-row-text">
                People aged 25 or older with bachelor’s Degree Master’s degree,
                Professional school degree, doctorate degree, divided by the
                total number of people aged 25 or older in a tract (%)
              </span>
              <span class="info-content-row-value">5.89</span>
            </span>

            <span class="info-content-row">
              <span class="info-content-row-text">
                Median gross rent for renter occupied housing units
              </span>
              <span class="info-content-row-value">3.57</span>
            </span>

            <span class="info-content-row">
              <span class="info-content-row-text">
                Average annual job growth rate (2004 - 2013)
              </span>
              <span class="info-content-row-value">3.57</span>
            </span>

            <span class="info-content-row">
              <span class="info-content-row-text">
                Residents Per square mile
              </span>
              <span class="info-content-row-value">7</span>
            </span>

            <span class="info-content-row">
              <span class="info-content-row-text">
                Residents Per square mile
              </span>
              <span class="info-content-row-value">41</span>
            </span>
          </div>
        </div>
      </div>

      <!--Side bar info-->
      <div class="card side-bar-info-card">
        <button class="card-close-btn">
          <img
            class="card-close-btn-icon"
            src="~assets/icons/icon-close.png"
            alt="close icon"
          />
        </button>

        <div class="info-content-container">
          <header class="info-header">
            <span class="info-header-title">County</span>
            <span class="info-header-title-value">Chilton</span>
            <span class="info-header-subtitle">GEO ID</span>
            <span class="info-header-subtitle-value">01021060102</span>
          </header>

          <div class="info-content">
            <span class="info-content-row side-bar-content-row">
              <span class="info-content-row-value">0/6303</span>
            </span>
            <span class="info-content-row side-bar-content-row">
              <span class="info-content-row-value">819</span>
            </span>
            <span class="info-content-row side-bar-content-row">
              <span class="info-content-row-value">16.83</span>
            </span>
            <span class="info-content-row side-bar-content-row">
              <span class="info-content-row-value">3.39</span>
            </span>
            <span class="info-content-row side-bar-content-row">
              <span class="info-content-row-value">3.39</span>
            </span>
            <span class="info-content-row side-bar-content-row">
              <span class="info-content-row-value">$ 48,301</span>
            </span>
            <span class="info-content-row side-bar-content-row">
              <span class="info-content-row-value">21.31</span>
            </span>
            <span class="info-content-row side-bar-content-row">
              <span class="info-content-row-value">479</span>
            </span>
            <span class="info-content-row side-bar-content-row">
              <span class="info-content-row-value">-1.19</span>
            </span>
            <span class="info-content-row side-bar-content-row">
              <span class="info-content-row-value">88</span>
            </span>
            <span class="info-content-row side-bar-content-row">
              <span class="info-content-row-value">253</span>
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
  },
  created() {
    // Update v-model tab to the first passed tab if v-model value is not valid
    if (this.tabs?.length > 0) {
      if (!this.tabs.some((tab) => tab.name === this.modelValue)) {
        this.$emit('update:modelValue', this.tabs[0].name);
      }
    }
  },
  methods: {
    setSelectedTab(i: any) {
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
}

// Tab slider transition
.tr-slide-leave-active,
.tr-slide-enter-active {
  transition: all 0.4s ease-in-out;
}

.tr-slide-enter,
.tr-slide-leave-to {
  opacity: 0;
  position: absolute;
  top: 0;
  width: 100%;
}

.tr-slide-enter {
  transform: translateY(-100%);
}
.tr-slide-leave-to {
  transform: translateY(100%);
}

// info shell
.info-shell {
  display: grid;
  grid-template-columns: 650px 180px;
  grid-template-rows: auto auto;
  grid-column-gap: 15px;
  grid-row-gap: 35px;

  .card {
    min-width: unset;
    padding: 10px;
  }
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
