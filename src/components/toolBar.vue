<template>
  <menu class="toolbar">
    <article class="toolbar-menu">
      <div>MENU</div>
    </article>
    <article class="toolbar-draws">
      <div class="draw-components">
        <ul>
          <li class="draw-component-item" @click="createElement('square')">
            <svg
              fill="#000000"
              height="20px"
              width="20px"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 330 330"
              xml:space="preserve"
            >
              <path
                id="XMLID_523_"
                d="M315,0H15C6.716,0,0,6.716,0,15v300c0,8.284,6.716,15,15,15h300c8.284,0,15-6.716,15-15V15  C330,6.716,323.285,0,315,0z M300,300H30V30h270V300z"
              />
            </svg>
          </li>
        </ul>
      </div>
    </article>
    <article class="toolbar-user">
      <div>USER</div>
    </article>
  </menu>
</template>

<script setup>
import { useElementsStore } from '@/stores/elements'

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
  justify-content: space-between;
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
</style>
