import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import CharacterItem from './CharacterItem';
import CharacterDetails from './CharacterDetails';
import '../styles/styles.scss';

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [searchGender, setSearchGender] = useState('');
  const [searchBirthYear, setSearchBirthYear] = useState('');

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setIsFetching(true);

        const url = `https://swapi.dev/api/people/?page=${page}`;

        const response = await Axios.get(url);
        const data = response.data;

        if (characters.length === 0) {
          setCharacters(data.results);
        } else {
          setCharacters((prevCharacters) => [...prevCharacters, ...data.results]);
        }

        setIsFetching(false);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    fetchCharacters();
  }, [page]);

  useEffect(() => {
    const filterCharacters = () => {
      let tempCharacters = characters;

      if (searchName) {
        tempCharacters = tempCharacters.filter((character) =>
          character.name.toLowerCase().includes(searchName.toLowerCase())
        );
      }

      if (searchGender) {
        tempCharacters = tempCharacters.filter(
          (character) => character.gender.toLowerCase() === searchGender.toLowerCase()
        );
      }

      if (searchBirthYear) {
        tempCharacters = tempCharacters.filter(
          (character) => character.birth_year === searchBirthYear
        );
      }

      setFilteredCharacters(tempCharacters);
    };

    filterCharacters();
  }, [characters, searchName, searchGender, searchBirthYear]);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="character-list">
      <h1>Personagens Star Wars</h1>
      <input type="text" placeholder="Nome" onChange={(e) => setSearchName(e.target.value)} />
      <input type="text" placeholder="Gênero" onChange={(e) => setSearchGender(e.target.value)} />
      <input
        type="text"
        placeholder="Ano de Nascimento"
        onChange={(e) => setSearchBirthYear(e.target.value)}
      />

      <div className="loader" style={{ display: isLoading ? 'block' : 'none' }}>
        <div className="loader--dot"></div>
        <div className="loader--dot"></div>
        <div className="loader--dot"></div>
        <div className="loader--dot"></div>
        <div className="loader--dot"></div>
        <div className="loader--dot"></div>
        <div className="loader--text"></div>
      </div>

      {!isLoading && (
        <>
          <ul>
            {filteredCharacters.map((character, index) => (
              <CharacterItem key={index} character={character} />
            ))}
          </ul>
          {isFetching && <div className="loading-text">Carregando mais personagens...</div>}
          <button onClick={handleNextPage} disabled={isFetching}>
            Carregar mais
          </button>
        </>
      )}

      <Routes>
        <Route path="/characters/*" element={<CharacterDetails />} />
      </Routes>
    </div>
  );
};

export default CharacterList;







