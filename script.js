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

  // ===== Placeholder contact form =====
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thanks! This is a placeholder form. Connect to Formspree/Netlify to receive messages.');
    });
  }
  document.getElementById('year').textContent = new Date().getFullYear();

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
  document.querySelectorAll('.menu a, .actions a').forEach(a => {
    a.addEventListener('click', (e)=>{
      const target = a.getAttribute('href');
      if (target && target.startsWith('#')) {
        e.preventDefault();
        location.hash = target;
      }
    });
  });

  // ===== Auto-list Projects & Blogs =====
  const cfg = JSON.parse(document.getElementById('site-config').textContent);
  const isPages = location.hostname.endsWith('github.io');
  const repo = cfg.repo; const branch = cfg.branch || 'main';

  async function listDir(folder){
    // Github API listing if on Pages and repo configured
    if (isPages && repo && repo !== 'YOUR_GITHUB_USERNAME/YOUR_REPO_NAME') {
      const api = `https://api.github.com/repos/${repo}/contents/${folder}?ref=${branch}`;
      const res = await fetch(api);
      if (!res.ok) throw new Error('GitHub API listing failed: ' + res.status);
      const items = await res.json();
      // only html files
      return items.filter(x => x.type === 'file' && x.name.endsWith('.html')).map(x => x.name);
    }
    // Fallback to manifest (for local preview)
    const mf = await fetch(`${folder}/manifest.json`).then(r=>r.json()).catch(()=>[]);
    return (mf||[]).map(x => x.file).filter(n => n && n.endsWith('.html'));
  }

  async function extractMeta(folder, file){
    // fetch raw file (works on Pages via same origin; fallback to raw GH for API mode)
    let url = `${folder}/${file}`;
    // When using API mode, file also exists via Pages path.
    const html = await fetch(url).then(r=>r.text());
    const title = (html.match(/<title>(.*?)<\\/title>/i)||[])[1] || file.replace(/[-_]/g,' ').replace(/\\.html$/i,'');
    const desc = (html.match(/<meta[^>]+name=[\"']description[\"'][^>]+content=[\"']([^\"']+)/i)||[])[1] || '';
    const date = (html.match(/<meta[^>]+name=[\"']date[\"'][^>]+content=[\"']([^\"']+)/i)||[])[1] || '';
    return { title, desc, date, href: `${folder}/${file}` };
  }

  function card({title, desc, date, href}){
    const a = document.createElement('article');
    a.className = 'card';
    a.innerHTML = `<h3>${title}</h3><p>${desc}</p><div class="meta">${date}</div>`;
    a.addEventListener('click', ()=> window.open(href, '_self'));
    a.style.cursor = 'pointer';
    return a;
  }

  async function renderCollection(folder, targetId){
    const target = document.getElementById(targetId);
    if (!target) return;
    target.innerHTML = '<div class="card" style="grid-column: span 12;"><p class="muted">Loading…</p></div>';
    try {
      const files = await listDir(folder);
      const metas = await Promise.all(files.map(f => extractMeta(folder, f)));
      // sort by date desc if present
      metas.sort((a,b)=> (new Date(b.date||0)) - (new Date(a.date||0)));
      target.innerHTML = '';
      metas.forEach(m => target.appendChild(card(m)));
    } catch (e) {
      target.innerHTML = `<div class="card" style="grid-column: span 12;"><p class="muted">Couldn't load ${folder}. Add files to <code>/${folder}</code> or configure <code>site.config.json</code>.</p></div>`;
      console.error(e);
    }
  }

  renderCollection('projects', 'projects-list');
  renderCollection('blogs', 'blogs-list');
});