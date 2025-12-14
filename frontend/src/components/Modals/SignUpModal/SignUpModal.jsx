import React from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { register } from '../../../redux/auth/actions.js';
import css from './SignUpModal.module.css';
import SignUpForm from '../SignUpForm/SignUpForm.jsx';

const SignUpModal = ({ isOpen, onRequestClose }) => {
  const dispatch = useDispatch();

  const submitSignUp = (data) => {
    dispatch(register(data));
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
