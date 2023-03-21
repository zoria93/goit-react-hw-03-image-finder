import { Component } from 'react';
import { resetPage } from 'components/services/api';
import {
  Header,
  SearchForm,
  Button,
} from 'components/Searchbar/Searchbar.styled';

export class Searchbar extends Component {
  state = {
    imageName: '',
  };

  handleNameChange = e => {
    this.setState({ imageName: e.target.value });
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
    resetPage();
  };

  render() {
    return (
      <Header>
        <SearchForm onSubmit={this.handleSubmit} className="form">
          <Button type="submit" className="button">
            <span className="button-label">Search</span>
          </Button>

          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            value={this.state.imageName}
            onChange={this.handleNameChange}
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Header>
    );
  }
}
