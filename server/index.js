const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();
const PORT = 3000;

app.use(express.static(path.resolve(__dirname, '../client/dist')));

app.use(morgan);

server.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../client/dist')));

server.listen(PORT, () => {
    console.log(`Serving static files on port 3000...`);
});