import Modal from 'react-modal';
import style from './Modal.module.css';

const ModalComponent = ({ modalIsOpen, closeModal, component: Component }) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      className={style.modal}
      overlayClassName={style.overlay}
      contentLabel="Modal">
      <button onClick={closeModal} className={style.closeBtn}>
        x
      </button>
      {Component}
    </Modal>
  );
};

export default ModalComponent;
