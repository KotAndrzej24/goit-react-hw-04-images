import { Component } from 'react';

class Modal extends Component {
  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    return (
      <div onClick={this.props.onClose} className="overlay">
        <div className="modal">
          <img src={this.props.image} alt={this.props.image} />
        </div>
      </div>
    );
  }
}

export default Modal;
