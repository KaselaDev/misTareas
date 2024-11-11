import React, { useState } from 'react';
import Icon from './utils/Icon';
import CrearTarea from './CrearTarea'; // Importamos el componente CrearTarea
import '../styles/header.css';

export default function HeaderDashboard() {
    const [user, setUser] = useState(false);
    const [mostrarCrearTarea, setMostrarCrearTarea] = useState(false); // Estado para mostrar CrearTarea

    const userBtn = () => {
        if (user) {
            bar1.style.transform = "translateY(-50%) rotate(0deg)";
            bar3.style.transform = "translateY(-50%) rotate(0deg)";
            bar2.style.opacity = "1";
            setTimeout(() => {
                bar1.style.top = "25%";
                bar3.style.top = "75%";
            }, 100);
        } else {
            bar1.style.top = "50%";
            bar3.style.top = "50%";
            bar2.style.opacity = "0";
            setTimeout(() => {
                bar1.style.transform = "translateY(-50%) rotate(45deg)";
                bar3.style.transform = "translateY(-50%) rotate(-45deg)";
            }, 100);
        }
        setUser(x => !x);
    };

    const handleCrearTareaClick = () => {
        setMostrarCrearTarea(true); // Cambiar el estado para mostrar CrearTarea
    };

    return (
        <>
            <header>
                <div className="titulo">
                    <h1>Mis Tareas</h1>
                </div>
                <nav>
                    <div className="add" onClick={handleCrearTareaClick}> {/* Al hacer clic, mostrar CrearTarea */}
                        <Icon css="icon" icon="faAdd"/>
                        <p>Crear tarea</p>
                    </div>
                    <div className="user" onClick={userBtn}>
                        <div className="icon">
                            <div className="bar1" id="bar1" />
                            <div className="bar2" id="bar2" />
                            <div className="bar3" id="bar3" />
                        </div>
                    </div>
                </nav>
            </header>
            <div className="separadorheader" />
            
            {/* Condicionalmente mostrar CrearTarea */}
            {mostrarCrearTarea && <CrearTarea onClose={() => setMostrarCrearTarea(false)} />} 
        </>
    );
}
