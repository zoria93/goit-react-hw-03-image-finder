import { Component } from 'react';

export class Searchbar extends Component {
  state = {
    imageName: '',
  };

  handleNameChange = e => {
    this.setState({ imageName: e.target.value });
    console.log(e.target.value);
  };

  handleSubmit = e => {
    const { imageName } = this.state;
    e.preventDefault();
    if (this.state.imageName.trim() === '') {
      alert('Напишіть імя картинки');
      return;
    }
    this.props.onSubmit(imageName);
    this.setState({ imageName: '' });
  };

  render() {
    return (
      <header>
        <form onSubmit={this.handleSubmit} className="form">
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            value={this.state.imageName}
            onChange={this.handleNameChange}
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
