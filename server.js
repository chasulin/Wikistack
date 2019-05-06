// const http = require('http');
const app = require('./app');
const { db, Page, User } = require('./models');
// const server = http.createServer(app);

const PORT = 3000;

async function auth() {
  await db.authenticate();
  console.log('connected to db!');
}
auth();

const startServer = async () => {
  await User.sync();
  await Page.sync();
  app.listen(PORT, () => {
    console.log('server listening in port');
  });
};

startServer();
