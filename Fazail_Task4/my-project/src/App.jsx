import React from "react";
import Navbar from "./components/Navbar";
import FoodCard from "./components/FoodCard";
import Footer from "./components/Footer";

function App() {

  // Array of Objects
  const foods = [
    {
      id: 1,
      name: "Burger",
      price: 12,
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    },

    {
      id: 2,
      name: "Pizza",
      price: 18,
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591",
    },

    {
      id: 3,
      name: "Pasta",
      price: 15,
      image:
        "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">

      <Navbar />

      {/* Heading */}
      <div className="text-center py-10">
        <h1 className="text-4xl font-bold">
          Popular Foods
        </h1>
      </div>

      {/* Cards */}
      <div className="flex flex-wrap justify-center gap-8 px-6">

        {foods.map((food) => (
          <FoodCard
            key={food.id}
            image={food.image}
            name={food.name}
            price={food.price}
          />
        ))}

      </div>

      <Footer />
    </div>
  );
}

export default App;