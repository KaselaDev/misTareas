import React, { useState } from 'react';
import { marked } from 'marked';
import { Star } from './utils/ToggleStar';
import '../styles/crud.css';
import Icon from './utils/Icon';
import axios from 'axios';

export default function CrearTarea({ onClose, onTaskCreated }) {
  const [titulo, setTitulo] = useState(''); // Estado para el título de la tarea
  const [markdown, setMarkdown] = useState('');
  const [isStarred, setIsStarred] = useState(false);

  const handleChange = (e) => {
    setMarkdown(e.target.value);
  };

  const renderMarkdown = () => {
    return { __html: marked(markdown) }; 
  };

  const handleToggleStar = () => {
    setIsStarred(!isStarred);
  };

  const handleCrear = async () => {
    try {
      const nuevaTarea = {
        titulo, // Ahora el título está tomado del estado
        contenido: markdown,
      };

      const res = await axios.post('https://mistareasapi.onrender.com/setTask', nuevaTarea);
      
      if (onTaskCreated) onTaskCreated(res.data); // Llamar a la función onTaskCreated si se proporciona
      onClose(); // Cerrar el modal o componente de creación

    } catch (error) {
      console.error("Error al crear la tarea:", error);
    }
  };

  return (
    <div className="smoke">
      <div className="card">
        <header>
          <h2>
            <input 
              type="text" 
              value={titulo} 
              onChange={(e) => setTitulo(e.target.value)} // Permite al usuario cambiar el título
              placeholder="Escribe el título de la tarea" 
            />
          </h2>
          <Star isStarred={isStarred} handleToggleStar={handleToggleStar} />
        </header>
        <div className="contenido">
          <div className="input">
            <h3>Editor</h3>
            <hr />
            <textarea
              value={markdown}
              onChange={handleChange}
              rows="10"
              cols="50"
              placeholder="Escribe aquí el contenido de la nueva tarea"
            />
          </div>
          <hr />
          <div className="preview">
            <h3>Vista Previa:</h3>
            <hr />
            <div
              className="markdown-preview"
              dangerouslySetInnerHTML={renderMarkdown()} 
            />
          </div>
        </div>
        <div className="opciones">
          <div className="crear" onClick={handleCrear}>
            Crear
          </div>
          <div className="cancelar" onClick={onClose}>
            Cancelar
          </div>
        </div>
      </div>
    </div>
  );
}
