const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false,
});

// async function auth() {
//   await db.authenticate();
//   console.log('connected to db!');
// }
// auth();

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
    //since we are searching, editing, deleting by slug, these need to be unique
    unique: true,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM('open', 'closed'),
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: [],
  },
});

Page.beforeValidate(page => {
  /*
   * make sure tags are an array
   */
  if (typeof page.tags === 'string') {
    page.tags = page.tags.split(',').map(str => str.trim());
  }

  /*
   * Generate slug
   */
  if (!page.slug) {
    page.slug = page.title
      .replace(/\s/g, '_')
      .replace(/\W/g, '')
      .toLowerCase();
  }
});

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    isEmail: true,
    allowNull: false,
  },
});

Page.belongsTo(User, { as: 'author' });

module.exports = {
  db,
  User,
  Page,
};
