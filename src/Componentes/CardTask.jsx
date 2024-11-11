import React, { useState } from 'react';
import Icon from './utils/Icon';
import { ToggleStar, Star } from './utils/ToggleStar.jsx';

export default function CardTask({ titulo, desc, star, id, onModificarTarea }) {
  const [isStarred, setIsStarred] = useState(star === 1);

  const handleToggleStar = async () => {
    try {
      setIsStarred(!isStarred);
      await ToggleStar(id);
    } catch (error) {
      console.error('Error al actualizar la estrella');
    }
  };

  return (
    <div className="cardTask">
      <div className="titulo">
        <h3>{titulo}</h3>
        <Star isStarred={isStarred} handleToggleStar={handleToggleStar} />
      </div>
      <div className="content">
        <h4>{desc}</h4>
      </div>
      <div className="opciones" onClick={onModificarTarea}>
        <Icon icon="faBars" />
      </div>
    </div>
  );
}