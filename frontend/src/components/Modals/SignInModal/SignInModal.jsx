import React from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/auth/actions.js';
import style from './SignInModal.module.css';
import SignInForm from '../SignInForm/SignInForm.jsx';

const SignInModal = ({ isOpen, onRequestClose }) => {
  const dispatch = useDispatch();

  const submitSignIn = (payload) => {
    console.log(payload);
    const { data, error } = dispatch(login(payload));
    if (error) {
      console.log('Login failed:', error);
    } else {
      console.log('Login successful:', data);
      onRequestClose();
    }
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
