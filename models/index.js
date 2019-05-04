const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack');

// async function auth() {
//   await db.authenticate();
//   console.log('connected to db!');
// }
// auth();


module.exports = {
  db,
};
