const http = require('http');
const app = require('./app');
const PORT = 4000;
const server = http.createServer(app);

// Initialize the server
server.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});