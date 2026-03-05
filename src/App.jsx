import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import AddUser from './AddUser';
import UserCard from './UserCard';
import Weather from './Weather';
function App() {
  const [inputValue, setInputValue] = useState("");
  const [inputAge, setInputAge] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("myUsers");
    return saved ? JSON.parse(saved) : [{ id: 1, name: "Sarah", age: "31" }];
  });

  useEffect(() => {
    localStorage.setItem("myUsers", JSON.stringify(users));
  }, [users]);

  // Functions (addUser, deleteUser, editUser) - Ithu pazhayathu pole thanne vekkuka
  const addUser = () => {
    if (!inputValue) return;
    setUsers([...users, { id: Date.now(), name: inputValue, age: inputAge }]);
    setInputValue(""); setInputAge("");
  };

  const deleteUser = (id) => setUsers(users.filter(u => u.id !== id));

  const editUser = (id) => {
    const newName = prompt("New Name:");
    const newAge = prompt("New Age:");
    if (newName && newAge) {
      setUsers(users.map(u => u.id === id ? { ...u, name: newName, age: newAge } : u));
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h2>👥 Team Manager</h2>
      
      {/* Nammal undakkiya puthiya components ingane vilikkaam */}
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
      <Weather 
        inputValue={inputValue} setInputValue={setInputValue}  
        onAdd={addUser} 
      />

      
    </div>
  );
}
export default App;