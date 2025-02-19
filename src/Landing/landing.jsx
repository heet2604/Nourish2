import React , {useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


function Landing() {

  useEffect(() => {
    axios.get('http://localhost:3000')
      .then(response => {
        console.log('Data fetched from backend:', response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div
      className="relative flex flex-col justify-center items-center h-screen text-center text-white bg-cover bg-center"
      style={{
        backgroundImage: `url('./apple.jpg')`,
      }}
    >

      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
      
      <h1 className="text-6xl font-bold mb-4 z-10">Welcome to the world of <span className='text-green-500'>REAL</span> Fitness</h1>
      <h2 className="text-2xl md:text-3xl text-gray-300 z-10">Be fit from Within</h2>
      <br />
      
      <div className="z-10 flex space-x-6 mt-6 gap-20">
        <Link to="/login">
          <button className="bg-black text-white py-3 px-6 rounded-3xl border-none">
            Log-in
          </button>
        </Link>
        <Link to="/signup">
          <button className="bg-white text-black py-3 px-6 rounded-3xl border-none">
            Sign-up
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Landing;



