import { Component } from 'react';

class SearchBar extends Component {
  state = {
    value: '',
  };
  submitHandler = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.value);
  };

  changeHandler = e => {
    const value = e.target.value;
    this.setState({ value: value });
  };

  render() {
    return (
      <header className="searchBar">
        <form className="form" onSubmit={this.submitHandler}>
          <button type="submit" className="button">
            <span className="buttonLabel">Search</span>
          </button>

          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.changeHandler}
          />
        </form>
      </header>
    );
  }
}

export default SearchBar;
