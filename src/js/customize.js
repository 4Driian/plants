import recommendedPlant from "./modules/recomendedResult.js";

function loadPreviewImages(data) {
  const plantPreviewImage = document.getElementById("plantPreviewImage");
  plantPreviewImage.innerHTML = "";

  const potColor = data.potColor || "unpainted";
  const potStyle = data.potStyle === "Decorated pot" ? "decorated-" : "";

  const selectedMaterial = document.querySelector('input[name="potMaterial"]:checked');
  const selectedMaterialValue = selectedMaterial ? selectedMaterial.value : "ceramic";

  const potImage = document.createElement("img");
  potImage.id = "potImage";
  potImage.src = `../src/assets/pots/pot-${selectedMaterialValue}-${potStyle}${potColor.toLowerCase()}.png`;
  plantPreviewImage.appendChild(potImage);

  const plantImage = document.createElement("img");
  plantImage.src = `../src/assets/img/plant-${data.name}.png`;
  plantPreviewImage.appendChild(plantImage);

  const soilImage = document.createElement("img");
  soilImage.src = `../src/assets/img/soil-${data.soil.replace(" Soil", "")}.png`;
  plantPreviewImage.appendChild(soilImage);

  data.extras.forEach((extra) => {
    const extraImage = document.createElement("img");
    extraImage.src = `../src/assets/img/${extra}.png`;
    plantPreviewImage.appendChild(extraImage);
  });
}

function loadPreviewData(data) {
  const previewElements = {
    previewPlantName: "name",
    previewSoil: "soil",
    previewPot: "pot",
    previewPotColor: "potColor",
    previewExtras: Array.isArray(data.extras) ? data.extras.join(", ") : "",
  };

  for (const [elementId, value] of Object.entries(previewElements)) {
    const element = document.getElementById(elementId);
    if (elementId === "previewExtras") {
      element.textContent = value;
    } else {
      element.textContent = data[value];
    }
  }

  loadPreviewImages(data);
}

document.addEventListener("DOMContentLoaded", () => {
  const customizeForm = document.getElementById("customizeForm");
  const potColorToggle = document.getElementById("potColorToggle");
  const potColorOptions = document.getElementById("potColorOptions");
  const plantPreviewImage = document.getElementById("plantPreviewImage");
  const plantSelect = document.getElementById("plantSelect");
  const soilOptions = document.querySelectorAll('input[name="soil"]');
  const extrasCheckboxes = document.querySelectorAll('input[name="extras"]');

  if (potColorToggle) {
    potColorToggle.addEventListener("change", () => {
      potColorOptions.style.display = potColorToggle.checked ? "block" : "none";
    });
  }

  if (customizeForm) {
    customizeForm.addEventListener("change", (event) => {
      if ((event.target.name === "potColor" || event.target.name === "potMaterial") && potColorToggle.checked) {
        const selectedColor = customizeForm.elements.potColor.value;
        const selectedMaterial = customizeForm.elements.potMaterial.value;
        const potImage = document.getElementById("potImage");
        const potStyle = customizeForm.elements.potDecorations.checked ? "decorated-" : "";
        if (potImage) {
          potImage.src = `../src/assets/pots/pot-${selectedMaterial.toLowerCase()}-${potStyle}${selectedColor.toLowerCase()}.png`;
        }
      }
    });

    function updateStoredRecommendation(key, value) {
      const storedRecommendation = JSON.parse(localStorage.getItem("recommendation"));
      if (storedRecommendation) {
        storedRecommendation[key] = value;
        loadPreviewData(storedRecommendation);
      }
    }

    plantSelect.addEventListener("change", () => {
      updateStoredRecommendation("name", plantSelect.value);
    });

    soilOptions.forEach((option) => {
      option.addEventListener("change", () => {
        updateStoredRecommendation("soil", customizeForm.elements.soil.value);
      });
    });

    extrasCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        const selectedExtras = Array.from(extrasCheckboxes)
          .filter((checkbox) => checkbox.checked)
          .map((checkbox) => checkbox.value);
        updateStoredRecommendation("extras", selectedExtras);
      });
    });

    const storedRecommendation = JSON.parse(localStorage.getItem("recommendation"));
    if (storedRecommendation) {
      loadPreviewData(storedRecommendation);
      plantSelect.value = storedRecommendation.name;
      soilOptions.forEach((option) => {
        if (option.value === storedRecommendation.soil) {
          option.checked = true;
        }
      });
      extrasCheckboxes.forEach((checkbox) => {
        if (storedRecommendation.extras.includes(checkbox.value)) {
          checkbox.checked = true;
        }
      });
    }

    customizeForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(customizeForm);
      const pot = formData.get("pot");
      const potDecorations = formData.get("potDecorations");
      const potColor = formData.get("potColor");
      const potMaterial = formData.get("potMaterial");
      const plant = formData.get("plant");
      const soil = formData.get("soil");
      const extras = formData.getAll("extras");

      const customizedRecommendation = {
        name: plant,
        soil,
        pot,
        potStyle: potDecorations === "on" ? "Decorated pot" : "Simple pot",
        potColor: potColor || "unpainted",
        extras,
        potMaterial,
      };
      recommendedPlant(customizedRecommendation, plantPreviewImage);
      localStorage.setItem("customizedRecommendation", JSON.stringify(customizedRecommendation));
      loadPreviewData(customizedRecommendation);
    });
  }
});