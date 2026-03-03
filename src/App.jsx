import { useState, useEffect } from 'react'
import UserCard from './UserCard';

function App() {
  const [inputValue, setInputValue] = useState("");
  
  // Memory-il ninnu data edukkuvan
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("myUsers");
    return saved ? JSON.parse(saved) : [{ id: 1, name: "Sarah" }];
  });

  // Users list maarumbo save cheyyan
  useEffect(() => {
    localStorage.setItem("myUsers", JSON.stringify(users));
  }, [users]);

  const addUser = () => {
    if (!inputValue) return;
    setUsers([...users, { id: Date.now(), name: inputValue }]);
    setInputValue("");
  };

  const deleteUser = (id) => {
    setUsers(users.filter(u => u.id !== id));
  };

  const editUser = (id) => {
    const newName = prompt("New name:");
    if (newName) {
      setUsers(users.map(u => u.id === id ? { ...u, name: newName } : u));
    }
  };

  return (
  <div className="container">
    <h2>👥 Team Manager</h2>
    
    <div className="input-group">
      <input 
        value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)} 
        placeholder="Enter team member name..."
      />
      <button className="add-btn" onClick={addUser}>Add</button>
    </div>

    <div className="user-list">
      {users.map(u => (
        <UserCard 
          key={u.id} 
          name={u.name} 
          onDelete={() => deleteUser(u.id)} 
          onEdit={() => editUser(u.id)} 
        />
      ))}
    </div>
  </div>
);
}
export default App;