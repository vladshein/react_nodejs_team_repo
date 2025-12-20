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

import Header from './SharedLayoutComponents/Header/Header';
import Footer from './SharedLayoutComponents/Footer/Footer';
import RecipeHomeBlock from './RecipePageComponents/RecipeHomeBlock/RecipeHomeBlock';
import Hero from './HomePageComponents/Hero/Hero';
import homeStyles from '../pages/HomePage/HomePage.module.css';

import PrivateRoute from '../guards/PrivateRoute/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsRefreshing } from '../redux/auth/selectors';
import { useEffect } from 'react';
import { refreshUser } from '../redux/auth/actions.js';
import AuthModal from './Modals/AuthModal/AuthModal.jsx';
import LogOutModal from './Modals/LogOutModal/LogOutModal.jsx';
import { selectIsModalOpen, selectModalType, selectModalProps } from '../redux/modal/selectors.js';
import { closeModal } from '../redux/modal/modalSlice.js';

const App = () => {
  // 2. ВСТАВЛЯЄШ ЦЕЙ БЛОК ТУТ 👇
  useEffect(() => {
    const HARD_TOKEN =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NDQ1OGRlZDhmMWNhMmUxYjcxMmVkZSIsImlhdCI6MTc2NjE5MDg2MiwiZXhwIjoxNzY2Mjc3MjYyfQ.LnqF-hQZIMQUZQU4bVXnHJI0aoUJSIEhj8oFCoaTTHo';

    const currentLS = localStorage.getItem('persist:auth');

    // Якщо токена немає або він null — записуємо і перезавантажуємо
    if (!currentLS || currentLS.includes('null') || !currentLS.includes(HARD_TOKEN)) {
      console.log('⚡ FORCE WRITING TO LOCAL STORAGE...');

      const hackData = {
        token: `"${HARD_TOKEN}"`,
        isLoggedIn: 'true',
        user: JSON.stringify({ name: 'Hacker', email: 'force@login.com' }),
        _persist: '{"version":-1,"rehydrated":true}',
      };

      localStorage.setItem('persist:auth', JSON.stringify(hackData));
      window.location.reload(); // Перезавантаження сторінки
    }
  }, []);
  // 👆 КІНЕЦЬ БЛОКУ

  const isRefreshing = useSelector(selectIsRefreshing);
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

  return isRefreshing ? (
    <div>Refreshing user...</div>
  ) : (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/recipes"
          element={
            <div>
              <div className={homeStyles.heroSection}>
                <Header />
                <Hero />
              </div>
              <RecipeHomeBlock />
              <Footer />
            </div>
          }
        />

        <Route path="/recipe/add" element={<PrivateRoute element={<AddRecipePage />} />} />
        {/* <Route path="/recipe/add" element={<AddRecipePage />} /> */}
        <Route path="/recipe/:id" element={<RecipePage />} />
        <Route path="/user/:id" element={<UserPage />}>
          <Route index element={<Navigate to="recipes" replace />} />
          <Route path="recipes" element={<UserRecipes />} />
          <Route path="favorites" element={<UserFavorites />} />
          <Route path="followers" element={<UserFollowers />} />
          <Route path="following" element={<UserFollowing />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
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
    </Suspense>
  );
};

export default App;
