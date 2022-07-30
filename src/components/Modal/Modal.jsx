import PropTypes from 'prop-types';

import s from './Modal.module.css';
import { useEffect } from 'react';

export const Modal = ({ imgUrl, onClose }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className={s.overlay} data-overlay>
      <div className={s.modal}>
        <img src={imgUrl} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func,
  imgUrl: PropTypes.string,
};
