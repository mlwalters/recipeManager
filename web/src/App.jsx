import './App.scss';
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import RecipeDetails from './components/RecipeDetails';
import AddRecipePage from './components/AddRecipePage';
import Profile from './components/Authentication/Profile';
import LandingPage from './components/LandingPage';
import Favorites from './components/Favorites';
import NavBar from './components/sharedComponents/NavBar';

function App() {
  const { isAuthenticated } = useAuth0();
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/recipe/add" element={<AddRecipePage />} />
      </Routes>
    </>
  );
}

export default App;
