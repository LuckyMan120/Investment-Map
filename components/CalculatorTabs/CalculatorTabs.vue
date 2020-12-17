<template>
  <div class="shell">
    <!--Tabs-->
    <ul class="tabs">
      <li
        v-for="(tab, i) in tabs"
        :key="i"
        class="tab"
        :class="{ 'tab--active': tab.name === modelValue }"
        @click="setSelectedTab(i)"
      >
        {{ tab.text }}
      </li>
    </ul>

    <!--Cards-->
    <transition-group name="tr-slide" mode="out-in" tag="div" class="card">
      <slot></slot>
      <!--
        slots should be passed as an html element(div is preferred) with the following format:
        <div v-show="activeTab === 'tab-name'" key="tab-name"> content </div>
        active tab is the v-model that binds to tab <Tabs> component
       -->
    </transition-group>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  model: {
    prop: 'modelValue',
    event: 'update:modelValue',
  },
  props: {
    tabs: {
      type: Array /* [ { text: 'some thing', name: 'some-thing' } ] - name should be matched with the slot */,
      required: true,
      validator(arr) {
        return arr.every(
          (step: any) =>
            step.text &&
            typeof step.text === 'string' &&
            step.name &&
            (typeof step.name === 'string' || typeof step.name === 'number')
        );
      },
    },
    modelValue: {
      type: String || Number, // Model value
      required: true,
    },
  },
  created() {
    // Update v-model tab to the first passed tab if v-model value is not valid
    if (this.tabs?.length > 0) {
      if (!this.tabs.some((tab) => tab.name === this.modelValue)) {
        this.$emit('update:modelValue', this.tabs[0].name);
      }
    }
  },
  methods: {
    setSelectedTab(i: any) {
      this.$emit('update:modelValue', this.tabs[i].name);
    },
  },
});
</script>

<style scoped lang="scss">
.shell {
  display: flex;
}

.tabs {
  display: flex;
  flex-direction: column;
  order: 2;
  margin: 0;
  z-index: 1;
  transform: translateX(-5px);
  padding: 30px 0 0 0;
}

.tab {
  background-color: $color-blue-3;
  padding: 25px 14px;
  list-style-type: none;
  border-radius: 0 25px 25px 0;
  line-height: 1.1;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  transition: all 0.1s ease-in-out;
  cursor: pointer;
  color: $color-grey-4;
  font-weight: bold;

  &--active {
    background-color: $color-blue-4;
    color: $color-white;
  }

  &:hover {
    transform: translateX(5px);
  }
}

.card {
  border-radius: 16px;
  border: 1px solid $color-grey-3;
  padding: 20px;
  z-index: 2;
  min-width: 300px;
  min-height: 400px;
}

// Tab slider transition
.tr-slide-leave-active,
.tr-slide-enter-active {
  transition: all 0.4s ease-in-out;
}

.tr-slide-enter,
.tr-slide-leave-to {
  opacity: 0;
  position: absolute;
  top: 0;
  width: 100%;
}

.tr-slide-enter {
  transform: translateY(-100%);
}
.tr-slide-leave-to {
  transform: translateY(100%);
}
</style>
