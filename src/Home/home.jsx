import React, { useState,useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from 'axios'
import {useNavigate} from 'react-router-dom';

export default function App() {
  const navigate = useNavigate();
  useEffect(() => {
    axios.get('http://localhost:5000/progress')
      .then(response => {
        console.log('Data fetched from backend:', response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const dailyCalorieGoal = 2600; // Set the daily calorie goal
  const [calories, setCalories] = useState(1800);
  const [nutrients, setNutrients] = useState({
    Protein: 100, // In grams
    Fiber: 15,
    Carbs: 170, 
    Fats: 80,
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Convert nutrients into data for the pie chart
  const nutrientData = Object.entries(nutrients).map(([key, value]) => ({
    name: key,
    value,
  }));

  // Calculate the percentage of calories consumed
  const caloriePercentage = (calories / dailyCalorieGoal) * 100;

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="w-full bg-gray-800 px-6 py-4 flex justify-between items-center">
        <a href="/home" className="text-lg font-bold">Nourish</a>
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            ☰
          </button>
        </div>
        <div className="hidden lg:flex flex-row items-center gap-8">
          <a href="/home" className="cursor-pointer hover:text-gray-400">Home</a>
          <a href="/food_details" className="cursor-pointer hover:text-gray-400">
            Food Details
          </a>
          <a href="/vitals" className="cursor-pointer hover:text-gray-400">
            Track Vitals
          </a>
          <a href="/premium" className="cursor-pointer hover:text-gray-400">
            Explore Premium
          </a>
          <a href="" className="cursor-pointer hover:text-gray-400">Profile</a>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="w-full bg-gray-800 px-6 py-4 flex flex-col items-center lg:hidden fixed top-16 left-0 z-50">
          <a href="/home" className="cursor-pointer hover:text-gray-400 py-2">Home</a>
          <a href="/food_details" className="cursor-pointer hover:text-gray-400 py-2">
            Food Details
          </a>
          <a href="/vitals" className="cursor-pointer hover:text-gray-400 py-2">
            Track Vitals
          </a>
          <a href="" className="cursor-pointer hover:text-gray-400 py-2">
            Explore Premium
          </a>
          <a href="" className="cursor-pointer hover:text-gray-400 py-2">Profile</a>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-1 flex-col lg:flex-row lg:items-start lg:justify-center p-4 gap-8">
        {/* Left Section: Calories Tracker */}
        <div className="flex flex-col items-center lg:items-start w-full lg:max-w-md mt-10 lg:mt-20">
          {/* Calories Circular Progress Bar */}
          <div className="w-40 h-40 mb-8 mx-auto">
            <CircularProgressbar
              value={caloriePercentage}
              text={`${Math.round(caloriePercentage)}%`}
              styles={buildStyles({
                textColor: "#fff",
                pathColor: caloriePercentage <= 150 ? "#32CD32" : "#FF0000",
                trailColor: "#d6d6d6",
              })}
            />
            <div className="text-center mt-2">
              Calories: {calories} / {dailyCalorieGoal}
            </div>
          </div>
          <br />
          <br />

          {/* Bar graphs for Nutrients */}
          <div className="w-full flex flex-col items-center">
            {nutrientData.map((nutrient, index) => (
              <div key={index} className="w-full mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>{nutrient.name}</span>
                  <span>{nutrient.value}g</span>
                </div>
                <div className="w-full bg-gray-700 h-5 rounded-full relative overflow-hidden">
                  <div
                    className="h-5 rounded-full absolute top-0 left-0 transition-all duration-500"
                    style={{
                      width: `${(nutrient.value / 100) * 100}%`,
                      backgroundColor: 
                      (nutrient.name === "Protein" && nutrient.value <= 150) ||
                      (nutrient.name === "Fiber" && nutrient.value <= 30) ||
                      (nutrient.name === "Carbs" && nutrient.value <= 210) ||
                      (nutrient.name === "Fats" && nutrient.value <= 100) 
                       ? "#32CD32" : "#FF0000",
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Food Item Button */}
          <button
            onClick={()=>navigate("/search")}
            className="bg-white text-black px-6 py-2 rounded-full font-semibold mx-auto mt-4"
          >
            Add Food Item
          </button>
        </div>

        {/* Right Section: Tiles */}
        <div className="flex flex-col flex-1 gap-6 mt-10 lg:mt-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {[
              { title: "Sugar Levels", button: "Add new Reading", icon : "📈" },
              { title: "Body Weight", button: "Add new Reading", icon: "📅" },
              { title: "Recommendations", button: "Review", icon: "🎯" },
              {title : "Something else" , button : "Button" , icon: "😶‍🌫️"}
            ].map(({ title, button, icon}, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg p-4 flex flex-col items-center"
              >
                <div className="text-4xl mb-2">{icon}</div>
                <h2 className="text-sm font-semibold mb-2">{title}</h2>
                <button className="bg-white text-black px-3 py-1 text-sm rounded-full">
                  {button}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}