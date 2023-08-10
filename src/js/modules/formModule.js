import PlantBuilder from "./builderModule.js";
import recomendedPlant from "./recomendedResult.js";
import clearButton from "./buttonModule.js";

export default function initializeForm() {
  const form = document.getElementById("form");
  const plantContainer = document.getElementById("recommendation");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const place = document.querySelector('input[name="place"]:checked');
    const sunlight = document.querySelector('input[name="sunlight"]:checked');
    const pets = document.querySelector('input[name="pets"]:checked');
    const water = document.querySelector('input[name="water"]:checked');
    const style = document.querySelector('input[name="style"]:checked');
    const extras = Array.from(document.querySelectorAll('input[name="extras"]:checked'));

    if (place && sunlight && pets && water && style) {
      const builder = new PlantBuilder();
      let plantName, plantImage, soil, pot, potStyle, potMaterial;

      switch (place.value) {
        case "inside_indirect":
          plantName = "Sansevieria";
          plantImage = "plant-sansevieria";
          break;
        case "inside_lot":
          plantName = "Aglaonema";
          plantImage = "plant-aglaonema";
          break;
        case "outside":
          plantName = "Aloe";
          plantImage = "plant-aloe";
          break;
      }

      builder.withName(plantName).withPlantImage(plantImage);

      if (sunlight.value === "yes") {
        soil = "Composted Soil";
      } else if (sunlight.value === "no") {
        soil = "Fertilized Soil";
      }
      builder.withSoil(soil);

      if (pets.value === "yes") {
        pot = "ceramic-unpainted";
        potStyle = "Substitute the soil for the easy drainage soil";
      } else if (pets.value === "no") {
        pot = "ceramic-unpainted";
      }
      builder.withPot(pot).withPotStyle(potStyle);

      if (water.value === "overwater") {
        potMaterial = "pot-clay-blue";
      } else if (water.value === "underwater" || water.value === "neither") {
        potMaterial = "ceramic-unpainted";
      }
      builder.withPotMaterial(potMaterial);

      switch (style.value) {
        case "minimalism":
          builder.withPotStyle("pot-ceramic-blue");
          break;
        case "decoration":
          builder.withPotStyle("pot-ceramic-decorated-green");
          break;
        case "bright_colors":
          builder.withPotStyle("pot-ceramic-decorated-purple");
          break;
      }

      const extrasList = extras.map((extra) => extra.value);
      builder.withExtras(extrasList);

      const recommendation = builder.build();
      recomendedPlant(recommendation, plantContainer);
      localStorage.setItem("recommendation", JSON.stringify(recommendation));
    } else {
      alert("Please check all boxes");
    }
  });

  const storedRecommendation = JSON.parse(localStorage.getItem("recommendation"));
  if (storedRecommendation) {
    recomendedPlant(storedRecommendation, plantContainer);
  }

  clearButton(form, plantContainer);
}