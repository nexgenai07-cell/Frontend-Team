// =========================
// ARRAY OF PRODUCT OBJECTS
// =========================

// Creating an array that stores multiple product objects
const products = [
  // First product object
  {
    id: 1,
    name: "Wireless Headphones",
    price: 2500,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
  },

  // Second product object
  {
    id: 2,
    name: "Smart Watch",
    price: 4500,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  },

  // Third product object
  {
    id: 3,
    name: "Laptop",
    price: 85000,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
  },

  // Fourth product object
  {
    id: 4,
    name: "Mobile Phone",
    price: 30000,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
  },
];

// =========================
// CART VARIABLE
// =========================

// Variable for storing cart items count
let cartCount = 0;

// =========================
// SELECTING HTML ELEMENTS
// =========================

// Getting product container from HTML
const productContainer = document.getElementById("product-container");

// Getting cart counter span from HTML
const cartCounter = document.getElementById("cart-count");

// =========================
// FUNCTION TO DISPLAY PRODUCTS
// =========================

// Function for rendering products on screen
function displayProducts() {
  // Looping through each product in products array
  products.forEach(function (product) {
    // Creating a new div for product card
    const card = document.createElement("div");

    // Adding class name to card
    card.classList.add("product-card");

    // Adding HTML content inside card
    card.innerHTML = `
        
            <!-- Product image -->
            <img src="${product.image}" alt="${product.name}">

            <!-- Product name -->
            <h2>${product.name}</h2>

            <!-- Product price -->
            <p>Price: Rs ${product.price}</p>

            <!-- Add to cart button -->
            <button>Add to Cart</button>

        `;

    // Selecting button from current card
    const button = card.querySelector("button");

    // Adding click event on button
    button.addEventListener("click", function () {
      // Calling addToCart function when button is clicked
      addToCart();
    });

    // Adding card inside product container
    productContainer.appendChild(card);
  });
}

// =========================
// FUNCTION TO ADD ITEMS IN CART
// =========================

// Function for updating cart count
function addToCart() {
  // Increasing cart count by 1
  cartCount++;

  // Updating cart counter on UI
  cartCounter.textContent = cartCount;
}

// =========================
// FUNCTION CALL
// =========================

// Calling function to show products when page loads
displayProducts();
