export default function recommendedPlant(recommendation, plantContainer) {
  const imgPot = createImage(`pot-${recommendation.pot.replace(" pot", "")}`);
  const imgPlant = createImage(`plant-${recommendation.name}`);
  const imgSoil = createImage(`soil-${recommendation.soil.replace(" Soil", "")}`);

  const extrasContainer = document.createElement('div');
  extrasContainer.className = 'extras-container';
  recommendation.extras.forEach(extra => {
    const extraImage = createImage(extra);
    extrasContainer.appendChild(extraImage);
  });

  plantContainer.innerHTML = "";
  plantContainer.appendChild(imgPot);
  plantContainer.appendChild(imgPlant);
  plantContainer.appendChild(imgSoil);
  plantContainer.appendChild(extrasContainer);

  const recommendationInfo = createRecommendationInfo(recommendation);
  plantContainer.appendChild(recommendationInfo);

  const customizeButton = document.getElementById("customizeButton");
  customizeButton.addEventListener("click", () => {
    window.location.href = "custom-page.html";
  });

  plantContainer.style.display = "block";
}

function createImage(filename) {
  const img = document.createElement('img');
  img.src = `../src/assets/img/${filename}.png`;
  return img;
}

function createRecommendationInfo(recommendation) {
  const recommendationInfo = document.createElement("div");
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
        <p>${recommendation.pot}</p>
        <p>${recommendation.extras.join(", ")}</p>
      </div>  
    </div>
    <button id="customizeButton" class="customize-button clear-button">Customize</button>
  `;
  return recommendationInfo;
}