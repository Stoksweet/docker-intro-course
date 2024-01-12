const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(express.static('public'));

// Define a route that fetches a Chuck Norris joke
app.get('/', async (req, res) => {
  console.log('New request!');

  try {
    const response = await axios.get('https://api.chucknorris.io/jokes/random');
    const joke = response.data.value;
    
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Chuck Norris Joke</title>
        <link rel="stylesheet" href="/styles.css">
      </head>
      <body>
        <div class="container">
          <h1>Chuck Norris Joke</h1>
          <p>${joke}</p>
          <img src="https://api.chucknorris.io/img/chucknorris_logo_coloured_small@2x.png" alt="Chuck Norris">
        </div>
      </body>
      </html>
    `;

    res.send(html);
  } catch (error) {
    console.error('Error fetching Chuck Norris joke:', error.message);
    res.status(500).send('Failed to fetch Chuck Norris joke');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
