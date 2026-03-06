import { useState, useEffect } from 'react';
import { db } from './firebase'; // Ividutthe './' valare mukhyaamaanu!
import { collection, addDoc, onSnapshot, deleteDoc, doc } from "firebase/firestore";
function UserManager() {
  const [inputValue, setInputValue] = useState("");
  const [users, setUsers] = useState([]);

  // 1. Real-time aayi cloud-il ninnu data edukkaam
  useEffect(() => {
    const usersCollection = collection(db, "users");
    
    // onSnapshot: Database-il enthu maattam vannalum refresh aakathe data kittum
    const unsubscribe = onSnapshot(usersCollection, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      setUsers(data);
    });

    return () => unsubscribe();
  }, []);

  // 2. Cloud-ilekku puthiya user-e add cheyyaan
  const addUser = async () => {
  if (!inputValue) return;
  
  // Ithu pole oru object database-ilekku ayakkuka
  await addDoc(collection(db, "users"), {
    name: inputValue,
    timestamp: new Date(), // Ennu add cheythu ennu track cheyyaan
    status: "active"      // Oru puthiya field koodi add cheyyunnu
  });
  
  setInputValue("");
};

  // 3. Cloud-il ninnu delete cheyyaan
  const deleteUser = async (id) => {
    await deleteDoc(doc(db, "users", id));
  };

  return (
    <div className="user-manager-card">
      <h2 style={{color: 'white'}}>🔥 Firebase Cloud Users</h2>
      <input 
        value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)} 
        placeholder="Enter name..."
      />
      <button onClick={addUser}>Add to Cloud</button>

      <ul>
        {users.map(user => (
          <li key={user.id} style={{color: 'white', background: 'rgba(0,0,0,0.2)', margin: '10px', padding: '15px', borderRadius: '10px'}}>
            <div>
              <strong>{user.name}</strong> 
              <br />
              <small style={{color: '#aaa'}}>
                Added: {user.timestamp?.toDate().toLocaleString()} 
              </small>
            </div>
            <button onClick={() => deleteUser(user.id)} style={{background: 'red'}}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserManager;