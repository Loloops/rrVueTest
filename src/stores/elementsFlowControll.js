import { ref } from 'vue'
import { defineStore } from 'pinia'

import image1 from '../assets/img.png'
import image2 from '../assets/2.png'

export const useElementsStore = defineStore('elements', () => {
  const items = ref([])

  function addElement(element) {
    var elemetsObj = {
      square: {
        id: Date.now(),
        coords: {
          x_main: 100,
          y_main: 100,
          x: 100,
          y: 100
        },
        styles: 'width: 50px;height: 50px',
        type: 'square'
      },
      circle: {
        id: Date.now(),
        coords: {
          x_main: 100,
          y_main: 100,
          x: 100,
          y: 100
        },
        styles: 'width: 50px;height: 50px',
        type: 'circle'
      },
      img1: {
        id: Date.now(),
        coords: {
          x_main: 100,
          y_main: 100,
          x: 100,
          y: 100
        },
        styles: `width: 50px;height: 50px;background-image: url('${image1}');`,
        type: 'img'
      },
      img2: {
        id: Date.now(),
        coords: {
          x_main: 100,
          y_main: 100,
          x: 100,
          y: 100
        },
        styles: `width: 50px;height: 50px;background-image: url('${image2}');`,
        type: 'img2'
      }
    }

    items.value.push(elemetsObj[element])
  }

  function updateMainElementsCoordinates() {
    items.value = items.value.map((e) => {
      return {
        ...e,
        coords: {
          ...e.coords,
          x_main: e.coords.x,
          y_main: e.coords.y
        }
      }
    })
  }

  function updateCoordinatesForFieldMove(X, Y) {
    items.value = items.value.map((e) => {
      return {
        ...e,
        coords: {
          ...e.coords,
          x: e.coords.x_main + X,
          y: e.coords.y_main + Y
        }
      }
    })
  }

  function updateCoordinatesForGrabbing(id, X, Y) {
    items.value = items.value.map((e) => {
      if (e.id === id) {
        return {
          ...e,
          coords: {
            ...e.coords,
            x: X,
            y: Y
          }
        }
      }

      return e
    })
  }

  function updateCoordinatesForFieldResize(deltaScale) {
    items.value = items.value.map((e) => {
      return {
        ...e,
        coords: {
          ...e.coords,
          x: e.coords.x * deltaScale,
          y: e.coords.y * deltaScale
        }
      }
    })
  }

  return {
    items,
    addElement,
    updateMainElementsCoordinates,
    updateCoordinatesForFieldMove,
    updateCoordinatesForFieldResize,
    updateCoordinatesForGrabbing
  }
})
