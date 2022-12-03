const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Replies with client websocket in milliseconds.',
    type: 1,
    options: [],
    run: async (client, interaction) => {

        return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`${client.ws.ping} ms.`)
            ],
            ephemeral: true
        }); 
          
    },
};