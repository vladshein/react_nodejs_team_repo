import { lazy, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const RecipePage = lazy(() => import('../pages/RecipePage/RecipePage'));
const AddRecipePage = lazy(() => import('../pages/AddRecipePage/AddRecipePage'));
const UserPage = lazy(() => import('../pages/UserPage/UserPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage/NotFoundPage'));

// --- USER PROFILE SUB-COMPONENTS ---
// Ці компоненти зараз використовують мок-дані для візуалізації структури.
// TODO: Підключити реальну логіку Redux та замінити заглушки.
const UserRecipes = lazy(() => import('../components/Users/UserRecipes/UserRecipes'));
const UserFavorites = lazy(() => import('../components/Users/UserFavorites/UserFavorites'));
const UserFollowers = lazy(() => import('../components/Users/UserFollowers/UserFollowers'));
const UserFollowing = lazy(() => import('../components/Users/UserFollowing/UserFollowing'));

import Footer from './SharedLayoutComponents/Footer/Footer';
import Header from './SharedLayoutComponents/Header/Header';

import Hero from './HomePageComponents/Hero/Hero';
import Recipes from './HomePageComponents/Recipes/Recipes';
import Testimonials from './HomePageComponents/Testimonials/Testimonials';
import homeStyles from '../pages/HomePage/HomePage.module.css';

import PrivateRoute from '../guards/PrivateRoute/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsLoading as selectAuthIsLoading,
  selectIsRefreshing,
} from '../redux/auth/selectors';
import { useEffect } from 'react';
import { refreshUser } from '../redux/auth/actions.js';
import AuthModal from './Modals/AuthModal/AuthModal.jsx';
import LogOutModal from './Modals/LogOutModal/LogOutModal.jsx';
import { selectIsModalOpen, selectModalType, selectModalProps } from '../redux/modal/selectors.js';
import { closeModal } from '../redux/modal/modalSlice.js';
import Loader from './common/Loader/Loader';

const App = () => {
  const isRefreshing = useSelector(selectIsRefreshing);
  const authIsLoading = useSelector(selectAuthIsLoading);
  const isReduxLoading = useSelector((state) => {
    return Boolean(
      state?.categories?.isLoading ||
      state?.areas?.isLoading ||
      state?.ingredients?.isLoading ||
      state?.recipes?.isLoading ||
      state?.users?.loading ||
      state?.testimonials?.isLoading
    );
  });
  const isModalOpen = useSelector(selectIsModalOpen);
  const modalType = useSelector(selectModalType);
  const modalProps = useSelector(selectModalProps);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <div className="appShell">
      <div className="appMain">
        <Header />
        {(authIsLoading || isReduxLoading) && !isRefreshing && (
          <div className="appSpinnerOverlay" aria-busy="true" aria-live="polite">
            <Loader />
          </div>
        )}
        {isRefreshing ? (
          <div className="appSpinnerOverlay" aria-busy="true" aria-live="polite">
            <Loader />
          </div>
        ) : (
          <Suspense
            fallback={
              <div className="appSpinnerOverlay" aria-busy="true" aria-live="polite">
                <Loader />
              </div>
            }>
            <Routes>
              <Route path="/" element={<HomePage />} />

              <Route
                path="/recipes"
                element={
                  <div>
                    <div className={homeStyles.heroSection}>
                      <Hero />
                    </div>
                    <Recipes />
                    <Testimonials />
                  </div>
                }
              />

              <Route path="/recipe/add" element={<PrivateRoute element={<AddRecipePage />} />} />
              {/* <Route path="/recipe/add" element={<AddRecipePage />} /> */}
              <Route path="/recipe/:id" element={<RecipePage />} />
              <Route path="/user/:id" element={<PrivateRoute element={<UserPage />} />}>
                <Route index element={<Navigate to="recipes" replace />} />
                <Route path="recipes" element={<UserRecipes />} />
                <Route path="favorites" element={<UserFavorites />} />
                <Route path="followers" element={<UserFollowers />} />
                <Route path="following" element={<UserFollowing />} />
              </Route>

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        )}
      </div>

      <Footer />

      <Toaster position="top-right" reverseOrder={false} />
      <AuthModal
        isOpen={isModalOpen && modalType === 'auth'}
        onRequestClose={handleCloseModal}
        view={modalProps.view || 'signIn'}
        redirectTo={modalProps.redirectTo || '/'}
      />
      <LogOutModal
        isOpen={isModalOpen && modalType === 'logout'}
        onRequestClose={handleCloseModal}
      />
    </div>
  );
};

export default App;
