import { Component } from 'react';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { incrementPage, getImages } from 'components/services/api';
import { Button } from 'components/Button/Button';
import { Conteiner } from 'components/App.styled';
import { Loader } from 'components/Loader/Loader';

export class App extends Component {
  state = {
    imageName: null,
    images: [],
    loading: false,
    renderBtn: true,
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.imageName;
    const nextName = this.state.imageName;
    if (prevName !== nextName) {
      this.setState({ loading: true });
      getImages(nextName)
        .then(images => {
          if (images.hits.length !== 0) {
            this.setState({ images: images.hits });
          } else {
            alert(`No photo with name ${nextName}`);
          }
        })
        .catch(error => console.log(error.message))
        .finally(() => this.setState({ loading: false }));
    }
  }

  handleFormSubmit = imageName => {
    this.setState({ imageName });
  };

  handleButtonClick = e => {
    const nextName = this.state.imageName;
    e.preventDefault();
    incrementPage();
    this.setState({ loading: true });
    getImages(nextName)
      .then(images => {
        if (this.state.images.length === images.totalHits) {
          this.setState({ renderBtn: false });
        }
        if (images) {
          const imagesHits = images.hits;
          return imagesHits;
        }
      })
      .then(imagesHits =>
        this.setState(prevState => {
          return { images: [...prevState.images, ...imagesHits] };
        })
      )
      .catch(error => console.log(error.message))
      .finally(() => this.setState({ loading: false }));
  };

  render() {
    const gallery = this.state.images;
    const { loading, renderBtn } = this.state;
    return (
      <Conteiner>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery gallery={gallery} />
        {loading && <Loader />}
        {this.state.images.length !== 0 && renderBtn && (
          <Button onClick={this.handleButtonClick} />
        )}
      </Conteiner>
    );
  }
}
