import './App.scss';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import RecipeDetails from './components/RecipeDetails';
import AddRecipeForm from './components/AddRecipeForm';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/recipe/add" element={<AddRecipeForm />} />
      </Routes>
    </div>
  );
}

export default App;
