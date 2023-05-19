import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getImage } from '../../services/api';
import { Loader } from 'components/Loader';
import { Button } from 'components/Button';
import { Modal } from 'components/Modal';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { ImageErrorView } from 'components/ImageErrorView/ImageErrorView';
import { GalleryList } from './ImageGallery.styled';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export function ImageGallery(props) {
  const [value, setValue] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isShowModal, setIsShowModal] = useState(false);
  const [modalData, setModalData1] = useState({ img: '', tags: '' });

  useEffect(() => {
    setPage(1);
    setValue(props.value);
  }, [props.value]);

  useEffect(() => {
    if (!value) {
      return;
    }

    if (page === 1) {
      setImages([]);
    }
    setStatus(Status.PENDING);
    if (error) {
      setError(null);
    }

    getImage(value, page)
      .then(images => {
        setImages(prevState => [...prevState, ...images.hits]);
        setTotalPages(Math.floor(images.totalHits / 12));

        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [error, page, value]);

  const setModalData = modalData => {
    setIsShowModal(true);
    setModalData1(modalData);
  };

  const handleModalClose = () => {
    setIsShowModal(false);
  };
  const handleLoadMore = () => {
    setPage(state => state + 1);
  };

  if (status === Status.IDLE) {
    return (
      <div
        style={{
          color: 'blue',
          fontSize: '36px',
          margin: '0 auto',
          textAlign: 'center',
          fontFamily: 'Delicious Handrawn, cursive',
        }}
      >
        Let`s find images together!
      </div>
    );
  }

  if (status === Status.PENDING) {
    return <Loader />;
  }

  if (status === Status.REJECTED) {
    return <ImageErrorView message={error.message} />;
  }

  if (images.length === 0) {
    return (
      <ImageErrorView
        message={`Oops... there are no images matching your search... `}
      />
    );
  }

  if (status === Status.RESOLVED) {
    return (
      <>
        <GalleryList>
          {images.map(image => (
            <ImageGalleryItem
              key={image.id}
              item={image}
              onImageClick={setModalData}
            />
          ))}
        </GalleryList>
        {images.length > 0 && Status !== 'PENDING' && page <= totalPages && (
          <Button onClick={handleLoadMore}>Load More</Button>
        )}
        {isShowModal && (
          <Modal modalData={modalData} onModalClose={handleModalClose} />
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  value: PropTypes.string.isRequired,
};

// export class ImageGallery extends Component {
//   state = {
//     value: '',
//     images: [],
//     error: null,
//     status: Status.IDLE,
//     page: 1,
//     totalPages: 0,
//     isShowModal: false,
//     modalData: { img: '', tags: '' },
//   };

//   static getDerivedStateFromProps(nextProps, prevState) {
//     if (prevState.value !== nextProps.value) {
//       return { page: 1, value: nextProps.value };
//     }
//     return null;
//   }

//   componentDidUpdate(prevProps, prevState) {
//     const prevValue = prevProps.value;
//     const nextValue = this.props.value;

//     if (prevValue !== nextValue || prevState.page !== this.state.page) {
//       this.setState({ status: Status.PENDING });

//       if (this.state.error) {
//         this.setState({ error: null });
//       }
//       getImage(nextValue, this.state.page)
//         .then(images => {
//           this.setState(prevState => ({
//             images:
//               this.state.page === 1
//                 ? images.hits
//                 : [...prevState.images, ...images.hits],
//             status: Status.RESOLVED,
//             totalPages: Math.floor(images.totalHits / 12),
//           }));
//         })
//         .catch(error => this.setState({ error, status: Status.REJECTED }));
//     }
//   }

//   handleLoadMore = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   setModalData = modalData => {
//     this.setState({ modalData, isShowModal: true });
//   };

//   handleModalClose = () => {
//     this.setState({ isShowModal: false });
//   };

//   render() {
//     const { images, error, status, page, totalPages, isShowModal, modalData } =
//       this.state;
//     if (status === 'idle') {
//       return (
//         <div
//           style={{
//             color: 'blue',
//             fontSize: '36px',
//             margin: '0 auto',
//             textAlign: 'center',
//             fontFamily: 'Delicious Handrawn, cursive',
//           }}
//         >
//           Let`s find images together!
//         </div>
//       );
//     }

//     if (status === 'pending') {
//       return <Loader />;
//     }

//     if (status === 'rejected') {
//       return <ImageErrorView message={error.message} />;
//     }

//     if (images.length === 0) {
//       return (
//         <ImageErrorView
//           message={`Oops... there are no images matching your search... `}
//         />
//       );
//     }

//     if (status === 'resolved') {
//       return (
//         <>
//           <GalleryList className="gallery">
//             {images.map(image => (
//               <ImageGalleryItem
//                 key={image.id}
//                 item={image}
//                 onImageClick={this.setModalData}
//               />
//             ))}
//           </GalleryList>
//           {images.length > 0 && status !== 'pending' && page <= totalPages && (
//             <Button onClick={this.handleLoadMore}>Load More</Button>
//           )}
//           {isShowModal && (
//             <Modal modalData={modalData} onModalClose={this.handleModalClose} />
//           )}
//         </>
//       );
//     }
//   }
// }

// ImageGallery.propTypes = {
//   value: PropTypes.string.isRequired,
// };
