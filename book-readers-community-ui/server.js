const express = require('express');
const path = require('path');

const app = express();

// Serve the static files from the Angular app, inside the "browser" subfolder
app.use(express.static(path.join(__dirname, 'dist/book-readers-community-ui/browser')));

// Catch all other routes and return the index file from the "browser" subfolder
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/book-readers-community-ui/browser', 'index.html'));
});

// Set port and start server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
