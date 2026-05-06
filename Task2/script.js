const Products = [   /*array of objects*/
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

const product_container = document.querySelector(".product-container");        /*for getting the element*/
const cart_container=document.querySelector(".yourcart-container");            /*for getting the element*/
const counter = document.getElementById("count");                              /*for getting the element*/
const cart=[];                       /*array for storing cart*/
let count = 0;                      /*cart counter*/

/*add to cart function */
function addtocart(id){               
    let product = Products.find(p => p.id == id);           /*matches the id from the products array and store it to the product variable*/
    let alreadyInCart=cart.find(item => item.id == id);      /*matches the id from the cart array and store it to the product variable*/
    if(alreadyInCart){/* checks if the product is already in the cart*/
        alert("Already in cart!");
        return;
    }
    else{
     cart.push(product);   /*if not in the cart pushes it into the cart array*/

     displayCartProducts();
      count++;           /*updates the counter*/
      counter.innerText = count;
     alert("Added to cart!");
    }
    
}






function display_products() {     
    /* Function to render all products on the page */

    Products.forEach(p => {    
        /* Loop through each product object in Products array */

        // Create a new div for product card
        const card = document.createElement("div");

        // Add class "card" for styling
        card.classList.add("card");

        // Add HTML content inside the card
        card.innerHTML = `
            <img src="${p.img}" alt="">   
            <h3>${p.name}</h3>            
            <p>${p.Price}</p>            
            <button data-id=${p.id}>Add to Cart</button>
        `;

        // Select button from the current card
        const button = card.querySelector("button");

        // Add click event on button
        button.addEventListener("click", (e) => {

            // Get product id from button's data-id attribute
            let id = e.target.getAttribute("data-id");

            // Call addtocart function with clicked product id
            addtocart(id);
        });

        // Add the completed card into product container
        product_container.appendChild(card);
    });
}


function displayCartProducts() {     /*for rendring the cart array*/
    cart_container.innerHTML = "";
    cart.forEach(p => {
      const cartCard = document.createElement("div");

        cartCard.classList.add("card");
         cartCard.innerHTML = `
            <img src="${p.img}" width="100">
            <h3>${p.name}</h3>
            <p>${p.Price}</p>
        `;

        cart_container.appendChild(cartCard);
    })
}

display_products();