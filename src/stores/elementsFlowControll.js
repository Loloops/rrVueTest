import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useElementsStore = defineStore('elements', () => {
  const items = ref([
    /* {
      id: 1,
      coords: {
        x_main: 40,
        y_main: 40,
        x: 40,
        y: 40,
        width: 150,
        height: 50
      },
      styles: 'width: 150px;height: 50px',
      data: 'el square',
      type: 'square'
    },
    {
      id: 2,
      coords: {
        x_main: 700,
        y_main: 700,
        x: 700,
        y: 700,
        width: 150,
        height: 50
      },
      styles: 'width: 150px;height: 50px',
      data: 'el square',
      type: 'square'
    } */
  ])

  const itemsEdges = ref([
    /* {
      id: 1,
      source: {
        id: 1,
        pos: 'bottom'
      },
      target: {
        id: 2,
        pos: 'left'
      }
    } */
  ])

  function addChainFlow(flow) {
    itemsEdges.value.push(flow)
  }

  function addElement(element) {
    var elemetsObj = {
      square: {
        id: Date.now(),
        coords: {
          x_main: 100,
          y_main: 100,
          x: 100,
          y: 100,
          width: 150,
          height: 50
        },
        styles: 'width: 150px;height: 50px',
        data: 'el square',
        type: 'square'
      },
      circle: {
        id: Date.now(),
        coords: {
          x_main: 100,
          y_main: 100,
          x: 100,
          y: 100,
          width: 70,
          height: 70
        },
        styles: 'width: 70px;height: 70px',
        data: 'el circle',
        type: 'circle'
      },
      img1: {
        id: Date.now(),
        coords: {
          x_main: 100,
          y_main: 100,
          x: 100,
          y: 100,
          width: 70,
          height: 70
        },
        styles: `width: 70px;height: 70px;`,
        data: '',
        type: 'img'
      },
      img2: {
        id: Date.now(),
        coords: {
          x_main: 100,
          y_main: 100,
          x: 100,
          y: 100,
          width: 70,
          height: 70
        },
        styles: `width: 70px;height: 70px;`,
        data: '',
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
          y: e.coords.y * deltaScale,
          width: e.coords.width * deltaScale,
          height: e.coords.height * deltaScale
        }
      }
    })
  }

  function deleteElement(id) {
    items.value = items.value.filter((e) => e.id !== id)
  }

  return {
    items,
    itemsEdges,
    addElement,
    updateMainElementsCoordinates,
    updateCoordinatesForFieldMove,
    updateCoordinatesForFieldResize,
    updateCoordinatesForGrabbing,
    deleteElement,
    addChainFlow
  }
})
