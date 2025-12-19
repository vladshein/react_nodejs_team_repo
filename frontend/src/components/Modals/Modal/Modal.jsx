import React from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';
import IconClose from '../../common/icons/IconClose';

const Modal = ({ isOpen, onClose, children, title }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
      ariaHideApp={false}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      appElement={document.getElementById('root')}>
      <div className={styles.container}>
        {title && <h2 className={styles.title}>{title}</h2>}
        <button onClick={onClose} className={styles.closeButton}>
          <IconClose />
        </button>
        {children}
      </div>
    </ReactModal>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

export default Modal;
