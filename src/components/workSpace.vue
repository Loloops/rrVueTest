<template>
  <div class="container">
    <div
      class="container-inner"
      ref="container"
      @mousedown="handleMouseDown"
      @mousemove="handleMouseMove"
      @mouseup="handleMouseUp"
      @wheel="handleScroll"
    >
      <WorkSpaceElement
        v-for="item in elements.items"
        :key="item.id"
        class="element"
        :class="[
          item.type,
          { hovered: item.id === hoveredElementId && !elementDragFlag },
          { grabbed: elementDragFlag && item.id === draggingElementId }
        ]"
        :style="{
          left: `${item.x}px`,
          top: `${item.y}px`,
          width: `${item.width}px`,
          height: `${item.height}px`,
          transform: `scale(${scale})`
        }"
        @mouseover="elementMouseOver(item.id)"
        @mousedown.stop="elementDragStart(item.id, $event)"
        @mouseup.stop="elementDragEnd"
      ></WorkSpaceElement>
    </div>
  </div>
</template>

<script setup>
import { useElementsStore } from '@/stores/elements'
import { ref } from 'vue'

import WorkSpaceElement from './WorkSpaceElement.vue'

const elements = useElementsStore()

const container = ref(null)

const startDragX = ref(0)
const startDragY = ref(0)
const scale = ref(1)
const isDragging = ref(false)

const hoveredElementId = ref(null)
const elementDragFlag = ref(false)
const draggingElementId = ref(null)

const elementTarget = ref(null) /* SSSS */

function handleMouseDown(e) {
  isDragging.value = true
  startDragX.value = e.clientX
  startDragY.value = e.clientY
}

function handleMouseMove(event) {
  if (isDragging.value) {
    const deltaX = event.clientX - startDragX.value
    const deltaY = event.clientY - startDragY.value

    elements.updateCoordinatesForMove(deltaX, deltaY)
  }

  if (elementDragFlag.value) {
    const containerClientRec = container.value.getBoundingClientRect()
    let x =
      event.clientX -
      containerClientRec.left -
      container.value.clientLeft -
      elementTarget.value.clientWidth / 2
    let y =
      event.clientY -
      containerClientRec.top -
      container.value.clientTop -
      elementTarget.value.clientHeight / 2

    if (x < 0) x = 0
    if (y < 0) y = 0

    /* // // запрещаем пересекать правую границу поля
    if (ballCoords.left + ball.clientWidth > field.clientWidth) {
        ballCoords.left = field.clientWidth - ball.clientWidth;
      }

    // запрещаем пересекать нижнюю границу поля
    if (ballCoords.top + ball.clientHeight > field.clientHeight) {
      ballCoords.top = field.clientHeight - ball.clientHeight;
    } */

    console.log(
      x,
      y,
      containerClientRec.left,
      containerClientRec.clientLeft,
      containerClientRec,
      container.value
    )

    elements.updateCoordinatesForGrabbing(draggingElementId.value, x, y)
  }
}

function handleMouseUp() {
  isDragging.value = false
  elements.updateMainCoordinates()
}

function handleScroll(event) {
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

function elementMouseOver(elementId) {
  hoveredElementId.value = elementId
}

function elementDragStart(elementId, event) {
  draggingElementId.value = elementId
  elementDragFlag.value = true
  elementTarget.value = event.target

  console.log(elementTarget.value)
}

function elementDragEnd() {
  hoveredElementId.value = null
  draggingElementId.value = null
  elementDragFlag.value = false
  elements.updateMainCoordinates()
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
  border: 3px solid red;
}
</style>
