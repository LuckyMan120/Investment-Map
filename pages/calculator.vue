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
      <!-- Polylines of each state -->
      <gmap-polyline
        v-for="(path, index) in selectedStatePath"
        :key="'polyline' + index"
        v-bind:path.sync="path"
        v-bind:options="{
          strokeColor: '#d45fa0',
          strokeOpacity: 0.5,
          clickable: true,
        }"
      >
      </gmap-polyline>

      <!-- Polygons of each state -->
      <gmap-polygon
        v-for="(polygon, index) in selectState"
        :key="'polygon' + index"
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
        <div class="location-popup">
          <div class="infowindow-board">
            <div class="infowindow-board__info">
              <span class="infowindow-board__info__name">{{
                compareOnePolygon.countyName
              }}</span>
              <span class="infowindow-board__info__geo-id">{{
                compareOnePolygon.geoId
              }}</span>
            </div>
            <h2 class="infowindow-board__order">1</h2>
          </div>
          <div class="location-popup__actions">
            <button class="location-popup__actions__compare" @click="compare">
              COMPARE
            </button>
          </div>
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
        <div class="location-popup">
          <div class="infowindow-board">
            <div class="infowindow-board__info">
              <span class="infowindow-board__info__name">{{
                compareTwoPolygon.countyName
              }}</span>
              <span class="infowindow-board__info__geo-id">{{
                compareTwoPolygon.geoId
              }}</span>
            </div>
            <h2 class="infowindow-board__order">2</h2>
          </div>
          <div class="location-popup__actions">
            <button
              class="location-popup__actions__compare"
              @click="compareAdd"
            >
              COMPARE
            </button>
            <!--Add btn-->
            <button
              class="location-popup__actions__add"
              @click="addCompareList"
            >
              <img
                draggable="false"
                src="~assets/icons/icon-plus.png"
                alt="plus-icon"
              />
            </button>
          </div>
        </div>
      </gmap-info-window>
      <GmapMarker
        v-if="marked_compare_two"
        :icon="stickIcon"
        :position="compare_two_Infowindow"
      />

      <!-- searched schools -->
      <GmapMarker
        v-for="(yellowpin, index) in schoolsData"
        :key="'yellowpin' + index"
        :icon="yellowIcon"
        :position="getPosition(yellowpin)"
        @click="showPinDetail(yellowpin)"
      />

      <!-- school pin infowindow -->
      <gmap-info-window
        @closeclick="open_school_pin = false"
        :opened="open_school_pin"
        :position="school_pin_latlng"
        :options="{
          pixelOffset: {
            width: 0,
            height: 110,
          },
        }"
      >
        <table>
          <tr>
            <td>School Name</td>
            <td>{{ schoolPinData.name }}</td>
          </tr>
          <tr>
            <td>Student Population</td>
            <td>{{ schoolPinData.population }}</td>
          </tr>
        </table>
      </gmap-info-window>

      <!-- searched companies -->
      <GmapMarker
        v-for="(pinkpin, index) in companyData"
        :key="'pinkpin' + index"
        :icon="pinkIcon"
        :position="getPosition(pinkpin)"
        @click="showPinDetail(pinkpin)"
      />

      <!-- company pin infowindow -->
      <gmap-info-window
        @closeclick="open_company_pin = false"
        :opened="open_company_pin"
        :position="company_pin_latlng"
        :options="{
          pixelOffset: {
            width: 0,
            height: 110,
          },
        }"
      >
        <table>
          <tr>
            <td>Title</td>
            <td>{{ companyPinData.title }}</td>
          </tr>
          <tr>
            <td>Rank</td>
            <td>{{ companyPinData.rank }}</td>
          </tr>
          <tr>
            <td>Employees</td>
            <td>{{ companyPinData.employers }}</td>
          </tr>
          <tr>
            <td>Sector</td>
            <td>{{ companyPinData.sector }}</td>
          </tr>
          <tr>
            <td>Revenues</td>
            <td>{{ companyPinData.revenues }}</td>
          </tr>
          <tr>
            <td>State</td>
            <td>{{ companyPinData.state }}</td>
          </tr>
        </table>
      </gmap-info-window>
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
            <Select
              v-model="stateSelectInvest"
              :select-items="stateSelectItems"
            />
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
              <button class="button">
                <downloadexcel
                  :data="investData"
                  :fields="chooseField('invest')"
                  worksheet="My Worksheet"
                  type="csv"
                  :before-generate="startDownload"
                  name="invest.xls"
                >
                  Download
                </downloadexcel>
              </button>
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
          <h1 class="calculator-header-title">Real Estate</h1>
          <button class="calculator-header-help-btn">
            <img
              src="~assets/icons/question-mark-circle-grey.png"
              class="calculator-header-icon"
              alt="question mark icon"
            />
          </button>
          <h2 class="calculator-header-subtitle">Calculator</h2>
          <Select
            v-model="stateSelectReal"
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
              <button class="button">
                <downloadexcel
                  :data="realData"
                  :fields="chooseField('real')"
                  worksheet="My Worksheet"
                  type="csv"
                  :before-generate="startDownload"
                  name="real.xls"
                >
                  Download
                </downloadexcel>
              </button>
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
import dialogs from '@/assets/modules/dialogs.js';
import moment from 'moment';
import downloadexcel from 'vue-json-excel';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import CalculatorTabs from '@/components/CalculatorTabs/CalculatorTabs.vue';
import CalculatorSearch from '@/components/CalculatorSearch/CalculatorSearch.vue';
import Select from '@/components/Select/Select.vue';
import CalculatorChart from '@/components/CalculatorChart/CalculatorChart.vue';
import Loading from '@/components/Loading/Loading.vue';

// import jsons
import mapStyle from '@/static/data/mapStyle.json';
import states from '@/static/data/states.json';
import sectors from '@/static/data/sector.json';
import company from '@/static/data/company.json';
import school from '@/static/data/schools.json';

// import images
import stickIcon from '@/assets/images/stickIcon.png';
import pinkIcon from '@/assets/images/pink.png';
import yellowIcon from '@/assets/images/yellow.png';

export default {
  layout: 'calculator',
  components: {
    CalculatorTabs,
    CalculatorSearch,
    Select,
    CalculatorChart,
    Loading,
    downloadexcel,
  },
  data: () => ({
    loading: false,
    // State select
    stateSelectInvest: 'Select State',
    stateSelectReal: 'Select State',
    stateSelectItems: states.states,
    // Health care select
    sectorSelect: 'Select Sector',
    sectorSelectItems: sectors.sectors,

    // company and school
    companyStaticData: company.company,
    schoolStaticData: school.schools,
    open_school_pin: false,
    open_company_pin: false,
    school_pin_latlng: null,
    company_pin_latlng: null,
    schoolPinData: {
      name: '',
      population: '',
    },
    companyPinData: {
      title: '',
      rank: '',
      employers: '',
      sector: '',
      revenues: '',
      state: '',
    },

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
    yellowIcon: {
      scaledSize: { width: 10, height: 10 },
      url: yellowIcon,
    },
    pinkIcon: {
      scaledSize: { width: 10, height: 10 },
      url: pinkIcon,
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
    investData: [],
    realData: [],
    statesData: null,
    selectedStatePath: null,
    schoolsData: null,
    companyData: null,
  }),
  computed: {
    faChevronLeft: () => faChevronLeft,
  },
  async mounted() {
    this.loading = true;
    const states = await this.$axios.get('/earth/getStates');
    // get select state of the USA
    let stateDetails = [];
    states.data.state.kml.Document.Placemark.forEach((item) => {
      let eachStateDetail = {};
      if (Object.keys(item.MultiGeometry)[1] === 'MultiGeometry') {
        let eachState = [];
        item.MultiGeometry.MultiGeometry.Polygon.forEach((pol) => {
          let eachPol = [];
          let polys = pol.outerBoundaryIs.LinearRing.coordinates._text;

          var coordinates = polys.split(' ');
          coordinates.forEach((each) => {
            if (each.length > 2) {
              var coordinate = each.split(',');
              var pointPolys = {
                lat: parseFloat(coordinate[1]),
                lng: parseFloat(coordinate[0]),
              };
              eachPol.push(pointPolys);
            }
          });
          eachState.push(eachPol);
        });
        eachStateDetail['path'] = eachState;
      } else {
        let eachState = [];
        let polys =
          item.MultiGeometry.Polygon.outerBoundaryIs.LinearRing.coordinates
            ._text;
        let eachPol = [];

        var coordinates = polys.split(' ');
        coordinates.forEach((each) => {
          if (each.length > 2) {
            var coordinate = each.split(',');
            var pointPolys = {
              lat: parseFloat(coordinate[1]),
              lng: parseFloat(coordinate[0]),
            };
            eachPol.push(pointPolys);
          }
        });
        eachState.push(eachPol);
        eachStateDetail['path'] = eachState;
      }

      var point = item.MultiGeometry.Point.coordinates._text.split(' ');
      point.forEach((e) => {
        if (e.length > 2) {
          var coord = e.split(',');
          var markedPoint = {
            lat: parseFloat(coord[1]),
            lng: parseFloat(coord[0]),
          };
          eachStateDetail['center'] = markedPoint;
        }
      });

      if (item.name._cdata.split(' ').length > 2) {
        eachStateDetail['name'] =
          item.name._cdata.split(' ')[0] + ' ' + item.name._cdata.split(' ')[1];
      } else {
        eachStateDetail['name'] = item.name._cdata.split(' ')[0];
      }

      stateDetails.push(eachStateDetail);
    });
    this.statesData = stateDetails;
    this.loading = false;
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
    async searchState(place) {
      // initial the status as basic
      this.loading = true;
      this.selectState = null;
      this.calcMainInfo = null;
      this.calcSideBarInfo = null;
      this.selectedStatePath = null;
      this.schoolsData = null;
      this.companyData = null;
      this.open_school_pin = false;
      this.open_company_pin = false;
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

      // search border of searched state
      this.statesData.forEach((item) => {
        if (item.name === place.name) {
          this.selectedStatePath = item.path;
          this.center = item.center;
        }
      });

      // set the searched polygons and map center
      this.selectState = polygons.data;
      this.center = place.center;
      this.zoom = 8;
      this.loading = false;
    },
    compare() {
      this.compareFlag = true;
      this.calcMainInfo = this.compareOnePolygon;
      this.info = true;
    },
    compareAdd() {
      let listFlag = false;
      // search in first compare board
      if (this.calcMainInfo.geoId === this.secondPolygon.geoid) {
        dialogs.message('Already added into First Compare Board!', {
          duration: 10,
          state: 'error',
        });
        listFlag = true;
        return;
      }

      if (!listFlag) {
        this.calcSideBarInfo = this.secondPolygon;
        this.status = !this.status;
      }
    },
    addCompareList() {
      let listFlag = false;
      // search in first compare board
      if (this.calcMainInfo.geoId === this.secondPolygon.geoid) {
        dialogs.message('Already added into First Compare Board!', {
          duration: 10,
          state: 'error',
        });
        listFlag = true;
        return;
      }

      // search in compare list
      this.resultItems.forEach((item) => {
        if (item.geoid === this.secondPolygon.geoid) {
          dialogs.message('Already added into Compare List!', {
            duration: 10,
            state: 'error',
          });
          listFlag = true;
          return;
        }
      });

      if (!listFlag) this.resultItems.push(this.secondPolygon);
    },
    removePolygon(index) {
      this.resultItems.splice(index, 1);
    },
    comparePolygon(index) {
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
    async calculator() {
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

        if (this.stateSelectInvest === 'Select State') {
          dialogs.message('You have to select the state.', {
            duration: 10,
            state: 'error',
          });
          return;
        }

        if (this.sectorSelect === 'Select Sector') {
          dialogs.message('You have to select the sector.', {
            duration: 10,
            state: 'error',
          });
          return;
        }

        if (this.A3 - this.A2 - this.A1 < 0) {
          dialogs.message(
            'Sales price of the business must be bigger than Initial and Cash',
            { duration: 10, state: 'error' }
          );
          return;
        }

        // initial the status as basic
        this.loading = true;
        this.selectState = null;
        this.calcMainInfo = null;
        this.calcSideBarInfo = null;
        this.schoolsData = null;
        this.companyData = null;
        this.resultItems = [];
        this.selectedStatePath = null;
        this.window_open_first = false;
        this.open_school_pin = false;
        this.compare_one_window_open = false;
        this.compare_two_window_open = false;
        this.marked_compare_one = false;
        this.marked_compare_two = false;
        this.info = false;
        this.compareFlag = false;
        this.zoom = 6;
        this.center = { lat: 37.09024, lng: -95.712891 };

        // get polygons from back-end
        const data = {};
        data.name = this.stateSelectInvest;
        const polygons = await this.$axios.post('/earth/search', data);
        this.selectState = polygons.data;

        // search border of selected state
        this.statesData.forEach((item) => {
          if (item.name === this.stateSelectInvest) {
            this.selectedStatePath = item.path;
            this.center = item.center;
          }
        });

        // search school
        let schools = [];
        this.schoolStaticData.forEach((school) => {
          if (school.State === this.stateSelectInvest) {
            schools.push(school);
          }
        });

        this.schoolsData = schools;

        // search company
        let companies = [];
        this.companyStaticData.forEach((company) => {
          if (
            company.State === this.stateSelectInvest &&
            company.Sector === this.sectorSelect
          ) {
            companies.push(company);
          }
        });

        this.companyData = companies;

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

        // save invest download data
        let invest = {};
        invest['initial'] = this.A1;
        invest['cash'] = this.A2;
        invest['sales'] = this.A3;
        invest['employees'] = this.A4;
        invest['oz'] = this.OZ.toFixed(1);
        invest['notOZ'] = this.notOZ.toFixed(1);
        invest['federal'] = ((this.difference / 3) * 2).toFixed(1);
        this.investData.push(invest);

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

        if (this.stateSelectReal === 'Select State') {
          dialogs.message('You have to select the state.', {
            duration: 10,
            state: 'error',
          });
          return;
        }

        // initial the status as basic
        this.loading = true;
        this.selectState = null;
        this.calcMainInfo = null;
        this.calcSideBarInfo = null;
        this.schoolsData = null;
        this.companyData = null;
        this.resultItems = [];
        this.selectedStatePath = null;
        this.window_open_first = false;
        this.open_school_pin = false;
        this.compare_one_window_open = false;
        this.compare_two_window_open = false;
        this.marked_compare_one = false;
        this.marked_compare_two = false;
        this.info = false;
        this.compareFlag = false;
        this.zoom = 6;
        this.center = { lat: 37.09024, lng: -95.712891 };

        // get polygons from back-end
        const data = {};
        data.name = this.stateSelectReal;
        const polygons = await this.$axios.post('/earth/search', data);
        this.selectState = polygons.data;

        // search border of selected state
        this.statesData.forEach((item) => {
          if (item.name === this.stateSelectReal) {
            this.selectedStatePath = item.path;
            this.center = item.center;
          }
        });

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
            ? this.realOZ
            : (this.realOZ / 1000).toFixed(1) + 'k';

        // save real download data
        let real = {};
        real['paid'] = this.B1;
        real['sold'] = this.B2;
        real['rate'] = this.B3;
        real['period'] = this.B4;
        real['oz'] = this.realOZ;
        real['notOZ'] = this.realNotOZ;
        real['federal'] = ((this.realDifference / 3) * 2).toFixed(1);
        this.realData.push(real);

        this.isRealCalculated = true;
        dialogs.message('Statistics Completed.', {
          duration: 10,
          state: 'success',
        });
      }

      this.loading = false;
    },
    chooseField: function (title) {
      if (title === 'invest') {
        return {
          'Initial Value of Business': 'initial',
          'Cash Investment in Business': 'cash',
          'Sales Price of the Business': 'sales',
          'Number of Employees': 'employees',
          OZ: 'oz',
          WithoutOZ: 'notOZ',
          Federal: 'federal',
        };
      } else {
        return {
          'Price paid for the Asset': 'paid',
          'Sold price of the Asset': 'sold',
          'Assumed Growth rate (%)': 'rate',
          'Holding Period (years)': 'period',
          OZ: 'oz',
          WithoutOZ: 'notOZ',
          Federal: 'federal',
        };
      }
    },
    startDownload: function () {
      window.alert('Start Downloading');
    },
    getPosition: function (pin) {
      return {
        lat: pin.Latitude,
        lng: pin.Longitude,
      };
    },
    showPinDetail: function (pin) {
      if (Object.keys(pin).length === 5) {
        // school pin
        let data = {
          lat: pin.Latitude,
          lng: pin.Longitude,
        };
        this.school_pin_latlng = data;
        this.schoolPinData.name = pin['School Name'];
        this.schoolPinData.population = pin['Student Population'];

        this.open_school_pin = true;
      } else {
        // company pin
        let data = {
          lat: pin.Latitude,
          lng: pin.Longitude,
        };
        this.company_pin_latlng = data;
        this.companyPinData.title = pin['Title'];
        this.companyPinData.rank = pin['Rank'];
        this.companyPinData.employers = pin['Employees'];
        this.companyPinData.sector = pin['Sector'];
        this.companyPinData.revenues = pin['Revenues'];
        this.companyPinData.state = pin['State'];

        this.open_company_pin = true;
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

.location-popup {
  padding: 11px;
  padding-bottom: 20px;
}

.infowindow-board {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;

  &__info {
    margin-right: 20px;
    display: flex;
    flex-direction: column;

    &__name {
      color: #707070;
      font-size: 24px;
      line-height: 1.1;
      margin-bottom: 3px;
    }

    &__geo-id {
      color: #707070;
      font-size: 12px;
      letter-spacing: 1px;
    }
  }

  &__order {
    color: #b5b9bf;
    font-size: 53px;
    margin: 0;
    line-height: 0.8;
    font-weight: 400;
  }
}

.location-popup__actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 27px;

  &__compare {
    color: #2275c3;
    font-size: 14px;
    border: none;
    background: unset;
    padding: unset;
    font-weight: 300;
  }

  &__add {
    background: none;
    border: none;
    border-radius: 100px;
    padding: unset;

    & img {
      height: 27px;
    }
  }
}
</style>
