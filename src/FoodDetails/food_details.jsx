import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function FoodDetails() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [quantity, setQuantity] = useState(100);
  const [foodData, setFoodData] = useState({
    food_name: "Loading...",
    carb_g: 0,
    fat_g: 0,
    protein_g: 0,
    fibre_g: 0,
    energy_kcal: 0,
  });

  useEffect(() => {
    if (location.state && location.state.foodData) {
      console.log("📥 Received food data:", location.state.foodData);
      setFoodData(location.state.foodData);
      return; // Stop execution if data is already available
    }

    const fetchFoodData = async()=>{
      try{
        let response;
        const userId = localStorage.getItem("userId");
        console.log(userId)
        if(location.state && location.state.foodId){
          console.log("Fetching...")
          response = await axios.get(`http://localhost:5000/api/selected-food/${location.state.foodId}`);
        }
        else{
          response = await axios.get(`http://localhost:5000/api/latest-food/${userId}`,{
            headers : {Authorization:`Bearer ${localStorage.getItem("token")}`}
          })
        }
        console.log("API response : ",response.data)
        setFoodData(response.data);
      }
      catch(err){
        console.error(err);
      }
    }
    fetchFoodData();
  }, [location.state]);
  

  const updatedValues = (value)=>((value/100)*quantity.toFixed(2));

  // const increment = () => {
  //   setQuantity((prev) => prev + 1);
  // };

  // const decrement = () => {
  //   setQuantity((prev) => Math.max(prev - 1, 1));
  // };

  const handleQuantityChange = (e) => {
    const value = Math.max(Number(e.target.value), 1);
    setQuantity(value);
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="w-full bg-gray-800 px-6 py-4 flex justify-between items-center">
        <a href="/home" className="text-lg font-bold">
          Nourish
        </a>
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            ☰
          </button>
        </div>
        <div className="hidden lg:flex flex-row items-center gap-8">
          <a href="/home" className="cursor-pointer hover:text-gray-400">
            Home
          </a>
          <a
            href="/food_details"
            className="cursor-pointer hover:text-gray-400"
          >
            Food Details
          </a>
          <a href="/vitals" className="cursor-pointer hover:text-gray-400">
            Track Vitals
          </a>
          <a href="/premium" className="cursor-pointer hover:text-gray-400">
            Explore Premium
          </a>
          <span className="cursor-pointer hover:text-gray-400">Profile</span>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="w-full bg-gray-800 px-6 py-4 flex flex-col items-center lg:hidden fixed top-16 left-0 z-50">
          <a href="/home" className="cursor-pointer hover:text-gray-400 py-2">
            Home
          </a>
          <a
            href="/food_details"
            className="cursor-pointer hover:text-gray-400 py-2"
          >
            Food Details
          </a>
          <a href="/vitals" className="cursor-pointer hover:text-gray-400 py-2">
            Track Vitals
          </a>
          <a
            href="/premium"
            className="cursor-pointer hover:text-gray-400 py-2"
          >
            Explore Premium
          </a>
          <a href="" className="cursor-pointer hover:text-gray-400 py-2">
            Profile
          </a>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-center p-5">
        {/* Food Card */}
        <div className="bg-gray-700 p-5 rounded-lg text-center shadow-lg w-80 h-44 border-2 border-white">
          <h1 className="text-2xl font-bold text-green-400">🍵</h1>
          <h2 className="mt-3 text-2xl">{foodData.food_name}</h2>
          <p className="mt-4 bg-green-400 h-3 w-3 rounded-full mx-auto"></p>
        </div>

        {/* Nutrition Info Box */}
        <div className="rounded-lg outline text-white w-96 text-center p-5 mt-5 shadow-lg bg-gray-800 max-w-xs ">
          {/* Quantity */}
          <div className="flex items-center justify-center gap-3">
            {/* <button
              onClick={increment}
              className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center"
            >
              +
            </button> */} 
            {/* <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              readOnly
              className="bg-transparent border border-white text-white p-2 rounded text-center w-20"
            /> */}
            <input
              type="number"
              placeholder="Calories (kcal)"
              value={quantity}
              onChange={handleQuantityChange}
              readOnly
              className="bg-transparent border border-white text-white p-2 rounded text-center w-1/2"
            />
            {/* <button
              onClick={decrement}
              className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center"
            >
              -
            </button> */}
          </div>

          {/* Calories */}
          <div className="mt-4">
            <input
              type="number"
              placeholder="Calories (kcal)"
              value={updatedValues(foodData.energy_kcal)}
              readOnly
              className="bg-transparent border border-white text-white p-2 rounded text-center w-full"
            />
          </div>

          {/* Macros (Protein, Fats, Carbs, Fiber) */}
          <div className="grid grid-cols-2 gap-3 mt-5">
            <input
              type="number"
              placeholder="Protein (g)"
              value={updatedValues(foodData.protein_g)}
              readOnly
              className="bg-transparent border border-white text-white p-2 rounded text-center w-full"
            />
            <input
              type="number"
              placeholder="Fats (g)"
              value={updatedValues(foodData.fat_g)}
              readOnly
              className="bg-transparent border border-white text-white p-2 rounded text-center w-full"
            />
            <input
              type="number"
              placeholder="Carbs (g)"
              value={updatedValues(foodData.carb_g)}
              readOnly
              className="bg-transparent border border-white text-white p-2 rounded text-center w-full"
            />
            <input
              type="number"
              placeholder="Fiber (g)"
              value={updatedValues(foodData.fibre_g)}
              readOnly
              className="bg-transparent border border-white text-white p-2 rounded text-center w-full"
            />
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 text-center px-6">
        <button className="bg-green-500 text-white py-3 px-6 rounded-lg text-lg hover:bg-green-700 transition">
          Get More Recommendations
        </button>

        {/* Suggested Foods */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Suggested Foods</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-gray-700 p-4 rounded-lg">
              <button>🥑 Avocado</button>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <button>🍓 Strawberries</button>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <button>🍗 Chicken breast</button>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <button>🥜 Almonds</button>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <button>🍞 Whole Grain Bread</button>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">🍣 Salmon</div>
          </div>
        </div>

        <div className="mt-10 bg-gray-800 p-6 rounded-lg shadow-lg w-full mx-auto text-center">
          <h3 className="text-lg font-bold">Did You Know?</h3>
          <p className="mt-2 text-gray-300">
            Eating fiber-rich foods like oats and lentils can help maintain
            healthy digestion and keep you full for longer! 🧠💡
          </p>
        </div>
      </div>
    </div>
  );
}

export default FoodDetails;
