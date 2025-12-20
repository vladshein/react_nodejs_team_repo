import { useState } from 'react';
import RecipeCard from './../../RecipePageComponents/RecipeCard/RecipeCard';
import styles from './RecipeList.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites } from './../../../redux/recipes/actions';
import { selectIsLoggedIn } from './../../../redux/auth/selectors';
import AuthModal from './../../Modals/AuthModal/AuthModal.jsx';
import {
  selectIsModalOpen,
  selectModalType,
  selectModalProps,
} from './../../../redux/modal/selectors.js';
import { closeModal } from './../../../redux/modal/modalSlice.js';

const RecipeList = ({ recipes }) => {
  const dispatch = useDispatch();

  const [favorites, setFavorites] = useState(new Set());

  const isModalOpen = useSelector(selectIsModalOpen);
  const modalType = useSelector(selectModalType);
  const modalProps = useSelector(selectModalProps);
  const handleCloseModal = () => {
    dispatch(closeModal());
  };
  const handleFavorite = async (recipeId) => {
    await addToFavorites(recipeId);
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(recipeId) ? next.delete(recipeId) : next.add(recipeId);
      return next;
    });
  };

  const isAuth = useSelector(selectIsLoggedIn);

  return (
    <>
      {recipes && recipes.length > 0
        ? recipes.map((recipe, index) => (
            <RecipeCard
              key={index}
              recipe={recipe}
              className={styles.recipeCard}
              isAuthed={false}
              onNeedAuth={(isAuth) =>
                isAuth
                  ? false
                  : // <AuthModal
                    //   isOpen={isModalOpen && modalType === 'auth'}
                    //   onRequestClose={handleCloseModal}
                    //   view={modalProps.view || 'signIn'}
                    //   redirectTo={modalProps.redirectTo || '/'}
                    // />
                    console.log('111')
              }
              onToggleFavorite={handleFavorite}
              isFavorite={null}
            />
          ))
        : 'There is no result, try something new'}
    </>
  );
};

export default RecipeList;
