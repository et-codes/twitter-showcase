import '../styles/SearchBar.css';

const SearchBar = ({ text, handleChange, handleSubmit }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="Search-input"
          placeholder="Search for topic or @username"
          value={text}
          onChange={handleChange}
        />
      </form>
    </div>
  );
}

export default SearchBar;