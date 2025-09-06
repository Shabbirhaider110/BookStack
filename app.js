// Footer year
document.querySelectorAll('#year').forEach(n=> n.textContent = new Date().getFullYear());

// Scroll reveal for reveal + pop-in
function onScrollReveal(){
  document.querySelectorAll('.reveal, .pop-in, .animate-text, .animate-fade, .animate-buttons').forEach(el=>{
    const r = el.getBoundingClientRect();
    if(r.top < window.innerHeight - 60) el.classList.add('visible');
  });
}
onScrollReveal();
window.addEventListener('scroll', onScrollReveal);

// Cart storage + toast
function getCart(){ return JSON.parse(localStorage.getItem('cart') || '[]'); }
function saveCart(c){ localStorage.setItem('cart', JSON.stringify(c)); }
function addToCart(book){
  const cart = getCart();
  const found = cart.find(i=> i.id === book.id);
  if(found) found.qty += 1; else cart.push({...book, qty:1});
  saveCart(cart);
  const t = document.createElement('div'); t.className='toast'; t.textContent = `Added “${book.title}” to cart`; document.body.appendChild(t);
  setTimeout(()=> t.classList.add('show'),10); setTimeout(()=> t.remove(),2200);
}
// Toast CSS
const _s = document.createElement('style'); _s.textContent = `.toast{position:fixed;left:50%;bottom:20px;transform:translateX(-50%) translateY(20px);background:#0b3b77;color:#fff;padding:10px 14px;border-radius:10px;opacity:0;transition:all .25s;box-shadow:0 10px 18px rgba(0,0,0,.2);z-index:1000}.toast.show{opacity:1;transform:translateX(-50%) translateY(0)}`; document.head.appendChild(_s);

// Cover HTML (use local image if set)
function coverHTML(b){
  if(b.image && b.image.indexOf('data:')!==0) return `<div class="book-cover"><img src="${b.image}" alt="${b.title} cover"/></div>`;
  const letter = b.title?.[0] || 'B';
  return `<div class="book-cover" style="height:360px;display:grid;place-items:center;font-size:64px;font-weight:800;color:#0b3b77;background:linear-gradient(135deg,#d9ecff,#eaf3ff)">${letter}</div>`;
}

// 3D tilt subtle on mousemove for book cards
let mouseActive = false;
document.addEventListener('mousemove', e=>{
  mouseActive = true;
  document.querySelectorAll('.book-card').forEach(card=>{
    const r = card.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width/2);
    const y = e.clientY - (r.top + r.height/2);
    card.style.transform = `perspective(700px) rotateX(${y/40}deg) rotateY(${x/-40}deg) scale(1.02)`;
  });
});
document.addEventListener('mouseleave', ()=>{
  if(!mouseActive) return;
  document.querySelectorAll('.book-card').forEach(c=> c.style.transform = '');
});