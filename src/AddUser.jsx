function AddUser({ inputValue, setInputValue, inputAge, setInputAge, onAdd }) {
  return (
    <div className="input-group">
      <input 
        value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)} 
        placeholder="Name..."
      />
      <input 
        value={inputAge} 
        onChange={(e) => setInputAge(e.target.value)} 
        placeholder="Age..."
      />
      <button className="add-btn" onClick={onAdd}>Add</button>
    </div>
  );
}
export default AddUser;