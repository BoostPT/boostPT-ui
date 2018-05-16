const express = require('express');
const path = require('path');
const morgan = require('morgan');
const server = express();
const PORT = 3000;

server.use(express.static(path.resolve(__dirname, '../client/dist')));

server.use(morgan('dev'));

// This fixes reloading on the dash, not sure about the optimal solution
server.use((req, res, next) => {
  if (req.url === '/dash') {
    res.sendFile(path.resolve(__dirname, '../client/dist/index.html'))
  } else {
    next();
  }
});

server.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../client/dist')));

server.listen(PORT, () => {
    console.log(`Serving static files on port 3000...`);
});