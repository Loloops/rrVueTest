<template>
  <component
    v-for="item in elements.items"
    :is="typeToComponent[item.type]"
    :key="item.id"
    :id="item.id"
    class="element"
    :class="[
      elementJs,
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
    @mousedown="elementDragStart(item.id, $event)"
    @mouseup="elementDragEnd"
  >
    <div class="chains-flow" v-if="isChainFlow" @mousedown="testChain($event, item)">
      <div class="chain chain--top">
        <div class="dot" data-pos="top">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            style="fill: #fff; stroke: #8c3bee; stroke-width: 4px; width: 8px; height: 8px"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path
              d="M7 3.34a10 10 0 1 1 -4.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 4.995 -8.336z"
            />
          </svg>
        </div>
      </div>
      <div class="chain chain--right">
        <div class="dot" data-pos="right">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            style="fill: #fff; stroke: #8c3bee; stroke-width: 4px; width: 8px; height: 8px"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path
              d="M7 3.34a10 10 0 1 1 -4.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 4.995 -8.336z"
            />
          </svg>
        </div>
      </div>
      <div class="chain chain--bottom">
        <div class="dot" data-pos="bottom">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            style="fill: #fff; stroke: #8c3bee; stroke-width: 4px; width: 8px; height: 8px"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path
              d="M7 3.34a10 10 0 1 1 -4.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 4.995 -8.336z"
            />
          </svg>
        </div>
      </div>
      <div class="chain chain--left">
        <div class="dot" data-pos="left">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            style="fill: #fff; stroke: #8c3bee; stroke-width: 4px; width: 8px; height: 8px"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path
              d="M7 3.34a10 10 0 1 1 -4.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 4.995 -8.336z"
            />
          </svg>
        </div>
      </div>
    </div>

    <TooltipWithControl :showCondition="item.id === hoveredElementId && !elementDragFlag">
      <ButtonDefault
        :class="{ active: isChainFlow }"
        title="chain"
        @mousedown.stop="isChainFlow = !isChainFlow"
      >
        <svg
          style="width: 15px; height: 15px; vertical-align: middle"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M7 10h14l-4 -4" />
          <path d="M17 14h-14l4 4" />
        </svg>
      </ButtonDefault>
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
  <svg
    width="100%"
    height="100%"
    style="height: 100%; min-height: 100vh; pointer-events: none; width: 100%; z-index: 0"
  >
    <g v-for="item in elements.itemsEdges" :key="item.id">
      <path
        :stroke-width="scale + 'px'"
        style="fill: none; stroke: rgb(171, 189, 210)"
        :d="edgePath[item.id]"
      />
    </g>
    <g v-if="sourceItemChain">
      <path
        :stroke-width="scale + 'px'"
        style="fill: none; stroke: rgb(171, 189, 210)"
        :d="drawPath(windowMouseCoords, startPointChain)"
      />
    </g>
  </svg>
</template>

<script setup>
import { useElementsStore } from '@/stores/elementsFlowControll'
import { computed, nextTick, onMounted, ref, watch } from 'vue'

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
const elementJs = 'element-js'

/*  */ const isChainFlow = ref(false)

function drawPath({ windowMouseX, windowMouseY }, { x, y }) {
  /*   const sourceX =
    source.coords.x +
    (edge.source.pos === 'right'
      ? source.coords.width
      : edge.source.pos === 'left'
        ? 0
        : source.coords.width / 2)
  const sourceY =
    source.coords.y +
    (edge.source.pos === 'bottom'
      ? source.coords.height
      : edge.source.pos === 'top'
        ? 0
        : source.coords.height / 2)
  const targetX =
    target.coords.x +
    (edge.target.pos === 'right'
      ? target.coords.width
      : edge.target.pos === 'left'
        ? 0
        : target.coords.width / 2)
  const targetY =
    target.coords.y +
    (edge.target.pos === 'bottom'
      ? target.coords.height
      : edge.target.pos === 'top'
        ? 0
        : target.coords.height / 2) */

  let path = [`M ${x},${y}`, `H ${windowMouseX}`, `V ${windowMouseY - containerRect.value.top}`]

  /* if (edge.source.pos === 'right' || edge.target.pos === 'left') {
    path = [`M ${sourceX},${sourceY}`, `V ${targetY}`, `H ${targetX}`]
  } */

  return path.join(' ')
}

const edgePath = computed(() => {
  const path = {}

  elements.itemsEdges.forEach((edge) => {
    path[edge.id] = getEdgesPath(edge)
  })

  return path
})

function getEdgesPath(edge) {
  const source = elements.items.find((item) => item.id === edge.source.id)
  const target = elements.items.find((item) => item.id === edge.target.id)

  const sourceX =
    source.coords.x +
    (edge.source.pos === 'right'
      ? source.coords.width
      : edge.source.pos === 'left'
        ? 0
        : source.coords.width / 2)
  const sourceY =
    source.coords.y +
    (edge.source.pos === 'bottom'
      ? source.coords.height
      : edge.source.pos === 'top'
        ? 0
        : source.coords.height / 2)
  const targetX =
    target.coords.x +
    (edge.target.pos === 'right'
      ? target.coords.width
      : edge.target.pos === 'left'
        ? 0
        : target.coords.width / 2)
  const targetY =
    target.coords.y +
    (edge.target.pos === 'bottom'
      ? target.coords.height
      : edge.target.pos === 'top'
        ? 0
        : target.coords.height / 2)

  let path = [`M ${sourceX},${sourceY}`, `H ${targetX}`, `V ${targetY}`]

  if (edge.source.pos === 'right' || edge.target.pos === 'left') {
    path = [`M ${sourceX},${sourceY}`, `V ${targetY}`, `H ${targetX}`]
  }

  return path.join(' ')
}

const chainFlow = ref({})
const sourceItemChain = ref(null)
const targetItemChain = ref(null)

const startPointChain = ref({})

function testChain(event, item) {
  let target = event.target

  if (!target.classList.contains('dot')) {
    return
  }
  function handleMouseUpChain(event) {
    let targetUp = event.target,
      targetMain = targetUp.closest(`.${elementJs}`)

    if (
      targetMain &&
      targetUp.classList.contains('dot') &&
      targetMain.dataset.id !== sourceItemChain.value?.id
    ) {
      targetItemChain.value = {
        id: +targetMain.id,
        pos: targetUp.dataset.pos
      }
      chainFlow.value = {
        id: Date.now(),
        source: sourceItemChain.value,
        target: targetItemChain.value
      }
      elements.addChainFlow(chainFlow.value)
      startPointChain.value = {}
      sourceItemChain.value = {}
    } else {
      sourceItemChain.value = {}
      startPointChain.value = {}
    }

    isChainFlow.value = false

    target.removeEventListener('mousemove', handleMouseMoveChain)
    document.removeEventListener('mouseup', handleMouseUpChain)
  }

  function handleMouseMoveChain() {
    const targetClientRectX = targetClientRect.x + targetClientRect.width / 2
    const targetClientRectY = targetClientRect.y + targetClientRect.height / 2

    sourceItemChain.value = {
      id: item.id,
      pos: target.dataset.pos
    }
    startPointChain.value = {
      x: targetClientRectX,
      y: targetClientRectY - containerRect.value.top
    }
  }

  const targetClientRect = target.getBoundingClientRect()

  target.addEventListener('mousemove', handleMouseMoveChain)
  document.addEventListener('mouseup', handleMouseUpChain)
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
  if (isChainFlow.value) return

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

  nextTick(() => {
    if (props.parentContainer !== null) {
      containerRect.value = props.parentContainer.getBoundingClientRect()
    }
  })

  /* elements.items.forEach((item) => {
    const elementRef = document.getElementById(item.id) // Получаем ссылку на элемент

    if (elementRef) {
      const elementRect = elementRef.getBoundingClientRect()
      console.log(elementRect)
    }
  }) */
})
</script>

<style scoped>
.element {
  position: absolute;
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

.chain {
  position: absolute;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  z-index: 2;
}
.chain--bottom {
  transform: translate(0%, 50%);
  left: 0;
  bottom: 0;
}
.chain--top {
  transform: translate(0%, -50%);
  left: 0;
  top: 0;
}
.chain--right {
  transform: translate(50%, 0);
  top: 0;
  right: 0;
  width: auto;
  height: 100%;
}
.chain--left {
  transform: translate(-50%, 0);
  top: 0;
  left: 0;
  width: auto;
  height: 100%;
}
.dot {
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
}
.dot svg {
  pointer-events: none !important;
}
</style>
