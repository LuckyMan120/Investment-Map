<template>
  <div class="home-page">
    <HeroCarousel :items="carouselItems" />
    <b-container class="plain-section how-big-is-opportunity-container">
      <b-row>
        <b-col cols="12">
          <h2 class="section-title">How Big Is The Opportunity?</h2>
          <p class="section-desc">
            With over 8,700 census tracts designated as Qualified Opportunity
            Zones, a data-driven approach to market selection is paramount to
            reduce risk and increase the rewards of Opportunity Zone investing.
            We use our proprietary market selection formula for identifying the
            most attractive markets.
          </p>
        </b-col>
      </b-row>
    </b-container>

    <b-container fluid>
      <b-row class="learn-more-about-oz-section">
        <b-col cols="12">
          <h2>Learn More About Opportunity Zones</h2>
        </b-col>
      </b-row>
    </b-container>

    <b-container class="plain-section learn-more-desc-section">
      <b-row>
        <b-col cols="12">
          <p class="section-desc">
            Designed to encourage long-term investment in low-income
            communities, Opportunity Zones offer investors incentives for
            putting their capital to work in low-income communities:
          </p>
        </b-col>
      </b-row>
    </b-container>

    <b-container fluid>
      <b-row class="bg-section how-it-works">
        <b-col cols="12">
          <b-container>
            <b-row>
              <b-col cols="5" class="text-column">
                <div class="text-column-content">
                  <h2 class="section-title">How it works</h2>
                  <p class="section-desc">
                    Click the play button on the right to see an explainer video
                  </p>
                  <a href="#" class="button">Learn more</a>
                </div>
              </b-col>

              <b-col cols="7" class="img-column">
                <img
                  src="~/assets/images/home/how-works-thumbnail.png"
                  alt="How it works video"
                />
              </b-col>
            </b-row>
          </b-container>
        </b-col>
      </b-row>
    </b-container>

    <b-container class="plain-section intro-section">
      <b-row>
        <b-col cols="12">
          <h2 class="section-title">Introducing Opportunity Zones</h2>
          <p class="section-desc">
            Designed to encourage long-term investment in low-income
            communities, Opportunity Zones offer investors incentives for
            putting their capital to work in low-income communities:
          </p>
        </b-col>
      </b-row>
    </b-container>

    <b-container fluid>
      <b-row class="bg-section select-state-section">
        <b-col cols="12">
          <b-container>
            <b-row>
              <b-col cols="5" class="text-column">
                <div class="text-column-content">
                  <h2 class="section-title">Select State</h2>
                  <p class="section-desc">
                    Opportunity Zones are focused on investing in high-quality
                    real estate in major US cities with long-term growth
                    potential.
                  </p>
                  <a href="#" class="button">Invest Now</a>
                </div>
              </b-col>
              <b-col cols="7" class="img-column">
                <img
                  src="~/assets/images/home/states-map.png"
                  alt="select state"
                />
              </b-col>
            </b-row>
          </b-container>
        </b-col>
      </b-row>
    </b-container>

    <b-container class="plain-section learn-more-about-opportunity-section">
      <b-row>
        <b-col cols="12">
          <h2 class="section-title">Learn More About Opportunity Zones</h2>
          <p class="section-desc">
            Opportunity Zones are focused on investing in high-quality real
            estate in major US cities with long-term growth potential. We plan
            to take on massive value-add properties and new developments in
            Opportunity Zones to maximize cash flow and returns.
          </p>
        </b-col>
      </b-row>
    </b-container>

    <b-container class="blog-slider-section">
      <b-row>
        <b-col cols="12">
          <div>
            <VueSlickCarousel v-bind="blogSliderOptions" class="blog-slider">
              <div
                class="blog-slide"
                v-for="slide in blogSlides"
                :key="slide.id"
              >
                <div class="blog-slide-content">
                  <div class="slide-img-wrapper">
                    <img
                      :src="
                        require(`~/assets/images/home/blog-slider/${slide.image}.png`)
                      "
                    />
                  </div>
                  <div class="slide-title">
                    {{ slide.title }}
                  </div>
                  <a href="#" class="button">Read More</a>
                </div>
              </div>

              <template #prevArrow>
                <div class="arrow prev-arrow">
                  <fa :icon="faChevronLeft" />
                </div>
              </template>

              <template #nextArrow>
                <div class="arrow next-arrow">
                  <fa :icon="faChevronRight" />
                </div>
              </template>
            </VueSlickCarousel>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import HeroCarousel from '~/components/HeroCarousel/HeroCarousel.vue';

export default Vue.extend({
  components: {
    HeroCarousel,
  },

  computed: {
    faChevronRight: () => faChevronRight,
    faChevronLeft: () => faChevronLeft,
  },

  data() {
    return {
      blogSliderOptions: {
        arrows: true,
        dots: false,
        slidesToShow: 4,
        infinite: true,
        adaptiveHeight: true,
      },
      blogSlides: [
        {
          id: 1,
          image: 'slide1',
          title: 'Opportunity? YES! But There Are Some Pitfalls As Well…',
        },
        {
          id: 2,
          image: 'slide2',
          title: 'Beware Of Garbage Opportunity Zone Projects',
        },
        {
          id: 3,
          image: 'slide3',
          title: 'OpportunityZones vs 1031 Exchanges, What You Need.',
        },
        {
          id: 4,
          image: 'slide4',
          title: 'Opportunity? YES! But There Are Some Pitfalls As Well…',
        },
        {
          id: 5,
          image: 'slide1',
          title: 'Opportunity? YES! But There Are Some Pitfalls As Well…',
        },
        {
          id: 6,
          image: 'slide2',
          title: 'Beware Of Garbage Opportunity Zone Projects',
        },
        {
          id: 7,
          image: 'slide3',
          title: 'OpportunityZones vs 1031 Exchanges, What You Need.',
        },
        {
          id: 8,
          image: 'slide4',
          title: 'Opportunity? YES! But There Are Some Pitfalls As Well…',
        },
      ],
      carouselItems: [
        {
          id: 1,
          image: 'slide1',
          title: 'Sound investments. Strong Communities.',
          subtitle: 'Learn More About Opportunity Zones',
          button: 'Explore',
        },
        {
          id: 2,
          image: 'slide1',
          title: 'Sound investments. Strong Communities.',
          subtitle: 'Learn More About Opportunity Zones',
          button: 'Explore',
        },
        {
          id: 3,
          image: 'slide1',
          title: 'Sound investments. Strong Communities.',
          subtitle: 'Learn More About Opportunity Zones',
          button: 'Explore',
        },
        {
          id: 4,
          image: 'slide1',
          title: 'Sound investments. Strong Communities.',
          subtitle: 'Learn More About Opportunity Zones',
          button: 'Explore',
        },
        {
          id: 5,
          image: 'slide1',
          title: 'Sound investments. Strong Communities.',
          subtitle: 'Learn More About Opportunity Zones',
          button: 'Explore',
        },
      ],
    };
  },
});
</script>

<style lang="scss" scoped>
.plain-section {
  max-width: 780px;

  .section-title {
    font-size: 1.868rem;
    font-weight: 600;
    color: #062155;
    text-align: center;
  }

  .section-desc {
    font-size: 0.975rem;
    color: #264478;
    text-align: center;
    margin-top: 30px;
  }
}

.bg-section {
  .text-column {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .section-title {
      font-size: 1.86rem;
      font-weight: 600;
      color: #062155;
    }

    .section-desc {
      font-size: 0.893rem;
      max-width: 250px;
      margin-top: 15px;
    }
  }

  .img-column {
    text-align: right;
    margin-top: -20px;
    margin-bottom: -20px;

    img {
      max-width: 100%;
    }
  }
}

.how-big-is-opportunity-container {
  margin-top: 40px;
}

.learn-more-about-oz-section {
  margin-top: 50px;
  height: 370px;
  background-image: url('~assets/images/home/learn-more-about-oz-bg.png');
  background-size: cover;
  align-items: center;

  h2 {
    font-size: 2.1rem;
    text-align: center;
    font-weight: 600;
    color: #062155;
  }
}

.plain-section.learn-more-desc-section {
  margin-top: 50px;
  max-width: 500px;

  .section-desc {
    color: #707070;
  }
}

.how-it-works {
  background-color: #afcbd8;
  margin-top: 100px;

  .button {
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

.plain-section.intro-section {
  margin-top: 120px;

  .section-desc {
    color: #707070;
    max-width: 550px;
    margin: 40px auto 0;
  }
}

.select-state-section {
  margin-top: 70px;
  background-color: #def4f2;

  .button {
    display: inline-block;
    font-size: 1rem;
    font-weight: 700;
    color: white;
    padding: 8px 15px;
    margin-top: 10px;
    border-radius: 30px;
    background-color: #df1e17;
    text-decoration: none;
    transition: all 0.3s;

    &:hover {
      color: white;
      background-color: #bd1610;
    }
  }
}

.learn-more-about-opportunity-section {
  margin-top: 110px;

  .section-desc {
    color: #707070;
  }
}

.blog-slider-section {
  margin-top: 100px;
  margin-bottom: 100px;
}

.blog-slide {
  padding: 0 20px;

  .blog-slide-content {
    background-color: #f7f7f7;

    img {
      width: 100%;
      pointer-events: none;
    }

    .slide-title {
      font-size: 0.9rem;
      font-weight: 600;
      padding: 15px 15px;
    }

    .button {
      display: inline-block;
      font-size: 0.8rem;
      font-weight: 600;
      color: #062155;
      padding: 5px 15px;
      border: 2px solid #2c4574;
      border-radius: 30px;
      text-decoration: none;
      transition: all 0.3s;
      margin: 20px 0 20px 20px;

      &:hover {
        color: white;
        background-color: #2c4574;
      }
    }
  }
}

.arrow {
  font-size: 2.7rem;
  color: #3976bd;
  z-index: 2;

  &.prev-arrow {
    left: 30px;
  }

  &.next-arrow {
    right: 30px;
  }

  &::before {
    content: none;
  }
}
</style>
