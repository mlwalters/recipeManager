import './App.scss';
import React from 'react';
import { Routes, Route } from 'react-router';
// import { Route } from 'react-router';
// import { Switch } from 'react-router-dom';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import RecipeDetails from './components/RecipeDetails';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </Router>
      {/* <Dashboard /> */}
    </div>
  );
}

export default App;
