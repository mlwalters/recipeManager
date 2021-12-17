import './App.scss';
import React from 'react';
import { Route, Routes } from 'react-router';
import Dashboard from './components/Dashboard';
import RecipeDetails from './components/RecipeDetails';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
      </Routes>
    </div>
  );
}

export default App;
