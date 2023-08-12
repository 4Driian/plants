export function displayOrderDetails (plantOrderStorage, plantImages) {
  const plantInOrder = document.getElementById('plantInOrder')
  const soilInOrder = document.getElementById('soilInOrder')
  const potInOrder = document.getElementById('orderPot')
  const potMaterialInOrder = document.getElementById('potMaterialInOrder')
  const potStyleInOrder = document.getElementById('potStyleInOrder')
  const extrasInOrder = document.getElementById('extrasInOrder')
  const imgPlant = document.createElement('img')
  imgPlant.src = `../src/assets/img/plant-${plantOrderStorage.name}.png`
  plantImages.appendChild(imgPlant)

  plantInOrder.textContent = plantOrderStorage.name
  soilInOrder.textContent = plantOrderStorage.soil
  potInOrder.textContent = plantOrderStorage.pot
  potMaterialInOrder.textContent = plantOrderStorage.potMaterial
  potStyleInOrder.textContent = plantOrderStorage.potStyle
  extrasInOrder.textContent = plantOrderStorage.extras.join(', ')

  const images = [
    `../src/assets/pots/pot-${plantOrderStorage.potMaterial.toLowerCase()}-${
      plantOrderStorage.potStyle === 'Decorated pot' ? 'decorated-' : ''
    }${plantOrderStorage.potColor.toLowerCase()}.png`,
    `../src/assets/img/plant-${plantOrderStorage.name}.png`,
    `../src/assets/img/soil-${plantOrderStorage.soil.replace(' Soil', '')}.png`
  ]

  plantOrderStorage.extras.forEach((extra) => {
    images.push(`../src/assets/img/${extra}.png`)
  })

  images.forEach((imageSrc) => {
    const imageElement = document.createElement('img')
    imageElement.src = imageSrc
    plantImages.appendChild(imageElement)
  })
}
