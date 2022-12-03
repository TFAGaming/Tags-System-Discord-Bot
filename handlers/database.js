const superdjs = require('super-djs');

module.exports = (client) => {
    superdjs.connectMongoDB(require('../config/handlers').database.uri, true)
};