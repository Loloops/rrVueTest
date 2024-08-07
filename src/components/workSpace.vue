<template>
  <div
    class="container"
    ref="container"
    @mousedown="handleMouseDown"
    @mousemove="handleMouseMove"
    @mouseup="handleMouseUp"
    @wheel="handleScroll"
  >
    <div class="container-inner">
      <WorkSpaceElement
        :cont="container"
        :clientCoords="{
          clientX: reactiveClientMoveX,
          clientY: reactiveClientMoveY
        }"
        :clientX="reactiveClientMoveX"
        :clientY="reactiveClientMoveY"
        :scale="scale"
      />
    </div>
  </div>
</template>

<script setup>
import { useElementsStore } from '@/stores/elements'
import { ref } from 'vue'

import WorkSpaceElement from './WorkSpaceElement.vue'

/* state */
const container = ref(null)
const startDragX = ref(0)
const startDragY = ref(0)
const scale = ref(1)
const isDragging = ref(false)

/* store */
const elements = useElementsStore()

const reactiveClientMoveX = ref(0)
const reactiveClientMoveY = ref(0)

/* event handlers */
const handleMouseDown = (event) => {
  isDragging.value = true
  startDragX.value = event.clientX
  startDragY.value = event.clientY
}

const handleMouseMove = (event) => {
  reactiveClientMoveX.value = event.clientX
  reactiveClientMoveY.value = event.clientY

  if (isDragging.value) {
    const deltaX = reactiveClientMoveX.value - startDragX.value
    const deltaY = reactiveClientMoveY.value - startDragY.value

    elements.updateCoordinatesForMove(deltaX, deltaY)
  }
}

const handleMouseUp = () => {
  isDragging.value = false
  elements.updateMainCoordinates()
}

const handleScroll = (event) => {
  const scaleVar = 0.1
  const scaleDirection = event.deltaY > 0 ? 0.1 : -0.1
  const newScaleValue = scale.value * Math.pow(scaleVar, scaleDirection)
  const deltaScale = newScaleValue / scale.value

  if (newScaleValue > 2 || newScaleValue < 0.5) {
    return
  }

  elements.updateCoordinatesForResize(deltaScale)
  elements.updateMainCoordinates()

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
}
</style>
