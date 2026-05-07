/* ================================
   PRODUCT DATA (STATIC DATABASE)
   ================================ */
let products = [
    {
      name: "Rice Face Wash & Scrub",
      image: "images/Product1.webp",
      price: "Rs. 800",
    },
    {
      name: "Acne Defence Face Wash",
      image: "images/Product2.webp",
      price: "Rs. 485",
    },
    {
      name: "Sunscreen SPF 60",
      image: "images/Product3.webp",
      price: "Rs. 799",
    },
    {
      name: "Oil Control Face Wash",
      image: "images/Product4.webp",
      price: "Rs. 480",
    },
    {
      name: "Hydra Power Face Wash",
      image: "images/Product5.webp",
      price: "Rs. 485",
    },
    {
      name: "Triple Correction Eye Serum",
      image: "images/Product6.webp",
      price: "Rs. 900",
    },
    {
      name: "Coconut Oil",
      image: "images/Product7.webp",
      price: "Rs. 960",
    },
    {
      name: "Better than Ubtan Scrub 100g",
      image: "images/Product8.webp",
      price: "Rs. 485",
    },
    {
      name: "Vitamin C Skin Serum",
      image: "images/Product9.webp",
      price: "Rs. 786",
    },
    {
      name: "Rose Face Gel",
      image: "images/Product10.webp",
      price: "Rs. 675",
    },
    {
      name: "Niacinamide + Zinc skin Serum",
      image: "images/Product11.webp",
      price: "Rs. 485",
    },
    {
      name: "Rose Face Wash",
      image: "images/Product12.webp",
      price: "Rs. 799",
    }
];

/* ================================
   CART ARRAY (USER SELECTED ITEMS)
   ================================ */
let cart = [];

/* ================================
   RENDER PRODUCTS ON PAGE LOAD
   ================================ */
products.forEach((product, index) => {
  let card = `
  <div class="product-card">
        <img src="${product.image}" />
        <h3>${product.name}</h3>
        <p>${product.price}</p>

        <!-- ADD TO CART BUTTON -->
        <button class="add-to-cart" onclick="addtocart(${index})">
            Add to cart
        </button>
  </div>
`;

  // inject product cards into container
  document.querySelector(".container").innerHTML += card;
});

/* ================================
   INCREASE QUANTITY
   ================================ */
function counterincrease(index){
   cart[index].quantity++; // increase item quantity
   cartrender(); // re-render cart UI
}

/* ================================
   DECREASE QUANTITY
   ================================ */
function counterdecrease(index){
    if(cart[index].quantity > 0){
       cart[index].quantity--; // decrease quantity
       cartrender(); // update UI
    }
}

/* ================================
   RENDER CART ITEMS
   ================================ */
function cartrender(){
    let cartitems = document.querySelector(".cart-items");

    cartitems.innerHTML = ''; // clear old UI before re-render

    cart.forEach((element, index) => {
    let cartelement = `
    <div class="cart-products">

        <!-- PRODUCT NAME -->
        <h4>${element.name}</h4>

        <!-- PRODUCT PRICE -->
        <h5>${element.price}</h5>

        <!-- QUANTITY CONTROLS -->
        <div class="cart-buttons">

        <button onclick="counterdecrease(${index})">-</button>

        ${element.quantity}

        <button onclick="counterincrease(${index})">+</button>

        </div>
    </div>
`;
     cartitems.innerHTML += cartelement;
});
}

/* ================================
   ADD ITEM TO CART
   ================================ */
function addtocart(index){

    let selectedproduct = products[index];

    // add product with default quantity = 1
    cart.push({...selectedproduct, quantity: 1});

    cartrender(); // update cart UI

    ToggleEvent(); // open sidebar
}

/* ================================
   OPEN CART SIDEBAR
   ================================ */
function ToggleEvent(){
    document.querySelector(".cart-container")
    .classList.add("active");
}

/* ================================
   CLOSE CART SIDEBAR
   ================================ */
function closeCart() {
    document.querySelector(".cart-container")
    .classList.remove("active");
}