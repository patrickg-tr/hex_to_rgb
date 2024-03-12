const hexLetterVal = {a: 10, b: 11, c: 12, d: 13, e: 14, f: 15}
const colorLists = [...document.querySelectorAll('#story--ui-patterns-color-palette--default-inner .List-color')]

const convertSingleHexToRgb = (x, y) => {
	if(hexLetterVal[x] || hexLetterVal[y] !== undefined) {
  	const array = [];
  	hexLetterVal[x] ? array.push(hexLetterVal[x]) : array.push(x)
    hexLetterVal[y] ? array.push(hexLetterVal[y]) : array.push(y)
    
    return convertSingleHexToRgb(array[0], array[1])
  
  } else {
    return (Number(x) * 16) + Number(y)
  }
}

const getRgbValue = (hexArray) => {
  return hexArray.map(item => {
		const itemArray = item.split('')
		return convertSingleHexToRgb(itemArray[0], itemArray[1])
	})
}

const rgbHTML = (rgbValue, elemClass) => {
  return `<span class="${elemClass}" data-rgb="${rgbValue}">${rgbValue}</span>`;
}

const loopThruLists = () => {
  if(!colorLists.length) { return }

	colorLists.forEach(item => {
    const elem = item.querySelector('[class^=List-color-hex]')
    const hex = elem.innerText.toLowerCase();
    const hexArray = [hex.substring(1, 3), hex.substring(3, 5), hex.substring(5, 7)];

    const rgbValue = getRgbValue(hexArray)
    elem.insertAdjacentHTML('afterend', rgbHTML(rgbValue, elem.classList.value))
  })
}

(() => {loopThruLists()})();
