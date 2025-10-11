import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserPlus, FaTrash } from 'react-icons/fa';
import '../../assets/css/edit/userManagement.css';
import { toast } from 'react-toastify';
import { API_BASE_URL } from '../../config';
const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');



  //Charger tous les utilisateurs au montage
  useEffect(() => {
    

    fetchAllUsers();
  }, []);


  const fetchAllUsers = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;
      
      const response = await axios.get(`${API_BASE_URL}/getAllUsers`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setUsers(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs', error);
      toast.error('Erreur lors de la récupération des utilisateurs');
    }
  };
  

  // Ajouter un utilisateur
  const addUserToBackend = async (user) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/add`, user);
      alert(response.data);
      fetchAllUsers(); // Met à jour la liste après ajout
    } catch (err) {
      console.error(err);
      setError("Erreur lors de l’ajout de l’utilisateur");
    }
  };

  // Supprimer un utilisateur via son email
  const deleteUserFromBackend = async (email) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;
  
      await axios.delete(`${API_BASE_URL}/delete-by-email`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { email },
      });
  
      fetchAllUsers(); // Rafraîchir la liste après suppression
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la suppression de l’utilisateur");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim()) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    const newUser = {
      username: name,
      email: email,
      role: role.toUpperCase(),
    };

    addUserToBackend(newUser);

    setName('');
    setEmail('');
    setRole('');
  };

  return (
    <div className="user-management">
      <h1>Gestion des utilisateurs</h1>

      <form onSubmit={handleSubmit} className="add-user-form">
        <div className="form-group">
          <label htmlFor="name">Nom de médecin</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nom du médecin"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>  
        <div className="form-group">
          <label htmlFor="role">Rôle</label>
          <select id="role" value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="" disabled hidden>-- Sélectionner un rôle --</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="add-button">
          <FaUserPlus /> Ajouter un utilisateur
        </button>
      </form>

      <div className="user-list">
        <h2 className='text-center'>Utilisateurs existants</h2>
        {users.length === 0 ? (
          <p>Aucun utilisateur ajouté.</p>
        ) : (
          <ul>
            {users.map((user, index) => (
              <li key={index}>
                <span>{user.username} ({user.email}) - {user.role}</span>
                <button onClick={() => deleteUserFromBackend(user.email)} className="delete-button123">
                  <FaTrash /> Supprimer
                </button>


              </li>

            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
