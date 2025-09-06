const form = document.getElementById("checkout-form");
const summary = document.getElementById("order-summary");
form.onsubmit = (e)=>{
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  const cart = getCart();
  if(cart.length===0){ summary.classList.remove('hidden'); summary.innerHTML = `<h3>Cart is empty</h3><p>Please add some books first.</p>`; return; }
  const total = cart.reduce((s,i)=> s + i.price*i.qty, 0);
  summary.classList.remove('hidden');
  summary.innerHTML = `<h3>Thanks, ${data.name}!</h3><p>We've sent a confirmation to <strong>${data.email}</strong>.</p><p><strong>Order Total:</strong> $${total.toFixed(2)}</p>`;
  saveCart([]); form.reset();
};