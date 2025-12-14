import { lazy, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const RecipePage = lazy(() => import('../pages/RecipePage/RecipePage'));
const AddRecipePage = lazy(() => import('../pages/AddRecipePage/AddRecipePage'));
const UserPage = lazy(() => import('../pages/UserPage/UserPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage/NotFoundPage'));

import style from './App.module.css';
import Hero from './HomePageComponents/Hero/Hero';
import Categories from './HomePageComponents/Categories/Categories';
import RestrictedRoute from '../guards/RestrictedRoute/RestrictedRoute';
import PrivateRoute from '../guards/PrivateRoute/PrivateRoute';

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className={style.container}>
        <Routes>
          <Route path="/" element={<HomePage />}>
            <Route index element={<Navigate to="categories" />} />
            <Route path="categories" element={<Categories />}></Route>
            {/* <Route path="categories/:id" element={<Categories />}></Route> */}
          </Route>
          <Route
            path="/recipe/add"
            element={<PrivateRoute component={<AddRecipePage />} />}></Route>
          <Route path="/recipe/:id" element={<RecipePage />}></Route>
          <Route path="/user/:id" element={<UserPage />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </div>
    </Suspense>
  );
};

export default App;
