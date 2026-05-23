// ==========================
// Products Data (Array of Objects)
// ==========================
const Products = [
    {
        id: 1,
        name: "Headphones",
        Price: "20$",
        img: "images/img1.webp"
    },
    {
        id: 2,
        name: "Shoes",
        Price: "20$",
        img: "images/img2.jpg"
    },
    {
        id: 3,
        name: "Watch",
        Price: "20$",
        img: "images/img3.avif"
    },
    {
        id: 4,
        name: "Glasses",
        Price: "20$",
        img: "images/img4.jpg"
    }
];

// ==========================
// Selecting HTML Elements
// ==========================

// Container where all products will be displayed
const product_container = document.querySelector(".product-container");

// Container where cart products will be displayed
const cart_container = document.querySelector(".yourcart-container");

// Cart counter element
const counter = document.getElementById("count");

// ==========================
// Variables
// ==========================

// Stores products added to cart
const cart = [];

// Total number of items in cart
let count = 0;

// ==========================
// Add Product To Cart
// ==========================
function addtocart(id) {

    // Find clicked product from Products array
    const product = Products.find(p => p.id == id);

    // Check if product already exists in cart
    const cartItem = cart.find(item => item.id == id);

    if (cartItem) {

        // Increase quantity if already present
        cartItem.quantity++;

    } else {

        // Add new product to cart with quantity 1
        cart.push({
            ...product,
            quantity: 1
        });
    }

    // Increase overall cart count
    count++;

    // Update count on screen
    counter.innerText = count;

    // Refresh product cards
    display_products();

    // Refresh cart section
    displayCartProducts();
}

// ==========================
// Decrease Product Quantity
// ==========================
function decreaseQuantity(id) {

    // Find product inside cart
    const cartItem = cart.find(item => item.id == id);

    // Stop function if product doesn't exist
    if (!cartItem) {
        return;
    }

    // Reduce quantity by 1
    cartItem.quantity--;

    // Reduce overall cart counter
    count--;

    // Update counter on screen
    counter.innerText = count;

    // If quantity becomes 0
    if (cartItem.quantity === 0) {

        // Get index of product in cart array
        const index = cart.findIndex(item => item.id == id);

        // Remove product completely from cart
        cart.splice(index, 1);
    }

    // Refresh product cards
    display_products();

    // Refresh cart display
    displayCartProducts();
}

// ==========================
// Display All Products
// ==========================
function display_products() {

    // Clear previous product cards
    product_container.innerHTML = "";

    // Loop through all products
    Products.forEach(p => {

        // Check if current product exists in cart
        const cartItem = cart.find(item => item.id == p.id);

        // Get quantity if exists otherwise 0
        const qty = cartItem ? cartItem.quantity : 0;

        // Create product card
        const card = document.createElement("div");

        // Add class for styling
        card.classList.add("card");

        // Product card content
        card.innerHTML = `
            <img src="${p.img}" alt="">
            <h3>${p.name}</h3>
            <p>${p.Price}</p>

            <!-- Current quantity in cart -->
            <p>In Cart: ${qty}</p>

            <!-- Add To Cart Button -->
            <button class="add-btn" data-id="${p.id}">
                Add To Cart
            </button>
        `;

        // Add To Cart button click event
        card.querySelector(".add-btn").addEventListener("click", (e) => {

            // Get product id from button
            addtocart(Number(e.target.dataset.id));
        });

        // Append card into products container
        product_container.appendChild(card);
    });
}

// ==========================
// Display Cart Products
// ==========================
function displayCartProducts() {

    // Clear previous cart items
    cart_container.innerHTML = "";

    // Loop through cart array
    cart.forEach(p => {

        // Create cart card
        const cartCard = document.createElement("div");

        // Add class for styling
        cartCard.classList.add("card");

        // Cart item content
        cartCard.innerHTML = `
            <img src="${p.img}" width="100">
            <h3>${p.name}</h3>
            <p>${p.Price}</p>

            <div class="qty-box">
                <button class="minus-btn" data-id="${p.id}">-</button>
                <span>${p.quantity}</span>
                <button class="add-btn" data-id="${p.id}">+</button>
            </div>
        `;

        // Increase quantity
        cartCard.querySelector(".add-btn").addEventListener("click", (e) => {
            addtocart(Number(e.target.dataset.id));
        });

        // Decrease quantity
        cartCard.querySelector(".minus-btn").addEventListener("click", (e) => {
            decreaseQuantity(Number(e.target.dataset.id));
        });

        // Add cart card to cart container
        cart_container.appendChild(cartCard);
    });
}

// ==========================
// Initial Render
// ==========================

// Display products when page loads
display_products();