const main = document.querySelector(".main");
const searchBar = document.querySelector(".search-bar");
let products = [];
window.onload = async () => {
  await fetchProducts();
  // await fetchNavbar();
};

// const fetchNavbar = async () => {
//   fetch("../navbar/navbar.html")
//     .then((res) => {
window.onload = async () => {
  await fetchProducts();
  // await fetchNavbar();
};

// const fetchNavbar = async () => {
//   fetch("../navbar/navbar.html")
//     .then((res) => {
//       return res.text();
//     })
//     .then((html) => {
//       console.log(html);
//     })
//     .catch((error) => {
//       console.log("Error fetching the navbar", error);
//     });
// };

searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();
  search(searchString);
});

// A function to search for products
const search = (searchString) => {
  const filteredProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(searchString) ||
      product.description.toLowerCase().includes(searchString)
    );
  });
  displayProducts({ products: filteredProducts, status: "success" });
  if (filteredProducts.length == 0) {
    productContainer.innerHTML = `<h2 style="text-align: center;">No products found</h2>`;
  }
  if (searchString == "") {
    fetchProducts();
  }
};

const productContainer = document.querySelector(".my-shop-products");

const fetchProducts = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/v1/products");
    const object = await res.json();
    console.log(object);

    displayProducts(object);
  } catch (error) {
    console.log(error);
    alerts.innerHTML = error.message;
  }
};

const displayProducts = async (object) => {
  let html = "";
  if (object.status == "success") {
    products = object.products;
    products.map((product) => {
      html += `
      <div class="product" id=${product.id}>
      <img
        src=${product.image}
        alt=""
        class="product-img"
      />
      <div class="product-name">${product.name}</div>
      <div class="product-desc">
          ${product.description}
      </div>
      <div class="details">
        <div class="price">KSH. ${product.price} /=</div>
        <div class="quntity">${product.quantity} <small>pieces</small></div>
      </div>
      <button class="action-btn">Add Cart</button>
    </div>
        `;
    });
    productContainer.innerHTML = html;
  }
};

// adding to cart
productContainer.addEventListener("click", async (e) => {
  if (e.target.classList.contains("action-btn")) {
    const productId = e.target.parentElement.id;
    const res = await fetch(
      `http://localhost:5000/api/v1/products/${productId}`
    );
    const object = await res.json();
    console.log(object);
    if (object.status == "success") {
      const product = object.product;
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      console.log(cart);
      const productInCart = cart.find((item) => item.id == product.id);
      if (productInCart) {
        productInCart.quantity++;
      } else {
        product.quantity = 1;
        cart.push(product);
      }
      localStorage.setItem("cart", JSON.stringify(cart));

      window.location.href =
        "http://127.0.0.1:5500/frontend/user-dashboard/cart/index.html";
    }
  }

  // clicking the image to view the product
  if (e.target.classList.contains("product-img")) {
    const productId = e.target.parentElement.id;
    window.location.href = `http://127.0.0.1:5500/frontend/user-dashboard/single-product/index.html?id=${productId}`;
  }
});
