import React from 'react';
import { useState } from 'react';

export const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    const query = e.target.value;
    setQuery(query);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(query);
  };
  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="query"
          value={query}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

// export class SearchBar extends React.Component {
//   state = {
//     query: '',
//   };
//   handleChange = e => {
//     const query = e.target.value;
//     this.setState({ query });
//   };

//   handleSubmit = e => {
//     const { query } = this.state;
//     e.preventDefault();
//     this.props.onSubmit(query);
//   };
//   render() {
//     const { query } = this.state;
//     const { handleChange, handleSubmit } = this;
//     return (
//       <header className="Searchbar">
//         <form className="SearchForm" onSubmit={handleSubmit}>
//           <button type="submit" className="SearchForm-button">
//             <span className="SearchForm-button-label">Search</span>
//           </button>

//           <input
//             className="SearchForm-input"
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             name="query"
//             value={query}
//             onChange={handleChange}
//           />
//         </form>
//       </header>
//     );
//   }
// }
