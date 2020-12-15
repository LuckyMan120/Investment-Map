<template>
  <div class="opportunity-page">
    <section class="container-fluid hero-section">
      <div class="row">
        <div class="col-12">
          <div class="hero-content">
            <h2 class="hero-title">How Big Is The Opportunity?</h2>
            <h3 class="hero-subtitle">
              A data-driven approach to market selection
            </h3>
            <a href="#" class="button button-solid">Learn More</a>
          </div>
        </div>
      </div>
    </section>

    <section class="container-fluid inform-section">
      <div class="row justify-content-center">
        <div class="col-md-5">
          <p class="inform-section-text">
            With over 8,700 census tracts, located in every US state and
            territory, Opportunity Zones house 35 million people.
          </p>
        </div>
      </div>
    </section>

    <section class="container present-section">
      <div class="row">
        <div class="col-md-12 present-section-container">
          <p class="present-section-text present-section-upper-text">
            A data-driven approach to market selection is paramount to reduce
            risk and increase the rewards of Opportunity Zone investing.
          </p>

          <p class="present-section-text present-section-lower-text">
            We use our proprietary technology to help you make the most informed
            decisions.
          </p>
        </div>
      </div>
    </section>

    <section class="container-fluid methods-section">
      <div class="row">
        <div class="col-md-4">
          <h2 class="methods-section-header">The Problem</h2>
          <p class="methods-section-sub-header">
            Too many American communities are being left behind by a confluence
            of factors
          </p>
          <div class="methods-section-img-container">
            <img
              class="methods-section-img"
              src="~assets/images/opportunity/question-mark-illustration.png"
              alt="question mark illustration"
            />
          </div>
          <p class="methods-section-subtitle">
            More than 60% of metro areas loose more firms than are being
            created.
          </p>
        </div>

        <div class="col-md-4">
          <h2 class="methods-section-header">Solution</h2>
          <p class="methods-section-sub-header">
            A community toolkit to help recharge America
          </p>
          <div class="methods-section-img-container">
            <img
              class="methods-section-img"
              src="~assets/images/opportunity/puzzel-illustration.png"
              alt="question mark illustration"
            />
          </div>
          <p class="methods-section-subtitle">
            To bring simplicity and convenience to Opportunity Zone Legislation
          </p>
        </div>

        <div class="col-md-4">
          <h2 class="methods-section-header">How we do it</h2>
          <p class="methods-section-sub-header">
            An ecosystem between and among government and community
          </p>
          <div class="methods-section-img-container">
            <img
              class="methods-section-img"
              src="~assets/images/opportunity/man-laptop-illustration.png"
              alt="question mark illustration"
            />
          </div>
          <p class="methods-section-subtitle">
            We leverage proprietary technology and data to lower costs and
            uncover relevance
          </p>
        </div>
      </div>
    </section>

    <section class="container-fluid oz-program-section">
      <div class="row justify-content-center">
        <div class="col-md-7">
          <p class="oz-program-section-text">
            Opportunity Zones can help small businesses, the entrepreneur, real
            estate investors, NGOs, community leaders, Fortune 500 companies,
            and more.
          </p>
        </div>
      </div>
    </section>

    <section class="container-fluid why-oz-section">
      <h2 class="why-oz-section-title">Why Invest in Opportunity Zones?</h2>

      <div class="row why-oz-section-bg">
        <div
          class="col-md-6 d-flex justify-content-center align-items-center pr-5"
        >
          <p class="why-oz-section-text mr-5">
            Designed to encourage long-term investment in low-income
            communities, Opportunity Zones offer investors incentives for
            putting their capital to work in low-income communities:
          </p>
        </div>

        <div
          class="col-md-6 d-flex justify-content-center align-items-center pl-5"
        >
          <p class="why-oz-section-text ml-5">
            Designed to promote the revitalization of the American Dream,
            Opportunity Zones offer investors a once in a generation tax subsidy
            for putting their capital to work in thousands of locations across
            the American landscape
          </p>
        </div>
      </div>
    </section>

    <section class="container benefits-section">
      <div class="row">
        <div class="col-md-7">
          <ListItem :items="ListItems" small bold color="#264478" />
        </div>

        <div class="col-md-5 d-flex align-items-center">
          <img
            class="benefits-section-img"
            src="~assets/images/opportunity/corp-inc-illustration.png"
            alt="trend rising up illustration"
          />
        </div>
      </div>
    </section>

    <section class="data-section">
      <div class="data-section-upper">
        <h2 class="data-section-upper-title">$ 6.1 Trillion</h2>
        <p class="data-section-upper-subtitle">
          Is the total estimated unrealized capital gains that both American
          households ($3.8 trillion) and American corporations ($2.3 trillion)
        </p>
      </div>

      <div class="data-section-lower">
        <p class="data-section-lower-subtitle">
          Out of which, most experts believe OZ Funds will redirect as much as
        </p>
        <h2 class="data-section-lower-title">$ 100 Billion</h2>
        <p class="data-section-lower-subtitle">dollars into these regions.</p>
      </div>
    </section>

    <section class="container tax-section">
      <div class="row justify-content-center">
        <div class="col-md-8 d-flex">
          <img
            class="tax-section-img"
            src="~assets/images/opportunity/tax-illustration.png"
            alt="tax illustration"
          />

          <div class="tax-section-info">
            <h2 class="tax-section-info-title">Opportunity Zones</h2>
            <p class="tax-section-info-subtitle">
              are mandated census tracts eligible for business and investor tax
              subsidies.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="container-fluid oz-usage-section">
      <div class="row justify-content-center">
        <div class="col-md-7">
          <p class="oz-usage-section-text">
            12% of all US census tracts are opportunity zones
          </p>
        </div>
      </div>
    </section>

    <section class="container-fluid explore-section">
      <div class="row justify-content-center align-items-center">
        <div class="col-md-3">
          <p class="explore-section-text">
            Explore Opportunity Zones with our interactive map and calculator!
          </p>

          <a href="#" class="explore-section-button">Use our Free Tool</a>
        </div>

        <div class="col-md-7">
          <img src="~assets/images/opportunity/dark-map.png" alt="map" />
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import ListItem from '~/components/ListItem/ListItem.vue';

export default Vue.extend({
  components: {
    ListItem,
  },
  data: () => ({
    ListItems: [
      'Investors can roll existing capital gains into Opportunity Funds with no up-front tax bill.',
      'An investment before 2022 provides a 5% tax savings.',
      'Investors can defer their original tax bill until December 31, 2026.',
      'Opportunity fund investments held or reinvested for at least 10 years are not taxed.',
      'Investors enjoy the same tax status as they would otherwise (i.e. depreciation, etc.)',
    ],
  }),
});
</script>

<style lang="scss" scoped>
.hero-section {
  display: flex;
  height: 500px;
  background-image: url('~assets/images/opportunity/page-hero.png');
  background-size: cover;

  .row {
    flex-grow: 1;

    .col-12 {
      display: flex;
    }
  }

  .hero-content {
    flex-grow: 1;
    align-self: center;
    margin-left: 8rem;
    padding: 2rem;
  }

  .hero-title {
    font-size: 2.95rem;
    font-weight: 600;
    color: white;
  }

  .hero-subtitle {
    font-size: 1.46rem;
    color: white;
  }

  .button {
    font-size: 1.05rem;
    font-weight: 600;
    padding: 9px 25px;
    margin-top: 20px;
  }
}

.inform-section {
  padding: 50px;
  margin: 20px 0;
  background-image: url('~assets/images/opportunity/bg-white-texture.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: right;

  .inform-section-text {
    font-size: 1.46rem;
    line-height: 1.7;
    text-align: center;
    color: $color-blue-2;
    margin-bottom: 0;
  }
}

.present-section {
  margin: 80px auto;

  .present-section-container {
    background-image: url('~assets/images/opportunity/man-woman-illustration.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    height: 450px;
    display: flex;
    flex-direction: column;
  }

  .present-section-text {
    color: $color-blue-1;
    font-size: 1.3rem;
    margin-bottom: 0;
  }

  .present-section-upper-text {
    max-width: 230px;
  }

  .present-section-lower-text {
    max-width: 300px;
    margin-top: auto;
    text-align: right;
    align-self: flex-end;
  }
}

.methods-section {
  text-align: center;
  margin: 120px auto 150px auto;

  .row {
    margin: 0 220px;

    & > div {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

  .methods-section-header {
    color: $color-blue-2;
    font-size: 1.95rem;
    font-weight: bold;
  }

  .methods-section-sub-header {
    font-size: 1.13rem;
    color: $color-blue-1;
    max-width: 300px;
    min-height: 80px;
  }

  .methods-section-img-container {
    height: 350px;
    width: 350px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $color-cyan-2;
    border-radius: 500px;
    margin-bottom: 20px;
  }

  .methods-section-img {
    width: 100%;
  }

  .methods-section-subtitle {
    font-size: 1.13rem;
    color: $color-blue-3;
    margin-bottom: 0;
    max-width: 300px;
  }
}

.oz-program-section {
  background-color: $color-cyan-1;
  padding: 50px;

  .oz-program-section-text {
    color: $color-blue-1;
    font-size: 1.46rem;
    line-height: 1.7;
    text-align: center;
    margin: 0 auto;
    max-width: 700px;
  }
}

.why-oz-section {
  padding-top: 30px;
  .why-oz-section-title {
    font-size: 2.11rem;
    text-align: center;
    margin: 60px auto;
    font-weight: bold;
    color: $color-blue-2;
  }

  .why-oz-section-bg {
    background-image: url('~assets/images/opportunity/foot-two-ways.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: bottom;
    height: 300px;
    margin-bottom: 140px;
  }

  .why-oz-section-text {
    font-size: 1.13rem;
    background-color: rgba(255, 255, 255, 0.5);
    color: $color-blue-2;
    max-width: 500px;
    padding: 25px;
    border-radius: 12px;
    font-weight: bold;
    min-height: 185px;
  }
}

.benefits-section {
  margin-bottom: 100px;

  .benefits-section-img {
    width: 100%;
  }
}

.data-section {
  background-image: url('~assets/images/opportunity/map-white.png');
  background-size: cover;
  background-position: center;

  .data-section-upper,
  .data-section-lower {
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .data-section-upper {
    background-color: rgba($color-blue-4, 0.8);
    height: 400px;
  }

  .data-section-upper-title,
  .data-section-lower-title {
    font-weight: bold;
    font-size: 7rem;
    color: $color-blue-2;
    line-height: 1.1;
  }

  .data-section-upper-subtitle,
  .data-section-lower-subtitle {
    color: $color-blue-1;
    font-size: 1.5rem;
    font-weight: bold;
    max-width: 840px;
    text-align: center;
    margin-bottom: 0;
  }

  .data-section-lower {
    background-color: rgba(255, 255, 255, 0.6);
    padding: 0;
    height: 300px;
  }

  .data-section-lower-title {
    font-weight: normal;

    @supports (-webkit-text-stroke: 1px black) {
      -webkit-text-stroke: 3px $color-blue-2;
      -webkit-text-fill-color: transparent;
    }
  }
}

.tax-section {
  margin: 100px auto;

  .tax-section-img {
    width: 200px;
    margin-right: 50px;
  }

  .tax-section-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .tax-section-info-title {
    font-size: 2.2rem;
    color: $color-blue-2;
    margin-bottom: 20px;
    font-weight: bold;
  }

  .tax-section-info-subtitle {
    color: $color-blue-2;
    font-size: 1.3rem;
    margin-bottom: 0;
  }
}

.oz-usage-section {
  background-color: $color-cyan-1;
  padding: 50px;

  .oz-usage-section-text {
    color: $color-blue-1;
    font-size: 1.9rem;
    line-height: 1.6;
    text-align: center;
    margin: 0 auto;
    max-width: 460px;
  }
}

.explore-section {
  margin: 80px 0;

  .row {
    margin: 0 50px;
  }

  .explore-section-text {
    font-size: 1.46rem;
    color: $color-blue-2;
    margin-bottom: 40px;
    font-weight: bolder;
  }

  .explore-section-button {
    display: inline-block;
    font-size: 1rem;
    font-weight: 600;
    color: #062155;
    padding: 7px 20px;
    border: 2px solid #2c4574;
    border-radius: 30px;
    text-decoration: none;
    transition: all 0.3s;

    &:hover {
      color: white;
      background-color: #2c4574;
    }
  }
}
</style>
