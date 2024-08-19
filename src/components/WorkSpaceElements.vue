<template>
  <component
    v-for="item in elements.items"
    :is="typeToComponent[item.type]"
    :key="item.id"
    class="element"
    :class="[
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
    :text="item.data"
    @mouseover="elementMouseOver(item.id)"
    @mouseleave="elementMouseLeave"
    @mousedown.stop="elementDragStart(item.id, $event)"
    @mouseup.stop="elementDragEnd"
  >
    <TooltipWithControl :showCondition="item.id === hoveredElementId && !elementDragFlag">
      <ButtonDefault title="delete" @mousedown.stop="elements.deleteElement(item.id)">
        <svg
          style="width: 15px; height: 15px; vertical-align: middle"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M810.65984 170.65984q18.3296 0 30.49472 12.16512t12.16512 30.49472q0 18.00192-12.32896 30.33088l-268.67712 268.32896 268.67712 268.32896q12.32896 12.32896 12.32896 30.33088 0 18.3296-12.16512 30.49472t-30.49472 12.16512q-18.00192 0-30.33088-12.32896l-268.32896-268.67712-268.32896 268.67712q-12.32896 12.32896-30.33088 12.32896-18.3296 0-30.49472-12.16512t-12.16512-30.49472q0-18.00192 12.32896-30.33088l268.67712-268.32896-268.67712-268.32896q-12.32896-12.32896-12.32896-30.33088 0-18.3296 12.16512-30.49472t30.49472-12.16512q18.00192 0 30.33088 12.32896l268.32896 268.67712 268.32896-268.67712q12.32896-12.32896 30.33088-12.32896z"
          />
        </svg>
      </ButtonDefault>
    </TooltipWithControl>
  </component>
</template>

<script setup>
import { useElementsStore } from '@/stores/elementsFlowControll'
import { onMounted, ref, watch } from 'vue'

import CircleItem from '@/components/elements/CircleItem.vue'
import SquareItem from '@/components/elements/SquareItem.vue'
import ImageFristItem from '@/components/elements/ImageFristItem.vue'
import ImageSecondItem from '@/components/elements/ImageSecondItem.vue'
import TooltipWithControl from '@/components/ui/TooltipWithControl.vue'
import ButtonDefault from '@/components/ui/ButtonDefault.vue'

const props = defineProps({
  parentContainer: HTMLElement,
  windowMouseCoords: Object,
  scale: Number
})
const typeToComponent = {
  circle: CircleItem,
  square: SquareItem,
  img: ImageFristItem,
  img2: ImageSecondItem
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

const elementMouseLeave = () => {
  hoveredElementId.value = null
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
  padding: 2px;
  border: 1px solid transparent;
}
.element.hovered {
  cursor: grab;
  border: 1px solid #9bffdf;
}
.element.grabbed {
  cursor: grabbing;
  user-select: none;
}
</style>
