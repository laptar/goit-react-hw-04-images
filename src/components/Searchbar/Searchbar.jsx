import PropTypes from 'prop-types';

import s from './Serchbar.module.css';
import { useState } from 'react';

export const Serchbar = ({ onSubmit, onChangePerPage }) => {
  const [input, setInput] = useState('');

  const handleApdateInpuy = e => {
    setInput(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (input.trim() !== '') {
      onSubmit(input);
      handleReset();
    }
  };
  const handleReset = () => {
    setInput('');
  };
  const handlePerPage = e => {
    onChangePerPage(e.target.value);
  };

  return (
    <header className={s.searchbar}>
      <label className={s.show}>
        Show pictures:
        <select name="perPage" onChange={handlePerPage}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
      </label>
      <form className={s.form} onSubmit={handleSubmit}>
        <button type="submit" className={s.button}>
          <span className={s.buttonLabel}>Search</span>
        </button>

        <input
          className={s.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={input}
          onChange={handleApdateInpuy}
        />
      </form>
    </header>
  );
};

Serchbar.propTypes = {
  onSubmit: PropTypes.func,
  onChangePerPage: PropTypes.func,
};
