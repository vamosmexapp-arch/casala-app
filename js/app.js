/* ============================================================
   Casalá — app logic (vanilla JS SPA router)
   - Hash-based routing: #/ , #/listing/p3 , #/favoritos
   - Back button works because we use history + hashchange
   - State (filters, favorites) lives in memory + localStorage
   ============================================================ */

// ---------- tiny state ----------
const state = {
  filters: { beds:null, baths:null, park:null, priceMin:null, priceMax:null, floor:"any", elevator:false, zone:"all", features:new Set() },
  featuresExpanded: false,
  homeScroll: 0,
  favorites: new Set(JSON.parse(localStorage.getItem('casala_favs') || '[]')),
  signedIn: false,
};
function saveFavs(){ localStorage.setItem('casala_favs', JSON.stringify([...state.favorites])); }

// ---------- icons ----------
const ICON = {
  bed:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6M3 14h18M3 18v2M21 18v2M6 10V7a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"/></svg>',
  bath:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z M6 12V6a2 2 0 0 1 2-2 2 2 0 0 1 2 2"/></svg>',
  car:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13l1.5-4.5A2 2 0 0 1 8.4 7h7.2a2 2 0 0 1 1.9 1.5L19 13M5 13h14v4H5z M7 17v1.5M17 17v1.5"/></svg>',
  pin:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-6.5 7-11a7 7 0 0 0-14 0c0 4.5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  heart:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.5-1.5 3-3.3 3-5.5A4.5 4.5 0 0 0 12 5.5 4.5 4.5 0 0 0 2 8.5c0 2.2 1.5 4 3 5.5l7 7z"/></svg>',
  check:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>',
  arrow:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  back:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>',
};

const peso = n => '$' + n.toLocaleString('es-MX');

// ---------- filtering ----------
function applyFilters(list){
  const f = state.filters;
  return list.filter(l => {
    if (f.beds !== null && (f.beds === '4' ? l.beds < 4 : l.beds != f.beds)) return false;
    if (f.baths !== null && (f.baths === '3' ? l.baths < 3 : l.baths != f.baths)) return false;
    if (f.park !== null && (f.park === '3' ? l.park < 3 : l.park != f.park)) return false;
    if (f.priceMin !== null && l.price < f.priceMin) return false;
    if (f.priceMax !== null && l.price > f.priceMax) return false;
    if (f.zone !== 'all' && l.zone !== f.zone) return false;
    if (f.elevator && !l.elevator) return false;
    if (f.features && f.features.size){
      const lf = l.features || [];
      for (const want of f.features){ if(!lf.includes(want)) return false; }
    }
    return true;
  });
}

// ---------- card component ----------
function cardHTML(l){
  const saved = state.favorites.has(l.id) ? 'saved' : '';
  return `
  <article class="card" data-nav="listing/${l.id}">
    <div class="card-img">
      <span class="tag">${l.tag}</span>
      <button class="fav-btn ${saved}" data-fav="${l.id}" title="Guardar favorito">${ICON.heart}</button>
      <img src="${PROPERTY_IMAGES[l.img]}" alt="${l.title}">
    </div>
    <div class="card-body">
      <div class="card-price">${peso(l.price)} <small>/ mes</small></div>
      <div class="card-title">${l.title}</div>
      <div class="card-loc">${ICON.pin} ${l.zone}, ${l.city}</div>
      <p class="card-desc">${l.desc}</p>
      <div class="card-meta">
        <span>${ICON.bed} ${l.beds===0?'Estudio':l.beds+' rec'}</span>
        <span>${ICON.bath} ${l.baths} baño${l.baths>1?'s':''}</span>
        <span>${ICON.car} ${l.park} auto${l.park!==1?'s':''}</span>
      </div>
    </div>
  </article>`;
}

// ---------- HOME page ----------
async function renderHome(){
  const all = await getListings();
  const results = applyFilters(all);
  const zones = ["all","Providencia","Chapalita","Andares","Centro","Americana","Valle Real"];
  const zoneLabel = z => z === 'all' ? 'Todas las zonas' : z;

  document.getElementById('view').innerHTML = `
  <section class="hero"><div class="wrap">
    <span class="hero-eyebrow">Solo rentas · Guadalajara, Zapopan y más de Jalisco</span>
    <h1>Encuentra tu <em>próximo hogar</em> sin el desorden.</h1>
    <p class="sub">Rentar hecho fácil, con Casalá. Tu próximo hogar te espera.</p>
    <div class="searchbar">
      <svg class="spark" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17l-1.9-5.6L4.5 10l5.6-1.4z"/></svg>
      <input id="searchInput" type="text" placeholder="2 recámaras, elevador…">
      <button class="search-go" data-action="search">Buscar ${ICON.arrow}</button>
    </div>
    <p class="ai-hint"><b>Búsqueda con IA:</b> escribe como hablas y entendemos lo que buscas.</p>
    <div class="filter-divider">
      <div class="fd-line"><span class="fd-label"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M6 12h12M10 18h4"/></svg>O usa los filtros</span></div>
      <p class="fd-sub">¿Prefieres explorar tú? Ajusta recámaras, precio, zona y más.</p>
    </div>
  </div></section>

  <section class="filters"><div class="wrap">
    <div class="filter-card">
      <div class="filter-row">
        ${pillGroup('Recámaras','beds',['Estudio','1','2','3','4+'],['0','1','2','3','4'])}
        ${pillGroup('Baños','baths',['1','2','3+'],['1','2','3'])}
        ${pillGroup('Estacionamiento','park',['0','1','2','3+'],['0','1','2','3'])}
        <div class="filter-group">
          <div class="filter-label">Precio mensual</div>
          <div class="price-fields">
            <label class="price-input"><span>$</span><input id="priceMin" type="text" inputmode="numeric" placeholder="Mín"></label>
            <span class="price-dash">—</span>
            <label class="price-input"><span>$</span><input id="priceMax" type="text" inputmode="numeric" placeholder="Máx"></label>
          </div>
        </div>
        <div class="filter-group floor-feature">
          <div class="filter-label">Planta <span class="info-dot">i<span class="tip">Filtra por piso. Útil si prefieres planta baja o necesitas elevador por accesibilidad.</span></span></div>
          ${pillRow('floor',['Planta baja','1°','2°','3°+','No importa'],['0','1','2','3','any'])}
          <label class="elevator-toggle"><span class="switch"><input id="elevatorToggle" type="checkbox" ${state.filters.elevator?'checked':''}><span class="slider-tg"></span></span>Con elevador disponible</label>
        </div>
      </div>
      <div class="filter-features">
        <div class="filter-label">Características especiales</div>
        <div class="pills" data-filter="features" data-multi>
          ${(()=>{
            const top=['Pet friendly','Amueblado','Remodelado','En coto','Premium'];
            const extra=['Terraza / balcón','Roof garden','Alberca','Gimnasio','Vigilancia 24/7','Cocina integral','Patio / jardín','Bodega','Internet incluido'];
            const pill=f=>`<button class="pill ${state.filters.features.has(f)?'active':''}" data-val="${f}">${f}</button>`;
            // any extra selected? then keep expanded
            const anyExtra = extra.some(f=>state.filters.features.has(f));
            const expanded = state.featuresExpanded || anyExtra;
            const topHTML = top.map(pill).join('');
            const extraHTML = extra.map(f=>`<button class="pill feat-extra ${state.filters.features.has(f)?'active':''}" data-val="${f}" ${expanded?'':'hidden'}>${f}</button>`).join('');
            const toggle = `<button class="feat-toggle" data-action="toggleFeatures" type="button">${expanded?'Ver menos':'Ver más'} <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" style="transform:rotate(${expanded?180:0}deg);transition:transform .2s"><path d="M6 9l6 6 6-6"/></svg></button>`;
            return topHTML + extraHTML + toggle;
          })()}
        </div>
      </div>
      <div class="filter-actions">
        <button class="clear-btn" data-action="clear"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M19 6l-1 14H6L5 6M10 11v5M14 11v5M9 6V4h6v2"/></svg>Limpiar filtros</button>
        <button class="results-btn" data-action="search">Ver lugares <span class="count">${results.length}</span></button>
      </div>
    </div>
  </div></section>

  <section><div class="wrap">
    <div class="section-head">
      <div><h2>Disponibles ahora</h2><p>${results.length} propiedades en Guadalajara, Zapopan y más</p></div>
    </div>
    <div class="grid">${results.map(cardHTML).join('') || '<p style="color:var(--muted)">No hay propiedades con esos filtros. Prueba limpiarlos.</p>'}</div>
  </div></section>

  ${mapSectionHTML(results, zones, zoneLabel)}
  `;
  restoreFilterUI();
  // #5: if we just came back from a listing, jump to exactly where we were.
  if(state.restoreHomeScroll){
    const y = state.homeScroll || 0;
    state.restoreHomeScroll = false;
    requestAnimationFrame(()=>requestAnimationFrame(()=>window.scrollTo(0, y)));
  }
}

function pillGroup(label, key, labels, values){
  return `<div class="filter-group"><div class="filter-label">${label}</div>${pillRow(key,labels,values)}</div>`;
}
function pillRow(key, labels, values){
  return `<div class="pills" data-filter="${key}">${labels.map((l,i)=>`<button class="pill" data-val="${values[i]}">${l}</button>`).join('')}</div>`;
}

function mapSectionHTML(results, zones, zoneLabel){
  const pins = results.slice(0,6).map((l,i)=>{
    const pos = [[28,20],[50,40],[62,74],[24,60],[78,30],[40,55]][i] || [50,50];
    return `<div class="pin home" data-nav="listing/${l.id}" style="top:${pos[0]}%;left:${pos[1]}%"><div class="dot">${peso(l.price).replace(',000','k').replace('$','$')}</div></div>`;
  }).join('');
  return `
  <section class="map-section"><div class="wrap">
    <div class="section-head"><div><h2>Explora por zona</h2><p>Mira dónde están las propiedades y qué tienes cerca</p></div></div>
    <div class="map-toolbar">
      <button class="amenity on">Súper y abarrotes ${ICON.check}</button>
      <button class="amenity on">Hospitales ${ICON.check}</button>
      <button class="amenity">Escuelas ${ICON.check}</button>
      <button class="amenity">Transporte ${ICON.check}</button>
    </div>
    <div class="zone-chips" data-filter="zone">
      ${zones.map(z=>`<button class="zone-chip ${state.filters.zone===z?'active':''}" data-val="${z}">${zoneLabel(z)}</button>`).join('')}
    </div>
    <div class="map-shell">
      <div class="map-canvas">
        <div class="map-grid"></div>
        <div class="map-road" style="top:36%;left:0;right:0;height:14px"></div>
        <div class="map-road" style="top:72%;left:0;right:0;height:10px"></div>
        <div class="map-road" style="top:0;bottom:0;left:30%;width:14px"></div>
        <div class="map-road" style="top:0;bottom:0;left:64%;width:12px"></div>
        <div class="zone-blob" style="top:10%;left:8%;width:200px;height:140px"></div>
        <div class="zone-blob t" style="top:44%;left:56%;width:240px;height:160px"></div>
      </div>
      ${pins}
      <div class="map-zoom"><button>+</button><button>−</button></div>
      <div class="map-legend">
        <div class="lg-row"><span class="lg-dot" style="background:var(--terra)"></span>Propiedad en renta</div>
        <div class="lg-row"><span class="lg-dot" style="background:var(--agave)"></span>Súper / abarrotes</div>
        <div class="lg-row"><span class="lg-dot" style="background:#fff;border:1.5px solid var(--terra)"></span>Hospital</div>
      </div>
    </div>
    <a class="vamos-cta" href="https://vamos-app-liard.vercel.app/" target="_blank" rel="noopener">
      <img class="vamos-ic" src="data:image/png;base64,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" alt="Vamos">
      <div class="vamos-txt">
        <strong>¿Nuevo en la zona o quieres conocerla mejor?</strong>
        <span>Explora colonias, servicios y puntos de interés con nuestra app Vamos.</span>
      </div>
      <span class="vamos-go">Abrir Vamos ${ICON.arrow}</span>
    </a>
  </div></section>`;
}

function restoreFilterUI(){
  // reflect active filters in pills
  document.querySelectorAll('[data-filter]').forEach(group=>{
    if(group.dataset.multi !== undefined) return; // features handled inline at render
    const key = group.dataset.filter;
    const val = state.filters[key];
    group.querySelectorAll('.pill,.zone-chip').forEach(p=>{
      p.classList.toggle('active', String(val) === p.dataset.val);
    });
  });
  if(state.filters.priceMin!=null) document.getElementById('priceMin').value = state.filters.priceMin.toLocaleString('es-MX');
  if(state.filters.priceMax!=null) document.getElementById('priceMax').value = state.filters.priceMax.toLocaleString('es-MX');
}

// ---------- DETAIL page ----------
async function renderDetail(id){
  const l = await getListingById(id);
  if(!l){ location.hash = '#/'; return; }
  const saved = state.favorites.has(l.id) ? 'saved' : '';
  const gallery = [l.img,(l.img+1)%6,(l.img+2)%6,(l.img+3)%6,(l.img+4)%6]
    .map((gi,idx)=>`<img class="${idx===0?'g-main':''}" src="${PROPERTY_IMAGES[gi]}" alt="${l.title} foto ${idx+1}">`).join('');

  document.getElementById('view').innerHTML = `
  <div class="wrap">
    <div class="detail-back" data-action="back">${ICON.back} Volver a resultados</div>
    <div class="detail-gallery">${gallery}</div>
    <div class="detail-grid">
      <div>
        <h1 class="detail-title">${l.title}</h1>
        <div class="detail-loc">${ICON.pin} ${l.zone}, ${l.city}, Jalisco
          <button class="map-link-btn" data-action="viewMap" data-id="${l.id}">${ICON.pin} Ver en el mapa</button>
        </div>
        <div class="detail-map" id="detailMap">
          <div class="detail-map-canvas">
            <div class="dm-grid"></div>
            <div class="dm-area"></div>
            <div class="dm-pin">${ICON.pin}</div>
            <div class="dm-label">${l.zone}, ${l.city}</div>
          </div>
          <p class="dm-note">Por privacidad mostramos solo la colonia. La ubicación exacta se comparte al contactar al propietario.</p>
        </div>
        <div class="detail-specs">
          <div class="spec"><span class="s-val">${l.beds===0?'Estudio':l.beds}</span><span class="s-lbl">Recámaras</span></div>
          <div class="spec"><span class="s-val">${l.baths}</span><span class="s-lbl">Baños</span></div>
          <div class="spec"><span class="s-val">${l.park}</span><span class="s-lbl">Estacionamiento</span></div>
          <div class="spec"><span class="s-val">${l.floor===0?'PB':l.floor+'°'}</span><span class="s-lbl">Piso</span></div>
          <div class="spec"><span class="s-val">${l.elevator?'Sí':'No'}</span><span class="s-lbl">Elevador</span></div>
        </div>
        <div class="detail-section">
          <h3>Sobre esta propiedad</h3>
          <p>${l.desc} Ubicada en ${l.zone}, una de las zonas más buscadas de ${l.city}. Ideal para quien busca comodidad y buena ubicación, cerca de súper, hospitales y transporte.</p>
        </div>
        <div class="detail-section">
          <h3>Lo que incluye</h3>
          <div class="amen-list">${l.amenities.map(a=>`<span class="amen-chip">${ICON.check} ${a}</span>`).join('')}</div>
        </div>
      </div>
      <aside>
        <div class="contact-card">
          <div class="contact-price">${peso(l.price)} <small>/ mes</small></div>
          <button class="contact-btn" data-action="contact">Contactar</button>
          <button class="contact-btn ghost" data-fav="${l.id}">${state.favorites.has(l.id)?'Guardado ♥':'Guardar favorito'}</button>
          <div class="contact-agent">
            <div class="agent-avatar">${l.agent.initials}</div>
            <div><div class="agent-name">${l.agent.name}</div><div class="agent-role">${l.agent.role}</div></div>
          </div>
        </div>
      </aside>
    </div>
  </div>`;
  window.scrollTo(0,0);
}

// ---------- FAVORITES page ----------
async function renderFavorites(){
  const all = await getListings();
  const favs = all.filter(l => state.favorites.has(l.id));
  document.getElementById('view').innerHTML = `
  <div class="wrap">
    <div class="section-head" style="margin-top:32px"><div><h2>Tus favoritos</h2><p>${favs.length} propiedad${favs.length!==1?'es':''} guardada${favs.length!==1?'s':''}</p></div></div>
    ${favs.length ? `<div class="grid">${favs.map(cardHTML).join('')}</div>`
      : `<p style="color:var(--muted);margin-top:8px">Aún no has guardado propiedades. Toca el ♥ en cualquier propiedad para guardarla aquí.</p>`}
  </div>`;
}

// ---------- modal ----------
function showModal(title, text, primaryLabel, secondaryLabel){
  const m = document.createElement('div');
  m.className = 'modal-overlay';
  m.innerHTML = `<div class="modal" style="position:relative">
    <button class="modal-close" data-close>✕</button>
    <h3>${title}</h3><p>${text}</p>
    <button class="modal-btn" data-close>${primaryLabel}</button>
    ${secondaryLabel?`<button class="modal-btn ghost" data-close>${secondaryLabel}</button>`:''}
  </div>`;
  m.addEventListener('click', e=>{ if(e.target.dataset.close!==undefined || e.target===m) m.remove(); });
  document.body.appendChild(m);
}

// ---------- router ----------
function router(){
  const hash = location.hash || '#/';
  const parts = hash.slice(2).split('/'); // strip '#/'
  const about = document.getElementById('about');
  if(parts[0]===''){ renderHome(); if(about) about.style.display=''; }
  else if(parts[0]==='listing'){ renderDetail(parts[1]); if(about) about.style.display='none'; }
  else if(parts[0]==='favoritos'){ renderFavorites(); if(about) about.style.display='none'; }
  else { renderHome(); if(about) about.style.display=''; }
  updateNav();
}
function navTo(path){ location.hash = '#/' + path; }

// #5: return to results exactly where the user was (not the top, not the filters).
function goBackToResults(){
  state.restoreHomeScroll = true;
  if((location.hash||'#/')==='#/'){
    // already home (shouldn't usually happen from a listing) — just restore
    window.scrollTo(0, state.homeScroll||0);
    state.restoreHomeScroll = false;
  } else {
    navTo(''); // triggers hashchange -> router -> renderHome, which restores scroll
  }
}
function updateNav(){
  const av = document.getElementById('avatarBtn');
  if(av) av.querySelector('span').textContent = state.signedIn ? 'Mi cuenta' : 'Entrar';
}

// Sync typed price into state before any re-render (prevents wiping typed values).
function syncPriceFromDOM(){
  const mn=document.getElementById('priceMin'), mx=document.getElementById('priceMax');
  if(mn) state.filters.priceMin = mn.value ? (parseInt(mn.value.replace(/\D/g,''))||null) : null;
  if(mx) state.filters.priceMax = mx.value ? (parseInt(mx.value.replace(/\D/g,''))||null) : null;
}
// Re-render home in place WITHOUT jumping the scroll position (fixes zona reset, #3).
// If anchorSel is given, keep that element pinned under the same screen position after reflow.
function absTop(el){ let t=0; while(el){ t+=el.offsetTop; el=el.offsetParent; } return t; }
function rerenderInPlace(anchorSel){
  const y = window.scrollY;
  let beforeAbs=null, beforeViewport=null;
  if(anchorSel){ const el=document.querySelector(anchorSel); if(el){ beforeAbs=absTop(el); beforeViewport=beforeAbs - y; } }
  router();
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    if(anchorSel && beforeViewport!=null){
      const el=document.querySelector(anchorSel);
      if(el){ window.scrollTo(0, Math.max(0, absTop(el) - beforeViewport)); return; }
    }
    window.scrollTo(0, y);
  }));
}

// ---------- global click handling ----------
document.addEventListener('click', e=>{
  const nav = e.target.closest('[data-nav]');
  const fav = e.target.closest('[data-fav]');
  const act = e.target.closest('[data-action]');
  const pill = e.target.closest('.pill, .zone-chip');
  const amenity = e.target.closest('.amenity');

  if(fav){
    e.stopPropagation();
    syncPriceFromDOM();
    const id = fav.dataset.fav;
    if(state.favorites.has(id)){ state.favorites.delete(id); }
    else {
      state.favorites.add(id);
      if(!state.signedIn){ showModal('Guarda tus favoritos','Crea una cuenta para guardar propiedades y recibir avisos cuando bajen de precio.','Crear cuenta','Ahora no'); }
    }
    saveFavs();
    rerenderInPlace();
    return;
  }
  if(act){
    const a = act.dataset.action;
    if(a==='search'){
      syncPriceFromDOM();
      const el = document.getElementById('elevatorToggle');
      state.filters.elevator = el ? el.checked : false;
      router();
      document.querySelector('.grid')?.scrollIntoView({behavior:'smooth'});
      return;
    }
    else if(a==='clear'){ state.filters={beds:null,baths:null,park:null,priceMin:null,priceMax:null,floor:'any',elevator:false,zone:'all',features:new Set()}; state.featuresExpanded=false; rerenderInPlace(); return; }
    else if(a==='back'){ goBackToResults(); return; }
    else if(a==='toggleFeatures'){ syncPriceFromDOM(); state.featuresExpanded=!state.featuresExpanded; rerenderInPlace(); return; }
    else if(a==='viewMap'){
      const id = act.dataset.id;
      const l = LISTINGS.find(x=>x.id===id);
      const box = document.getElementById('detailMap');
      if(box){
        box.classList.toggle('open');
        if(box.classList.contains('open')) box.scrollIntoView({behavior:'smooth',block:'center'});
      }
      return;
    }
    else if(a==='contact'){ showModal('Contactar al propietario','Para enviar un mensaje necesitas una cuenta. Es rápido y gratis.','Crear cuenta','Ahora no'); return; }
  }
  if(nav){
    // If navigating into a listing from home, remember exactly where we were.
    if(nav.dataset.nav.startsWith('listing/') && (location.hash||'#/')==='#/'){
      state.homeScroll = window.scrollY;
    }
    navTo(nav.dataset.nav);
    return;
  }
  if(amenity){ amenity.classList.toggle('on'); return; }
  if(pill && pill.parentElement.dataset.filter){
    syncPriceFromDOM();
    const group = pill.parentElement;
    const key = group.dataset.filter;
    const val = pill.dataset.val;
    if(group.dataset.multi !== undefined){
      // multi-select (features): toggle membership in the Set
      if(state.filters.features.has(val)) state.filters.features.delete(val);
      else state.filters.features.add(val);
      rerenderInPlace();
      return;
    }
    if(key==='floor'){
      // "No importa" (any) clears the floor filter but stays visibly selected.
      if(val==='any'){ state.filters.floor='any'; }
      else if(String(state.filters.floor)===val){ state.filters.floor='any'; }
      else { state.filters.floor=val; }
      rerenderInPlace();
      return;
    }
    // single-select: toggle off if same
    if(String(state.filters[key])===val){ state.filters[key] = key==='zone'?'all':null; }
    else { state.filters[key]=val; }
    if(key==='zone'){
      // Zona is chosen down in the map — show the user their filtered results.
      router();
      requestAnimationFrame(()=>{
        // scroll to the "Disponibles ahora" results heading (first section-head)
        const head=document.querySelector('.section-head');
        (head||document.querySelector('.grid'))?.scrollIntoView({behavior:'smooth',block:'start'});
      });
    } else {
      rerenderInPlace();
    }
    return;
  }
});

// avatar / login
document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('avatarBtn')?.addEventListener('click', ()=>{
    if(!state.signedIn){ showModal('Bienvenido a Casalá','Entra o crea tu cuenta para guardar favoritos y contactar propietarios.','Crear cuenta','Iniciar sesión'); }
    else { navTo('favoritos'); }
  });
  document.getElementById('brandHome')?.addEventListener('click', ()=>{
    if((location.hash||'#/')==='#/'){ window.scrollTo({top:0,behavior:'smooth'}); }
    else { navTo(''); setTimeout(()=>window.scrollTo({top:0,behavior:'smooth'}),60); }
  });
  document.getElementById('navFavs')?.addEventListener('click', ()=>navTo('favoritos'));
  const goAbout = ()=>{
    if((location.hash||'#/')!=='#/'){ navTo(''); setTimeout(()=>document.getElementById('about')?.scrollIntoView({behavior:'smooth'}),120); }
    else document.getElementById('about')?.scrollIntoView({behavior:'smooth'});
  };
  document.getElementById('navAbout')?.addEventListener('click', goAbout);
  document.getElementById('footAbout')?.addEventListener('click', goAbout);

  // Back-to-top button: appears after scrolling down ~400px
  const btt = document.getElementById('backToTop');
  if(btt){
    const toggleBtt = ()=>{ if(window.scrollY > 400) btt.classList.add('show'); else btt.classList.remove('show'); };
    window.addEventListener('scroll', toggleBtt, {passive:true});
    btt.addEventListener('click', ()=>window.scrollTo({top:0,behavior:'smooth'}));
    toggleBtt();
  }

  window.addEventListener('hashchange', router);
  router();
});
