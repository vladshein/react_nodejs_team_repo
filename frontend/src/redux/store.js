import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, persistStore } from 'redux-persist';

import { authReducer } from './auth/slice';
import { usersReducer } from './users/slice';
import { categoriesReducer } from './categories/slice';
import { areasReducer } from './areas/slice';
import { ingredientsReducer } from './ingredients/slice';
import { testimonialsReducer } from './testimonials/slice';
import { recipesReducer } from './recipes/slice';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

const rootReducer = combineReducers({
  auth: persistedAuthReducer,
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
