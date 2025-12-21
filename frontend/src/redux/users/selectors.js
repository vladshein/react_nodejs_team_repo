export const selectCurrentUser = (state) => state.users.currentUser;

export const selectCurrentUserId = (state) => state.users.currentUser.id;

export const selectSelectedUser = (state) => state.users.selectedUser;

export const selectUserIsLoading = (state) => state.users.isLoading;

export const selectUserError = (state) => state.users.error;

export const selectFollowers = (state) => state.users.followers;

export const selectSelectedUserFollowers = (state) => state.users.selectedUserFollowers;

export const selectFollowing = (state) => state.users.following;

export const selectIsFollowing = (userId) => (state) => {
  const followingList = state.users.following || []; // або state.users.following
  return followingList.some((user) => String(user.id) === String(userId));
};
