import { lazy, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const RecipePage = lazy(() => import('../pages/RecipePage/RecipePage'));
const AddRecipePage = lazy(() => import('../pages/AddRecipePage/AddRecipePage'));
const UserPage = lazy(() => import('../pages/UserPage/UserPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage/NotFoundPage'));

// --- USER PROFILE SUB-COMPONENTS ---
// Ці компоненти зараз використовують мок-дані для візуалізації структури.
// TODO: Підключити реальну логіку Redux та замінити заглушки.
const UserRecipes = lazy(() => import('../components/SharedLayoutComponents/UserRecipes/UserRecipes'));
const UserFavorites = lazy(() => import('../components/SharedLayoutComponents/UserFavorites/UserFavorites'));
const UserFollowers = lazy(() => import('../components/SharedLayoutComponents/UserFollowers/UserFollowers'));
const UserFollowing = lazy(() => import('../components/SharedLayoutComponents/UserFollowing/UserFollowing'));

// import style from './App.module.css';
import Categories from './HomePageComponents/Categories/Categories';
import RestrictedRoute from '../guards/RestrictedRoute/RestrictedRoute';
import PrivateRoute from '../guards/PrivateRoute/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsRefreshing } from '../redux/auth/selectors';
import { useEffect } from 'react';
import { refreshUser } from '../redux/auth/actions';

const App = () => {
  const isRefreshing = useSelector(selectIsRefreshing);
  console.log(isRefreshing);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <div>Refreshing user...</div>
  ) : (
    <Suspense fallback={<div>Loading...</div>}>
      {/* <div className={style.container}> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        
        <Route 
          path="/recipe/add" 
          element={<PrivateRoute component={<AddRecipePage />} />} 
        />
        
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
      {/* </div> */}
    </Suspense>
  );
};

export default App;

