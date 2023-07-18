import { PlantBuilder, capitalize } from './builderModule.js';
import { recomendedPlant } from './recomendedResult.js';

export function initializeForm() {
  const form = document.getElementById('form');
  const plantContainer = document.getElementById('recommendation');

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const place = getValue('place');
    const sunlight = getValue('sunlight');
    const pets = getValue('pets');
    const water = getValue('water');
    const style = getValue('style');
    const extras = getCheckedValues('extras');

    if (place && sunlight && pets && water && style) {
      const builder = new PlantBuilder();

      const plantOptions = {
        inside_indirect: { name: 'Sansevieria', plantImage: 'plant-sansevieria' },
        inside_lot: { name: 'Aglaonema', plantImage: 'plant-aglaonema' },
        outside: { name: 'Aloe', plantImage: 'plant-aloe' }
      };

      builder.withName(plantOptions[place].name).withPlantImage(plantOptions[place].plantImage);

      builder.withSoil(sunlight === 'yes' ? 'Composted Soil' : 'Fertilized Soil');

      builder.withPot(pets === 'yes' ? 'Ceramic pot' : 'Ceramic pot');

      if (pets === 'yes') {
        builder.withPotStyle('Substitute the soil for the easy drainage soil');
      }

      builder.withPotMaterial(water === 'overwater' ? 'Clay pot' : 'Ceramic pot');

      const styleOptions = {
        minimalism: 'Simple pot',
        decoration: 'Simple pot decorated',
        bright_colors: 'Painted pot decorated'
      };

      builder.withPotStyle(styleOptions[style]);

      const extrasList = extras.map(extra => extra.value);
      builder.withExtras(extrasList);

      const recommendation = builder.build();

      recomendedPlant(recommendation, plantContainer);
    } else {
      alert('Please check all boxes');
    }
  });

  const clearButton = document.getElementById('clearButton');
  clearButton.addEventListener('click', function() {
    form.reset();
    plantContainer.style.display = 'none';
  });
}

function getValue(name) {
  return document.querySelector(`input[name="${name}"]:checked`)?.value;
}

function getCheckedValues(name) {
  const checkboxes = Array.from(document.querySelectorAll(`input[name="${name}"]:checked`));
  return checkboxes.map(checkbox => ({ value: checkbox.value, image: checkbox.value }));
}