import './App.scss';
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './views/dashboard/HomePage';
import RecipeDetails from './views/recipe-details/RecipeDetails';
import AddRecipePage from './views/recipe-form/AddRecipePage';
import Profile from './components/authentication/Profile';
import LandingPage from './views/landing/LandingPage';
import Favorites from './views/favorites/Favorites';
import GroceryListPage from './views/grocery-list/GroceryListPage';
import NavBar from './components/navigation/navbar/NavBar';
import ProtectedRoutes from './routing/ProtectedRoutes';

function App() {
  const { isAuthenticated } = useAuth0();
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <LandingPage />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/grocerylist" element={<GroceryListPage />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/recipe/add" element={<AddRecipePage />} />
        </Route>
        {/* <Route path="*" element={LandingPage />} /> */}
      </Routes>
    </>
  );
}

export default App;
