<template>
  <div
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
      transform: `scale(${props.scale})`,
      transformOrigin: `left top 0px`
    }"
    @mouseover="elementMouseOver(item.id)"
    @mousedown.stop="elementDragStart(item.id, $event)"
    @mouseup.stop="elementDragEnd"
  >
    <img v-if="item.src" :src="item.src" />
  </div>
</template>

<script setup>
import { useElementsStore } from '@/stores/elements'
import { computed, ref, watch } from 'vue'

const props = defineProps({
  cont: HTMLElement,
  clientCoords: Object,
  clientX: Number,
  clientY: Number,
  scale: Number
})

const elements = useElementsStore()

const hoveredElementId = ref(null)
const elementDragFlag = ref(false)
const draggingElementId = ref(null)
const elementTarget = ref(null)
const elementDragStartXValue = ref(null)
const elementDragStartYValue = ref(null)

const containerRect = computed(() => props.cont.getBoundingClientRect())

function handeElementMove({ clientX, clientY }) {
  if (elementDragFlag.value && draggingElementId.value) {
    const { x, y } = calculateElementCoords({ clientX, clientY })

    elements.updateCoordinatesForGrabbing(draggingElementId.value, x, y)
  }
}

const elementDragStart = (elementId, event) => {
  draggingElementId.value = elementId
  elementDragFlag.value = true
  elementTarget.value = event.target

  const elementClientRec = elementTarget.value.getBoundingClientRect()

  elementDragStartXValue.value = event.clientX - elementClientRec.left
  elementDragStartYValue.value = event.clientY - elementClientRec.top + containerRect.value.top
}

const elementDragEnd = () => {
  draggingElementId.value = null
  elementDragFlag.value = false
  elements.updateMainCoordinates()
}

const elementMouseOver = (elementId) => {
  hoveredElementId.value = elementId
}

function calculateElementCoords({ clientX, clientY }) {
  const elementBoundingRect = elementTarget.value.getBoundingClientRect()
  let x = clientX - elementDragStartXValue.value
  let y = clientY - elementDragStartYValue.value

  if (x < 0) x = 0
  if (y < 0) y = 0

  if (x + elementBoundingRect.width > props.cont.clientWidth) {
    x = props.cont.clientWidth - elementBoundingRect.width
  }

  if (y + elementBoundingRect.height + containerRect.value.top > props.cont.clientHeight) {
    y = props.cont.clientHeight - elementBoundingRect.height - containerRect.value.top
  }

  return { x, y }
}

watch(
  () => props.clientCoords,
  (newValue) => {
    handeElementMove(newValue)
  }
)
</script>

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
  background-color: #ffffff;
  padding: 0;
  border: 1px solid #cecece;
  border-radius: 10px;
  box-shadow: 0px 2px 6px #cecece;
}
.circle {
  min-width: 50px;
  min-height: 50px;
  border-radius: 100%;
  background-color: rgb(227, 105, 251);
  border-radius: 100%;
  border: 2px solid rgb(166, 3, 172);
}
.img {
  background-color: transparent;
  border: none;
}
.img img {
  pointer-events: none;
}
</style>
