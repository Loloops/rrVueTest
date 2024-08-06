<template>
  <div>123</div>
</template>

<script setup></script>

<style scoped>
.element {
  position: absolute;
  color: #000000;
  background-color: #636363;
  display: flex;
  align-items: center;
  justify-content: center;
}
.element.hovered {
  cursor: grab;
}
.element.grabbed {
  cursor: grabbing;
  user-select: none;
}

.square {
  min-width: 50px;
  min-height: 50px;
  background-color: rgb(150, 30, 206);
  padding: 5px;
  color: #ffffff;
}
</style>
