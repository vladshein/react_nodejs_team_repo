import React from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { login, register } from '../../../redux/auth/actions.js';
import style from './AuthModal.module.css';
import SignInForm from '../SignInForm/SignInForm.jsx';
import SignUpForm from '../SignUpForm/SignUpForm.jsx';

const AuthModal = ({ isOpen, onRequestClose, view, setView }) => {
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

  const submitSignUp = (payload) => {
    dispatch(register(payload))
      .unwrap()
      .then((data) => {
        console.log('Registration successful:', data);
        dispatch(login({ email: payload.email, password: payload.password }));
        onRequestClose();
      })
      .catch((err) => {
        console.log('Registration failed:', err);
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Auth Modal"
      className={style.modal}
      overlayClassName={style.overlay}>
      {view === 'signIn' ? (
        <div>
          <SignInForm submitSignIn={submitSignIn} />
          <p>
            Don't have an account? <button onClick={() => setView('signUp')}>Sign Up</button>
          </p>
        </div>
      ) : (
        <div>
          <SignUpForm submitSignUp={submitSignUp} />
          <p>
            Already have an account? <button onClick={() => setView('signIn')}>Sign In</button>
          </p>
        </div>
      )}
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default AuthModal;
