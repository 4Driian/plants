import inventoryAlertMessages from './components/inventoryAlertMessages.js'
import acordionInit from './components/accordion.js'
import { generatePrice } from './modules/generatePriceModule.js'
import { getInventory, getDetails } from './modules/apiModule.js'
import { displayOrderDetails } from './modules/orderDetailsModule.js'

document.addEventListener('DOMContentLoaded', async () => {
  const plantImages = document.getElementById('orderImages')
  const alerInInventory = document.getElementById('inventoryAlert')
  const orderButton = document.getElementById('orderButton')
  const textCareTips = document.getElementById('caringTips')
  const inventoryAlertsContent = document.getElementById(
    'inventoryAlertsContent'
  )

  const plantOrderStorage = JSON.parse(localStorage.getItem('recommendation'))

  if (plantOrderStorage) {
    displayOrderDetails(plantOrderStorage, plantImages)
  }

  try {
    const inventoryResponses = await Promise.all([
      getInventory('plant', plantOrderStorage.name),
      getInventory('pot', plantOrderStorage.potMaterial.toLowerCase()),
      getInventory(
        'soil',
        plantOrderStorage.soil.toLowerCase().replace(' soil', '')
      )
    ])

    let inventoryAlertType = 'inStock'
    for (const response of inventoryResponses) {
      for (const messageType in inventoryAlertMessages) {
        if (inventoryAlertMessages[messageType].check(response.inventory)) {
          inventoryAlertType = messageType
          break
        }
      }
    }

    alerInInventory.textContent =
      inventoryAlertMessages[inventoryAlertType].message
    alerInInventory.style.backgroundColor =
      inventoryAlertMessages[inventoryAlertType].color

    if (inventoryAlertType !== 'inStock') {
      orderButton.disabled = true
    }

    inventoryAlertsContent.innerHTML = ''

    inventoryResponses.forEach((response) => {
      const inventoryAlertItem = document.createElement('p')
      inventoryAlertItem.textContent = `${response.name}: ${
        response.inventory > 0
          ? `In Stock (${response.inventory})`
          : 'Out of Stock'
      }`
      inventoryAlertsContent.appendChild(inventoryAlertItem)
    })
  } catch (error) {
    console.error('Error getting inventory ', error)
    alerInInventory.textContent = 'Error fetching '
    alerInInventory.style.backgroundColor = 'red'
    orderButton.disabled = true
  }

  if (plantOrderStorage) {
    try {
      const data = await getDetails(plantOrderStorage.name)

      const descriptionElement = document.getElementById(
        'plantDescription'
      )
      descriptionElement.innerHTML = `<p>${data.description}</p>`

      const caringTipsAccordionContent =
        document.getElementById('careTips')
      caringTipsAccordionContent.innerHTML = ''

      const textCareTips = document.createElement('div')
      textCareTips.classList.add('types-of-care')

      const caringTipsTitleElement = document.createElement('h4')
      caringTipsTitleElement.textContent = 'Care Tips'
      textCareTips.appendChild(caringTipsTitleElement)

      const careTipsList = document.createElement('ul')
      Object.keys(data.care).forEach((category) => {
        const tipItem = document.createElement('li')

        const careImg = document.createElement('img')
        careImg.src = `../src/assets/icons/${category.toLowerCase()}.svg`
        tipItem.appendChild(careImg)

        const tipText = document.createElement('span')
        tipText.innerHTML = `<strong>${category}</strong> <br> <span class='type-care'>${data.care[category]}</span>`
        tipItem.appendChild(tipText)

        careTipsList.appendChild(tipItem)
      })

      textCareTips.appendChild(careTipsList)
      caringTipsAccordionContent.appendChild(textCareTips)
    } catch (error) {
      console.error('Error in fetch ', error)
      textCareTips.textContent = 'Error fetching caring tips.'
    }
    acordionInit()
  }
  generatePrice(plantOrderStorage)
})
