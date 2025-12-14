import React from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/auth/actions.js';
import css from './SignInModal.module.css';

const SignInModal = ({ isOpen, onRequestClose }) => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = form.elements.email.value;
    const password = form.elements.password.value;
    dispatch(login({ email, password }));
    form.reset();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Login Modal"
      className={css.modal}
      overlayClassName={css.overlay}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default SignInModal;
