export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

export const selectUserInfo = (state) => state.auth.user;

export const selectUserId = (state) => state.auth.user.id;

export const selectUserName = (state) => state.auth.user?.name;

export const selectUserAvatar = (state) => state.auth.user?.avatar;

export const selectIsLoading = (state) => state.auth.isLoading;

export const selectIsRefreshing = (state) => state.auth.isRefreshing;

export const selectAuthError = (state) => state.auth.error;
