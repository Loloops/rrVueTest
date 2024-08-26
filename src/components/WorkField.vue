<template>
  <div
    class="container"
    ref="parentContainer"
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"
    @wheel="handleScroll"
  >
    <div class="container-inner">
      <WorkSpaceElements
        :parentContainer="parentContainer"
        :windowMouseCoords="{
          windowMouseX,
          windowMouseY,
          windowTarget
        }"
        :scale="scale"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useElementsStore } from '@/stores/elementsFlowControll'

import WorkSpaceElements from './WorkSpaceElements.vue'

const elements = useElementsStore()

const windowMouseX = ref(0)
const windowMouseY = ref(0)
const windowTarget = ref(null)
const startDragX = ref(0)
const startDragY = ref(0)
const scale = ref(1)

const parentContainer = ref(null)

const isDragging = ref(false)

const handleMouseDown = (event) => {
  if (!windowTarget.value.classList.contains('container-inner')) {
    return
  }

  isDragging.value = true
  startDragX.value = event.clientX
  startDragY.value = event.clientY
}

const handleMouseUp = () => {
  if (!windowTarget.value.classList.contains('container-inner')) {
    return
  }

  isDragging.value = false
  elements.updateMainElementsCoordinates()
}

const handleScroll = (event) => {
  if (!windowTarget.value.classList.contains('container-inner')) {
    return
  }

  const scaleVar = 0.1
  const scaleDirection = event.deltaY > 0 ? 0.1 : -0.1
  const newScaleValue = scale.value * Math.pow(scaleVar, scaleDirection)
  const deltaScale = newScaleValue / scale.value

  if (newScaleValue > 2 || newScaleValue < 0.5) {
    return
  }

  elements.updateCoordinatesForFieldResize(deltaScale)
  elements.updateMainElementsCoordinates()

  scale.value = newScaleValue
}

const handleMouseMove = (event) => {
  windowMouseX.value = event.clientX
  windowMouseY.value = event.clientY
  windowTarget.value = event.target

  if (isDragging.value && windowTarget.value.classList.contains('container-inner')) {
    const deltaX = windowMouseX.value - startDragX.value
    const deltaY = windowMouseY.value - startDragY.value

    elements.updateCoordinatesForFieldMove(deltaX, deltaY)
  }
}

onMounted(() => {
  document.addEventListener('mousemove', handleMouseMove)
})
onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove)
})
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
}
</style>
