
// Active link highlighting
const links = document.querySelectorAll('.nav a');
const onScroll = () => {
  const scrollPos = window.scrollY + 100;
  links.forEach(a => {
    const id = a.getAttribute('href').replace('#','');
    const sec = document.getElementById(id);
    if(!sec) return;
    const top = sec.offsetTop, bottom = top + sec.offsetHeight;
    a.classList.toggle('active', scrollPos >= top && scrollPos < bottom);
  });
};
document.addEventListener('scroll', onScroll);
onScroll();
