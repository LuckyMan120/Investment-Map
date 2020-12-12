<template>
  <div class="footer-social">
    <div class="container">
      <div class="row align-items-center">
        <div class="social col-md-3">
          <h3 class="social-title">Find us here</h3>
          <div class="social-icons">
            <a href="#" class="icon-link">
              <fa :icon="faFacebookSquare" class="icon" />
            </a>
            <a href="#" class="icon-link">
              <fa :icon="faTwitterSquare" class="icon" />
            </a>
            <a href="#" class="icon-link">
              <fa :icon="faLinkedin" class="icon" />
            </a>
            <a href="#" class="icon-link">
              <fa :icon="faYoutubeSquare" class="icon" />
            </a>
          </div>
        </div>

        <div class="subscription-desc col-md-4">
          Sign up for email updates, including information on big events and
          upcoming opportunities
        </div>

        <div class="col-md-1 d-block"></div>

        <div class="subscription-form col-md-4">
          <input type="text" placeholder="Email Adress" />
          <button type="button">Sign Up</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  faFacebookSquare,
  faTwitterSquare,
  faLinkedin,
  faYoutubeSquare,
} from '@fortawesome/free-brands-svg-icons';

export default Vue.extend({
  computed: {
    faFacebookSquare: () => faFacebookSquare,
    faTwitterSquare: () => faTwitterSquare,
    faLinkedin: () => faLinkedin,
    faYoutubeSquare: () => faYoutubeSquare,
  },
});
</script>

<style scoped>
.footer-social {
  background-color: #afcbd8;
}

.footer-social .container {
  padding: 25px 10px;
}

.social-title {
  font-weight: 700;
  font-size: 1.3rem;
  margin-bottom: 10px;
  color: #264478;
}

.icon-link {
  margin-right: 25px;
}

.icon {
  color: #2275c3;
  font-size: 1.2rem;
}

.subscription-desc {
  font-size: 0.9rem;
  color: #264478;
}

.subscription-form {
  display: flex;
}

.subscription-form input {
  border: 0;
  border-radius: 20px 0 0 20px;
  padding: 7px 10px 7px 15px;
  flex-grow: 1;
}

.subscription-form input:focus {
  outline: 0;
}

.subscription-form input::placeholder {
  font-weight: 700;
  color: #c1c1c1;
}

.subscription-form button {
  border: 0;
  border-radius: 0 20px 20px 0;
  padding: 7px 40px;
  font-weight: 700;
  color: white;
  background-color: #2275c3;
}

.subscription-form button:focus {
  outline: none;
}
</style>
