
import axios from 'axios';

const API_URL = 'https://nationnode.vercel.app/api';

export const getCountries = async () => {
  try {
    const response = await axios.get(`${API_URL}/all`);
    return response.data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
};

export const getCountryByName = async (name) => {
  try {
    const response = await axios.get(`${API_URL}/name/${name}`);
    return response.data[0]; // Assuming first result is the one we want
  } catch (error) {
    console.error(`Error fetching country ${name}:`, error);
    throw error;
  }
};

export const getCountryByCode = async (code) => {
  try {
    const response = await axios.get(`${API_URL}/alpha/${code}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching country with code ${code}:`, error);
    throw error;
  }
};

export const getCountriesByRegion = async (region) => {
  try {
    const response = await axios.get(`${API_URL}/region/${region}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching countries in region ${region}:`, error);
    throw error;
  }
};