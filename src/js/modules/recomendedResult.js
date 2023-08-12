export default function recommendedPlant (recommendation, plantContainer) {
  const container = plantContainer

  const storedRecommendation = JSON.parse(
    localStorage.getItem('recommendation')
  )

  const imgPot = document.createElement('img')
  if (storedRecommendation) {
    const potStyle =
      storedRecommendation.potStyle === 'Decorated pot'
        ? 'decorated-'
        : ''
    const potColor = storedRecommendation.potColor
    const potMaterial = storedRecommendation.potMaterial.toLowerCase()
    imgPot.src = `../src/assets/pots/pot-${potMaterial}-${potStyle}${potColor}.png`
  } else {
    imgPot.src = `../src/assets/pots/pot-${recommendation.pot.replace(
      ' pot',
      ''
    )}.png`
  }

  const imgPlant = document.createElement('img')
  imgPlant.src = `../src/assets/img/plant-${recommendation.name.toLowerCase()}.png`

  const imgSoil = document.createElement('img')
  imgSoil.src = `../src/assets/img/soil-${recommendation.soil.replace(
    ' Soil',
    ''
  )}.png`

  const extrasContainer = document.createElement('div')
  extrasContainer.className = 'extras-container'

  recommendation.extras.forEach((extra) => {
    const extraImage = createImage(extra)
    extrasContainer.appendChild(extraImage)
  })

  container.innerHTML = ''
  container.appendChild(imgPot)
  container.appendChild(imgPlant)
  container.appendChild(imgSoil)
  container.appendChild(extrasContainer)

  const recommendationInfo = document.createElement('div')
  recommendationInfo.innerHTML = `
    <p>The perfect plant for you is...</p>
    <h3 class="plant-created-title">${recommendation.name}</h3>
    <div class="empty-container"></div>
    <div class="result-container">
      <div class="result-text-left">
        <p>Name</p>
        <p>Soil</p>
        <p>Pot</p>
        <p>Extras</p>
      </div>
      <div class="result-text-right">
        <p>${recommendation.name}</p>
        <p>${recommendation.soil}</p>
        <p>${recommendation.potColor}</p>
        <p>${recommendation.extras.join(', ')}</p>
      </div>  
    </div>
    <button id="customizeButton" class="customize-button clear-button">Customize</button>
  `
  container.appendChild(recommendationInfo)

  const customizeButton = document.getElementById('customizeButton')
  customizeButton.addEventListener('click', () => {
    window.location.href = 'custom-page.html'
  })
  container.style.display = 'block'
}

function createImage (filename) {
  const img = document.createElement('img')
  img.src = `../src/assets/img/${filename}.png`
  return img
}
