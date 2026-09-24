const products = {
  1: { name: "خودکار خرگوشی کیوت", price: 89000, emoji: "🐰" },
  2: { name: "دفتر پلنر پاستلی", price: 189000, emoji: "📔" },
  3: { name: "پک استیکر فانتزی", price: 79000, emoji: "🌷" },
  4: { name: "پک هدیه SORORUW", price: 329000, emoji: "🎀" }
};

let cart = JSON.parse(localStorage.getItem("sororuw-cart") || "[]");

function saveCart() {
  localStorage.setItem("sororuw-cart", JSON.stringify(cart));
  renderCart();
}

function addToCart(id) {
  cart.push(id);
  saveCart();
  toggleCart(true);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
}

function formatPrice(n) {
  return new Intl.NumberFormat("fa-IR").format(n) + " تومان";
}

function renderCart() {
  const box = document.getElementById("cartItems");
  const count = document.getElementById("cartCount");
  const total = document.getElementById("cartTotal");

  count.textContent = new Intl.NumberFormat("fa-IR").format(cart.length);

  if (!cart.length) {
    box.innerHTML =
      '<div style="text-align:center;padding:50px 10px;color:#806b62">سبدت هنوز خالیه ♡<br>یه چیز کوچولو انتخاب کن!</div>';
    total.textContent = "۰ تومان";
    return;
  }

  let sum = 0;

  box.innerHTML = cart.map((id, i) => {
    const p = products[id];
    sum += p.price;

    return `
      <div class="cart-row">
        <div class="mini">${p.emoji}</div>
        <div>
          <strong>${p.name}</strong><br>
          <small>${formatPrice(p.price)}</small>
        </div>
        <button onclick="removeFromCart(${i})">حذف</button>
      </div>
    `;
  }).join("");

  total.textContent = formatPrice(sum);
}

function toggleCart(force) {
  const drawer = document.getElementById("drawer");
  const overlay = document.getElementById("overlay");

  const open =
    force === true ? true : !drawer.classList.contains("open");

  drawer.classList.toggle("open", open);
  overlay.classList.toggle("open", open);
}

function checkout() {
  if (!cart.length) {
    alert("سبد خرید خالیه ♡");
    return;
  }

  alert(
    "برای فعال‌سازی پرداخت آنلاین، باید درگاه پرداخت و ثبت سفارش به سایت متصل شود."
  );
}

renderCart();
