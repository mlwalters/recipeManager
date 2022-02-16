import './App.scss';
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import RecipeDetails from './components/RecipeDetails';
import AddRecipePage from './components/AddRecipePage';
import Profile from './components/Authentication/Profile';
import LandingPage from './components/LandingPage';

function App() {
  const { isAuthenticated } = useAuth0();
  return (
    <>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/recipe/add" element={<AddRecipePage />} />
      </Routes>
    </>
  );
}

export default App;
