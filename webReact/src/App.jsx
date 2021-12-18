import './App.scss';
import React from 'react';
// import { Route, Routes } from 'react-router';
// import {
//   BrowserRouter as Router,
//   useRoutes,
// } from 'react-router-dom';
import Dashboard from './components/Dashboard';
// import RecipeDetails from './components/RecipeDetails';

function App() {
  return (
    <div>
      {/* <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
      </Routes> */}
      <Dashboard />
    </div>
  );
  // const routes = useRoutes([
  //   { path: '/', element: <Dashboard /> },
  //   { path: '/recipe/:id', element: <RecipeDetails /> },
  // ]);
  // return routes;
}

export default App;
