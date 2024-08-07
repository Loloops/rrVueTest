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
              width="24"
              height="24"
              clip-rule="evenodd"
              fill-rule="evenodd"
              stroke-linejoin="round"
              stroke-miterlimit="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m21 4c0-.478-.379-1-1-1h-16c-.62 0-1 .519-1 1v16c0 .621.52 1 1 1h16c.478 0 1-.379 1-1zm-16.5.5h15v15h-15z"
                fill-rule="nonzero"
              />
            </svg>
          </li>
          <li class="draw-component-item" @click="createElement('circle')">
            <svg
              width="24"
              height="24"
              clip-rule="evenodd"
              fill-rule="evenodd"
              stroke-linejoin="round"
              stroke-miterlimit="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m11.998 2c5.517 0 9.997 4.48 9.997 9.998 0 5.517-4.48 9.997-9.997 9.997-5.518 0-9.998-4.48-9.998-9.997 0-5.518 4.48-9.998 9.998-9.998zm0 1.5c-4.69 0-8.498 3.808-8.498 8.498s3.808 8.497 8.498 8.497 8.497-3.807 8.497-8.497-3.807-8.498-8.497-8.498z"
                fill-rule="nonzero"
              />
            </svg>
          </li>
          <li class="draw-component-item" @click="createElement('img1')">
            <img src="../assets/img.png" alt="image" />
          </li>
          <li class="draw-component-item" @click="createElement('img2')">
            <img src="../assets/2.png" alt="image" />
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
