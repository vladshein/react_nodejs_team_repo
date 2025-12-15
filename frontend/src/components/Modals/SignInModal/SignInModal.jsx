import React from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/auth/actions.js';
import style from './SignInModal.module.css';
import SignInForm from '../SignInForm/SignInForm.jsx';

const SignInModal = ({ isOpen, onRequestClose }) => {
  const dispatch = useDispatch();

  const submitSignIn = (payload) => {
    dispatch(login(payload))
      .unwrap()
      .then(() => {
        console.log('Login successful');
        onRequestClose();
      })
      .catch((error) => {
        console.log('Login failed:', error);
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Sign In Modal"
      className={style.modal}
      overlayClassName={style.overlay}>
      <SignInForm submitSignIn={submitSignIn} />
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default SignInModal;
