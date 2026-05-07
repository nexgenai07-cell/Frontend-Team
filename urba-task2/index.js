let products=[
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
let cart=[]

products.forEach((product,index) => {
  let card=`
  <div class="product-card">
        <img src="${product.image}" />
        <h3>${product.name}</h3>
        <p>${product.price}</p>
        <button class="add-to-cart" onclick="addtocart(${index})">Add to cart</button>
  </div>
`;
document.querySelector(".container").innerHTML += card;
});
function counterincrease(index){
   cart[index].quantity++;
   cartrender();
}
function counterdecrease(index){
    if((cart[index].quantity)>0){
       cart[index].quantity--;
       cartrender();
    }
}
function cartrender(){
    let cartitems=document.querySelector(".cart-items");
    cartitems.innerHTML=''
    cart.forEach((element,index) => {
    let cartelement=`
    <div class="cart-products">
        <h4>${element.name}</h4>
        <h5>${element.price}</h5>
        <div class="cart-buttons">
        <button onclick="counterdecrease(${index})">-</button>${element.quantity}<button onclick="counterincrease(${index})">+</button>
        </div>
    </div>
`;
     cartitems.innerHTML += cartelement;
});
}

function addtocart(index){
    let selectedproduct=products[index];
    cart.push({...selectedproduct,quantity:1});
    cartrender();
    ToggleEvent();
}
 function ToggleEvent(){
    document.querySelector(".cart-container")
    .classList.add("active");
}
function closeCart() {
    document.querySelector(".cart-container").classList.remove("active");
}