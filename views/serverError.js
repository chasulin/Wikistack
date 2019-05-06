const html = require('html-template-tag');
const layout = require('./layout');

module.exports = () =>
  layout(html`
    <h1>Whoops</h1>
    <h1>Looks like you got a server error</h1>
    <a href="/wiki">Back to Homepage</a>
  `);
