const products = [
  {
    id: 1,
    name: "Product 1",
    price: 20,
    image: "https://placehold.co/600x400/FF5733/FFF?text=~",
  },
  {
    id: 2,
    name: "Product 2",
    price: 30,
    image: "https://placehold.co/600x400/33FF57/EEE?text=~",
  },
  {
    id: 3,
    name: "Product 3",
    price: 25,
    image: "https://placehold.co/600x400/FF33E6/DDD?text=~",
  },
  {
    id: 4,
    name: "Product 4",
    price: 15,
    image: "https://placehold.co/600x400/FFBD33/CCC?text=~",
  },
  {
    id: 5,
    name: "Product 5",
    price: 40,
    image: "https://placehold.co/600x400/334DFF/BBB?text=~",
  },
  {
    id: 6,
    name: "Product 6",
    price: 22,
    image: "https://placehold.co/600x400/FF3333/AAA?text=~",
  },
  {
    id: 7,
    name: "Product 7",
    price: 18,
    image: "https://placehold.co/600x400/FF5733/999?text=~",
  },
  {
    id: 8,
    name: "Product 8",
    price: 35,
    image: "https://placehold.co/600x400/33FF57/888?text=~",
  },
  {
    id: 9,
    name: "Product 9",
    price: 28,
    image: "https://placehold.co/600x400/FF33E6/777?text=~",
  },
  {
    id: 10,
    name: "Product 10",
    price: 33,
    image: "https://placehold.co/600x400/FFBD33/666?text=~",
  },
  {
    id: 11,
    name: "Product 11",
    price: 26,
    image: "https://placehold.co/600x400/334DFF/555?text=~",
  },
  {
    id: 12,
    name: "Product 12",
    price: 21,
    image: "https://placehold.co/600x400/FF3333/444?text=~",
  },
];

// Function to get or initialize cart data from local storage
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// Function to update cart data in local storage
function updateCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Function to update the cart count in real-time
function updateCartCount() {
  const cartCountElement = document.getElementById("cart-count");
  if (cartCountElement) {
    const cart = getCart();
    const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartCountElement.textContent = totalCount;
  }
}

function updateProductCount(productId) {
  const productCountElement = document.getElementById(
    `product-count-${productId}`
  );
  const cart = getCart();
  const productInCart = cart.find((item) => item.id === productId);
  const quantityInCart = productInCart ? productInCart.quantity : 0;
  productCountElement.textContent = `Quantity in Cart: ${quantityInCart}`;
}

// ... (previous code)

// ... (previous code)

// ... (previous code)

function displayProducts() {
  const productListContainer = document.getElementById("product-list");
  productListContainer.innerHTML = "";

  const cart = getCart();
  const cartTotalCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Display Products Listing and Cart Total Count button
  const productsListingContainer = document.createElement("div");
  productsListingContainer.classList.add("products-listing-container");

  const productsListingHeading = document.createElement("h1");
  productsListingHeading.textContent = "Products Listing";

  const cartTotalButton = document.createElement("button");
  cartTotalButton.id = "cart-total-button";
  cartTotalButton.textContent = `Cart: ${cartTotalCount}`;
  cartTotalButton.addEventListener("click", redirectToCart);

  // Style the button
  cartTotalButton.style.backgroundColor = "#3498db";
  cartTotalButton.style.color = "#fff";
  cartTotalButton.style.padding = "10px";
  cartTotalButton.style.border = "none";
  cartTotalButton.style.cursor = "pointer";

  //   // Append the elements to the container
  //   productsListingContainer.appendChild(productsListingHeading);
  //   productsListingContainer.appendChild(cartTotalButton);
  //   productListContainer.appendChild(productsListingContainer);

  // Display products
  products.slice(0, 12).forEach((product) => {
    const productInCart = cart.find((item) => item.id === product.id);
    const quantityInCart = productInCart ? productInCart.quantity : 0;

    const productElement = document.createElement("div");
    productElement.classList.add("product");
    productElement.innerHTML = `
                <h3>${product.name}</h3>
                <img src="${product.image}" alt="${product.name}">
                <p>Price: $${product.price}</p>
                <p id="product-count-${product.id}">Quantity in Cart: ${quantityInCart}</p>
                <button onclick="buyNow(${product.id})">Buy Now</button>
                <button onclick="addToCartAndUpdateCount(${product.id})">Add to Cart</button>
            `;
    productListContainer.appendChild(productElement);
  });

  // Update the cart count
  updateCartCount();
}

function addToCartAndUpdateCount(productId) {
  const cart = getCart();
  const existingProductIndex = cart.findIndex((item) => item.id === productId);

  if (existingProductIndex !== -1) {
    // Product already in cart, update quantity
    cart[existingProductIndex].quantity++;
  } else {
    // Product not in cart, add it
    cart.push({ id: productId, quantity: 1 });
  }

  updateCart(cart);
  // Update the cart count
  updateCartCount();
  // Update the cart total count button
  const cartTotalButton = document.getElementById("cart-total-button");
  cartTotalButton.textContent = `Cart: ${cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  )}`;
}

function buyNow(productId) {
  const cart = [{ id: productId, quantity: 1 }]; // Only the selected product in the cart
  updateCart(cart);
  window.location.href = "cart.html";
}

function addToCartAndUpdateCount(productId) {
  const cart = getCart();
  const existingProductIndex = cart.findIndex((item) => item.id === productId);

  if (existingProductIndex !== -1) {
    // Product already in cart, update quantity
    cart[existingProductIndex].quantity++;
  } else {
    // Product not in cart, add it
    cart.push({ id: productId, quantity: 1 });
  }

  updateCart(cart);
  // Update the cart count
  updateCartCount();
  // Update the product count for the specific product
  updateProductCount(productId);
}

displayProducts();

//

// Function to redirect to the cart page
function redirectToCart() {
  window.location.href = "cart.html";
}
// Function to display items in the cart
function displayCart() {
  const cartListContainer = document.getElementById("cart-list");
  cartListContainer.innerHTML = "";

  const cart = getCart();
  let totalPrice = 0;

  cart.forEach((cartItem) => {
    const product = products.find((product) => product.id === cartItem.id);

    if (product) {
      const cartItemElement = document.createElement("div");
      cartItemElement.classList.add("cart-item");
      cartItemElement.innerHTML = `
                  <img src="${product.image}" alt="${product.name}">
                  <div class="cart-item-info">
                      <p>${product.name}</p>
                      <p>Price: $${product.price} x Quantity: ${
        cartItem.quantity
      } = Total: $${product.price * cartItem.quantity}</p>
      <button onclick="deleteProductFromCart(${
        product.id
      })">Delete from Cart</button>
                  </div>
              `;
      cartListContainer.appendChild(cartItemElement);

      totalPrice += product.price * cartItem.quantity;
    }
  });

  // Add total price at the bottom of the cart page
  const totalElement = document.createElement("div");
  totalElement.innerHTML = `<p>Total Price: $${totalPrice}</p>`;
  cartListContainer.appendChild(totalElement);
}
function deleteProductFromCart(productId) {
  const cart = getCart();
  const updatedCart = cart.filter((item) => item.id !== productId);
  updateCart(updatedCart);
  displayCart();
  updateCartCount();
}

function checkout() {
  // Perform any additional checkout logic if needed
  // Reset the cart after checkout
  updateCart([]);
  displayCart();
  updateCartCount();
  // Redirect to the thank you page
  window.location.href = "thankyou.html";
}
