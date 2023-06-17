import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import '../styles/styles.scss';

const CharacterDetails = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [character, setCharacter] = useState(null);
  

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      try {
        setIsLoading(true);

        const response = await Axios.get(`https://swapi.dev/api/people/${id}`);
        const characterData = response.data;

        const vehiclePromises = characterData.vehicles.map((vehicleUrl) =>
          Axios.get(vehicleUrl)
        );
        const speciesPromises = characterData.species.map((speciesUrl) =>
          Axios.get(speciesUrl)
        );

        const vehicleResponses = await Promise.all(vehiclePromises);
        const speciesResponses = await Promise.all(speciesPromises);

        const vehicles = vehicleResponses.map(
          (response) => response.data.name
        );
        const species = speciesResponses.map((response) => response.data.name);
        const languages = speciesResponses.map(
          (response) => response.data.language || ''
        );

        setCharacter({
          ...characterData,
          vehicles,
          species,
          languages,
        });
      } catch (error) {
        console.error('Error fetching character details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacterDetails();
  }, [id]);

  
  return (
    <div>
      {isLoading && (
        <div className="loader">
          <div className="loader--dot"></div>
          <div className="loader--dot"></div>
          <div className="loader--dot"></div>
          <div className="loader--dot"></div>
          <div className="loader--dot"></div>
          <div className="loader--dot"></div>
          <div className="loader--text"></div>
        </div>
      )}
      {character && (
        <div className={`character-card ${isLoading ? 'hidden' : ''}`}>
          <h2 className="character-name">{character.name}</h2>
          <div className="character-info">
            <p>Gênero: {character.gender}</p>
            <p>Numero de filmes: {character.films.length}</p>
            {character.vehicles && character.vehicles.length > 0 && (
              <>
                <h3>Veículos</h3>
                <ul>
                  {character.vehicles.map((vehicle, index) => (
                    <li key={index}>{vehicle}</li>
                  ))}
                </ul>
              </>
            )}
            {character.species && character.species.length > 0 && (
              <>
                <h3>Espécies</h3>
                <ul>
                  {character.species.map((specie, index) => (
                    <li key={index}>{specie}</li>
                  ))}
                </ul>
              </>
            )}
            {character.languages && character.languages.length > 0 && (
              <>
                <h3>Linguagens</h3>
                <ul>
                  {character.languages.map((language, index) => (
                    <li key={index}>{language}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      )}
      {!isLoading && (
        <a href='/characters' className='button-a'>Voltar</a>
      )}
    </div>
  );
};


export default CharacterDetails;



