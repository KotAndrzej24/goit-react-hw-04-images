import { useState } from 'react';

function SearchBar({ onSubmit }) {
  const [value, setValue] = useState('');

  const submitHandler = e => {
    e.preventDefault();
    onSubmit(value);
  };

  const changeHandler = e => {
    const targetValue = e.target.value;
    setValue(targetValue);
    console.log(value);
  };

  return (
    <header className="searchBar">
      <form className="form" onSubmit={submitHandler}>
        <button type="submit" className="button">
          <span className="buttonLabel">Search</span>
        </button>

        <input
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={changeHandler}
        />
      </form>
    </header>
  );
}

export default SearchBar;
