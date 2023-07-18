(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function r(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(i){if(i.ep)return;i.ep=!0;const s=r(i);fetch(i.href,s)}})();class v{constructor(){this.name="",this.soil="",this.pot="",this.potMaterial="",this.potStyle="",this.extras=[],this.plantImage=""}withPlantImage(t){return this.plantImage=t,this}withName(t){return this.name=S(t),this}withSoil(t){return this.soil=t,this}withPot(t){return this.pot=t,this}withPotMaterial(t){return this.potMaterial=t,this}withPotStyle(t){return this.potStyle=t,this}withExtras(t){return this.extras=t,this}build(){return{name:this.name,soil:this.soil,pot:this.pot,potMaterial:this.potMaterial,potStyle:this.potStyle,extras:this.extras}}}function S(e){return e.charAt(0).toUpperCase()+e.slice(1)}function w(e,t){const r=u(`pot-${e.pot.replace(" pot","")}`),a=u(`plant-${e.name}`),i=u(`soil-${e.soil.replace(" Soil","")}`),s=document.createElement("div");s.className="extras-container",e.extras.forEach(c=>{const p=u(c);s.appendChild(p)}),t.innerHTML="",t.appendChild(r),t.appendChild(a),t.appendChild(i),t.appendChild(s);const o=document.createElement("div");o.innerHTML=`
    <p>The perfect plant for you is...</p>
    <h3 class="plant-created-title">${e.name}</h3>
    <div class="empty-container"></div>
    <div class="result-container">
      <div class="result-text-left">
        <p>Name</p>
        <p>Soil</p>
        <p>Pot</p>
        <p>Extras</p>
      </div>
      <div class="result-text-right">
        <p>${e.name}</p>
        <p>${e.soil}</p>
        <p>${e.pot}</p>
        <p>${e.extras.join(", ")}</p>
      </div>  
    </div>
  `,t.appendChild(o),t.style.display="block"}function u(e){const t=document.createElement("img");return t.src=`../src/assets/img/${e}.png`,t}function P(){const e=document.getElementById("form"),t=document.getElementById("recommendation");e.addEventListener("submit",function(a){a.preventDefault();const i=l("place"),s=l("sunlight"),o=l("pets"),c=l("water"),p=l("style"),h=x("extras");if(i&&s&&o&&c&&p){const n=new v,d={inside_indirect:{name:"Sansevieria",plantImage:"plant-sansevieria"},inside_lot:{name:"Aglaonema",plantImage:"plant-aglaonema"},outside:{name:"Aloe",plantImage:"plant-aloe"}};n.withName(d[i].name).withPlantImage(d[i].plantImage),n.withSoil(s==="yes"?"Composted Soil":"Fertilized Soil"),n.withPot("Ceramic pot"),o==="yes"&&n.withPotStyle("Substitute the soil for the easy drainage soil"),n.withPotMaterial(c==="overwater"?"Clay pot":"Ceramic pot");const m={minimalism:"Simple pot",decoration:"Simple pot decorated",bright_colors:"Painted pot decorated"};n.withPotStyle(m[p]);const f=h.map(g=>g.value);n.withExtras(f);const y=n.build();w(y,t)}else alert("Please check all boxes")}),document.getElementById("clearButton").addEventListener("click",function(){e.reset(),t.style.display="none"})}function l(e){var t;return(t=document.querySelector(`input[name="${e}"]:checked`))==null?void 0:t.value}function x(e){return Array.from(document.querySelectorAll(`input[name="${e}"]:checked`)).map(r=>({value:r.value,image:r.value}))}P();
