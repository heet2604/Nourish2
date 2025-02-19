import React from "react";

function User_details() {
  return (
    <div className="flex justify-center items-center bg-black min-h-screen w-full p-6">
      <form className="bg-black shadow-lg rounded-lg p-8 w-full max-w-4xl border-2 text-white">
        <h2 className="text-3xl font-bold mb-8 text-center text-white">User Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Full Name"
            className="bg-transparent w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
          />
          <input
            type="text"
            placeholder="Gender"
            className="bg-transparent w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
          />
          <input
            type="number"
            placeholder="Age"
            className="bg-transparent w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
          />
          <input
            type="number"
            placeholder="Height (cm)"
            className="bg-transparent w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
          />
          <input
            type="number"
            placeholder="Weight (kg)"
            className="bg-transparent w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
          />
          <input
            type="number"
            placeholder="BMI"
            className="bg-transparent w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
          />
          <input
            type="text"
            placeholder="Diabetes (Yes/No)"
            className="bg-transparent w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
          />
          <input
            type="text"
            placeholder="Food Allergies"
            className="bg-transparent w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
          />
          <input
            type="text"
            placeholder="Blood Pressure (e.g., 120/80)"
            className="bg-transparent w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
          />
          <input
            type="text"
            placeholder="Cholesterol Levels"
            className="bg-transparent w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
          />
          <input
            type="text"
            placeholder="Smoking Habit (Yes/No)"
            className="bg-transparent w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
          />
          <input
            type="text"
            placeholder="Alcohol Consumption (Yes/No)"
            className="bg-transparent w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
          />
          <input
            type="text"
            placeholder="Physical Activity (e.g., Daily, Weekly)"
            className="bg-transparent w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
          />
          <input
            type="text"
            placeholder="Current Medications"
            className="bg-transparent w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
          />
          <textarea
            placeholder="Medical History"
            className="bg-transparent w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white col-span-1 md:col-span-2"
          ></textarea>
          <textarea
            placeholder="Doctor's Notes"
            className="bg-transparent w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white col-span-1 md:col-span-2"
          ></textarea>
          <textarea
            placeholder="Emergency Contact Details"
            className="bg-transparent w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white col-span-1 md:col-span-2"
          ></textarea>
        </div>
        <div className="flex justify-center">
            <button
            type="submit"
            className="mt-8 w-1/2 bg-green-500 text-white py-3 px-6 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 justify-center"
            >
            Submit  
            </button>
        </div>
      </form>
    </div>
  );
}

export default User_details;

