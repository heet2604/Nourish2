import React, { useState, useEffect } from "react";
import axios from "axios";

function Vitals() {
  const [popopen , setPopOpen] = useState(false)
  const doctorDetails = {
    name : "Dr Fenny Shah",
    contact : "+1-234-567-890",
    email  : "fennyshah@gmail.com"
  }
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [sugarReading, setSugarReading] = useState(90);
  const [weightReading, setWeightReading] = useState(85);

  // Fetch vitals from backend
  useEffect(() => {
    axios
      .get("http://localhost:3000/vitals")
      .then((response) => {
        console.log("Data fetched from backend:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const sugarIncrement = () => {
    setSugarReading((prev) => Math.max(prev + 1,0));
  };

  const sugarDecrement = () => {
    setSugarReading((prev) => Math.max(prev - 1,0));
  };

  const weightIncrement = () => {
    setWeightReading((prev) => Math.max(prev + 1,0));
  };

  const weightDecrement = () => {
    setWeightReading((prev) => Math.max(prev - 1,0));
  };

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
          <a href="/food_details" className="cursor-pointer hover:text-gray-400">Food Details</a>
          <a href="/vitals" className="cursor-pointer hover:text-gray-500">Track Vitals</a>
          <a href="/premium" className="cursor-pointer hover:text-gray-500">Explore Premium</a>
          <a href="/profile" className="cursor-pointer hover:text-gray-500">Profile</a>
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
          <a className="cursor-pointer hover:text-gray-400 py-2">
            Explore Premium
          </a>
          <a className="cursor-pointer hover:text-gray-400 py-2">Profile</a>
        </div>
      )}

      {/* Vitals */}
      <div className="flex flex-col md:flex-row gap-10 justify-center mt-20 p-5 items-center">
        {/* Sugar Level */}
        <div className="rounded-lg outline text-white w-96 text-center p-5 shadow-lg bg-gray-800">
          <h2 className="mb-4 text-lg font-semibold">
            🩸Blood Sugar Level (mg/dL)
          </h2>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={sugarDecrement}
              className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center"
            >
              -
            </button>
            <input
              type="number"
              value={sugarReading}
              onChange={(e) => setSugarReading(Number(e.target.value))}
              className="bg-transparent border border-white text-white p-2 rounded text-center w-20"
            />
            <button
              onClick={sugarIncrement}
              className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center"
            >
              +
            </button>
          </div>
        </div>

        {/* Weight */}
        <div className="rounded-lg outline text-white w-96 text-center p-5 shadow-lg bg-gray-800">
          <h2 className="mb-4 text-lg font-semibold">📈 Weight (kg)</h2>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={weightDecrement}
              className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center"
            >
              -
            </button>
            <input
              type="number"
              value={weightReading}
              onChange={(e) => setWeightReading(Number(e.target.value))}
              className="bg-transparent border border-white text-white p-2 rounded text-center w-20"
            />
            <button
              onClick={weightIncrement}
              className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <p className="text-white text-xl text-center mt-5">
        Recommended to track sugar after a specific meal
      </p>
      <div className="mt-7 md:flex-row flex flex-col items-center justify-center gap-5">
        <textarea className="mt-3 text-sm rounded-lg outline text-white w-60 text-center p-5 shadow-lg bg-gray-800 h-16">
          Before meal-70-100 mg/dL
        </textarea>
        <textarea className="mt-3 text-sm rounded-lg outline text-white w-60 text-center p-5 shadow-lg bg-gray-800 h-16">
          After meal-less than 140 mg/dL
        </textarea>
      </div>

      {popopen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-black p-6 rounded-lg shadow-lg text-white w-80">
              <h2 className="text-xl font-semibold mb-4">Doctors Details</h2>
              <p className="mb-3"><strong>👨🏻‍⚕️ : </strong> {doctorDetails.name}</p>
              <p className="mb-3"><strong>☎️ : </strong> {doctorDetails.contact}</p>
              <p className="mb-3"><strong>✉️ : </strong> {doctorDetails.email}</p>
              <button onClick={()=>setPopOpen(false)} className="mt-2 bg-transparent text-green-400 px-4 py-1 rounded hover:text-green-600 transition">Close</button>
            </div>
          </div>
      )}

      <div className="text-center">
        <button onClick={()=>setPopOpen(true)} className="mt-12 bg-green-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-700 transition">
          Need Help? Contact a doctor
        </button>
      </div>

      {/* Fact */}
      <div className="mt-20 bg-gray-800 p-6 rounded-lg shadow-lg w-full mx-auto text-center">
        <h3 className="text-lg font-bold">🍭 Fun Fact!</h3>
        <p className="mt-2 text-gray-300">
          Did you know? Your brain runs on glucose! In fact, it uses around{" "}
          <strong>20%</strong> of your body's energy each day. But remember,
          balance is key! 🧠💡
        </p>
      </div>
    </div>
  );
}

export default Vitals;
