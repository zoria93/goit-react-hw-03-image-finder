import { Component } from 'react';

export class ImageGallery extends Component {
  render() {
    return (
      <div>
        <p>{this.props.imageName}</p>
      </div>
    );
  }
}
