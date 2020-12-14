<template>
  <div class="about-page">
    <section class="container-fluid hero-section">
      <div class="row">
        <div class="col-12">
          <div class="hero-content">
            <h2 class="hero-title">Opportunity Zones</h2>
            <h3 class="hero-subtitle">Stronger communities</h3>
            <a href="#" class="button button-solid">Learn More</a>
          </div>
        </div>
      </div>
    </section>

    <section class="container-fluid headquarter-section">
      <div class="row">
        <div class="col-12">
          <h3 class="headquarter">
            OZ for Impact is headquartered in Seattle, Washington.
          </h3>
        </div>
      </div>
    </section>

    <section class="container-fluid headquarter-bg-section"></section>

    <section class="container oz-desc-section">
      <div class="row">
        <div class="col-md-3 oz-logo-wrapper">
          <img
            src="~/assets/images/oz-logo.png"
            alt="OZ Logo"
            class="oz-logo"
          />
        </div>
        <div class="col-md-9">
          <p class="oz-desc">
            OZ for Impact is a technology based non-profit conceived from
            academic research at Brown and IE University.
          </p>
        </div>
      </div>
    </section>

    <section class="container-fluid slogan-section">
      <div class="row">
        <div class="col-12">
          <div class="container">
            <div class="row">
              <div class="col-12">
                <h3 class="slogan">
                  <fa :icon="faQuoteLeft" class="quote quote-left" />
                  We aim to build stronger communities by providing resources to
                  improve the decision-making process for private investments
                  and public programs.
                  <fa :icon="faQuoteRight" class="quote quote-right" />
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="container-fluid partnership-section">
      <div class="row">
        <div class="col-12">
          <div class="container">
            <div class="row">
              <div class="col-md-5">
                <p class="partnership-desc">
                  Working in partnership with governments, NGOs, the private
                  sector, and local communities, we build tools and resources to
                  facilitate place-based <b>investment</b>.
                </p>
                <a href="#" class="button button-outline">Learn More</a>
              </div>
              <div class="col-md-5 image-wrapper">
                <img src="~/assets/images/about/idea-girl.png" alt="idea" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons';

export default Vue.extend({
  data: () => ({
    faQuoteLeft,
    faQuoteRight,
  }),
});
</script>

<style lang="scss" scoped>
.hero-section {
  display: flex;
  height: 500px;
  background-image: url('~assets/images/about/page-hero.png');
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
    text-align: center;
  }

  .hero-title {
    font-size: 1.6rem;
    color: white;
    text-align: center;
  }

  .hero-subtitle {
    font-size: 2.6rem;
    font-weight: 600;
    color: white;
    text-align: center;
  }

  .button {
    font-size: 1.05rem;
    font-weight: 600;
    padding: 9px 25px;
    margin-top: 20px;
  }
}

.headquarter-section .col-12 {
  display: flex;
  justify-content: center;
  margin-top: 80px;

  .headquarter {
    font-size: 2.11rem;
    font-weight: 600;
    text-align: center;
    color: #2275c3;
    max-width: 550px;
  }
}

.headquarter-bg-section {
  background-image: url('~assets/images/about/headquarter-section-bg.png');
  background-size: cover;
  height: 400px;
  margin-top: 70px;
}

.oz-desc-section {
  padding: 50px;

  .oz-logo-wrapper {
    align-self: center;
    text-align: center;
  }

  .oz-logo {
    width: 120px;
  }

  .oz-desc {
    font-size: 2rem;
    font-weight: 600;
    color: #2275c3;
  }
}

.slogan-section {
  background-color: #def4f2;
  padding-top: 50px;
  padding-bottom: 50px;

  .col-12 {
    display: flex;
    justify-content: center;
  }

  .slogan {
    font-size: 1.85rem;
    font-weight: 600;
    line-height: 1.3;
    position: relative;
    max-width: 900px;
    color: $primary-color;

    .quote {
      position: absolute;
      font-size: 4rem;
      color: #90ede5;

      &-left {
        left: -90px;
        bottom: -15px;
      }

      &-right {
        right: -70px;
        top: -15px;
      }
    }
  }
}

.partnership-section {
  margin-top: 80px;
  margin-bottom: 80px;

  .partnership-desc {
    font-size: 1.8rem;
    color: #707070;
  }

  .image-wrapper {
    text-align: right;

    img {
      max-width: 350px;
    }
  }
}
</style>
