<template>
  <div>
    <div class="circle">
      {{ props.text }}
    </div>
    <slot></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String
  }
})
</script>

<style scoped>
.circle {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  background-color: rgb(227, 105, 251);
  border: 2px solid rgb(166, 3, 172);
}
</style>
