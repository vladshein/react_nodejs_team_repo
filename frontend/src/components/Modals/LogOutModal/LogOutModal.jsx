import { Formik, Form } from 'formik';

import toast, { Toaster } from 'react-hot-toast';
import { logout } from '../../../redux/auth/actions';
import { useDispatch } from 'react-redux';

import style from './LogOutModal.module.css';
import Modal from 'react-modal';

const LogOutModal = ({ isOpen, onRequestClose }) => {
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(logout());
    toast.success(`Successfully signed out!`);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Sign In Modal"
      className={style.modal}
      overlayClassName={style.overlay}>
      <button onClick={onRequestClose}>Close</button>

      <div className={style.formContainer}>
        <h3 className={style.formHead}>Sign In</h3>
        <Formik
          onSubmit={handleSubmit}
          className={style.form}
          // validationSchema={FeedbackSchema}
        >
          <Form className={style.feedbackFormItem}>
            <button className={style.formBtn} type="submit">
              LOG OUT
            </button>
            <button className={style.formBtn} type="button" onClick={onRequestClose}>
              CANCEL
            </button>
            <Toaster />
          </Form>
        </Formik>
      </div>
    </Modal>
  );
};

export default LogOutModal;
