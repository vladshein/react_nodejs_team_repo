import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, persistStore } from 'redux-persist';

import { authReducer } from './auth/slice';
import { usersReducer } from './users/slice';
import { categoriesReducer } from './categories/slice';
import { areasReducer } from './areas/slice';
import { ingredientsReducer } from './ingredients/slice';
import { testimonialsReducer } from './testimonials/slice';
import { recipesReducer } from './recipes/slice';

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  categories: categoriesReducer,
  areas: areasReducer,
  ingredients: ingredientsReducer,
  testimonials: testimonialsReducer,
  recipes: recipesReducer,
});

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  reducer: rootReducer,
});

export const persistor = persistStore(store);
