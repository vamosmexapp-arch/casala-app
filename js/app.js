/* ============================================================
   Casalá — app logic (vanilla JS SPA router)
   - Hash-based routing: #/ , #/listing/p3 , #/favoritos
   - Back button works because we use history + hashchange
   - State (filters, favorites) lives in memory + localStorage
   ============================================================ */

// ---------- tiny state ----------
const state = {
  filters: { beds:null, baths:null, park:null, priceMin:null, priceMax:null, floor:"any", elevator:false, zone:"all", features:new Set() },
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
    <p class="sub">Rentar hecho fácil. Sin lag, sin saturación, sin anuncios inútiles — solo el lugar donde vas a vivir.</p>
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
          ${['Pet friendly','Amueblado','Remodelado','En coto','Premium','Terraza / balcón','Roof garden','Alberca','Gimnasio','Vigilancia 24/7','Cocina integral','Patio / jardín','Bodega','Internet incluido'].map(f=>`<button class="pill ${state.filters.features.has(f)?'active':''}" data-val="${f}">${f}</button>`).join('')}
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
        <div class="detail-loc">${ICON.pin} ${l.zone}, ${l.city}, Jalisco</div>
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
function updateNav(){
  const av = document.getElementById('avatarBtn');
  if(av) av.querySelector('span').textContent = state.signedIn ? 'Mi cuenta' : 'Entrar';
}

// Sync the price input fields into state. Called before any re-render so typed
// values survive (Bug fix: picking a Planta pill used to wipe the typed price).
function syncPriceFromDOM(){
  const mn = document.getElementById('priceMin');
  const mx = document.getElementById('priceMax');
  if(mn) state.filters.priceMin = mn.value ? parseInt(mn.value.replace(/\D/g,'')) || null : null;
  if(mx) state.filters.priceMax = mx.value ? parseInt(mx.value.replace(/\D/g,'')) || null : null;
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
    router(); // re-render current view
    return;
  }
  if(nav){ navTo(nav.dataset.nav); return; }
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
      router();
      return;
    }
    // single-select: toggle off if same
    if(key==='floor'){
      // "No importa" (any) clears the floor filter but stays visibly selected.
      // Clicking the already-active floor returns to "No importa".
      if(val==='any'){ state.filters.floor='any'; }
      else if(String(state.filters.floor)===val){ state.filters.floor='any'; }
      else { state.filters.floor=val; }
      router();
      return;
    }
    if(String(state.filters[key])===val){ state.filters[key] = key==='zone'?'all':null; }
    else {
      if(key==='zone'){ state.filters[key]=val; }
      else { state.filters[key]=val; }
    }
    router();
    return;
  }
  if(act){
    const a = act.dataset.action;
    if(a==='search'){
      const mn = document.getElementById('priceMin'), mx = document.getElementById('priceMax');
      state.filters.priceMin = mn && mn.value ? parseInt(mn.value.replace(/\D/g,'')) : null;
      state.filters.priceMax = mx && mx.value ? parseInt(mx.value.replace(/\D/g,'')) : null;
      const el = document.getElementById('elevatorToggle');
      state.filters.elevator = el ? el.checked : false;
      router();
      document.querySelector('.grid')?.scrollIntoView({behavior:'smooth'});
    }
    else if(a==='clear'){ state.filters={beds:null,baths:null,park:null,priceMin:null,priceMax:null,floor:'any',elevator:false,zone:'all',features:new Set()}; router(); }
    else if(a==='back'){ history.back(); }
    else if(a==='contact'){ showModal('Contactar al propietario','Para enviar un mensaje necesitas una cuenta. Es rápido y gratis.','Crear cuenta','Ahora no'); }
  }
});

// avatar / login
document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('avatarBtn')?.addEventListener('click', ()=>{
    if(!state.signedIn){ showModal('Bienvenido a Casalá','Entra o crea tu cuenta para guardar favoritos y contactar propietarios.','Crear cuenta','Iniciar sesión'); }
    else { navTo('favoritos'); }
  });
  document.getElementById('brandHome')?.addEventListener('click', ()=>navTo(''));
  document.getElementById('navFavs')?.addEventListener('click', ()=>navTo('favoritos'));
  const goAbout = ()=>{
    if((location.hash||'#/')!=='#/'){ navTo(''); setTimeout(()=>document.getElementById('about')?.scrollIntoView({behavior:'smooth'}),120); }
    else document.getElementById('about')?.scrollIntoView({behavior:'smooth'});
  };
  document.getElementById('navAbout')?.addEventListener('click', goAbout);
  document.getElementById('footAbout')?.addEventListener('click', goAbout);
  window.addEventListener('hashchange', router);
  router();
});
