<template>
  <section class="search-shell">
    <!--Search container-->
    <div class="search-container">
      <!--input-->
      <div class="search-input">
        <button class="search-btn">Search</button>
        <div class="input-container">
          <gmap-autocomplete
            @place_changed="setFromtownPlace"
            :options="options"
            class="input"
          ></gmap-autocomplete>
          <img
            src="~assets/icons/magnify-icon.png"
            class="input-icon"
            alt="magnify-icon"
          />
        </div>
      </div>
      <!--Add btn-->
      <!-- <button class="add-btn">
        <img
          class="add-btn-icon"
          src="~assets/icons/icon-plus.png"
          alt="plus-icon"
        />
      </button> -->
    </div>
    <!--Results-->
    <div v-for="(result, i) in results" :key="i" class="result-container">
      <span class="result-text" @click="comparePolygon(i)">{{
        result.countyname
      }}</span>
      <button class="result-btn" @click="removePolygon(i)">
        <img
          class="result-btn-icon"
          src="~assets/icons/icon-minus.png"
          alt="minus icon"
        />
      </button>
    </div>
  </section>
</template>

<script>
import states from '@/static/data/states.json';

export default {
  props: {
    results: Array,
  },
  data() {
    return {
      options: {
        componentRestrictions: { country: 'US' },
      },
      allStates: states.states,
    };
  },
  methods: {
    setFromtownPlace: function (place) {
      place.address_components.forEach((item) => {
        this.allStates.forEach((state) => {
          if (item['long_name'] === state) {
            let searchData = {};
            searchData['name'] = state;
            searchData['center'] = {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            };
            this.$emit('search', searchData);
            return;
          }
        });
      });
    },
    comparePolygon: function (index) {
      this.$emit('comparePolygon', index);
    },
    removePolygon: function (index) {
      this.$emit('removePolygon', index);
    },
  },
};
</script>

<style lang="scss" scoped>
.search-shell {
  display: flex;
  flex-direction: column;
  width: max-content;
  margin: 0;
}

.search-container {
  display: flex;
}

.search-input {
  border: 1px solid $color-grey-3;
  display: flex;
  border-radius: 16px;
  overflow-x: hidden;
  height: 38px;
}

.search-btn {
  border-radius: 0;
  background: $color-blue-6;
  border: none;
  width: 110px;
  color: $color-white;

  &:focus {
    outline: none;
  }
}

.input-container {
  display: flex;
  align-items: center;
  background-color: $color-white;
  padding: 0 13px;
}

.input {
  border: none;
  font-size: 1rem;
  min-width: 360px;

  &:focus {
    outline: none;
  }
}

.input-icon {
  margin-left: 10px;
}

.add-btn,
.result-btn {
  background: none;
  border: none;
  border-radius: 100px;
  margin-left: 8px;

  &:focus {
    outline: none;
  }
}

.add-btn-icon {
  height: 27px;
}

.result-container {
  border: 1px solid $color-grey-3;
  border-radius: 16px;
  height: 38px;
  display: flex;
  align-items: center;
  padding: 0 8px 0 20px;
  justify-content: space-between;
  width: 419px;
  margin-left: 111px;
  margin-top: 5px;
  background-color: $color-white;

  .result-text {
    cursor: pointer;
    min-width: 350px;
  }
}

.result-btn {
  margin: 0;
}
</style>
