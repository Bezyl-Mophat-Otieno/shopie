const productContainer = document.querySelector(".productContainer");
const container = document.querySelector(".container");
const emptyCart = document.querySelector(".emptyCart");

window.onload = async () => {
  await fetchCart();
};

const fetchTotal = async () => {
  const products = JSON.parse(localStorage.getItem("cart")) || [];
  console.log(products);
  let total = 0;
  products.map((product) => {
    total += product.price * product.quantity;
  });
  container.innerHTML = `
  <div class="totalContainer">
  <div class="total">
  <h1 class="total-text">Total: KSH.${total}/=</h1>
  <button class="checkout-btn">CHECKOUT</button>
  </div>
  </div>`;
};

const fetchCart = async () => {
  let html = "";
  const products = JSON.parse(localStorage.getItem("cart")) || [];

  if (products.length > 0) {
    await fetchTotal();
    products.map((product) => {
      html += `
              <div class="product" id=${product.id} >
              <img
                src=${product.image}
                alt=""
                class="product-img"
              />
              <div class="product-name">${product.name}</div>
              <div class="product-desc">
              ${product.description}

              </div>
              <div class="price">KSH.${product.price}/=</div>
              <div class="quntity">${product.quantity}<small>pieces</small></div>
              <button class="remove-btn">REMOVE FROM CART</button>
            </div>
              `;
    });
    productContainer.innerHTML = html;
  } else {
    emptyCart.innerHTML = `<img
    src="https://cdn.dribbble.com/users/887568/screenshots/3172047/media/725fca9f20d010f19b3cd5411c50a652.gif"
    alt=""
  />`;
  }
};

productContainer.addEventListener("click", async (e) => {
  if (e.target.classList.contains("remove-btn")) {
    const products = JSON.parse(localStorage.getItem("cart")) || [];
    const productId = e.target.parentElement.getAttribute("id");
    const newProducts = products.filter((product) => product.id !== productId);
    console.log(newProducts);
    localStorage.setItem("cart", JSON.stringify(newProducts));
    await fetchCart();
    if (newProducts.length === 0) {
      window.location.reload();
    }
  }
});
