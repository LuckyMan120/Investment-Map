<template>
  <div class="home-hero-wrapper">
    <VueSlickCarousel v-bind="slickOptions">
      <div v-for="(item, i) in items" :key="i" class="slide">
        <img
          :src="require(`~/assets/images/slider/${item.image}.png`)"
          class="img-responsive cover slide-img"
        />
        <div class="slide-content">
          <h1 class="slide-heading">{{ item.title }}</h1>
          <h2 class="slide-subheading">{{ item.subtitle }}</h2>
          <nuxt-link
            v-if="title !== 'news'"
            to="/calculator"
            class="slide-btn"
            :class="{ 'slide-btn--outline': btnOutline }"
            >{{ item.button }}</nuxt-link
          >
          <a
            v-else
            href="#spot"
            class="slide-btn"
            :class="{ 'slide-btn--outline': btnOutline }"
          >
            {{ item.button }}
          </a>
        </div>
      </div>
    </VueSlickCarousel>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    btnOutline: Boolean,
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      slickOptions: {
        slidesToShow: 3,
        arrows: false,
        dots: true,
        fade: true,
        dotsClass: 'slick-hero-custom-dots',
      },
    };
  },
});
</script>

<style scoped lang="scss">
.slide-img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  object-position: top center;
}

.slide-content {
  position: absolute;
  top: 20%;
  margin-left: 8rem;
  color: white;
  width: 100%;
  padding: 2rem;
}

.slide-heading {
  font-size: 2.3rem;
  font-weight: 700;
}

.slide-subheading {
  font-size: 1.4rem;
  font-weight: 500;
}

.slide-btn {
  display: inline-block;
  font-size: 1rem;
  font-weight: 700;
  color: white;
  background-color: #df1e17;
  border-radius: 30px;
  padding: 7px 35px;
  margin-top: 15px;
}

.slide-btn--outline {
  background-color: transparent;
  border: 2px solid #fff;
}

.slick-active .slide-content {
  animation: fadeInUp 1s;
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(100px);
  }

  100% {
    opacity: 1;
    transform: none;
  }
}
</style>
