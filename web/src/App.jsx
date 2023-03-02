import './App.scss';
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import ProtectedRoutes from './routing/ProtectedRoutes';
import HomePage from './components/home/HomePage';
import RecipeDetails from './components/recipe-details/RecipeDetails';
import Profile from './components/authentication/Profile';
import LandingPage from './components/landing/LandingPage';
import Favorites from './components/favorites/Favorites';
import GroceryListPage from './components/grocery-list/GroceryListPage';
import NavBar from './components/navigation/NavBar';

const queryClient = new QueryClient();

function App() {
  const { isAuthenticated } = useAuth0();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? <Navigate to="/home" /> : <LandingPage />
            }
          />
          <Route element={<ProtectedRoutes />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/grocerylist" element={<GroceryListPage />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
          </Route>
          {/* <Route path="*" element={LandingPage />} /> */}
        </Routes>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </>
  );
}

export default App;
