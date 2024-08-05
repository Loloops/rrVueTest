<template>
  <menu class="toolbar">
    <article class="toolbar-menu">
      <div class="draw-component">MENU</div>
    </article>
    <article class="toolbar-draws">
      <div class="draw-component">SQUARE</div>
    </article>
    <article class="toolbar-user">
      <div class="draw-component">USER</div>
    </article>
  </menu>
</template>

<script setup></script>

<style scoped>
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
</style>
