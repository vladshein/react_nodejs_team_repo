import { lazy, Suspense, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import LoginModal from '../components/Modals/SignInModal/SignInModal.jsx';
import RegistrationModal from '../components/Modals/SignUpModal/SignUpModal.jsx';
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
import { refreshUser } from '../redux/auth/actions.js';

const App = () => {
  const isRefreshing = useSelector(selectIsRefreshing);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <div>Refreshing user...</div>
  ) : (
    <Suspense fallback={<div>Loading...</div>}>
      <div className={style.container}>
        <LoginModal isOpen={isSignInModalOpen} onRequestClose={() => setIsSignInModalOpen(false)} />
        <RegistrationModal
          isOpen={isSignUpModalOpen}
          onRequestClose={() => setIsSignUpModalOpen(false)}
        />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onLoginClick={() => setIsSignInModalOpen(true)}
                onRegisterClick={() => setIsSignUpModalOpen(true)}
              />
            }>
            <Route index element={<Navigate to="categories" />} />
            <Route path="categories" element={<Categories />}></Route>
            {/* <Route path="categories/:id" element={<Categories />}></Route> */}
          </Route>
          <Route index element={<HomePage />} />
          <Route
            path="/recipe/add"
            element={
              <PrivateRoute
                component={<AddRecipePage />}
                setIsSignInModalOpen={setIsSignInModalOpen}
              />
            }></Route>
          <Route path="/recipe/:id" element={<RecipePage />}></Route>
          <Route path="/user/:id" element={<UserPage />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </div>
    </Suspense>
  );
};

export default App;
