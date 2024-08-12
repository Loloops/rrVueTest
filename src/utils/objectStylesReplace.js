function objectStyleToString(obj) {
  console.log(obj)

  return Object.entries(obj)
    .map(([key, value]) => {
      const cssKey = key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)

      return `${cssKey}: ${value};`
    })
    .join('')
}

function styleStringToObject(styleString) {
  const styleObject = {}

  if (styleString) {
    const styleRules = styleString.split(';')

    styleRules.forEach((rule) => {
      if (rule.trim() !== '') {
        const [key, value] = rule.split(':').map((item) => item.trim())
        styleObject[key.replace(/-/g, '')] = value
      }
    })
  }

  return styleObject
}

export { objectStyleToString, styleStringToObject }
