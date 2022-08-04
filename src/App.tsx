import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import { Home } from './pages/home';
import Header from './components/Header';
import './App.css';
import { MoviesProvider } from './context/context';
import { UseAuth } from './context/auth';
import MovieDetail from './components/MovieDetail';
import { Login } from './auth/Login';
import { SignUp } from './auth/SignUp';
import { Favourites } from './components/favourites/Favourites';
import { Profile } from './components/profile/Profile';

function App() {
  return (
    <UseAuth>
      <MoviesProvider>
        <div className="w-full h-full box-border">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/account" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/:id" element={<MovieDetail />} />
          </Routes>
        </div>
      </MoviesProvider>
    </UseAuth>
  );
}

export default App;
