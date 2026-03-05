function UserCard({ name,age, onDelete, onEdit }) {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      padding: '12px 16px',
      backgroundColor: '#fff',
      border: '1px solid #f3f4f6',
      borderRadius: '10px',
      marginBottom: '10px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
    }}>
      <span style={{ fontWeight: '500', fontSize: '1.1rem' }}>{name}</span><h3>{age}</h3>
      
      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={onEdit} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>✏️</button>
        <button onClick={onDelete} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>🗑️</button>
      </div>
    </div>
  );
}

export default UserCard;