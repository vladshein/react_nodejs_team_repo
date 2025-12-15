import toast, { Toaster } from 'react-hot-toast';
import { logout } from '../../../redux/auth/actions';
import { useDispatch } from 'react-redux';

import style from './LogOutModal.module.css';
import Modal from 'react-modal';
import { redirect } from 'react-router-dom';
import IconClose from '../../common/icons/IconClose';

const LogOutModal = ({ isOpen, onRequestClose }) => {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        toast.success(`Successfully signed out!`);
        redirect('/');
        onRequestClose();
      })
      .catch((error) => {
        console.log('Logout failed:', error);
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Log Out Modal"
      className={style.modal}
      overlayClassName={style.overlay}>
      <button className={style.closeBtn} onClick={onRequestClose}>
        <IconClose />
      </button>

      <div className={style.container}>
        <h3 className={style.head}>ARE YOU LOGGING OUT?</h3>
        <p className={style.text}>You can always log back in at my time.</p>

        <div>
          <button className={style.btn} onClick={() => handleLogOut()}>
            LOG OUT
          </button>
          <button
            className={`${style.btn} ${style.btnCancel}`}
            type="button"
            onClick={onRequestClose}>
            CANCEL
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LogOutModal;
