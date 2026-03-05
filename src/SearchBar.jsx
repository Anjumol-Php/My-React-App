function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <input 
      type="text" 
      placeholder="🔍 Search users..." 
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="search-input"
    />
  );
}
export default SearchBar;