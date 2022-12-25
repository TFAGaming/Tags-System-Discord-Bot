const { MongoDBConnector } = require('discord.js-v14-helper');

module.exports = (client) => {
    new MongoDBConnector(require('../config/handlers').database.uri)
        .startConnecting();
};
