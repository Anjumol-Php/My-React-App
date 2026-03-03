import { useState, useEffect } from 'react'
import UserCard from './UserCard';

function App() {
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  // Memory-il ninnu data edukkuvan
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("myUsers");
    return saved ? JSON.parse(saved) : [{ id: 1, name: "Sarah" }];
  });
const filteredUsers = users.filter(user => 
  user.name.toLowerCase().includes(searchTerm.toLowerCase())
);
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
  type="text" 
  placeholder="🔍 Search users..." 
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  style={{ marginBottom: '10px', width: '100%', padding: '10px' }}
/>
      <input 
        value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)} 
        placeholder="Enter team member name..."
      />
      <button className="add-btn" onClick={addUser}>Add</button>
    </div>

    <div className="user-list">
      {filteredUsers.map(u => (
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