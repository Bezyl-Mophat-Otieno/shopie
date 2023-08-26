const productContainer = document.querySelector(".productContainer");
const container = document.querySelector(".container");
const emptyCart = document.querySelector(".emptyCart");
const profile = document.querySelector(".profile");
const logout = document.querySelector(".logout");
window.onload = async () => {
  const token = localStorage.getItem("token");
  console.log(typeof token);
  if (token == null || token == "") {
    window.location.href =
      "http://127.0.0.1:5500/frontend/authentication-page/login/index.html";
  }
  await fetchCart();
  const username = localStorage.getItem("loggedUser");
  if (username !== null && username !== "") {
    profile.innerHTML = user.username;
  }
};

logout.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.reload();
});

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

container.addEventListener("click", async (e) => {
  // get the products from the local storage
  const products = JSON.parse(localStorage.getItem("cart"));

  try {
    products.map(async (product) => {
      const requestBody = {
        user_id: localStorage.getItem("user_id"),
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        total: product.price * product.quantity,
      };
      const res = await fetch("http://localhost:5000/api/v1/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      const data = await res.json();
      // clear local storage
      localStorage.removeItem("cart");
      window.location.reload();
    });
  } catch (error) {
    console.log(error);
  }
});
