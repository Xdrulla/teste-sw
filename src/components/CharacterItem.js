import React from 'react';
import { Link } from 'react-router-dom';

const getIdFromUrl = (url) => {
  const urlParts = url.split('/');
  return urlParts[urlParts.length - 2];
};

const CharacterItem = ({ character }) => {
  const characterId = getIdFromUrl(character.url);

  return (
    <li>
      <Link to={`/characters/${characterId}`}className='character-link'>
        <h2>{character.name}</h2>
      </Link>
        <p>Gênero: {character.gender}</p>
        <p>Numero de filmes: {character.films.length}</p>

    </li>
  );
};

export default CharacterItem;