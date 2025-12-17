import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../redux/modal/modalSlice';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

const AddRecipeButton = ({ style }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    if (!isLoggedIn) {
      dispatch(
        openModal({
          modalType: 'auth',
          modalProps: { view: 'signIn' },
        })
      );
      return;
    }

    navigate('/recipe/add');
  };

  return (
    <button className={style.heroButton} onClick={handleClick}>
      Add recipe
    </button>
  );
};

export default AddRecipeButton;
