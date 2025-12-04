import { lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Navigation from "./Navigation/Navigation";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const RecipePage = lazy(() => import("../pages/RecipePage/RecipePage"));
const AddRecipePage = lazy(() =>
  import("../pages/AddRecipePage/AddRecipePage")
);
const UserPage = lazy(() => import("../pages/UserPage/UserPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage/NotFoundPage"));

import style from "./App.module.css";

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className={style.container}>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/recipe/:id" element={<RecipePage />}></Route>
          <Route path="/recipe/add" element={<AddRecipePage />}></Route>
          <Route path="/user/:id" element={<UserPage />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>

          {/* <Route path="/catalog/:catalogId" element={<DetailsPage />}>
            <Route index element={<Navigate to="features" />} />
            <Route path="features" element={<Features />}></Route>
            <Route path="reviews" element={<Reviews />}></Route>
          </Route> */}
        </Routes>
      </div>
    </Suspense>
  );
};

export default App;
