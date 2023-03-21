import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { List } from 'components/ImageGallery/ImageGallery.styled';

export const ImageGallery = ({ gallery }) => {
  return (
    <List className="gallery">
      {gallery !== null &&
        gallery.map(({ id, webformatURL }) => {
          return <ImageGalleryItem key={id} webformatURL={webformatURL} />;
        })}
    </List>
  );
};
