import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { login, refreshUser, register } from '../../../redux/auth/actions.js';
import style from './AuthModal.module.css';
import SignInForm from '../SignInForm/SignInForm.jsx';
import SignUpForm from '../SignUpForm/SignUpForm.jsx';
import IconClose from '../../common/icons/IconClose.jsx';
import { updateModalProps } from '../../../redux/modal/modalSlice.js';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { selectModalProps } from '../../../redux/modal/selectors.js';

const AuthModal = ({ isOpen, onRequestClose, view }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modalProps = useSelector(selectModalProps);

  const setView = (view) => {
    dispatch(updateModalProps({ view }));
  };

  const submitSignIn = (payload, actions) => {
    dispatch(login(payload))
      .unwrap()
      .then(() => {
        return dispatch(refreshUser());
      })
      .then(() => {
        console.log('Login successful');
        onRequestClose();
        if (modalProps.redirectTo) {
          navigate(modalProps.redirectTo);
        }
      })
      .catch((error) => {
        console.log('Login failed:', error);
        if (error.status === 401) {
          actions.setErrors({
            email: 'Email or password invalid',
          });
          toast.error('Email or password invalid');
        }
      })
      .finally(() => {
        actions.setSubmitting(false);
      });
  };

  const submitSignUp = (payload, actions) => {
    dispatch(register(payload))
      .unwrap()
      .then((data) => {
        console.log('Registration successful:', data);
        return dispatch(login({ email: payload.email, password: payload.password }));
      })
      .then(() => {
        console.log('Login after registration successful');
        onRequestClose();
      })
      .catch((err) => {
        if (err.status === 409) {
          actions.setErrors({
            email: 'Email already in use',
          });
        }
        console.log('Registration failed:', err);
      })
      .finally(() => {
        actions.setSubmitting(false);
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Auth Modal"
      className={style.modal}
      overlayClassName={style.overlay}
      ariaHideApp={true}
      shouldCloseOnOverlayClick={true}
      shouldFocusAfterRender={true}
      role="dialog">
      <button className={style.closeBtn} onClick={onRequestClose} aria-label="Close modal">
        <IconClose />
      </button>
      {view === 'signIn' ? (
        <div>
          <SignInForm submitSignIn={submitSignIn} setView={setView} />
        </div>
      ) : (
        <div>
          <SignUpForm submitSignUp={submitSignUp} setView={setView} />
        </div>
      )}
    </Modal>
  );
};

export default AuthModal;
