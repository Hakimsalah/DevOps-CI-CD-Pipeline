import React, { useState } from 'react';
import '../../assets/css/edit/editNews.css';

const NewsForm = ({ onSubmit, initialData = {} }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [description, setDescription] = useState(initialData.description || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description });
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="news-form">
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter news title"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter news description"
          required
        ></textarea>
      </div>
      <button type="submit" className="submit-button">
        {initialData.title ? 'Update News' : 'Add News'}
      </button>
    </form>
  );
};

const NewsList = ({ news, onEdit, onDelete }) => {
  return (
    <div className="news-list">
      <h2>News Articles</h2>
      {news.length === 0 ? (
        <p>No news articles yet.</p>
      ) : (
        <ul>
          {news.map((item, index) => (
            <li key={index}>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <div className="actions">
                <button onClick={() => onEdit(index)} className="edit-button">
                  Edit
                </button>
                <button onClick={() => onDelete(index)} className="delete-button">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const EditNewsPage = () => {
  const [news, setNews] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddOrUpdate = (data) => {
    if (editingIndex !== null) {
      // Update existing news
      const updatedNews = [...news];
      updatedNews[editingIndex] = data;
      setNews(updatedNews);
      setEditingIndex(null);
    } else {
      // Add new news
      setNews([...news, data]);
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updatedNews = news.filter((_, i) => i !== index);
    setNews(updatedNews);
  };

  return (
    <div className="edit-news-page">
      <h1>Edit News</h1>
      <NewsForm
        onSubmit={handleAddOrUpdate}
        initialData={editingIndex !== null ? news[editingIndex] : {}}
      />
      <NewsList news={news} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default EditNewsPage;