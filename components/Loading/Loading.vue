<template>
  <div
    v-if="isInDom"
    class="overlay"
    :class="{ 'overlay--active': modelValue, 'overlay--no-overlay': noOverlay }"
  >
    <div class="loading" :class="{ 'loading--active': modelValue }">
      <LoadingIcon class="loading__icon" />
      <p class="loading__text">{{ text }}</p>
    </div>
  </div>
</template>

<script>
import LoadingIcon from '@/assets/icons/loading.svg';

export default {
  name: 'Loading',
  emits: ['update:modelValue'],
  components: {
    LoadingIcon,
  },
  model: {
    prop: 'modelValue',
    event: 'update:modelValue',
  },
  props: {
    text: {
      type: String,
      default: () => 'Please wait...',
    },
    modelValue: {
      required: true,
    },
    noOverlay: Boolean,
  },
  data: () => ({
    isInDom: false,
  }),
  watch: {
    modelValue(isActive) {
      this.toggleLoader(isActive);
    },
  },
  created() {
    // If loader value is set on created
    if (this.modelValue) this.toggleLoader(this.modelValue);
  },
  methods: {
    toggleLoader(isActive) {
      if (isActive) {
        this.isInDom = isActive;
      } else {
        setTimeout(() => {
          // set a timer to remove from dom in .25s
          this.isInDom = isActive;
        }, 250);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.overlay {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 20;
  animation: overlayClose 0.25s ease-in forwards;

  &--active {
    animation: overlayOpen 0.35s ease-out forwards;
  }

  &--no-overlay {
    background-color: unset;
    pointer-events: none;
  }
}

.loading {
  background-color: $color-white;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  padding: 10px 20px;
  animation: LoaderClose 0.25s ease-in forwards;

  &--active {
    animation: loaderOpen 0.35s ease-out forwards;
    animation-delay: 0.08s;
  }

  &__icon {
    width: 30px;
    height: 30px;
    margin-bottom: 10px;
  }

  &__text {
    margin: 0;
    font-size: 16px;
  }
}

// Animations
@keyframes overlayClose {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

@keyframes overlayOpen {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes loaderClose {
  0% {
    opacity: 1;
    transform: scale(1);
  }

  30% {
    transform: scale(1.03);
  }

  100% {
    opacity: 0;
    transform: scale(0.7);
  }
}

@keyframes loaderOpen {
  0% {
    opacity: 0;
    transform: scale(0.7);
  }

  70% {
    transform: scale(1.03);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
