const express = require('express');
const axios = require('axios');

const app = express();
const port = 8080;

// Define middleware to parse JSON requests
app.use(express.json());

app.get('/numbers', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Missing URL parameter' });
  }

  try {
    const promises = Array.isArray(url) ? url : [url];
    const responses = await Promise.allSettled(promises.map(fetchNumbers));
    
    const validResponses = responses.filter(response => response.status === 'fulfilled');
    const mergedNumbers = mergeNumbersFromResponses(validResponses);

    return res.json({ numbers: mergedNumbers });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

async function fetchNumbers(url) {
  try {
    const response = await axios.get(url);
    return response.data.numbers || [];
  } catch (error) {
    console.error(`Error fetching numbers from ${url}:`, error.message);
    return [];
  }
}

function mergeNumbersFromResponses(responses) {
  const mergedNumbers = new Set();

  for (const response of responses) {
    const numbers = response.value || [];
    numbers.forEach(number => mergedNumbers.add(number));
  }

  return Array.from(mergedNumbers).sort((a, b) => a - b);
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
