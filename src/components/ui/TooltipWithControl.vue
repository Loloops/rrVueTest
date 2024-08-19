<template>
  <Transition name="tooltip">
    <div class="tooltip" v-if="props.showCondition">
      <div class="tooltip-inner">
        <slot></slot>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const props = defineProps({
  showCondition: {
    type: Boolean,
    default: false,
    required: true
  }
})
</script>

<style scoped>
.tooltip {
  position: absolute;
  width: auto;
  border-radius: 5px;
  transform: translate(-50%, 0%);
  left: 50%;
  padding: 10px 0px 0;
  z-index: 1;
  cursor: default;
}

.tooltip-enter-from,
.tooltip-leave-to {
  bottom: 0;
  opacity: 0;
}
.tooltip-enter-active,
.tooltip-leave-active {
  transition: all 0.25s ease-in;
}
.tooltip-enter-to,
.tooltip-leave-from {
  bottom: -35px;
  opacity: 1;
}

.tooltip-inner {
  background-color: #d7d7d7;
  border-radius: 6px;
  box-shadow: 0px 0px 3px #e4e4e4;
  padding: 5px;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
}
</style>
