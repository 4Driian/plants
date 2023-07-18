export class PlantBuilder {
  constructor() {
    this.name = '';
    this.soil = '';
    this.pot = '';
    this.potMaterial = '';
    this.potStyle = '';
    this.extras = [];
    this.plantImage = '';
  }

  withPlantImage(plantImage) {
    this.plantImage = plantImage;
    return this;
  }

  withName(name) {
    this.name = capitalize(name);
    return this;
  }

  withSoil(soil) {
    this.soil = soil;
    return this;
  }

  withPot(pot) {
    this.pot = pot;
    return this;
  }

  withPotMaterial(potMaterial) {
    this.potMaterial = potMaterial;
    return this;
  }

  withPotStyle(potStyle) {
    this.potStyle = potStyle;
    return this;
  }

  withExtras(extras) {
    this.extras = extras;
    return this;
  }

  build() {
    return {
      name: this.name,
      soil: this.soil,
      pot: this.pot,
      potMaterial: this.potMaterial,
      potStyle: this.potStyle,
      extras: this.extras
    };
  }
}

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}