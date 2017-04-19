import React, { PropTypes } from 'react';

const Search = ({ handleSearch }) => (
  <div className="search">
    <input
      type="search"
      placeholder="Procure por uma organização..."
      onKeyUp={handleSearch}
    />
  </div>
);

Search.propTypes = {
  handleSearch: PropTypes.func.isRequired
};

export default Search;