import './App.scss';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import RecipeDetails from './components/RecipeDetails';
import AddRecipePage from './components/AddRecipePage';
import Profile from './components/Authentication/Profile';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/recipe/add" element={<AddRecipePage />} />
      </Routes>
    </div>
  );
}

export default App;
