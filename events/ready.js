const client = require('../index');

client.once('ready', () => {
    console.log('> Ready, the client should be online now.');
});