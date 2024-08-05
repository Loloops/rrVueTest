<template>
  <div class="container">
    <div
      class="container-inner"
      @mousedown="handleMouseDown"
      @mousemove="handleMouseMove"
      @mouseup="handleMouseUp"
      @wheel="handleScroll"
    >
      <div
        v-for="e in elements"
        :key="e.id"
        class="element"
        :style="{
          left: `${e.x}px`,
          top: `${e.y}px`,
          transform: `scale(${scale})`,
          width: `${e.width}px`,
          height: `${e.height}px`,
          transformOrigin: 'left top 0px'
        }"
      >
        content
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const elements = ref([
  {
    id: 1,
    x_main: 5,
    y_main: 10,
    x: 5,
    y: 10,
    width: 50,
    height: 50
  },
  {
    id: 2,
    x_main: 100,
    y_main: 100,
    x: 100,
    y: 100,
    width: 50,
    height: 50
  }
])

const startDragX = ref(0)
const startDragY = ref(0)
const scale = ref(1)

const isDragging = ref(false)

function handleMouseDown(e) {
  console.log('mousedown', e.clientX, e.clientY)

  isDragging.value = true
  startDragX.value = e.clientX
  startDragY.value = e.clientY
}

function handleMouseMove(event) {
  if (isDragging.value) {
    const deltaX = event.clientX - startDragX.value
    const deltaY = event.clientY - startDragY.value
    console.log({
      deltaX,
      deltaY
    })
    /* x.value = e.clientX
    y.value = e.clientY */
    elements.value = elements.value.map((e) => {
      return {
        ...e,
        x: e.x_main + deltaX,
        y: e.y_main + deltaY
      }
    })
  }
}

function handleMouseUp(event) {
  console.log('mouseup', event.clientX, event.clientY)
  isDragging.value = false
  elements.value = elements.value.map((e) => {
    return {
      ...e,
      x_main: e.x,
      y_main: e.y
    }
  })
}

function handleScroll(event) {
  const scaleVar = 0.1
  const scaleDirection = event.deltaY > 0 ? 0.1 : -0.1
  const newScaleValue = scale.value * Math.pow(scaleVar, scaleDirection)
  console.log(event.deltaY)

  if (newScaleValue > 2 || newScaleValue < 0.5) {
    return
  }

  elements.value = elements.value.map((e) => {
    console.log({
      condition: event.deltaY > 0,
      first: e.x * (newScaleValue / scale.value)
    })

    return {
      ...e,
      x: e.x * (newScaleValue / scale.value),
      y: e.y * (newScaleValue / scale.value)
    }
  })
  elements.value = elements.value.map((e) => {
    return {
      ...e,
      x_main: e.x,
      y_main: e.y
    }
  })

  scale.value = newScaleValue
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  position: fixed;
  overflow: hidden;
}
.container .container-inner {
  width: 100vw;
  height: 100vh;
  position: relative;
}
.container-inner .element {
  position: absolute;
  min-width: 50px;
  min-height: 50px;
  background-color: rgb(150, 30, 206);
  color: #ffffff;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
