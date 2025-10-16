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

  // ===== Simple hash-router (no cross-section scrolling) =====
  const routes = Array.from(document.querySelectorAll('.route'));
  const brandEl = document.querySelector('.brand');

  function setRoute(){
    let hash = location.hash || '#home';
    if (!document.querySelector(hash)) hash = '#home';
    routes.forEach(el => el.classList.remove('active'));
    const active = document.querySelector(hash);
    if (active) active.classList.add('active');

    // brand visibility: hidden on home, visible elsewhere
    const onHome = (hash === '#home');
    // lock scroll on home, enable scroll on other pages
    document.body.style.overflow = onHome ? 'hidden' : 'auto';
    brandEl.style.opacity = onHome ? 0 : 1;
    brandEl.style.pointerEvents = onHome ? 'none' : 'auto';

    // keep viewport fixed
    window.scrollTo(0,0);
  }

  setRoute();
  window.addEventListener('hashchange', setRoute);

  // Ensure nav and hero buttons just change hash (no scrolling)
  document.querySelectorAll('.menu a, .actions a').forEach(a => {
    a.addEventListener('click', (e)=>{
      const target = a.getAttribute('href');
      if (target && target.startsWith('#')) {
        e.preventDefault();
        location.hash = target;
      }
    });
  });
});