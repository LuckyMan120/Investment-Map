<template>
  <div class="calculator-page">
    <!-- google map -->
    <GmapMap
      :center="center"
      :zoom="zoom"
      map-type-id="roadmap"
      style="width: 100%"
      class="calculator-page"
      :options="mapStyle"
    ></GmapMap>
    <!--Tabs-->
    <CalculatorTabs
      v-model="activeTab"
      class="calculator-tabs"
      :tabs="tabs"
      :info="info"
      :main-info="calcMainInfo"
      :sidebar-info="calcSideBarInfo"
      @back="info = false"
    >
      <!--Investment tab-->
      <div
        v-show="activeTab === 'investment'"
        key="investment"
        class="investment-tab"
      >
        <header class="calculator-header">
          <h1 class="calculator-header-title">Investment</h1>
          <button class="calculator-header-help-btn" @click="info = true">
            <img
              src="~assets/icons/question-mark-circle.png"
              class="calculator-header-icon"
              alt="question mark icon"
            />
          </button>
          <h2 class="calculator-header-subtitle">Calculator</h2>
        </header>

        <section class="investment-pre-calc">
          <div class="input-select-container mr-4">
            <span class="input-select-label">State</span>
            <Select v-model="stateSelect" :select-items="stateSelectItems" />
          </div>

          <div class="input-select-container">
            <span class="input-select-label">Sector</span>
            <Select v-model="sectorSelect" :select-items="sectorSelectItems" />
          </div>

          <div class="input-text-container">
            <span class="input-text-label">Initial Value of Business</span>
            <span class="input-text-prefix">$</span>
            <input type="number" class="form-control" />
          </div>

          <div class="input-text-container">
            <span class="input-text-label">Cash Investment in Business</span>
            <span class="input-text-prefix">$</span>
            <input type="number" class="form-control" />
          </div>

          <div class="input-text-container">
            <span class="input-text-label">Sales Price of the Business</span>
            <span class="input-text-prefix">$</span>
            <input type="number" class="form-control" />
          </div>

          <div class="input-text-container">
            <span class="input-text-label">Number of Employees</span>
            <input type="number" class="form-control" />
          </div>

          <button
            v-if="!isCalculated"
            class="button"
            @click="isCalculated = true"
          >
            Calculate
          </button>
        </section>

        <section v-if="isCalculated" class="investment-result">
          <div class="investment-result-statics-container">
            <div class="investment-result-statics-row">
              <span class="investment-result-statics-title">With OZ</span>
              <span class="investment-result-statics-prefix">&</span>
              <span class="investment-result-statics-data">477,800</span>
            </div>

            <div class="investment-result-statics-row">
              <span class="investment-result-statics-title">Without OZ</span>
              <span class="investment-result-statics-prefix">&</span>
              <span class="investment-result-statics-data">398,300</span>
            </div>

            <div class="investment-result-statics-row">
              <span class="investment-result-statics-title">Difference</span>
              <span class="investment-result-statics-prefix">&</span>
              <span class="investment-result-statics-data">80,000</span>
            </div>
          </div>

          <div class="investment-result-chart-container">
            <div class="investment-result-chart">
              <div
                class="investment-result-chart-bar investment-result-chart-bar-with-oz"
              >
                $ 477.8 k
              </div>
              <div class="investment-result-chart-text">
                <span class="investment-result-chart-title">With OZ</span>
                <span class="investment-result-chart-subtitle">After Tax</span>
              </div>
            </div>

            <div class="investment-result-chart">
              <div
                class="investment-result-chart-bar investment-result-chart-bar-without-oz"
              >
                $ 398.3 k
              </div>
              <div class="investment-result-chart-text">
                <span class="investment-result-chart-title">Without OZ</span>
                <span class="investment-result-chart-subtitle">After Tax</span>
              </div>
            </div>

            <div class="investment-result-chart">
              <div
                class="investment-result-chart-bar investment-result-chart-bar-diff"
              >
                $ 53 k
              </div>
            </div>
          </div>

          <div class="row mt-4">
            <div class="col-md-6 d-flex justify-content-end">
              <button @click="isCalculated = false" class="button button-grey">
                <fa class="mr-2" :icon="faChevronLeft" /> Back
              </button>
            </div>
            <div class="col-md-6 d-flex justify-content-start">
              <button class="button">Download</button>
            </div>
          </div>
        </section>
      </div>

      <!--Read state tab-->
      <div
        v-show="activeTab === 'real-estate'"
        key="real-estate"
        class="real-estate-tab"
      >
        <header class="calculator-header">
          <h1 class="calculator-header-title">Investment</h1>
          <button class="calculator-header-help-btn">
            <img
              src="~assets/icons/question-mark-circle-grey.png"
              class="calculator-header-icon"
              alt="question mark icon"
            />
          </button>
          <h2 class="calculator-header-subtitle">Calculator</h2>
          <Select
            class="calculator-header-select"
            v-model="stateSelect"
            :select-items="stateSelectItems"
          />
        </header>

        <section class="real-estate-pre-calc">
          <div class="input-text-container">
            <span class="input-text-label">Price paid for the Asset</span>
            <span class="input-text-prefix">$</span>
            <input type="number" class="form-control" />
          </div>

          <div class="input-text-container">
            <span class="input-text-label">Sold price of the Asset</span>
            <span class="input-text-prefix">$</span>
            <input type="number" class="form-control" />
          </div>

          <div class="input-text-container">
            <span class="input-text-label">Assumed Growth rate (%)</span>
            <span class="input-text-prefix"></span>
            <input type="number" class="form-control" />
          </div>

          <div class="input-text-container">
            <span class="input-text-label">Holding Period (years)</span>
            <span class="input-text-prefix"></span>
            <input type="number" class="form-control" />
          </div>

          <button class="button">Calculate</button>
        </section>
      </div>
    </CalculatorTabs>

    <!--Search-->
    <CalculatorSearch
      v-model="searchInput"
      :results="resultItems"
      class="calculator-search"
    />
  </div>
</template>

<script>
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import CalculatorTabs from '@/components/CalculatorTabs/CalculatorTabs.vue';
import CalculatorSearch from '@/components/CalculatorSearch/CalculatorSearch.vue';
import Select from '@/components/Select/Select.vue';
import mapStyle from '@/static/data/mapStyle.json';

export default {
  layout: 'calculator',
  components: {
    CalculatorTabs,
    CalculatorSearch,
    Select,
  },
  data: () => ({
    // State select
    stateSelect: 'alabama',
    stateSelectItems: [
      {
        text: 'Alabama',
        value: 'alabama',
      },
      {
        text: 'Miami',
        value: 'miami',
      },
    ],
    // Health care select
    sectorSelect: 'health-care',
    sectorSelectItems: [
      {
        text: 'Health Care',
        value: 'health-care',
      },
      {
        text: 'Education',
        value: 'education',
      },
    ],

    // Tabs
    activeTab: '',
    tabs: [
      {
        text: 'Investment',
        name: 'investment',
      },
      {
        text: 'Real Estate',
        name: 'real-estate',
      },
    ],

    calcMainInfo: {
      title: 'Alabama',
      country: 'Chilton',
      geoId: '01021060102',
      rows: [
        {
          text: 'Urbanised / Total Population',
          value: '0/6303',
        },
        {
          text: 'Number of people with college degree or higher',
          value: '276',
        },
        {
          text:
            'People aged 25 or older with bachelor’s Degree' +
            'Master’s degree, Professional school degree, doctorate degree, divided by the total number of people aged 25 or older in a tract (%)',
          value: '276',
        },
        {
          text: 'Number of people with college degree or higher',
          value: '276',
        },
      ],
    },

    calcSideBarInfo: {
      country: 'Chilton',
      geoId: '01021060102',
      rows: [
        {
          value: '0/6303',
        },
        {
          value: '0/6303',
        },
        {
          value: '0/6303',
        },
        {
          value: '0/6303',
        },
      ],
    },

    isCalculated: false,
    info: false,

    // search
    searchInput: '',
    resultItems: [
      {
        text: 'Chilton',
      },
      {
        text: 'Alabama',
      },
    ],
    center: { lat: 37.09024, lng: -95.712891 },
    zoom: 4,
    mapStyle,
  }),
  computed: {
    faChevronLeft: () => faChevronLeft,
  },
  head() {
    return {
      titleTemplate: '%s - Calculator',
    };
  },
};
</script>

<style scoped lang="scss">
.calculator-page {
  height: calc(100vh - 78px);
  width: 100%;
  background-color: $color-grey-3;
  //background-size: cover;
}

.calculator-tabs {
  position: absolute;
  right: 100px;
  top: calc(50px + 78px);
}

.investment-tab {
  //min-width: 500px;
}

.calculator-header {
  border-bottom: 1px solid $color-grey-3;
  padding-bottom: 15px;
  margin-bottom: 15px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  .calculator-header-title {
    font-size: 2.1rem;
    color: $color-blue-3;
    font-weight: bold;
    margin-bottom: 5px;
    line-height: 1.1;
    flex: 1 0 50%;
  }

  .calculator-header-subtitle {
    font-size: 0.9rem;
    text-transform: uppercase;
    color: $color-blue-6;
    margin-bottom: 0;
    flex: 1 0 50%;
    align-self: flex-start;
  }

  .calculator-header-help-btn {
    background: none;
    border: none;
    border-radius: 100px;
    padding: 0;
    margin: 0;
  }

  .calculator-header-icon {
    height: 25px;
    width: 25px;
  }

  .calculator-header-select {
    border-radius: 500px;
    font-size: 0.7rem;
    align-self: stretch;
    padding: 0 17px;
    flex: 1 0 170px;
    margin: 0;
  }
}

.custom-select {
  border-radius: 500px;
  font-size: 0.7rem;
}

.input-select-container,
.input-text-container {
  display: flex;
  align-items: center;
}

.input-select-label,
.input-text-label {
  font-size: 0.8rem;
  margin-right: 25px;
  color: $color-grey-3;
}

.input-text-container {
  grid-column: 1 / -1;

  .input-text-label {
    margin-right: auto;
  }

  .input-text-prefix {
    color: $color-grey-5;
    margin: 0 10px;
  }

  & input {
    border-radius: 500px;
    font-size: 0.7rem;
    max-width: 123px;
  }
}

.investment-pre-calc,
.real-estate-pre-calc {
  display: grid;
  grid-template-columns: 1.6fr 1.1fr;
  grid-column-gap: 16px;
  grid-row-gap: 14px;

  & > div.input-select-container {
    margin-bottom: 10px;
  }

  .button {
    grid-column: 2 / 3;
    margin-left: auto;
    margin-top: 35px;
  }
}

.button {
  background-color: $color-blue-4;
  color: $color-white;
  font-weight: bold;
  font-size: 0.8rem;
  padding: 8px 20px;
  border: 1px solid $color-blue-4;

  &:hover {
    background-color: $color-blue-3;
    border-color: $color-blue-3;
    color: $color-grey-4;
  }
}

.button-grey {
  border-color: $color-grey-7;
  color: $color-grey-7;
  background-color: transparent;

  &:hover {
    background-color: $color-grey-5;
    color: $color-grey-7;
    border-color: $color-grey-7;
  }
}

.investment-result-statics-container {
  margin-top: 30px;
  background-color: $color-grey-6;
  color: $color-grey-3;
  padding: 20px 14px;
  border-radius: 16px;
  font-size: 0.9rem;
  font-weight: bold;
  display: grid;
  grid-gap: 14px;

  .investment-result-statics-title {
    margin-right: auto;
  }

  .investment-result-statics-prefix {
    margin: 0 24px;
  }

  .investment-result-statics-data {
    min-width: 70px;
  }

  .investment-result-statics-row {
    display: flex;
  }
}

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

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  // with oz bar
  .investment-result-chart-bar-with-oz {
    width: 70%;
  }

  // without oz bar
  .investment-result-chart-bar-without-oz {
    width: 40%;
  }

  // diff bar
  .investment-result-chart-bar-diff {
    width: 20%;
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

.calculator-search {
  position: absolute;
  left: 100px;
  top: calc(50px + 78px);
}
</style>
