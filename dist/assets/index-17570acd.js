(function () {
  const e = document.createElement('link').relList;
  if (e && e.supports && e.supports('modulepreload')) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) n(i);
  new MutationObserver((i) => {
    for (const o of i)
      if (o.type === 'childList')
        for (const r of o.addedNodes)
          r.tagName === 'LINK' && r.rel === 'modulepreload' && n(r);
  }).observe(document, { childList: !0, subtree: !0 });
  function a(i) {
    const o = {};
    return (
      i.integrity && (o.integrity = i.integrity),
      i.referrerPolicy && (o.referrerPolicy = i.referrerPolicy),
      i.crossOrigin === 'use-credentials'
        ? (o.credentials = 'include')
        : i.crossOrigin === 'anonymous'
        ? (o.credentials = 'omit')
        : (o.credentials = 'same-origin'),
      o
    );
  }
  function n(i) {
    if (i.ep) return;
    i.ep = !0;
    const o = a(i);
    fetch(i.href, o);
  }
})();
class f {
  constructor() {
    (this.name = ''),
      (this.soil = ''),
      (this.pot = ''),
      (this.potMaterial = ''),
      (this.potStyle = ''),
      (this.extras = []),
      (this.plantImage = '');
  }
  withPlantImage(e) {
    return (this.plantImage = e), this;
  }
  withName(e) {
    return (this.name = g(e)), this;
  }
  withSoil(e) {
    return (this.soil = e), this;
  }
  withPot(e) {
    return (this.pot = e), this;
  }
  withPotMaterial(e) {
    return (this.potMaterial = e), this;
  }
  withPotStyle(e) {
    return (this.potStyle = e), this;
  }
  withExtras(e) {
    return (this.extras = e), this;
  }
  build() {
    return {
      name: this.name,
      soil: this.soil,
      pot: this.pot,
      potMaterial: this.potMaterial,
      potStyle: this.potStyle,
      extras: this.extras,
    };
  }
}
function g(t) {
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function m(t, e) {
  const a = document.createElement('img');
  a.src = `../src/assets/img/pot-${t.pot.replace(' pot', '')}.png`;
  const n = document.createElement('img');
  n.src = `../src/assets/img/plant-${t.name}.png`;
  const i = document.createElement('img');
  i.src = `../src/assets/img/soil-${t.soil.replace(' Soil', '')}.png`;
  const o = document.createElement('div');
  (o.className = 'extras-container'),
    t.extras.forEach((l) => {
      const u = y(l);
      o.appendChild(u);
    }),
    (e.innerHTML = ''),
    e.appendChild(a),
    e.appendChild(n),
    e.appendChild(i),
    e.appendChild(o);
  const r = document.createElement('div');
  (r.innerHTML = `
  <p>The perfect plant for you is...</p>
  <h3 class="plant-created-title">${t.name}</h3>
  <div class="empty-container"></div>
  <div class="result-container">
    <div class="result-text-left">
      <p>Name</p>
      <p>Soil</p>
      <p>Pot</p>
      <p>Extras</p>
    </div>
    <div class="result-text-right">
      <p>${t.name}</p>
      <p>${t.soil}</p>
      <p>${t.pot}</p>
      <p>${t.extras.join(', ')}</p>
    </div>  
  </div>
  <button id="customizeButton" class="customize-button">Customize</button>
  `),
    e.appendChild(r),
    document.getElementById('customizeButton').addEventListener('click', () => {
      window.location.href = 'customize.html';
    }),
    (e.style.display = 'block');
}
function y(t) {
  const e = document.createElement('img');
  return (e.src = `../src/assets/img/${t}.png`), e;
}
function S(t, e) {
  document.getElementById('clearButton').addEventListener('click', () => {
    t.reset();
    const n = e;
    (n.innerHTML = ''),
      (n.style.display = 'none'),
      localStorage.removeItem('recommendation');
  });
}
function v() {
  const t = document.getElementById('form'),
    e = document.getElementById('recommendation');
  t.addEventListener('submit', (n) => {
    n.preventDefault();
    const i = document.querySelector('input[name="place"]:checked'),
      o = document.querySelector('input[name="sunlight"]:checked'),
      r = document.querySelector('input[name="pets"]:checked'),
      c = document.querySelector('input[name="water"]:checked'),
      l = document.querySelector('input[name="style"]:checked'),
      u = Array.from(document.querySelectorAll('input[name="extras"]:checked'));
    if (i && o && r && c && l) {
      const s = new f();
      i.value === 'inside_indirect'
        ? s.withName('Sansevieria').withPlantImage('plant-sansevieria')
        : i.value === 'inside_lot'
        ? s.withName('aglaonema').withPlantImage('plant-aglaonema')
        : i.value === 'outside' &&
          s.withName('Aloe').withPlantImage('plant-aloe'),
        o.value === 'yes'
          ? s.withSoil('Composted Soil')
          : o.value === 'no' && s.withSoil('Fertilized Soil'),
        r.value === 'yes'
          ? (s.withPot('Ceramic pot'),
            s.withPotStyle('Substitute the soil for the easy drainage soil'))
          : r.value === 'no' && s.withPot('Ceramic pot'),
        c.value === 'overwater'
          ? s.withPotMaterial('Clay pot')
          : (c.value === 'underwater' || c.value === 'neither') &&
            s.withPotMaterial('Ceramic pot'),
        l.value === 'minimalism'
          ? s.withPotStyle('Simple pot')
          : l.value === 'decoration'
          ? s.withPotStyle('Simple pot decorated')
          : l.value === 'bright_colors' &&
            s.withPotStyle('Painted pot decorated');
      const p = u.map((h) => h.value);
      s.withExtras(p);
      const d = s.build();
      m(d, e), localStorage.setItem('recommendation', JSON.stringify(d));
    } else alert('Please check all boxes');
  });
  const a = JSON.parse(localStorage.getItem('recommendation'));
  a && m(a, e), S(t, e);
}
v();
const w = document.getElementById('customizeButton');
w.addEventListener('click', () => {
  const t = JSON.parse(localStorage.getItem('recommendation')) || m,
    e = new URLSearchParams(t);
  window.location.href = `customize.html?${e.toString()}`;
});
