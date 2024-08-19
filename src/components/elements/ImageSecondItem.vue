<template>
  <div>
    <div class="image">
      <img src="../../assets/2.png" alt="" />
    </div>
    <slot></slot>
  </div>
</template>

<script setup></script>

<style scoped>
.image img {
  width: 100%;
  height: 100%;
  pointer-events: none;
  border: none;
}
</style>
