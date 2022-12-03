const { EmbedBuilder, codeBlock } = require('discord.js');

module.exports = {
    name: 'uptime',
    description: 'Check the client\'s uptime.',
    type: 1,
    options: [],
    run: async (client, interaction) => {

        // Old
        /*let totalSec = (client.uptime / 1000);
        let days = Math.floor(totalSec / 86400);

        totalSec %= 86400;

        let hours = Math.floor(totalSec / 3600);

        totalSec %= 3600;

        let mins = Math.floor(totalSec / 60);
        let secs = Math.floor(totalSec % 60);

        const date = new Date().getTime() - (client.uptime);

        return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({
                        name: client.user.username,
                        iconURL: client.user.displayAvatarURL({ dynamic: true })
                    })
                    .setDescription(`Started on: <t:${(new Date(date).getTime() / 1000).toString().split('.')[0]}>\nOnline:` + codeBlock('txt', `${days} days, ${hours} hours, ${mins} minutes, and ${secs} seconds ago.`))
            ]
        });
        */

        const date = new Date().getTime() - (client.uptime);

        return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({
                        name: client.user.username,
                        iconURL: client.user.displayAvatarURL({ dynamic: true })
                    })
                    .setDescription(`Started on: <t:${(new Date(date).getTime() / 1000).toString().split('.')[0]}> (<t:${(new Date(date).getTime() / 1000).toString().split('.')[0]}:R>)`)
                    .setColor('Green')
            ]
        });

    },
};