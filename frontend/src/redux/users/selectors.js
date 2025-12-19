export const selectCurrentUser = (state) => state.users.currentUser;

export const selectSelectedUser = (state) => state.users.selectedUser;

export const selectUserIsLoading = (state) => state.users.isLoading;

export const selectUserError = (state) => state.users.error;
