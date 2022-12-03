const fs = require('fs');
const { PermissionsBitField, REST, Routes } = require('discord.js');

module.exports = (client) => {
    let commands = [];

    for (let file of fs.readdirSync('./commands/')) {
        let pulled = require('../commands/' + file);

        if (pulled.name, pulled.type) {
            if (require('../config/handlers').handlers?.logger === true) console.log('Application command (type ' + pulled.type + ') loaded: ' + file);

            if (pulled.description, pulled.type === 1) {
                commands.push(
                    {
                        name: pulled.name,
                        description: pulled.description,
                        type: 1,
                        options: pulled.options ? pulled.options : null,
                        default_permission: null, // No need
                        default_member_permissions: pulled.permissions?.default_member_permissions ? PermissionsBitField.resolve(pulled.permissions.default_member_permissions) : null
                    }
                );
            } else {
                commands.push(
                    {
                        name: pulled.name,
                        type: pulled.type
                    }
                );
            };

            client.commands.set(pulled.name, pulled);
        } else {
            console.warn('[!] Couldn\'t load ' + file + '. The property \'name\' or \'description\' are missing.');
        };

    };

    const rest = new REST({ version: '10' }).setToken(require('../config/client').client.token);

    (async () => {
        console.warn('[!] Started registering ' + client.commands.size + ' application commands. (This might take a while)');

        try {
            await rest.put(
                Routes.applicationCommands(require('../config/client').client.id),
                { body: commands }
            );

            console.warn('[!] Application commands has been successfully registered.');
        } catch (err) {
            console.error(err);
        }
    })();
};