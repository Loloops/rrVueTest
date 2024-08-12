<template>
  <component
    v-for="item in elements.items"
    :is="typeToComponent[item.type]"
    :key="item.id"
    class="element"
    :class="[
      item.type,
      { hovered: item.id === hoveredElementId && !elementDragFlag },
      { grabbed: elementDragFlag && item.id === draggingElementId }
    ]"
    :style="[
      item.styles,
      {
        left: `${item.coords.x}px`,
        top: `${item.coords.y}px`,
        transform: `scale(${scale})`,
        transformOrigin: `left top 0px`
      }
    ]"
    :type="item.type"
    @mouseover="elementMouseOver(item.id)"
    @mousedown.stop="elementDragStart(item.id, $event)"
    @mouseup.stop="elementDragEnd"
  />
</template>

<script setup>
import { useElementsStore } from '@/stores/elementsFlowControll'
import { onMounted, ref, watch } from 'vue'

import CircleItem from '@/components/elements/CircleItem.vue'
import SquareItem from '@/components/elements/SquareItem.vue'
import ImageItem from '@/components/elements/ImageItem.vue'

const props = defineProps({
  parentContainer: HTMLElement,
  windowMouseCoords: Object,
  scale: Number
})
const typeToComponent = {
  circle: CircleItem,
  square: SquareItem,
  img: ImageItem,
  img2: ImageItem
}

const elements = useElementsStore()

const elementDragStartXValue = ref(null)
const elementDragStartYValue = ref(null)

const elementTarget = ref(null)
const elementDragFlag = ref(false)
const draggingElementId = ref(null)
const hoveredElementId = ref(null)

const containerRect = ref(null)

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
  elements.updateMainElementsCoordinates()
}

const elementMouseOver = (elementId) => {
  hoveredElementId.value = elementId
}

function handleElementMove({ windowMouseX, windowMouseY }) {
  if (elementDragFlag.value && draggingElementId.value) {
    const { x, y } = calculateElementCoords({ windowMouseX, windowMouseY })

    elements.updateCoordinatesForGrabbing(draggingElementId.value, x, y)
  }
}

function calculateElementCoords({ windowMouseX, windowMouseY }) {
  const elementBoundingRect = elementTarget.value.getBoundingClientRect()
  let x = windowMouseX - elementDragStartXValue.value
  let y = windowMouseY - elementDragStartYValue.value

  if (x < 0) x = 0
  if (y < 0) y = 0

  if (x + elementBoundingRect.width > props.parentContainer.clientWidth) {
    x = props.parentContainer.clientWidth - elementBoundingRect.width
  }

  if (
    y + elementBoundingRect.height + containerRect.value.top >
    props.parentContainer.clientHeight
  ) {
    y = props.parentContainer.clientHeight - elementBoundingRect.height - containerRect.value.top
  }

  return { x, y }
}

watch(
  () => props.windowMouseCoords,
  (newValue) => {
    handleElementMove(newValue)
  }
)

watch(
  () => props.parentContainer,
  (newValue) => {
    containerRect.value = newValue.getBoundingClientRect()
  }
)

onMounted(() => {
  if (props.parentContainer !== null) {
    containerRect.value = props.parentContainer.getBoundingClientRect()
  }
})
</script>

<style scoped>
.element {
  position: absolute;
}
.element.hovered {
  cursor: grab;
}
.element.grabbed {
  cursor: grabbing;
  user-select: none;
}
img {
  width: auto;
  height: auto;
  max-width: 100%;
  height: 100%;
  pointer-events: none;
  border: none;
}
</style>
