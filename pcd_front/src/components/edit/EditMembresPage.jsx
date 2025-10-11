import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/css/edit/editMembres.css';
import { API_BASE_URL } from '../../config';

const MembreForm = ({ onSubmit, initialData = {} }) => {
  const [nom, setNom] = useState(initialData.nom || '');
  const [profession, setProfession] = useState(initialData.profession || '');
  const [bio, setBio] = useState(initialData.bio || '');
  const [linkFb, setLinkFb] = useState(initialData.linkFb || '');
  const [linkInsta, setLinkInsta] = useState(initialData.linkInsta || '');
  const [linkLin, setLinkLin] = useState(initialData.linkLin || '');
  const [img, setImg] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('profession', profession);
    formData.append('bio', bio);
    formData.append('linkFb', linkFb);
    formData.append('linkInsta', linkInsta);
    formData.append('linkLin', linkLin);
    if (img) formData.append('img', img);

    onSubmit(formData);
    console.log(formData)
    setNom('');
    setProfession('');
    setBio('');
    setLinkFb('');
    setLinkInsta('');
    setLinkLin('');
    setImg(null);
  };

  return (
    <form onSubmit={handleSubmit} className="membre-form" encType="multipart/form-data">
      <div className="form-group"><label>Nom</label><input value={nom} onChange={e => setNom(e.target.value)} required /></div>
      <div className="form-group"><label>Profession</label><input value={profession} onChange={e => setProfession(e.target.value)} required /></div>
      <div className="form-group"><label>Bio</label><textarea value={bio} onChange={e => setBio(e.target.value)} required /></div>
      <div className="form-group"><label>Facebook</label><input value={linkFb} onChange={e => setLinkFb(e.target.value)} /></div>
      <div className="form-group"><label>Instagram</label><input value={linkInsta} onChange={e => setLinkInsta(e.target.value)} /></div>
      <div className="form-group"><label>LinkedIn</label><input value={linkLin} onChange={e => setLinkLin(e.target.value)} /></div>
      <div className="form-group"><label>Image</label><input type="file" onChange={e => setImg(e.target.files[0])} /></div>
      <button type="submit" className="submit-button">Ajouter Membre</button>
    </form>
  );
};

const MembresList = ({ membres, onDelete }) => (
  <div className="membres-list">
    <h2 className='text-center '>Liste des membres à afficher:</h2>
    {membres.length === 0 ? <p>Aucun membre pour l’instant.</p> : (
      <ul>
        {membres.map((m, index) => (
          <li key={m.id}>
            <div>
              <h3>{m.nom}</h3>
              <p><strong>Profession:</strong> {m.profession}</p>
              <p>{m.bio}</p>
              <div className="links">
                {m.linkFb && <a href={m.linkFb}>Facebook</a>}
                {m.linkInsta && <a href={m.linkInsta}>Instagram</a>}
                {m.linkLin && <a href={m.linkLin}>LinkedIn</a>}
              </div>
            </div>
            <div className="actions">
              <button onClick={() => onDelete(m.id)}>Supprimer</button>
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
);

const EditMembresPage = () => {
  const [membres, setMembres] = useState([]);

  const getAuthHeaders = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;
    return { Authorization: `Bearer ${token}` };
  };

  const fetchMembres = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/membre_proj/all`, {
        headers: getAuthHeaders(),
      });
      setMembres(res.data);
    } catch (err) {
      console.error("Erreur lors du chargement des membres", err);
    }
  };

  const handleAddMembre = async (formData) => {
    try {
      await axios.post(`${API_BASE_URL}/api/membre_proj/create`, formData, {
        headers: getAuthHeaders(),
      });
      fetchMembres();
    } catch (err) {
      console.error("Erreur lors de l'ajout du membre", err);
    }
  };

  const handleDeleteMembre = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/membre_proj/delete/${id}`, {
        headers: getAuthHeaders(),
      });
      fetchMembres();
    } catch (err) {
      console.error("Erreur lors de la suppression du membre", err);
    }
  };

  useEffect(() => {
    fetchMembres();
  }, []);

  return (
    <div className="edit-membres-page">
      <h1>Gestion des membres du projet</h1>
      <MembreForm onSubmit={handleAddMembre} />
      <MembresList membres={membres} onDelete={handleDeleteMembre} />
    </div>
  );
};

export default EditMembresPage;
