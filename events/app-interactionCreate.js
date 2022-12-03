const client = require('../index');

client.on('interactionCreate', async (interaction) => {
    if (interaction.isChatInputCommand() || interaction.isUserContextMenuCommand() || interaction.isMessageContextMenuCommand()) {
        let command = client.commands.get(interaction.commandName);
        if (!command) return interaction.reply({ content: 'This command is not available anymore.', ephemeral: true });

        try {
            if (require('../config/handlers').slash.logger === true) console.log('• ' + interaction.user.tag + ' has used the command: ' + command.name);

            command.run(client, interaction);
        } catch (err) {
            console.error(err)
        };
    };
});