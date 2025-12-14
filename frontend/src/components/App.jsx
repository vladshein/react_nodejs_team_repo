import { lazy, Suspense, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

const RegistrationPage = lazy(() => import('../pages/RegistrationPage/RegistrationPage'));
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'));
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
import { useDispatch, useSelector } from 'react-redux';
import { selectIsRefreshing } from '../redux/auth/selectors';
import { useEffect } from 'react';
import { refreshUser } from '../redux/auth/operations';
import LoginModal from './Modals/LoginModal/LoginModal';
import RegistrationModal from './Modals/RegistrationModal/RegistrationModal';

const App = () => {
  const isRefreshing = useSelector(selectIsRefreshing);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <div>Refreshing user...</div>
  ) : (
    <Suspense fallback={<div>Loading...</div>}>
      <div className={style.container}>
        <LoginModal isOpen={isLoginModalOpen} onRequestClose={() => setIsLoginModalOpen(false)} />
        <RegistrationModal
          isOpen={isRegistrationModalOpen}
          onRequestClose={() => setIsRegistrationModalOpen(false)}
        />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onLoginClick={() => setIsLoginModalOpen(true)}
                onRegisterClick={() => setIsRegistrationModalOpen(true)}
              />
            }>
            <Route index element={<Navigate to="categories" />} />
            <Route path="categories" element={<Categories />}></Route>
            {/* <Route path="categories/:id" element={<Categories />}></Route> */}
          </Route>
          <Route path="/register" element={<RestrictedRoute component={<RegistrationPage />} />} />
          <Route
            path="/login"
            element={<RestrictedRoute component={<LoginPage />} redirectTo="/user" />}
          />
          <Route index element={<HomePage />} />
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
