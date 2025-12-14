import { Formik, Form } from 'formik';

import toast, { Toaster } from 'react-hot-toast';
import { logout } from '../../../redux/auth/actions';
import { useDispatch } from 'react-redux';

import style from './LogOutModal.module.css';
import Modal from 'react-modal';
import { redirect } from 'react-router-dom';

const LogOutModal = ({ isOpen, onRequestClose }) => {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logout());
    toast.success(`Successfully signed out!`);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Log Out Modal"
      className={style.modal}
      overlayClassName={style.overlay}>
      <button onClick={onRequestClose}>Close</button>

      <div className={style.formContainer}>
        <h3 className={style.formHead}>Log Out</h3>
        <div className={style.formText}>Are you sure you want to log out?</div>

        <div>
          <button className={style.formBtn} onClick={() => handleLogOut()}>
            LOG OUT
          </button>
          <button className={style.formBtn} type="button" onClick={onRequestClose}>
            CANCEL
          </button>
          <Toaster />
        </div>
      </div>
    </Modal>
  );
};

export default LogOutModal;
