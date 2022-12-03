const { EmbedBuilder } = require('discord.js');
const { TagsSystemData } = require('../models/main');

module.exports = {
    name: 'Check user tags',
    type: 2,
    run: async (client, interaction) => {

        let user = interaction.targetMember.id;

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription('Getting data, please wait...')
            ],
            ephemeral: true
        });
        
        TagsSystemData.findOne(
            {
                guild: interaction.guild.id
            }, async (err, data) => {
                if (err) throw err;
                if (data) {
                    let arr = [];

                    if (data.tags) {
                        data.tags.forEach((tag) => {
                            if (tag.author !== user) return;
                            if (tag.visibility === 'private' || tag.visibility === 'unlisted') return;

                            arr.push(tag.name);
                        });
                    };

                    return interaction.editReply({
                        embeds: [
                            new EmbedBuilder()
                                .setAuthor({
                                    name: client.user.username,
                                    iconURL: client.user.displayAvatarURL()
                                })
                                .setTitle(`${interaction.guild.members.cache.get(user)?.user?.tag || "Unknown#0000"} profile:`)
                                .setThumbnail(interaction.guild.members.cache.get(user)?.displayAvatarURL({ dynamic: true }))
                                .addFields(
                                    {
                                        name: 'Total Tags created',
                                        value: arr.length.toString() || '0',
                                        inline: true
                                    },
                                    {
                                        name: 'Public Tags',
                                        value: `${arr.sort().join(', ') || "[No tags]"}.`,
                                        inline: true
                                    },
                                )
                                .setColor('Blue')
                        ]
                    }).catch(() => { });
                } else {
                    return interaction.editReply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(`No data found.`)
                        ],
                        ephemeral: true
                    }).catch(() => { });
                };

            }
        );

    },
};