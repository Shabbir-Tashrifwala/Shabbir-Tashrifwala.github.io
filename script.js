
document.addEventListener('DOMContentLoaded', function(){
  // ===== Code Rain (Matrix-style) Canvas Background =====
  const canvas = document.getElementById('code-rain');
  const ctx = canvas.getContext('2d');
  let w, h, columns, drops, fontSize;

  function initCanvas() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = Math.max(window.innerHeight * 0.86, 500);
    fontSize = 14;
    columns = Math.floor(w / fontSize);
    drops = Array.from({ length: columns }, () => Math.floor(Math.random() * -50));
  }
  initCanvas();
  window.addEventListener('resize', initCanvas);

  const glyphs = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロゴゾドボポ0123456789<>[]{}$#@*&/\\=+-';
  function draw() {
    ctx.fillStyle = 'rgba(11,11,12,0.10)';
    ctx.fillRect(0, 0, w, h);
    ctx.font = `${fontSize}px monospace`;
    for (let i = 0; i < drops.length; i++) {
      const text = glyphs[Math.floor(Math.random() * glyphs.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;
      ctx.fillStyle = 'rgba(42, 157, 143, 0.85)';
      ctx.fillText(text, x, y);
      drops[i]++;
      if (y > h && Math.random() > 0.975) drops[i] = Math.floor(Math.random() * -50);
    }
    requestAnimationFrame(draw);
  }
  draw();

  // ===== Router (no cross-section scrolling) =====
  const routes = Array.from(document.querySelectorAll('.route'));
  const brandEl = document.querySelector('.brand');
  function setRoute(){
    let hash = location.hash || '#home';
    if (!document.querySelector(hash)) hash = '#home';
    routes.forEach(el => el.classList.remove('active'));
    const active = document.querySelector(hash);
    if (active) active.classList.add('active');
    const onHome = (hash === '#home');
    document.body.style.overflow = onHome ? 'hidden' : 'auto';
    brandEl.style.opacity = onHome ? 0 : 1;
    brandEl.style.pointerEvents = onHome ? 'none' : 'auto';
    window.scrollTo(0,0);
  }
  setRoute();
  window.addEventListener('hashchange', setRoute);

  // ===== Nav & CTA buttons --> hash =====
  document.querySelectorAll('.menu a, .actions a').forEach(a => {
    a.addEventListener('click', (e)=>{
      const target = a.getAttribute('href');
      if (target && target.startsWith('#')) {
        e.preventDefault();
        location.hash = target;
      }
    });
  });

  // ===== Contact form submission =====
  const form = document.getElementById('contact-form');
  const statusMessage = document.getElementById('contact-form-status');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (statusMessage) {
        statusMessage.textContent = 'Sending…';
        statusMessage.classList.remove('error', 'success');
      }
      try {
        const response = await fetch(form.action, {
          method: form.method || 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' },
        });
        if (response.ok) {
          form.reset();
          if (statusMessage) {
            statusMessage.textContent = 'Thanks! Your message has been sent.';
            statusMessage.classList.add('success');
          }
        } else {
          let errorMessage = 'Oops! There was a problem submitting your form.';
          try {
            const data = await response.json();
            if (data?.errors && Array.isArray(data.errors)) {
              errorMessage = data.errors.map((error) => error.message).join(', ');
            }
          } catch (_) {
            // ignore JSON parse errors and keep default message
          }
          if (statusMessage) {
            statusMessage.textContent = errorMessage;
            statusMessage.classList.add('error');
          }
        }
      } catch (err) {
        if (statusMessage) {
          statusMessage.textContent = 'Unable to send message right now. Please try again later.';
          statusMessage.classList.add('error');
        }
      }
    });
  }
  document.getElementById('year').textContent = new Date().getFullYear();

  // ===== Auto-list Projects & Blogs =====
  const cfg = safeParseJSON(document.getElementById('site-config')?.textContent) || {};
  const isPages = location.hostname.endsWith('github.io');
  const repo = cfg.repo;
  const branch = cfg.branch || 'main';
  const useAPI = !!cfg.use_api;
  const useFallback = cfg.fallback_to_manifest !== false;

  function safeParseJSON(txt){
    try { return JSON.parse(txt || '{}'); } catch(e){ return {}; }
  }

  async function listFromGitHub(folder){
    const api = `https://api.github.com/repos/${repo}/contents/${folder}?ref=${branch}`;
    const res = await fetch(api, { headers: { 'Accept':'application/vnd.github+json' } });
    if (!res.ok) throw new Error('GitHub API listing failed: ' + res.status);
    const items = await res.json();
    return items.filter(x => x.type === 'file' && x.name.endsWith('.html')).map(x => x.name);
  }
  async function listFromManifest(folder){
    try {
      const mf = await fetch(`${folder}/manifest.json`, {cache:'no-store'}).then(r=>r.json());
      return (mf||[]).map(x => x.file).filter(Boolean);
    } catch { return []; }
  }
  async function listFiles(folder){
    if (isPages && useAPI && repo && repo !== 'YOUR_GITHUB_USERNAME/YOUR_REPO_NAME'){
      try { return await listFromGitHub(folder); } catch(e){ if (useFallback) return await listFromManifest(folder); else throw e; }
    }
    return await listFromManifest(folder);
  }

  async function extractMeta(folder, file){
    const url = `${folder}/${file}`;
    const html = await fetch(url, {cache:'no-store'}).then(r=>r.text());
    const title = (html.match(/<title>(.*?)<\/title>/i)||[])[1] || file.replace(/[-_]/g,' ').replace(/\.html$/i,'');
    const desc = (html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)/i)||[])[1] || '';
    const date = (html.match(/<meta[^>]+name=["']date["'][^>]+content=["']([^"']+)/i)||[])[1] || '';
    return { title, desc, date, href: url };
  }

  function makeCard(m){
    const a = document.createElement('article');
    a.className = 'card';
    a.innerHTML = `<h3>${m.title}</h3><p>${m.desc}</p><div class="meta">${m.date}</div>`;
    a.addEventListener('click', ()=> window.open(m.href, '_self'));
    a.style.cursor = 'pointer';
    return a;
  }

  async function renderCollection(folder, targetId){
    const target = document.getElementById(targetId);
    if (!target) return;
    target.innerHTML = `<div class="card" style="grid-column: span 12;"><p class="muted">Loading ${folder}…</p></div>`;
    try {
      const files = await listFiles(folder);
      const metas = await Promise.all(files.map(f => extractMeta(folder, f)));
      metas.sort((a,b)=> (new Date(b.date||0)) - (new Date(a.date||0)));
      target.innerHTML = '';
      metas.forEach(m => target.appendChild(makeCard(m)));
      if (metas.length === 0){
        if (folder === 'blogs') {
          target.innerHTML = `<div class="card marquee-card" style="grid-column: span 12;"><div class="marquee muted"><span>Blogs coming soon</span></div></div>`;
        } else {
          target.innerHTML = `<div class="card" style="grid-column: span 12;"><p class="muted">No ${folder} yet. Add HTML files to <code>/${folder}</code>.</p></div>`;
        }
      }
    } catch (e) {
      console.error(e);
      target.innerHTML = `<div class="card" style="grid-column: span 12;"><p class="muted">Couldn't load ${folder}. Check <code>site.config.json</code> or add <code>${folder}/manifest.json</code>.</p></div>`;
    }
  }

  renderCollection('projects', 'projects-list');
  renderCollection('blogs', 'blogs-list');
});
