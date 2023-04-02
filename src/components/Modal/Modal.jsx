import { useEffect } from 'react';

function Modal({ onClose, image }) {
  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  // componentDidMount()

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
  }, []);

  // componentWillUnmount()

  useEffect(() => {
    return window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div onClick={onClose} className="overlay">
      <div className="modal">
        <img src={image} alt={image} />
      </div>
    </div>
  );
}

export default Modal;
