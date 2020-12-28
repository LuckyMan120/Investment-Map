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
    >
      <!-- polygons -->
      <gmap-polygon
        v-for="(polygon, count) in selectState"
        :key="count"
        :path.sync="polygon.path"
        :options="{
          strokeColor: '#00bcf0',
          fillColor: '#00bcf0b8',
          fillOpacity: 0.1,
          clickable: true,
        }"
        @click="showDetails(polygon)"
      >
      </gmap-polygon>

      <!-- first compare infowindow and marker -->
      <gmap-info-window
        :opened="compare_one_window_open"
        :position="compare_one_Infowindow"
      >
        <div>
          <div class="infowindow-board">
            <div>
              <span>{{ compareOnePolygon.countyName }}</span
              ><br />
              <span>{{ compareOnePolygon.geoId }}</span>
            </div>
            <h2>1</h2>
          </div>
          <button
            style="
              color: #2275c3;
              font-size: 12px;
              display: block !important;
              border: none !important;
              background: unset;
              padding: unset;
            "
            @click="compare"
          >
            COMPARE
          </button>
        </div>
      </gmap-info-window>
      <GmapMarker
        v-if="marked_compare_one"
        :icon="stickIcon"
        :position="compare_one_Infowindow"
      />

      <!-- second compare infowindow and marker -->
      <gmap-info-window
        :opened="compare_two_window_open"
        :position="compare_two_Infowindow"
      >
        <div>
          <div>
            <div class="infowindow-board">
              <div>
                <span>{{ compareTwoPolygon.countyName }}</span
                ><br />
                <span>{{ compareTwoPolygon.geoId }}</span>
              </div>
              <h2>2</h2>
            </div>
            <div class="infowindow-btn-area">
              <button
                style="
                  color: #2275c3;
                  font-size: 12px;
                  display: block !important;
                  border: none !important;
                  background: unset;
                  padding: unset;
                "
                @click="compareAdd"
              >
                COMPARE
              </button>
              <!--Add btn-->
              <button
                style="
                  background: none;
                  border: none;
                  border-radius: 100px;
                  padding: unset;
                "
                @click="addCompareList"
              >
                <img
                  style="height: 27px"
                  src="~assets/icons/icon-plus.png"
                  alt="plus-icon"
                />
              </button>
            </div>
          </div>
        </div>
      </gmap-info-window>
      <GmapMarker
        v-if="marked_compare_two"
        :icon="stickIcon"
        :position="compare_two_Infowindow"
      />
    </GmapMap>
    <!--Tabs-->
    <CalculatorTabs
      v-model="activeTab"
      class="calculator-tabs"
      :tabs="tabs"
      :info="info"
      :main-info="calcMainInfo"
      :sidebar-info="calcSideBarInfo"
      :changeStatus="status"
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
          <button class="calculator-header-help-btn">
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
            <input type="number" class="form-control" v-model="A1" />
          </div>

          <div class="input-text-container">
            <span class="input-text-label">Cash Investment in Business</span>
            <span class="input-text-prefix">$</span>
            <input type="number" class="form-control" v-model="A2" />
          </div>

          <div class="input-text-container">
            <span class="input-text-label">Sales Price of the Business</span>
            <span class="input-text-prefix">$</span>
            <input type="number" class="form-control" v-model="A3" />
          </div>

          <div class="input-text-container">
            <span class="input-text-label">Number of Employees</span>
            <input type="number" class="form-control" v-model="A4" />
          </div>

          <button v-if="!isInvestCalculated" class="button" @click="calculator">
            Calculate
          </button>
        </section>

        <section v-if="isInvestCalculated" class="investment-result">
          <div class="investment-result-statics-container">
            <div class="investment-result-statics-row">
              <span class="investment-result-statics-title">With OZ</span>
              <span class="investment-result-statics-prefix">$</span>
              <span class="investment-result-statics-data">{{ OZ }}</span>
            </div>

            <div class="investment-result-statics-row">
              <span class="investment-result-statics-title">Without OZ</span>
              <span class="investment-result-statics-prefix">$</span>
              <span class="investment-result-statics-data">{{ notOZ }}</span>
            </div>

            <div class="investment-result-statics-row">
              <span class="investment-result-statics-title">Difference</span>
              <span class="investment-result-statics-prefix">$</span>
              <span class="investment-result-statics-data">{{
                difference
              }}</span>
            </div>
          </div>

          <!--Calculator chart-->
          <CalculatorChart
            :items="calculatorChartItems"
            :ranges="calculatorChartRange"
          />

          <div class="row mt-4">
            <div class="col-md-6 d-flex justify-content-end">
              <button
                class="button button-grey"
                @click="isInvestCalculated = false"
              >
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
            v-model="stateSelect"
            class="calculator-header-select"
            :select-items="stateSelectItems"
          />
        </header>

        <section class="real-estate-pre-calc">
          <div class="input-text-container">
            <span class="input-text-label">Price paid for the Asset</span>
            <span class="input-text-prefix">$</span>
            <input type="number" class="form-control" v-model="B1" />
          </div>

          <div class="input-text-container">
            <span class="input-text-label">Sold price of the Asset</span>
            <span class="input-text-prefix">$</span>
            <input type="number" class="form-control" v-model="B2" />
          </div>

          <div class="input-text-container">
            <span class="input-text-label">Assumed Growth rate (%)</span>
            <span class="input-text-prefix"></span>
            <input type="number" class="form-control" v-model="B3" />
          </div>

          <div class="input-text-container">
            <span class="input-text-label">Holding Period (years)</span>
            <span class="input-text-prefix"></span>
            <input type="number" class="form-control" v-model="B4" />
          </div>

          <button class="button" v-if="!isRealCalculated" @click="calculator">
            Calculate
          </button>
        </section>

        <section v-if="isRealCalculated" class="investment-result">
          <div class="investment-result-statics-container">
            <div class="investment-result-statics-row">
              <span class="investment-result-statics-title">With OZ</span>
              <span class="investment-result-statics-prefix">$</span>
              <span class="investment-result-statics-data">{{ realOZ }}</span>
            </div>

            <div class="investment-result-statics-row">
              <span class="investment-result-statics-title">Without OZ</span>
              <span class="investment-result-statics-prefix">$</span>
              <span class="investment-result-statics-data">{{
                realNotOZ
              }}</span>
            </div>

            <div class="investment-result-statics-row">
              <span class="investment-result-statics-title">Difference</span>
              <span class="investment-result-statics-prefix">$</span>
              <span class="investment-result-statics-data">{{
                realDifference
              }}</span>
            </div>
          </div>

          <!--Calculator chart-->
          <CalculatorChart
            :items="realCalculatorChartItems"
            :ranges="realCalculatorChartRange"
          />

          <div class="row mt-4">
            <div class="col-md-6 d-flex justify-content-end">
              <button
                class="button button-grey"
                @click="isRealCalculated = false"
              >
                <fa class="mr-2" :icon="faChevronLeft" /> Back
              </button>
            </div>
            <div class="col-md-6 d-flex justify-content-start">
              <button class="button">Download</button>
            </div>
          </div>
        </section>
      </div>
    </CalculatorTabs>

    <!--Search-->
    <CalculatorSearch
      :results="resultItems"
      class="calculator-search"
      @search="searchState"
      @comparePolygon="comparePolygon"
      @removePolygon="removePolygon"
    />

    <!--Loader-->
    <Loading v-model="loading" />
  </div>
</template>

<script>
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import CalculatorTabs from '@/components/CalculatorTabs/CalculatorTabs.vue';
import CalculatorSearch from '@/components/CalculatorSearch/CalculatorSearch.vue';
import Select from '@/components/Select/Select.vue';
import CalculatorChart from '@/components/CalculatorChart/CalculatorChart.vue';
import Loading from '@/components/Loading/Loading.vue';
import mapStyle from '@/static/data/mapStyle.json';
import states from '@/static/data/states.json';
import sectors from '@/static/data/sector.json';
import stickIcon from '@/assets/images/stickIcon.png';
import dialogs from '@/assets/modules/dialogs.js';
import moment from 'moment';

export default {
  layout: 'calculator',
  components: {
    CalculatorTabs,
    CalculatorSearch,
    Select,
    CalculatorChart,
    Loading,
  },
  data: () => ({
    loading: false,
    // State select
    stateSelect: 'Alabama',
    stateSelectItems: states.states,
    // Health care select
    sectorSelect: 'Retailing',
    sectorSelectItems: sectors.sectors,

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

    calcMainInfo: null,

    calcSideBarInfo: null,

    isInvestCalculated: false,
    isRealCalculated: false,
    info: false,

    // search
    resultItems: [],
    center: { lat: 37.09024, lng: -95.712891 },
    zoom: 6,
    mapStyle,

    // invest calculator chart
    calculatorChartItems: [
      {
        title: 'With OZ',
        subtitle: 'After Tax',
        value: '$ 400 k',
        progress: 100, // in percent
      },
      {
        title: 'Without OZ',
        subtitle: 'After Tax',
        value: '$ 240 k',
        progress: 75,
      },
      {
        title: '',
        subtitle: '',
        value: '$ 110 k',
        progress: 25,
      },
    ],

    calculatorChartRange: ['100k', '200k', '300k', '400k'],

    // real calculator chart
    realCalculatorChartItems: [
      {
        title: 'With OZ',
        subtitle: 'After Tax',
        value: '$ 400 k',
        progress: 100, // in percent
      },
      {
        title: 'Without OZ',
        subtitle: 'After Tax',
        value: '$ 240 k',
        progress: 75,
      },
      {
        title: '',
        subtitle: '',
        value: '$ 110 k',
        progress: 25,
      },
    ],

    realCalculatorChartRange: ['100k', '200k', '300k', '400k'],
    selectState: null,
    stickIcon: {
      url: stickIcon,
    },
    compare_one_window_open: false,
    compare_one_Infowindow: null,
    compareOnePolygon: {
      countyName: '',
      geoId: '',
      data: null,
    },
    marked_compare_one: false,
    compare_two_window_open: false,
    compare_two_Infowindow: null,
    compareTwoPolygon: {
      countyName: '',
      geoId: '',
    },
    secondPolygon: null,
    marked_compare_two: false,
    compareFlag: false,
    status: false,
    B1: null,
    B2: null,
    B3: null,
    B4: null,
    A1: null,
    A2: null,
    A3: null,
    A4: null,
    OZ: '',
    notOZ: '',
    difference: '',
    realOZ: '',
    realNotOZ: '',
    realDifference: '',
  }),
  computed: {
    faChevronLeft: () => faChevronLeft,
  },
  methods: {
    showDetails(polygon) {
      if (!this.compareFlag) {
        this.compare_one_window_open = true;
        this.compare_one_Infowindow = {
          lat: polygon.path[0].lat,
          lng: polygon.path[0].lng,
        };
        this.compareOnePolygon['countyName'] = polygon.countyname;
        this.compareOnePolygon['geoId'] = polygon.geoid;
        this.compareOnePolygon['data'] = polygon;
        this.marked_compare_one = true;
      } else {
        this.compare_two_window_open = true;
        this.compare_two_Infowindow = {
          lat: polygon.path[0].lat,
          lng: polygon.path[0].lng,
        };
        this.compareTwoPolygon['countyName'] = polygon.countyname;
        this.compareTwoPolygon['geoId'] = polygon.geoid;
        this.secondPolygon = polygon;
        this.marked_compare_two = true;
      }
    },
    searchState: async function (place) {
      // initial the status as basic
      this.loading = true;
      this.selectState = null;
      this.calcMainInfo = null;
      this.calcSideBarInfo = null;
      this.resultItems = [];
      this.compare_one_window_open = false;
      this.compare_two_window_open = false;
      this.marked_compare_one = false;
      this.marked_compare_two = false;
      this.info = false;
      this.compareFlag = false;
      this.zoom = 6;
      this.center = { lat: 37.09024, lng: -95.712891 };

      const data = {};
      data.name = place.name;
      const polygons = await this.$axios.post('/earth/search', data);

      // set the searched polygons and map center
      this.selectState = polygons.data;
      this.center = place.center;
      this.zoom = 8;
      this.loading = false;
    },
    compare: function () {
      this.compareFlag = true;
      this.calcMainInfo = this.compareOnePolygon;
      this.info = true;
    },
    compareAdd: function () {
      this.calcSideBarInfo = this.secondPolygon;
      this.status = !this.status;
    },
    addCompareList: function () {
      this.resultItems.push(this.secondPolygon);
    },
    removePolygon: function (index) {
      this.resultItems.splice(index, 1);
    },
    comparePolygon: function (index) {
      this.compare_two_window_open = true;
      this.compare_two_Infowindow = {
        lat: this.resultItems[index].path[0].lat,
        lng: this.resultItems[index].path[0].lng,
      };
      this.compareTwoPolygon['countyName'] = this.resultItems[index].countyname;
      this.compareTwoPolygon['geoId'] = this.resultItems[index].geoid;
      this.secondPolygon = this.resultItems[index];
      this.marked_compare_two = true;
    },
    calculator: function () {
      // calculate by activeTab
      if (this.activeTab === 'investment') {
        if (
          this.A1 === null ||
          this.A2 === null ||
          this.A3 === null ||
          this.A4 === null ||
          this.A1 === '' ||
          this.A2 === '' ||
          this.A3 === '' ||
          this.A4 === ''
        ) {
          dialogs.message('You have to insert the values', {
            duration: 10,
            state: 'error',
          });
          return;
        }

        // if (this.state === 'Select State') {
        // 	dialogs.message('You have to select the state.', { duration: 10, state: 'error' });
        // 	return;
        // }

        // if (this.sector === 'Select Sector') {
        // 	dialogs.message('You have to select the sector.', { duration: 10, state: 'error' });
        // 	return;
        // }

        if (this.A3 - this.A2 - this.A1 < 0) {
          dialogs.message(
            'Sales price of the business must be bigger than Initial and Cash',
            { duration: 10, state: 'error' }
          );
          return;
        }

        this.OZ = this.A3 - this.A1 - this.A2;
        this.notOZ = (this.A3 - this.A1 - this.A2) * 0.75;
        this.difference = this.OZ - this.notOZ;

        this.calculatorChartItems[0].value =
          this.OZ < 1000
            ? '$ ' + this.OZ.toFixed(1)
            : '$ ' + (this.OZ / 1000).toFixed(1) + ' k';
        this.calculatorChartItems[1].value =
          this.notOZ < 1000
            ? '$ ' + this.notOZ.toFixed(1)
            : '$ ' + (this.notOZ / 1000).toFixed(1) + ' k';
        this.calculatorChartItems[2].value =
          (this.difference / 3) * 2 < 1000
            ? '$ ' + ((this.difference / 3) * 2).toFixed(1)
            : '$ ' + (((this.difference / 3) * 2) / 1000).toFixed(1) + ' k';

        this.calculatorChartItems[1].progress = (
          (this.notOZ / this.OZ) *
          100
        ).toFixed();
        this.calculatorChartItems[2].progress = (
          (((this.difference / 3) * 2) / this.OZ) *
          100
        ).toFixed();

        let step = this.OZ / 4;
        this.calculatorChartRange[0] =
          step < 1000 ? step.toFixed(0) : (step / 1000).toFixed(1) + 'k';
        this.calculatorChartRange[1] =
          step * 2 < 1000
            ? (step * 2).toFixed(0)
            : ((step * 2) / 1000).toFixed(1) + 'k';
        this.calculatorChartRange[2] =
          step * 3 < 1000
            ? (step * 3).toFixed(0)
            : ((step * 3) / 1000).toFixed(1) + 'k';
        this.calculatorChartRange[3] =
          this.OZ < 1000
            ? this.OZ.toFixed(0)
            : (this.OZ / 1000).toFixed(1) + 'k';

        this.isInvestCalculated = true;
        dialogs.message('Statistics Completed.', {
          duration: 10,
          state: 'success',
        });
      } else {
        if (
          this.B1 === null ||
          this.B2 === null ||
          this.B3 === null ||
          this.B4 === null
        ) {
          dialogs.message('You have to insert all values.', {
            duration: 10,
            state: 'error',
          });
          return;
        }
        if (
          parseInt(this.B1) < 0 ||
          parseInt(this.B2) < 0 ||
          parseInt(this.B3) < 0 ||
          parseInt(this.B4) < 0
        ) {
          dialogs.message('No numbers can be negative.', {
            duration: 10,
            state: 'error',
          });
          return;
        }
        if (parseInt(this.B1) > parseInt(this.B2)) {
          dialogs.message('Sold Price must be larger than Paid Price.', {
            duration: 10,
            state: 'error',
          });
          return;
        }
        if (parseInt(this.B3) < 0 || parseInt(this.B3) > 100) {
          dialogs.message('The Rate must be the value up 0 to 100.', {
            duration: 10,
            state: 'error',
          });
          return;
        }
        if (parseInt(this.B4) < 10 || parseInt(this.B4) > 20) {
          dialogs.message('The Period must be the value up 10 to 20.', {
            duration: 10,
            state: 'error',
          });
          return;
        }

        let current = new Date();
        let B7 =
          this.B2 *
            Math.pow(
              1 + this.B3 / 100,
              2026 - moment(current).toDate().getFullYear()
            ) -
          (this.B2 *
            Math.pow(
              1 + this.B3 / 100,
              2026 - moment(current).toDate().getFullYear()
            ) -
            this.B2) *
            0.25;
        let B8 =
          this.B2 *
          Math.pow(
            1 + this.B3 / 100,
            2026 - moment(current).toDate().getFullYear()
          );

        this.realOZ = B8.toFixed(1);
        this.realNotOZ = B7.toFixed(1);
        this.realDifference = (B8 - B7).toFixed(1);

        this.realCalculatorChartItems[0].value =
          this.realOZ < 1000
            ? '$ ' + this.realOZ
            : '$ ' + (this.realOZ / 1000).toFixed(1) + ' k';
        this.realCalculatorChartItems[1].value =
          this.realNotOZ < 1000
            ? '$ ' + this.realNotOZ
            : '$ ' + (this.realNotOZ / 1000).toFixed(1) + ' k';
        this.realCalculatorChartItems[2].value =
          (this.realDifference / 3) * 2 < 1000
            ? '$ ' + ((this.realDifference / 3) * 2).toFixed(1)
            : '$ ' + (((this.realDifference / 3) * 2) / 1000).toFixed(1) + ' k';

        this.realCalculatorChartItems[1].progress = (
          (this.realNotOZ / this.realOZ) *
          100
        ).toFixed();
        this.realCalculatorChartItems[2].progress = (
          (((this.realDifference / 3) * 2) / this.realOZ) *
          100
        ).toFixed();

        let step = this.realOZ / 4;
        this.realCalculatorChartRange[0] =
          step < 1000 ? step.toFixed(0) : (step / 1000).toFixed(1) + 'k';
        this.realCalculatorChartRange[1] =
          step * 2 < 1000
            ? (step * 2).toFixed(0)
            : ((step * 2) / 1000).toFixed(1) + 'k';
        this.realCalculatorChartRange[2] =
          step * 3 < 1000
            ? (step * 3).toFixed(0)
            : ((step * 3) / 1000).toFixed(1) + 'k';
        this.realCalculatorChartRange[3] =
          this.realOZ < 1000
            ? this.realOZ.toFixed(0)
            : (this.realOZ / 1000).toFixed(1) + 'k';

        this.isRealCalculated = true;
        dialogs.message('Statistics Completed.', {
          duration: 10,
          state: 'success',
        });
      }
    },
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

.investment-tab,
.real-estate-tab {
  width: 560px;
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
.calculator-search {
  position: absolute;
  left: 100px;
  top: calc(50px + 78px);
}
.infowindow-board {
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    margin-right: 30px;
  }
  span:first-child {
    color: #707070;
    font-size: 24px;
    font-weight: bold;
  }
  span:nth-child(2) {
    color: #707070;
    font-size: 12px;
  }
  h2 {
    color: #b5b9bf;
    font-size: 44px;
  }
  .compare-btn {
    color: #2275c3 !important;
    display: block !important;
    font-size: 12px !important;
  }
}
.infowindow-btn-area {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
