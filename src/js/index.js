import initializeForm from './modules/formModule.js';
import recommendedPlant from './modules/recomendedResult.js';

initializeForm();

const customizeButton = document.getElementById('customizeButton');

customizeButton.addEventListener('click', () => {
  const storedRecommendation =
    JSON.parse(localStorage.getItem('recommendation')) || recommendedPlant;
  const queryParams = new URLSearchParams(storedRecommendation);
  window.location.href = `custom-page.html?${queryParams.toString()}`;
});
