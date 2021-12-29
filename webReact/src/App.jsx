import './App.scss';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import RecipeDetails from './components/RecipeDetails';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
