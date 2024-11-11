import React, { useState } from 'react';
import { marked } from 'marked';
import { ToggleStar, Star } from './utils/ToggleStar';
import '../styles/crud.css';
import Icon from './utils/Icon';
import axios from 'axios';

export default function ModificarTarea({ tarea, onClose }) {
  const [markdown, setMarkdown] = useState(tarea.contenido || '');
  const [isStarred, setIsStarred] = useState(tarea.star === 1);
  
  const handleChange = (e) => {
    setMarkdown(e.target.value);
  };

  const renderMarkdown = () => {
    return { __html: marked(markdown) }; 
  };

  const handleToggleStar = async () => {
    try {
      setIsStarred(!isStarred);
      await ToggleStar(tarea.id);
    } catch (error) {
      console.error('Error al actualizar la estrella');
    }
  };

  const formatearFecha = (fecha) => {
    const meses = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const date = new Date(fecha);
    
    const dia = date.getDate().toString().padStart(2, '0'); 
    const mes = meses[date.getMonth()];
    const año = date.getFullYear();
    
    return `${dia}/${mes}/${año}`;
  };

  const handleEditar = () => {
    try {
      const res = axios.put('http://localhost:3000/updateTask',{
        content: markdown,
        idTarea: tarea.idTarea
      });
      setTasks(res.data);
    } catch (error) {
      console.error("Error al obtener las tareas:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
    
  };

  const handledelete = () => {
    axios.delete(`http://localhost:3000/deleteTask/${tarea.idTarea}`)

  }

  return (
    <div className="smoke">
      <div className="card">
        <header>
          <h2>{tarea.titulo}</h2>
          <Star isStarred={isStarred} handleToggleStar={handleToggleStar}/>
        </header>
        <div className="fechas">
          <span className="creacion">
            <Icon icon="faCalendarPlus"/>
            {formatearFecha(tarea.created)}
          </span>
          <span className="modifi">
            <Icon icon="faSquarePen"/>
            {formatearFecha(tarea.modified)}
          </span>
        </div>
        <div className="contenido">
          <div className="input">
            <h3>Editor</h3>
            <hr />
            <textarea
              value={markdown}
              onChange={handleChange}
              rows="10"
              cols="50"
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
          <div className="editar" onClick={handleEditar}>
            Editar
          </div>
          <div className="eliminar" onClick={handledelete}>
            Elimina
          </div>
        </div>
      </div>
    </div>
  );
}
