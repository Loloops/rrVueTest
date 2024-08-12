<template>
  <menu class="toolbar">
    <article class="toolbar-draws">
      <div class="draw-components">
        <ul>
          <li
            class="draw-component-item"
            v-for="item in toolBarItems"
            :key="item.id"
            @click="createElement(item.type)"
          >
            <img v-if="item.type.includes('img')" :src="item.icon" alt="toolbar icon" />
            <component :is="item.icon" v-else />
          </li>
        </ul>
      </div>
    </article>
  </menu>
</template>

<script setup>
import { useElementsStore } from '@/stores/elementsFlowControll'
import CircleSvg from '@/components/ui/icons/CircleSvg.vue'
import SquareSvg from '@/components/ui/icons/SquareSvg.vue'

import image1 from '../assets/img.png'
import image2 from '../assets/2.png'

const toolBarItems = [
  {
    id: 1,
    type: 'square',
    icon: SquareSvg
  },
  {
    id: 2,
    type: 'circle',
    icon: CircleSvg
  },
  {
    id: 3,
    type: 'img1',
    icon: image1
  },
  {
    id: 4,
    type: 'img2',
    icon: image2
  }
]

const elements = useElementsStore()

function createElement(elementName) {
  elements.addElement(elementName)
}
</script>

<style scoped>
svg {
  display: block;
}
.toolbar {
  padding: 1rem;
  min-height: 50px;
  background-color: #ffffff;
  border-bottom: 1px solid #cecece;
  box-shadow: 0px 3px 14px #cecece;
  display: flex;
  align-items: center;
  justify-content: center;
}
.draw-components ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
}
.draw-components ul * {
  cursor: pointer;
}
.draw-components li {
  max-width: 24px;
  max-height: 24px;
}
.draw-components li img {
  display: block;
  max-width: 100%;
  max-height: 100%;
}
</style>
