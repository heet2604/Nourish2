import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer , toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId",response.data.userId);
      toast("Login Successfull !")
      setTimeout(() => {
        navigate("/home")
      }, 1500);
      console.log(response.data);
    } catch (err) {
      console.log(err);
      //setMessage("Failed");
      toast("Something went wrong !")
    }
  };

  return (
    <>
      <div
        className="relative flex flex-col justify-center items-center h-screen text-center text-white bg-cover bg-center"
        style={{
          backgroundImage: `url('./apple.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40 z-0"></div>

        <div className="relative z-10 bg-black bg-opacity-60 p-12 rounded-lg text-white w-[28rem]">
          <h1 className="text-4xl font-bold mb-8">L O G I N</h1>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
            {/* Username Input */}
            <input
              type="text"
              name="username"
              value={username}
              placeholder="Username"
              onChange={(e)=>setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white bg-transparent placeholder-white text-white"
              required
            />

            {/* Password Input */}
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white bg-transparent placeholder-white text-white"
              required
            />

            {/* Submit Button */}
            <div className="flex items-center justify-center mt-4">
              <button
                type="submit"
                className="w-28 h-12 py-2 bg-red-600 text-white rounded-3xl hover:bg-red-700 transition duration-300 text-sm"
              >
                Submit
              </button>
            </div>
          </form>
          {/* {message && (
            <p className={`mt-4 text-sm font-medium ${message.includes("Success") ? "text-green-400" : "text-red-500"}`}>{message}</p>
          )} */}
          <ToastContainer/>
        </div>
      </div>
    </>
  );
}

export default Login;
