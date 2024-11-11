import React from 'react';
import axios from 'axios';
import Icon from './Icon';

export async function ToggleStar(idStar) {
  try {
    
    const response = await axios.put('http://localhost:3000/toggleStar/', { idStar });
    return response.data; 
  } catch (error) {
    console.error('Error al cambiar el estado de la estrella:', error);
    throw error; 
  }
}

export function Star({ isStarred, handleToggleStar }) {
  return (
    <div className={`star ${isStarred ? 'activo' : ''}`} onClick={handleToggleStar}>
      <Icon css={isStarred ? 'star-activo' : ''} icon="faStar" />
    </div>
  );
}
