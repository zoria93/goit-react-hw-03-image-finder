import { Component } from 'react';
import React from 'react';
import { ToastContainer } from 'react-toastify';
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
    const { loading } = this.state;
    return (
      <Conteiner>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {/* Same as */}
        <ToastContainer />
        <Searchbar onSubmit={this.handleFormSubmit} />
        {this.state.images.length !== 0 && <ImageGallery gallery={gallery} />}
        {loading && <Loader />}
        {this.state.images.length !== 0 && (
          <Button onClick={this.handleButtonClick} />
        )}
      </Conteiner>
    );
  }
}
