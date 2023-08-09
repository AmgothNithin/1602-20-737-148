import axios from 'axios';

const baseURL = 'http://20.244.56.144'; // Update with the API base URL

const instance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const registerCompany = async (data) => {
  try {
    const response = await instance.post('/train/register', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Similar functions for authentication and fetching train details
