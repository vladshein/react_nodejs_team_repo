import React from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { login, register } from '../../../redux/auth/actions.js';
import css from './SignUpModal.module.css';
import SignUpForm from '../SignUpForm/SignUpForm.jsx';

const SignUpModal = ({ isOpen, onRequestClose }) => {
  const dispatch = useDispatch();

  const submitSignUp = (payload) => {
    const { data, err } = dispatch(register(payload));
    if (err) {
      console.log('Registration failed:', err);
    } else {
      console.log('Registration successful:', data);
      dispatch(login({ email: payload.email, password: payload.password }));
      onRequestClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="SignUp Modal"
      className={css.modal}
      overlayClassName={css.overlay}>
      <SignUpForm submitSignUp={submitSignUp} />
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default SignUpModal;
