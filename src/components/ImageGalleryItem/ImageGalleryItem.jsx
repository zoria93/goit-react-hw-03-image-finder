import { Item } from 'components/ImageGalleryItem/ImageGalleryItem.styled';

export const ImageGalleryItem = ({ webformatURL }) => {
  return (
    <Item className="gallery-item">
      <img src={webformatURL} alt="" />
    </Item>
  );
};
