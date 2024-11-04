import React, { useState, useEffect } from 'react';
import Icon from './Icon';
import HeaderDashboard from './HeaderDashboard';
import axios from 'axios';
import CardTask from './CardTask';
import '../styles/dashboard.css';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get('http://localhost:3000/getTareasByID/');
        setTasks(res.data);
      } catch (error) {
        console.error("Error al obtener las tareas:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []); 

  if (loading) {
    return <div>Cargando tareas...</div>;
  }

  if (error) {
    return <div>Error al cargar tareas: {error.message}</div>;
  }

  return (
    <>
      <HeaderDashboard />
      <main>
        <div className='tareas'>
          {tasks.length > 0 ? (
            tasks.map((tarea) => (
              <CardTask 
                id={tarea.idTarea}
                titulo={tarea.titulo}
                desc={tarea.contenido}
                star={tarea.star} 
              />
            ))
          ) : (
            <div>No hay tareas disponibles.</div>
          )}
        </div>
        <div className="barraLateral">
          {/* Contenido de la barra lateral */}
        </div>
      </main>
    </>
  );
}
