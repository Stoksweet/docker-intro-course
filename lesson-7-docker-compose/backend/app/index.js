const express = require('express');
const axios = require('axios');

const app = express();
const port = 3100;

// Define a route that fetches a Chuck Norris joke
app.get('/joke', async (req, res) => {
  console.log('New joke!');

  try {
    const response = await axios.get('https://api.chucknorris.io/jokes/random');
    const joke = response.data.value;
    res.json({ joke });
  } catch (error) {
    console.error('Error fetching Chuck Norris joke:', error.message);
    res.status(500).json({ error: 'Failed to fetch Chuck Norris joke' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
