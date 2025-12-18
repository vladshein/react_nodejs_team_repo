const selectCategories = (state) => state.categories.categories;
const selectCategoriesLoading = (state) => state.categories.isLoading;
const selectCategoriesError = (state) => state.categories.error;

export { selectCategories, selectCategoriesLoading, selectCategoriesError };
