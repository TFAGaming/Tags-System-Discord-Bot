const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Replies with help menu.',
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
                    .addFields(
                        {
                            name: 'Who am I?',
                            value: `I'm **${client.user.username}**, a Discord bot made with discord.js. My utility is creating tags about programming, publishing it in-guild with custom visibility (Public or Private), and for 100% free!`
                        },
                        {
                            name: 'Where are all the available commands?',
                            value: `Type in the chat \`/\`, select my avatar and you will see all the commands! You can also use </commands:1035898388744519771>.`
                        },
                        {
                            name: 'Special thanks',
                            value: '- **T.F.A 7524 - Development:** Creating the bot & project'
                        }
                    )
            ],
            components: [
                new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setURL(`https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot%20applications.commands&permissions=277025770568`)
                            .setLabel('Invite me!')
                            .setStyle(ButtonStyle.Link)
                            .setDisabled(true) // Not public
                    )
            ]
        });

    },
};
