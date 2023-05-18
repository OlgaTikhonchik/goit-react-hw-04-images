import PropTypes from 'prop-types';
import { GalleryImg, GalleryItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ item, onImageClick }) => {
  const { largeImageURL, tags, webformatURL } = item;
  console.log(item.largeImageURL);
  return (
    <GalleryItem>
      <GalleryImg
        onClick={() => onImageClick({ largeImageURL, tags })}
        src={webformatURL}
        alt={tags}
      />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
  }).isRequired,
  onImageClick: PropTypes.func.isRequired,
};
