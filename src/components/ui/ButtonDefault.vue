<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script setup></script>

<style scoped>
.btn * {
  display: block;
  pointer-events: none !important;
}

.btn {
  padding: 3px;
  border: 0;
  background-color: white;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  cursor: pointer;
}
.btn:hover,
.btn.active {
  background-color: #000000;
  fill: #ffffff !important;
  color: #ffffff;
}
</style>
