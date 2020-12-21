<template>
  <div class="news-page">
    <HeroCarousel :items="carouselItems" btnOutline />

    <section class="container page-into-section">
      <div class="row justify-content-center align-items-center">
        <div class="col-md-7">
          <h2 class="page-into-section-title">
            With latest information on opportunity zones
          </h2>
          <a href="#spot-light">
            <img
              src="~assets/icons/arrow-down.png"
              class="page-into-section-icon"
              alt="arrow down icon"
            />
          </a>
        </div>
      </div>
    </section>

    <section class="container-fluid featured-section">
      <div class="row">
        <div class="col-md-12">
          <SubjectHeader title="Featured" />

          <div class="featured-section-items">
            <div
              class="featured-section-item"
              v-for="(item, i) in featuredItems"
              :key="i"
            >
              <img
                :src="require(`~/assets/images/news/${item.image}.png`)"
                alt="phoenix"
                class="featured-section-image"
              />

              <p class="featured-section-title">{{ item.title }}</p>
              <span class="featured-section-src">
                {{ item.src }}
              </span>
              <span class="featured-section-date">{{ item.date }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="container-fluid spot-light-section">
      <div class="row">
        <div class="col-md-12">
          <SubjectHeader title="Spot Light" />

          <div class="spot-light-items">
            <VueSlickCarousel
              v-bind="spotLightSliderOptions"
              class="spot-light-section-slider"
            >
              <div
                v-for="(slide, i) in spotLightItems"
                :key="i"
                class="spot-light-section-slide"
              >
                <div class="spot-light-section-slide-content">
                  <img
                    class="spot-light-section-slide-img"
                    :src="require(`~/assets/images/news/${slide.image}.png`)"
                  />

                  <p class="spot-light-section-slide-title">
                    {{ slide.title }}
                  </p>
                  <span class="spot-light-section-slide-src">
                    {{ slide.src }}
                  </span>
                  <span class="spot-light-section-slide-date">
                    {{ slide.date }}
                  </span>
                </div>
              </div>

              <template #nextArrow>
                <div class="arrow next-arrow spot-light-next-arrow">
                  <fa :icon="faChevronRight" />
                </div>
              </template>
            </VueSlickCarousel>
          </div>
        </div>
      </div>
    </section>

    <section id="spot-light" class="container-fluid news-section">
      <div class="row">
        <div class="col-md-12">
          <SubjectHeader title="Spot Light" />

          <div class="news-section-items">
            <VueSlickCarousel
              v-bind="newsSliderOptions"
              class="news-section-slider"
            >
              <div
                v-for="(slide, i) in featuredItems"
                :key="i"
                class="news-section-slide"
              >
                <div class="news-section-slide-content">
                  <img
                    class="news-section-slide-img"
                    :src="require(`~/assets/images/news/${slide.image}.png`)"
                  />

                  <div class="news-section-slide-info">
                    <p class="news-section-slide-title">
                      {{ slide.title }}
                    </p>
                    <span class="news-section-slide-src">
                      {{ slide.src }}
                    </span>
                    <span class="news-section-slide-date">
                      {{ slide.date }}
                    </span>
                  </div>
                </div>
              </div>

              <template #nextArrow>
                <div class="arrow next-arrow spot-light-next-arrow">
                  <fa :icon="faChevronRight" />
                </div>
              </template>

              <template #customPaging="page">
                <div>{{ page + 1 }}</div>
              </template>
            </VueSlickCarousel>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import {
  faChevronRight,
  faChevronLeft,
  faStepForward,
  faStepBackward,
} from '@fortawesome/free-solid-svg-icons';
import HeroCarousel from '~/components/HeroCarousel/HeroCarousel.vue';
import SubjectHeader from '~/components/SubjectHeader/SubjectHeader.vue';

export default Vue.extend({
  components: {
    HeroCarousel,
    SubjectHeader,
  },

  data() {
    return {
      spotLightSliderOptions: {
        arrows: true,
        dots: true,
        slidesToShow: 1,
        infinite: true,
        adaptiveHeight: true,
      },
      newsSliderOptions: {
        arrows: true,
        dots: true,
        slidesToShow: 4,
        infinite: true,
        adaptiveHeight: true,
        dotsClass: 'slick-news-nav-section-custom-dots',
      },
      carouselItems: [
        {
          id: 1,
          image: 'slide2',
          title: 'Stay informed',
          subtitle: 'With latest information on opportunity zones ',
          button: 'Read All',
        },
        {
          id: 2,
          image: 'slide2',
          title: 'Stay informed',
          subtitle: 'With latest information on opportunity zones ',
          button: 'Read All',
        },
        {
          id: 3,
          image: 'slide2',
          title: 'Stay informed',
          subtitle: 'With latest information on opportunity zones ',
          button: 'Read All',
        },
        {
          id: 4,
          image: 'slide2',
          title: 'Stay informed',
          subtitle: 'With latest information on opportunity zones ',
          button: 'Read All',
        },
        {
          id: 5,
          image: 'slide2',
          title: 'Stay informed',
          subtitle: 'With latest information on opportunity zones ',
          button: 'Read All',
        },
      ],
      featuredItems: [
        {
          image: 'phoenix',
          title:
            'Phoenix developer begins $111M redevelopment of former cement plant',
          src: 'Phoenix Business Journal',
          date: 'Nov 9, 2020',
        },
        {
          image: 'social-program',
          title: 'Social Programs Can Sometimes Turn a Profit for Taxpayers',
          src: 'The New York Times',
          date: 'July 10, 2020',
        },
        {
          image: 'dark-side',
          title: 'The Dark Side Of The Recovery Revealed In Big Data',
          src: 'NPR - Planet Money',
          date: 'Oct 9, 2020',
        },
        {
          image: 'helping',
          title: 'Helping local leaders reach the most vulnerable',
          src: 'Bill & Melinda Gates Foundation',
          date: '7 MAY, 2020',
        },
        {
          image: 'dark-side',
          title: 'The Dark Side Of The Recovery Revealed In Big Data',
          src: 'NPR - Planet Money',
          date: 'Oct 9, 2020',
        },
      ],
      spotLightItems: [
        {
          image: 'phoenix-large',
          title:
            'Phoenix developer begins $111M redevelopment of former cement plant',
          src: 'Phoenix Business Journal',
          date: 'Nov 9, 2020',
        },
        {
          image: 'phoenix-large',
          title:
            'Phoenix developer begins $111M redevelopment of former cement plant',
          src: 'Phoenix Business Journal',
          date: 'Nov 9, 2020',
        },
      ],
    };
  },

  computed: {
    faChevronRight: () => faChevronRight,
    faChevronLeft: () => faChevronLeft,
    faStepForward: () => faStepForward,
    faStepBackward: () => faStepBackward,
  },

  head() {
    return {
      titleTemplate: '%s - News',
    };
  },
});
</script>

<style lang="scss" scoped>
.page-into-section {
  margin: 70px auto;
  text-align: center;

  .page-into-section-title {
    font-size: 1.462rem;
  }

  .page-into-section-icon {
    margin-top: 40px;
  }
}

.featured-section {
  margin-bottom: 100px;

  .row {
    max-width: 1466px;
    margin: 0 auto;
  }

  .featured-section-items {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 260px);
    grid-column-gap: 20px;
    grid-row-gap: 50px;
  }

  .featured-section-item {
    background-color: $color-grey-2;
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: 1fr auto auto;
    grid-column-gap: 20px;

    .featured-section-image {
      height: 100%;
      grid-template: 1 / 1;
      grid-row: 1/ -1;
    }

    .featured-section-title {
      color: $color-blue-5;
      font-size: 1.3rem;
      font-weight: bold;
      margin-top: 30px;
      cursor: pointer;
    }

    .featured-section-src {
      color: $color-blue-5;
      font-size: 0.97rem;
      font-weight: bold;
    }

    .featured-section-date {
      color: $color-grey-3;
      font-size: 0.81rem;
      margin-bottom: 10px;
    }
  }
}

.spot-light-section {
  margin-bottom: 100px;

  .row {
    max-width: 1466px;
    margin: 0 auto;
  }

  .spot-light-section-slide {
    padding: 0 20px;

    .spot-light-section-slide-content {
      background-color: $color-grey-2;
      display: grid;
      grid-template-columns: 1fr auto;
      grid-template-rows: 1fr auto auto;
      grid-column-gap: 40px;
      height: 400px;

      .spot-light-section-slide-img {
        pointer-events: none;
        height: 100%;
        grid-column: 2 / -1;
        grid-row: 1/ -1;
      }

      .spot-light-section-slide-title {
        color: $color-blue-5;
        font-size: 1.54rem;
        font-weight: bold;
        margin-top: 40px;
        cursor: pointer;
        margin-left: 25px;
      }

      .spot-light-section-slide-src {
        color: $color-blue-5;
        font-size: 0.97rem;
        font-weight: bold;
        margin-left: 25px;
      }

      .spot-light-section-slide-date {
        color: $color-grey-3;
        font-size: 0.81rem;
        margin-bottom: 30px;
        margin-left: 25px;
      }
    }
  }
}

.news-section {
  margin-bottom: 74px;
  padding-top: 50px;

  .row {
    max-width: 1466px;
    margin: 0 auto;
  }

  .news-section-slide {
    padding: 0 20px;

    .news-section-slide-content {
      background-color: $color-grey-2;
      display: flex;
      flex-direction: column;
      min-height: 500px;

      .news-section-slide-img {
        pointer-events: none;
        width: 100%;
        margin-bottom: 15px;
      }

      .news-section-slide-info {
        padding: 0 25px 10px 25px;
        display: flex;
        flex-direction: column;
        min-height: 160px;
      }

      .news-section-slide-title {
        color: $color-blue-5;
        font-size: 0.975rem;
        font-weight: bold;
        cursor: pointer;
        margin-bottom: auto;
      }

      .news-section-slide-src {
        color: $color-blue-5;
        font-size: 0.97rem;
        font-weight: bold;
        margin-top: auto;
      }

      .news-section-slide-date {
        color: $color-grey-3;
        font-size: 0.81rem;
      }
    }
  }
}
</style>
