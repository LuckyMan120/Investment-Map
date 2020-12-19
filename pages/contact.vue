<template>
  <div class="contact-page">
    <section class="get-in-touch-section">
      <div class="container">
        <div class="get-in-touch-content">
          <h2>Get in touch</h2>
          <h3>We’d love to hear from you.</h3>
          <a href="#" class="button button-outline">MESSAGE</a>
        </div>
      </div>
    </section>

    <section class="headquarter-section">
      <h4 class="headquarter-desc">
        OZ for Impact is headquartered in Seattle, Washington.
      </h4>
    </section>

    <section class="email-section">
      <div class="container">
        <div class="row">
          <div class="col">
            <div class="email-message">You can reach us at</div>
            <a class="email" href="mailto:Contactus@ozforimpact.org">
              Contactus@ozforimpact.org
            </a>
          </div>
        </div>
      </div>
    </section>

    <section class="form-section">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <h3>Please complete our form</h3>
            <form>
              <div class="row">
                <div class="col">
                  <label for="firstname">FIRST NAME</label>
                  <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    class="field"
                    placeholder="First Name"
                  />
                </div>
                <div class="col">
                  <label for="lastname">LAST NAME</label>
                  <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    class="field"
                    placeholder="Last Name"
                  />
                </div>
              </div>

              <div class="row">
                <div class="col">
                  <label for="email">EMAIL</label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    class="field"
                    placeholder="Email"
                  />
                </div>
              </div>

              <div class="row">
                <div class="col">
                  <label for="message">MESSAGE</label>
                  <textarea
                    name="message"
                    id="message"
                    class="field"
                    rows="8"
                    placeholder="Type your message here…"
                  >
                  </textarea>
                </div>
              </div>

              <div class="row">
                <div class="col send-button-wrapper">
                  <button type="submit" class="button button-outline">
                    Send message
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div class="col-md-6 image-wrapper">
            <img src="~/assets/images/contact/oz-laptop.png" alt="Contact us" />
          </div>
        </div>
      </div>
    </section>

    <section class="map-section"></section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  head() {
    return {
      titleTemplate: '%s - Contact',
    };
  },
});
</script>

<style lang="scss" scoped>
.get-in-touch-section {
  display: flex;
  height: 500px;
  background: #0cabde url('~assets/images/contact/touch-bg.png') center/cover;

  .container {
    display: flex;
    align-items: center;
  }

  h2 {
    font-size: 3rem;
    font-weight: 600;
    color: white;
  }

  h3 {
    font-size: 1.4rem;
    color: white;
  }

  .button {
    font-size: 1.05rem;
    font-weight: 700;
    border-color: white;
    color: white;
    margin-top: 20px;

    &:hover {
      color: #2c4574;
      background-color: #fff;
    }
  }
}

.headquarter-section {
  display: flex;
  justify-content: center;
  margin-top: 50px;

  .headquarter-desc {
    font-size: 2.11rem;
    font-weight: 600;
    color: #2275c3;
    max-width: 550px;
    text-align: center;
  }
}

.email-section {
  display: flex;
  height: 300px;
  margin-top: 70px;
  background: #a7cae0 url('~assets/images/contact/email-bg.png') center/cover;

  .email-message {
    font-size: 1.54rem;
    color: #2275c3;
    margin-top: 50px;
  }

  .email {
    display: block;
    font-size: 2.275rem;
    color: #007fff;
  }
}

.form-section {
  margin-top: 50px;

  h3 {
    font-size: 1.86rem;
    font-weight: 600;
    color: #2275c3;
  }

  form {
    margin-top: 20px;

    .row {
      margin-top: 15px;
    }
  }

  label {
    display: block;
    font-size: 0.65rem;
    font-weight: 700;
    color: #707070;
    margin-bottom: 2px;
  }

  .field {
    width: 100%;
    padding: 13px 15px;
    border: 1px solid #707070;
    border-radius: 10px;

    &:focus {
      outline: none;
    }

    &::placeholder {
      font-weight: 600;
      color: #ebebeb;
    }
  }

  .send-button-wrapper {
    text-align: right;
  }

  .button {
    font-size: 1rem;
    text-transform: uppercase;
    padding: 7px 25px;
    background-color: #fff;

    &:hover {
      background-color: #2c4574;
    }
  }

  .image-wrapper img {
    width: 100%;
  }
}

.map-section {
  height: 300px;
  margin-top: 80px;
  background: #1f2d4b url('~assets/images/contact/map.png') center/cover;
}
</style>
