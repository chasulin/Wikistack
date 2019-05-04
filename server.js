// const http = require('http');
const app = require('./app');
// const server = http.createServer(app);

const PORT = 3000;

const startServer = () => {
  app.listen(PORT, () => {
    console.log('server listening in port');
  });
};

startServer();
