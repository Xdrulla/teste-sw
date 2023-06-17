import Axios from 'axios';

const API_BASE_URL = 'https://swapi.dev/api/';

export const getCharacters = async (page) => {
  try {
    const response = await Axios.get(`${API_BASE_URL}people/?page=${page}`);
    return response.data;
  } catch(error) {
    console.error(error);
    throw error;
  }
};

export const getCharacterDetails = async (id) => {
  try {
    const response = await Axios.get(`${API_BASE_URL}people/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
