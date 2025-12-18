import toast, { Toaster } from 'react-hot-toast';
import { logout } from '../../../redux/auth/actions';
import { useDispatch } from 'react-redux';

import style from './LogOutModal.module.css';
import Modal from 'react-modal';
import IconClose from '../../common/icons/IconClose';
import { useNavigate } from 'react-router-dom';

const LogOutModal = ({ isOpen, onRequestClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const windowWidth = window.innerWidth;

  const handleLogOut = () => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        onRequestClose();
        toast.success(`Successfully signed out!`);
        navigate('/');
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
      overlayClassName={style.overlay}
      bodyOpenClassName={style.bodyModalOpen}>
      <button className={style.closeBtn} onClick={onRequestClose}>
        <IconClose />
      </button>

      <div className={style.container}>
        <h3 className={style.head}>{windowWidth < 768 ? 'LOG OUT' : 'ARE YOU LOGGING OUT?'}</h3>
        <p className={style.text}>You can always log back in at my time.</p>

        <div className={style.btnsContainer}>
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
