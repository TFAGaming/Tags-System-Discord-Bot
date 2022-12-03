const fs = require('fs');

module.exports = (client) => {
    fs.readdirSync('./events/').forEach((file) => {
        require('../events/' + file);
        if (require('../config/handlers').handlers?.logger === true) console.log('Event loaded: ' + file);
    });
};