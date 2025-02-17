import React from 'react';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './Landing/landing';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import Home from './Home/home';
import Vitals from './Vitals/vitals';
import FoodDetails from './FoodDetails/food_details';
import Recommendations from './Recommendations/recommendations';
import User_details from './User_Details/user_details';
import Search from './Search/search';

function App() {
  return (
    <div>
      
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/food_details" element={<FoodDetails />} />
          <Route path="/vitals" element={<Vitals />} />
          <Route path="/recommendations" element={<Recommendations/>}/>
          <Route path="/user_details" element={<User_details/>}/>
          <Route path="/search" element={<Search/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
