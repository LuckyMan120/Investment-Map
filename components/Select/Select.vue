<template>
  <div class="Select">
    <div
      class="input-section"
      :class="{ 'input-section--active': isInputFocused }"
      @click="handleInputFocus"
      v-select-click-outside="handleInputBlur"
    >
      <div class="input">
        <!-- Selected item -->
        <div class="input-selected-container">
          <div class="input-selected">
            {{ localSelectModel.text }}
          </div>
        </div>
      </div>

      <!-- Select icon -->
      <ArrowDropDown class="input-icon" />

      <!-- Select label -->
      <span
        class="label"
        :class="{
          'label--active': isLabelActive,
          'label--active-color': isInputFocused,
        }"
      >
        {{ inputLabel }}
      </span>
    </div>

    <!-- Select items -->
    <nav
      v-if="isItemsActive"
      class="select-items-container"
      :class="{ 'select-items-container--active': isInputFocused }"
    >
      <span
        v-if="isItemSelected(localSelectModel.value)"
        class="selected-item selected-item--active"
      >
        {{ localSelectModel.text }}

        <ArrowDropDown class="selected-item-icon" />
      </span>
      <perfect-scrollbar
        tag="ul"
        class="select-items"
        :class="{ 'select-items--active': isInputFocused }"
        :options="scrollbarOptions"
      >
        <li
          class="select-item"
          @click="handleSelectItem(item)"
          v-for="(item, i) in localSelectItems"
          :key="i"
        >
          {{ item.text }}
        </li>
      </perfect-scrollbar>
    </nav>
  </div>
</template>

<script>
import ArrowDropDown from '@/assets/icons/arrow-dropdown.svg';

export default {
  name: 'Select',
  components: {
    ArrowDropDown,
  },
  model: {
    prop: 'modelValue',
    event: 'update:modelValue',
  },
  props: {
    selectItems: {
      type: Array, // [ { text: 'text value' value: 10 } ]
      required: true,
    },
    modelValue: {
      required: true,
      type: String,
    },
    inputLabel: String,
  },

  data: () => ({
    isInputFocused: false,
    isLabelActive: false,
    isItemsActive: false,

    localSelectModel: '',
    localSelectItems: [],

    scrollbarOptions: {
      maxScrollbarLength: 30,
    },
  }),

  mounted() {
    if (this.modelValue.length > 0) {
      this.localSelectModel = this.selectItems.find(
        (item) => item.value === this.modelValue
      );
    }

    this.localSelectItems = [...this.selectItems];
  },

  methods: {
    handleInputFocus() {
      if (this.isItemsActive) {
        // Close item list
        this.handleInputBlur();
      } else {
        // Filter select items
        this.filterLocalSelectItems();

        // Open item list
        this.isInputFocused = true;
        this.isLabelActive = true;
        this.isItemsActive = true;
      }
    },
    handleInputBlur() {
      if (this.isInputFocused) this.isInputFocused = false;

      setTimeout(() => {
        if (this.modelValue.length === 0) {
          this.isLabelActive = false;
        }
      }, 0);

      setTimeout(() => {
        this.resetLocalSelectItems();
        this.isItemsActive = false;
      }, 110);
    },
    filterLocalSelectItems() {
      this.localSelectItems.splice(
        this.localSelectItems.findIndex(
          (item) => item.value === this.localSelectModel.value
        ),
        1
      );
    },
    resetLocalSelectItems() {
      this.localSelectItems = [...this.selectItems];
    },
    handleSelectItem(selectedItem) {
      this.localSelectModel = selectedItem;

      // Close items
      this.handleInputBlur();

      // Update parent model
      this.$emit('update:modelValue', this.localSelectModel.value);
    },
    isItemSelected(val) {
      return this.modelValue === val;
    },
  },
};
</script>

<style scoped lang="scss">
.Select {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  margin: 6px 0 10px 0;
  z-index: 10;
  position: relative;
  width: 100%;
}

.input-section {
  border: 1px solid $color-grey-3;
  position: relative;
  padding: 3px 13px 3px 20px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  background-color: #fff;

  &:hover {
    border-color: #000;
  }

  &--active {
    border-color: $color-grey-3;
  }
}

.input {
  font-family: inherit;
  border: none;
  width: 100%;
  font-size: 15px;
  padding: 0;
  min-height: 22px;
  z-index: 5;
  display: flex;
  align-items: center;

  &:focus {
    outline-color: transparent;
  }
}

.input-icon {
  height: 8px;
  width: auto;
  margin-left: 15px;
}

.input-selected {
  font-size: 13px;
  font-weight: 500;
  font-family: inherit;
}

.label {
  position: absolute;
  top: 50%;
  left: 11px;
  transform: translateY(-50%);
  transition: top 0.1s ease-out;
  background-color: #fff;
  border-radius: 15px;
  font-size: 13px;
  line-height: 1.1;
  padding: 0 4px;

  &:hover {
    cursor: text;
  }

  &--active {
    opacity: 0;

    &:hover {
      cursor: default;
    }
  }

  &--active-color {
    color: #000;
  }
}

// Items
.select-items-container {
  z-index: 12;
  background-color: #fff;
  padding: 7px 15px 7px 20px;
  border: 1px solid $color-grey-3;
  border-radius: 16px;
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: absolute;
  width: 100%;
  top: -2px;
  opacity: 0;
  animation: slideUp 0.1s ease-out forwards;

  &--active {
    animation: slideDown 0.1s ease-out forwards;
  }
}

.select-items {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  padding: 0;
  margin: 0;
  overflow: hidden;
  max-height: 250px;
}

.select-item {
  list-style-type: none;
  margin-bottom: 1px;
  padding: 2px 0;
  font-size: 13px;
  cursor: pointer;

  &:last-of-type {
    margin-bottom: 0;
  }

  &:hover {
    font-weight: 500;
  }

  &--active,
  &--active:hover {
    //font-weight: bold;
  }
}

.selected-item {
  font-size: 13px;
  display: flex;
  justify-content: space-between;

  &-icon {
    height: 8px;
    width: auto;
    transform: translateX(40%);
    margin-top: 5px;
    margin-right: 2px;
  }
}

// Animations
@keyframes slideUp {
  from {
    opacity: 1;
    //transform: translateY(0) scale(1);
  }

  to {
    opacity: 0;
    //transform: translateY(-3px) scale(0.99);
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    //transform: translateY(-3px) scale(0.99);
  }

  to {
    opacity: 1;
    //transform: translateY(0) scale(1);
  }
}
</style>
