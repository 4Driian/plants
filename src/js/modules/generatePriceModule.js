export function generatePrice (plantOrderStorage) {
  const priceBreakdownElement = document.getElementById(
    'priceBreakdownContent'
  )
  priceBreakdownElement.innerHTML = ''

  const priceListElement = document.createElement('ul')
  priceListElement.classList.add('product-list')

  const priceData = {
    aglaonema: 12.99,
    aloe: 5.25,
    fern: 10.25,
    cactus: 8.25,
    monstera: 18.0,
    peaceLily: 8.75,
    sansevieria: 5.75,
    Composted: 3.25,
    Fertilized: 5.0,
    Drainage: 5.5,
    'Moss-pole': 2.25,
    pebbles: 2.0,
    'mini-plants': 3.75,
    clay: 3.0,
    ceramic: 5.0,
    Purple: 1.0,
    Green: 1.0,
    Pink: 1.0,
    Blue: 1.0,
    'Decorated pot': 4.0
  }

  let totalPrice = 0
  const selectedItems = {
    [plantOrderStorage.name]: true,
    [plantOrderStorage.potMaterial]: true,
    [plantOrderStorage.potStyle]: true,
    [plantOrderStorage.potColor]: true,
    [plantOrderStorage.soil]: true,
    ...plantOrderStorage.extras.reduce((acc, extra) => {
      acc[extra] = true
      return acc
    }, {})
  }

  for (const item in priceData) {
    if (selectedItems[item]) {
      const priceItem = document.createElement('li')
      const price = priceData[item]
      const itemName = item
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase())

      const priceSpan = document.createElement('span')
      priceSpan.textContent = `$${price.toFixed(2)}`
      priceSpan.classList.add('product-price')

      const priceItemText = document.createElement('span')
      priceItemText.classList.add('product-name')
      priceItemText.textContent = itemName + ' '

      priceItem.appendChild(priceItemText)
      priceItem.appendChild(priceSpan)
      priceListElement.appendChild(priceItem)
      totalPrice += price
    }
  }

  const totalItem = document.createElement('li')
  totalItem.textContent = `Total: $${totalPrice.toFixed(2)}`
  priceListElement.appendChild(totalItem)

  priceBreakdownElement.appendChild(priceListElement)
}
