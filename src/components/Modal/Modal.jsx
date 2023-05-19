import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { ModalCard, ModalDescr, ModalPicture, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export function Modal({ onModalClose, modalData }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        console.log('Нажали ESC, нужно закрыть модалку');
        onModalClose();
      }
    };
    console.log('Modal componentDidMount');
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      console.log('Modal componentWillUnmount');
    };
  }, [onModalClose]);

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onModalClose();
    }
  };

  const { largeImageURL, tags } = modalData;
  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalCard>
        <ModalPicture src={largeImageURL} alt={tags} />
        <ModalDescr>{tags}</ModalDescr>
      </ModalCard>
    </Overlay>,
    modalRoot
  );
}

Modal.propTypes = {
  modalData: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
  onModalClose: PropTypes.func.isRequired,
};

// export class Modal extends Component {
//   componentDidMount() {
//     console.log('Modal componentDidMount');
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     console.log('Modal componentWillUnmount');
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = e => {
//     if (e.code === 'Escape') {
//       console.log('Нажали ESC, нужно закрыть модалку');

//       this.props.onModalClose();
//     }
//   };

//   handleBackdropClick = event => {
//     if (event.currentTarget === event.target) {
//       this.props.onModalClose();
//     }
//   };

//   render() {
//     const { largeImageURL, tags } = this.props.modalData;
//     return createPortal(
//       <Overlay onClick={this.handleBackdropClick}>
//         <ModalCard>
//           <ModalPicture src={largeImageURL} alt={tags} />
//           <ModalDescr>{tags}</ModalDescr>
//         </ModalCard>
//       </Overlay>,
//       modalRoot
//     );
//   }
// }

// Modal.propTypes = {
//   modalData: PropTypes.shape({
//     largeImageURL: PropTypes.string.isRequired,
//     tags: PropTypes.string.isRequired,
//   }),
//   onModalClose: PropTypes.func.isRequired,
// };
