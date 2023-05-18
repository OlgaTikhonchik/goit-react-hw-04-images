import PropTypes from 'prop-types';
import { Text } from './ImageErrorView.styled';

export const ImageErrorView = ({ message }) => {
  return (
    <div role="alert">
      <img src="" alt="" />
      <Text>{message}</Text>
    </div>
  );
};

ImageErrorView.propTypes = {
  message: PropTypes.string,
};
