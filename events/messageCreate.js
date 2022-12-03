const client = require('../index');
const { EmbedBuilder } = require('discord.js');
const superdjs = require('super-djs');

client.on('messageCreate', async (message) => {
    if (message.content.startsWith('<@' + client.user.id + '>' || '<@!' + client.user.id + '>')) {
        return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({
                        name: client.user.username,
                        iconURL: client.user.displayAvatarURL()
                    })
                    .setDescription(`Hey ${message.author}, do you need any help? Try to run the command </help:1030922301769781370> to check the help menu!`)
                    .setColor('Blurple')
            ]
        }).then(async (sent) => {
            await superdjs.Wait(15000);

            message.delete().catch(() => { });
            sent.delete().catch(() => { });
        });
    };
});