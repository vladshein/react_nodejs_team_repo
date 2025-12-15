import { lazy, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const RecipePage = lazy(() => import('../pages/RecipePage/RecipePage'));
const AddRecipePage = lazy(() => import('../pages/AddRecipePage/AddRecipePage'));
const UserPage = lazy(() => import('../pages/UserPage/UserPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage/NotFoundPage'));

import style from './App.module.css';
import Categories from './HomePageComponents/Categories/Categories';
import RestrictedRoute from '../guards/RestrictedRoute/RestrictedRoute';
import PrivateRoute from '../guards/PrivateRoute/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsRefreshing } from '../redux/auth/selectors';
import { useEffect } from 'react';
import { refreshUser } from '../redux/auth/actions.js';

const App = () => {
  const isRefreshing = useSelector(selectIsRefreshing);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <div>Refreshing user...</div>
  ) : (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="categories" element={<Categories />}></Route>
        {/* <Route path="categories/:id" element={<Categories />}></Route> */}
        <Route path="/recipe/add" element={<AddRecipePage />} />
        <Route path="/recipe/:id" element={<RecipePage />}></Route>
        <Route path="/user/:id" element={<UserPage />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </Suspense>
  );
};

export default App;
