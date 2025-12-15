import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const UserPage = lazy(() => import('../pages/UserPage/UserPage'));
const RecipePage = lazy(() => import('../pages/RecipePage/RecipePage'));
const AddRecipePage = lazy(() => import('../pages/AddRecipePage/AddRecipePage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage/NotFoundPage'));

// USER PROFILE SUB-COMPONENTS (SCAFFOLDING)
// Ці компоненти зараз використовують мок-дані (hardcoded data) для візуалізації
// структури вкладених роутів (Nested Routes).
// TODO: Підключити реальну логіку Redux та замінити заглушки на робочий код.
const UserRecipes = lazy(() => import('../components/SharedLayoutComponents/UserRecipes/UserRecipes'));
const UserFavorites = lazy(() => import('../components/SharedLayoutComponents/UserFavorites/UserFavorites'));
const UserFollowers = lazy(() => import('../components/SharedLayoutComponents/UserFollowers/UserFollowers'));
const UserFollowing = lazy(() => import('../components/SharedLayoutComponents/UserFollowing/UserFollowing'));

import PrivateRoute from '../guards/PrivateRoute/PrivateRoute';

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/recipe/:id" element={<RecipePage />} />
        <Route 
          path="/recipe/add" 
          element={<PrivateRoute component={<AddRecipePage />} />} 
        />

        {/* /user/:id */}
        <Route path="/user/:id" element={<UserPage />}>

          <Route index element={<Navigate to="recipes" replace />} />
          
          {/* /user/:id/recipes */}
          <Route path="recipes" element={<UserRecipes />} />
          
          {/* /user/:id/favorites */}
          <Route path="favorites" element={<UserFavorites />} />
          
          {/* /user/:id/followers */}
          <Route path="followers" element={<UserFollowers />} />
          
          {/* /user/:id/following */}
          <Route path="following" element={<UserFollowing />} />
          
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default App;

// import { lazy, Suspense } from 'react';
// import { Route, Routes, Navigate } from 'react-router-dom';

// const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
// const RecipePage = lazy(() => import('../pages/RecipePage/RecipePage'));
// const AddRecipePage = lazy(() => import('../pages/AddRecipePage/AddRecipePage'));
// const UserPage = lazy(() => import('../pages/UserPage/UserPage'));
// const NotFoundPage = lazy(() => import('../pages/NotFoundPage/NotFoundPage'));

// import style from './App.module.css';
// import Hero from './HomePageComponents/Hero/Hero';
// import Categories from './HomePageComponents/Categories/Categories';
// import RestrictedRoute from '../guards/RestrictedRoute/RestrictedRoute';
// import PrivateRoute from '../guards/PrivateRoute/PrivateRoute';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectIsRefreshing } from '../redux/auth/selectors';
// import { useEffect } from 'react';
// import { refreshUser } from '../redux/auth/actions';

// const App = () => {
//   const isRefreshing = useSelector(selectIsRefreshing);
//   console.log(isRefreshing);

//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(refreshUser());
//   }, [dispatch]);

//   return isRefreshing ? (
//     <div>Refreshing user...</div>
//   ) : (
//     <Suspense fallback={<div>Loading...</div>}>
//       <div className={style.container}>
//         <Routes>
//           <Route path="/" element={<HomePage />}>
//             <Route index element={<Navigate to="categories" />} />
//             <Route path="categories" element={<Categories />}></Route>
//             {/* <Route path="categories/:id" element={<Categories />}></Route> */}
//           </Route>
//           <Route index element={<HomePage />} />
//           <Route
//             path="/recipe/add"
//             element={<PrivateRoute component={<AddRecipePage />} />}></Route>
//           <Route path="/recipe/:id" element={<RecipePage />}></Route>
//           <Route path="/user/:id" element={<UserPage />}></Route>
//           <Route path="*" element={<NotFoundPage />}></Route>
//         </Routes>
//       </div>
//     </Suspense>
//   );
// };

// export default App;
