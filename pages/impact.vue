<template>
  <div class="impact-page">
    <section class="container-fluid hero-section">
      <div class="row">
        <div class="col-12">
          <div class="hero-content">
            <h2 class="hero-title">Recharge America</h2>
            <h3 class="hero-subtitle">
              Opportunity Zones fuelling exponential growth.
            </h3>
            <a href="#" class="button button-solid">Learn More</a>
          </div>
        </div>
      </div>
    </section>

    <section class="container inform-section">
      <div class="row justify-content-center">
        <div class="col-md-10">
          <p class="inform-section-text">
            Over the last century, the US has led the world in value creation,
            regeneration of economies and societies.
          </p>
        </div>
      </div>
    </section>

    <section class="container-fluid people-section">
      <div class="row">
        <div class="col-md-6 people-section-text-container">
          <p class="people-section-text">
            Through this progress, we as a nation, have generated tremendous
            wealth which has mobilized growth in communities at large.
          </p>
        </div>

        <div class="col-md-6 people-section-figure-container">
          <img
            class="people-section-figure"
            src="~/assets/images/impact/people.png"
            alt="group of people"
          />
        </div>
      </div>
    </section>

    <section class="container-fluid economic-section">
      <div class="row">
        <div class="col-12">
          <p class="economic-section-content">
            Economic cycles and a shift in business priorities have impacted
            certain communities that otherwise have all the elements necessary
            for success.
          </p>
        </div>
      </div>
    </section>

    <section class="container-fluid oz-program-section">
      <div class="row justify-content-center">
        <div class="col-md-7">
          <p class="oz-program-section-text">
            With the help of OZ program, these communities have a seat at the
            table to partner with investors to deliver on a long-term vision
            that can fuel exponential growth.
          </p>
        </div>
      </div>
    </section>

    <section class="container social-section">
      <div class="row justify-content-center">
        <div class="col-md-10">
          <div class="social-section-content">
            <h2 class="social-section-title">Social impact investments</h2>
            <p class="social-section-subtitle">
              are starting to show demonstrable value due to multiple reasons
            </p>

            <ul class="social-section-items">
              <li class="social-section-item">
                <p>
                  Governments and communities understand that without desirable
                  investments it’s impossible to develop socially,
                  environmentally, and economically sustainable communities.
                </p>
              </li>

              <li class="social-section-item">
                <p>
                  Investors get the benefit of adding guaranteed commitment from
                  the government and community incentives over the returns on
                  their investments.
                </p>
              </li>

              <li class="social-section-item">
                <p>
                  51% of global consumers will pay extra for products and
                  services committed to positive social and environmental
                  impact.
                </p>
              </li>

              <li class="social-section-item">
                <p>
                  Preservation of long-term gains, in most cases, requires
                  factoring more than just financial dynamics to insure sound
                  investment. Social, environmental, and local impact are key in
                  unlocking additional gains that are mostly overlooked due to
                  lack of investor insights.
                </p>
              </li>

              <li class="social-section-item">
                <p>
                  With <strong>$6.1 trillion in capital gains</strong> based
                  eligible funds for OZ re-investment, this is an incredible
                  time to select the investment that works for your goals and
                  vision. It’s a great time to Recharge America one community at
                  a time.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data: () => ({}),
});
</script>

<style lang="scss" scoped>
.hero-section {
  display: flex;
  height: 500px;
  background-image: url('~assets/images/impact/page-hero.png');
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
  padding: 60px;

  .inform-section-text {
    font-size: 1.53rem;
    line-height: 1.7;
    text-align: center;
    color: $color-blue-1;
  }
}

.people-section {
  .people-section-text-container {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $color-grey-1;
  }

  .people-section-text {
    color: $color-blue-1;
    font-size: 1.868rem;
    font-weight: 500;
    max-width: 400px;
  }

  .people-section-figure-container {
    padding: 0;
  }

  .people-section-figure {
    width: 100%;
    padding: 0;
  }
}

.economic-section {
  display: flex;
  height: 500px;
  background-image: url('~assets/images/impact/water-droplet.png');
  background-size: cover;
  padding: 40px;
  justify-content: center;

  .economic-section-content {
    font-size: 1.9rem;
    color: $color-white;
    font-weight: 500;
    max-width: 880px;
    text-align: center;
  }
}

.oz-program-section {
  background-color: $color-cyan-1;
  padding: 40px;

  .oz-program-section-text {
    color: $color-blue-1;
    font-size: 1.46rem;
    line-height: 1.7;
    text-align: center;
    margin: 0 auto;
    max-width: 650px;
  }
}

.social-section {
  padding: 110px 0;

  .social-section-title {
    font-size: 2.6rem;
    color: $color-blue-1;
  }

  .social-section-subtitle {
    color: $color-blue-1;
    font-size: 1.46rem;
  }

  .social-section-items {
    margin-top: 40px;
    padding: 0;
    padding-right: 2px;
  }

  .social-section-item {
    font-size: 1.3rem;
    list-style-type: none;
    display: flex;
    margin-bottom: 20px;

    &:last-of-type {
      margin-bottom: 0;
    }

    &::before {
      content: '';
      background: url('~assets/icons/check-icon.png');
      background-repeat: no-repeat;
      display: block;
      background-size: cover;
      flex: 0 0 50px;
      height: 50px;
      margin-right: 90px;
    }
  }
}
</style>
