import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useElementsStore = defineStore('elements', () => {
  const items = ref([])

  function addElement(element) {
    var elemetsObj = {
      square: {
        id: new Date().getTime(),
        x_main: 100,
        y_main: 100,
        x: 100,
        y: 100,
        width: 150,
        height: 50,
        type: 'square'
      },
      circle: {
        id: new Date().getTime(),
        x_main: 100,
        y_main: 100,
        x: 100,
        y: 100,
        width: 50,
        height: 50,
        type: 'circle'
      },
      img1: {
        id: new Date().getTime(),
        x_main: 100,
        y_main: 100,
        x: 100,
        y: 100,
        width: 50,
        height: 50,
        src: 'src/assets/img.png',
        type: 'img'
      },
      img2: {
        id: new Date().getTime(),
        x_main: 100,
        y_main: 100,
        x: 100,
        y: 100,
        width: 50,
        height: 50,
        src: 'src/assets/2.png',
        type: 'img'
      }
    }
    items.value.push(elemetsObj[element])
  }

  function updateMainCoordinates() {
    items.value = items.value.map((e) => {
      return {
        ...e,
        x_main: e.x,
        y_main: e.y
      }
    })
  }

  function updateCoordinatesForMove(X, Y) {
    items.value = items.value.map((e) => {
      return {
        ...e,
        x: e.x_main + X,
        y: e.y_main + Y
      }
    })
  }

  function updateCoordinatesForGrabbing(id, X, Y) {
    items.value = items.value.map((e) => {
      if (e.id === id) {
        return {
          ...e,
          x: X,
          y: Y
        }
      } else {
        return e
      }
    })
  }

  function updateCoordinatesForResize(deltaScale) {
    items.value = items.value.map((e) => {
      return {
        ...e,
        x: e.x * deltaScale,
        y: e.y * deltaScale
      }
    })
  }

  return {
    items,
    addElement,
    updateMainCoordinates,
    updateCoordinatesForMove,
    updateCoordinatesForResize,
    updateCoordinatesForGrabbing
  }
})
