import React from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/auth/actions.js';
import css from './SignInModal.module.css';
import SignInForm from '../SignInForm/SignInForm.jsx';

const SignInModal = ({ isOpen, onRequestClose }) => {
  const dispatch = useDispatch();

  const submitSignIn = (data) => {
    console.log(data);

    dispatch(login(data));
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Sign In Modal"
      className={css.modal}
      overlayClassName={css.overlay}>
      <SignInForm submitSignIn={submitSignIn} />
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default SignInModal;
