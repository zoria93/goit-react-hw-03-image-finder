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
    images: null,
    loading: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.imageName;
    console.log(prevName);
    const nextName = this.state.imageName;
    console.log(nextName);
    if (prevName !== nextName) {
      this.setState({ loading: true });

      getImages(nextName)
        .then(images => this.setState({ images: images.hits }))

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
      .then(images => images.hits)
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
    console.log(gallery);
    const { loading } = this.state;
    return (
      <Conteiner>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery gallery={gallery} />
        {loading && <Loader />}
        <Button onClick={this.handleButtonClick} />
      </Conteiner>
    );
  }
}
