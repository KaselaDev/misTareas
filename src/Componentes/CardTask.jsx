import React from 'react';
import Icon from './Icon';

export default function CardTask({ titulo, desc, star, id }) {

  let cssStar = star === 1 ? "activo" : "";

  const toggleStar = (id) => {
    
    console.log("Estrella clicada:", id);
  };
  
  return (
    <div className="cardTask">
      <div className="titulo">
        <h3>{titulo}</h3>
        <div className="star" onClick={toggleStar(id)}>
          <Icon css={cssStar} icon="faStar" />
        </div>
      </div>
      <div className="content">
        <h4>{desc}</h4>
      </div>
      <div className="opciones">
        <Icon icon="faBars" />
      </div>
    </div>
  );
}
