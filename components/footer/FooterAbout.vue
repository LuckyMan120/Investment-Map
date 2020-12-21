<template>
  <div class="footer-about">
    <b-container>
      <b-row align-v="center">
        <b-col cols="12" md="4">
          <nuxt-link to="/">
            <img src="~/assets/images/footer-logo.png" />
          </nuxt-link>
        </b-col>

        <b-col cols="12" md="4" class="oz-about">
          Opportunity zones is a non profit organisation located in Seattle that
          seeks to translate insights from rigorous, scientific research to
          policy change by harnessing the power of “Big Data” using an
          interdisciplinary approach.
        </b-col>

        <b-col cols="1" class="separator"></b-col>

        <b-col cols="12" md="3" class="links-col">
          <h3 class="links-title">Site map</h3>
          <b-row>
            <b-col cols="5">
              <ul class="links">
                <li class="link-item">
                  <nuxt-link to="/" class="link">Home</nuxt-link>
                </li>
                <li class="link-item">
                  <nuxt-link to="opportunity" class="link"
                    >Opportunity</nuxt-link
                  >
                </li>
                <li class="link-item">
                  <nuxt-link to="/calculator" class="link"
                    >Calculator</nuxt-link
                  >
                </li>
                <li class="link-item">
                  <nuxt-link to="/news" class="link">News</nuxt-link>
                </li>
              </ul>
            </b-col>
            <b-col cols="5">
              <ul class="links">
                <li class="link-item">
                  <nuxt-link to="/about" class="link">About</nuxt-link>
                </li>
                <li class="link-item">
                  <nuxt-link to="/contact" class="link">Contact</nuxt-link>
                </li>
                <li class="link-item">
                  <a href="#" class="link">FAQs</a>
                </li>
                <li class="link-item">
                  <a href="#" class="link">Guide</a>
                </li>
              </ul>
            </b-col>
          </b-row>
        </b-col>
      </b-row>

      <b-row>
        <b-col class="copyright">
          <fa :icon="faCopyright"></fa>
          2020 OZ Group opportunity Zone. All rights reserved. Privacy policy
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';

export default Vue.extend({
  computed: {
    faCopyright: () => faCopyright,
  },
});
</script>

<style scoped>
.footer-about {
  background-color: #062155;
  padding: 60px 0 30px;
}

.oz-about {
  font-size: 0.73rem;
  color: white;
}

.separator {
  display: flex;
  justify-content: center;
}

.separator::after {
  content: '';
  width: 1px;
  height: 80px;
  background-color: #707070;
}

.links-title {
  color: white;
  font-weight: 700;
  font-size: 0.95rem;
}

.links {
  list-style: none;
  margin: 0;
  padding: 0;
}

.link {
  color: #b5b9bf;
  font-size: 0.85rem;
  font-weight: 600;
}

.copyright {
  margin-top: 20px;
  color: white;
  font-size: 0.8rem;
  text-align: center;
}
</style>
