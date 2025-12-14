import React from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { register } from '../../../redux/auth/actions.js';
import css from './SignUpModal.module.css';

const SignUpModal = ({ isOpen, onRequestClose }) => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.elements.name.value;
    const email = form.elements.email.value;
    const password = form.elements.password.value;
    dispatch(register({ name, email, password }));
    form.reset();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="SignUpModal Modal"
      className={css.modal}
      overlayClassName={css.overlay}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" />
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Register</button>
      </form>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default SignUpModal;
