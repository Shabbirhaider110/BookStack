const list = document.getElementById("catalog-list");
const search = document.getElementById("search");
const categorySel = document.getElementById("category");
const BOOKS_DATA = BOOKS;
(function () {
  const cats = Array.from(new Set(BOOKS_DATA.map((b) => b.category))).sort();
  cats.forEach((c) => {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    category.appendChild(opt);
  });
})();
function renderCatalog() {
  list.innerHTML = "";
  const q = (search.value || "").toLowerCase();
  const cat = categorySel.value;
  BOOKS_DATA.filter((b) => !cat || b.category === cat)
    .filter(
      (b) =>
        b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)
    )
    .forEach((b) => {
      const card = document.createElement("div");
      card.className = "card book-card pop-in";
      card.innerHTML = `${coverHTML(
        b
      )}<div class="card-body"><strong class="book-title">${
        b.title
      }</strong><div class="book-meta">${b.author} • ${
        b.category
      }</div><div class="row between"><span class="price">$${b.price.toFixed(
        2
      )}</span><button class="btn sm">Add to Cart</button></div></div>`;
      card.querySelector("button").onclick = () => addToCart(b);
      list.appendChild(card);
    });
  setTimeout(() => window.dispatchEvent(new Event("scroll")), 10);
}
renderCatalog();
search.oninput = renderCatalog;
categorySel.onchange = renderCatalog;
