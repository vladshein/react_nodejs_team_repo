import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { openModal } from '../../redux/modal/modalSlice';

const RequireAuthAction = ({ children, to }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      e.stopPropagation();
      dispatch(openModal({ modalType: 'auth', modalProps: { view: 'signIn', redirectTo: to } }));
      return;
    }

    const isLink = children.type.name === 'NavLink' || children.type === 'a';
    if (to && !isLink) {
      navigate(to);
    }
  };

  return React.cloneElement(children, {
    onClick: handleClick,
  });
};

export default RequireAuthAction;
