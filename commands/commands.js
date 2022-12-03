const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'commands',
    description: 'Replies with a list of registered application commands.',
    type: 1,
    options: [],
    run: async (client, interaction) => {

        return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({
                        name: client.user.username,
                        iconURL: client.user.displayAvatarURL()
                    })
                    .setTitle('Available application commands: (' + client.commands.size + ')')
                    .addFields(
                        {
                            name: 'Slash commands',
                            value: client.commands.filter((e) => e.type === 1).map((cmd) => `> \`/${cmd.name}\`: ${cmd.description}`).join('\n')
                        },
                        {
                            name: 'User commands',
                            value: client.commands.filter((e) => e.type === 2).size > 0 ? client.commands.filter((e) => e.type === 2).map((cmd) => `> \`${cmd.name}\`: ${cmd.description ?? '[No description]'}`).join('\n') : 'No commands.'
                        },
                        {
                            name: 'Message commands',
                            value: client.commands.filter((e) => e.type === 3).size > 0 ? client.commands.filter((e) => e.type === 3).map((cmd) => `> \`${cmd.name}\`: ${cmd.description}`).join('\n') : 'No commands.'
                        }
                    )
            ],
            ephemeral: true
        });
          
    },
};