const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Define a route to handle the GET request for the HTML page
app.get('/', (req, res) => {
  // Send the HTML response with an image and a link
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Express Image App</title>
    </head>
    <body>
      <h1>Welcome to the Docker for Deployments!</h1>
      <img src="https://pbs.twimg.com/media/FPKqqiFX0AMRBu4.png" alt="Example Image" style="max-width: 100%;">
      <p>My first image!</p>
    </body>
    </html>
  `);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});