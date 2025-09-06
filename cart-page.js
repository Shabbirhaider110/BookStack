const tbody = document.getElementById("cart-body");
const totalEl = document.getElementById("cart-total");
const countEl = document.getElementById("cart-count");
function renderCart(){
  const cart = getCart();
  tbody.innerHTML='';
  countEl.textContent = cart.length ? `${cart.length} item(s)` : "Empty";
  let total = 0;
  cart.forEach(item=>{
    const sub = item.price * item.qty; total += sub;
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${item.title}</td><td>$${item.price.toFixed(2)}</td><td><div class="row"><button class="btn sm outline" data-act="dec">−</button><input class="input qty" type="number" min="1" value="${item.qty}" style="width:80px"/><button class="btn sm outline" data-act="inc">+</button></div></td><td>$${sub.toFixed(2)}</td><td><button class="btn outline" data-act="remove">Remove</button></td>`;
    const qtyInput = tr.querySelector('.qty');
    tr.querySelector('[data-act="inc"]').onclick = ()=> { item.qty++; qtyInput.value=item.qty; saveCart(cart); renderCart(); };
    tr.querySelector('[data-act="dec"]').onclick = ()=> { if(item.qty>1){ item.qty--; qtyInput.value=item.qty; saveCart(cart); renderCart(); } };
    qtyInput.onchange = ()=> { const val = Math.max(1, parseInt(qtyInput.value||'1',10)); item.qty = val; saveCart(cart); renderCart(); };
    tr.querySelector('[data-act="remove"]').onclick = ()=> { const filtered = cart.filter(x=>x.id!==item.id); saveCart(filtered); renderCart(); };
    tbody.appendChild(tr);
  });
  totalEl.textContent = "$" + total.toFixed(2);
}
renderCart();