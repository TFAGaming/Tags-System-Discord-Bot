const client = require('../index');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { TagsSystem, TagsSystemReport } = require('../models/main');
const { TextFileGenerator } = require('super-djs');

client.on('interactionCreate', async (interaction) => {
    if (interaction.isSelectMenu() || interaction.isButton()) {
        const id = interaction.customId.split('_');

        let user = interaction.guild.members.cache.get(id[id.length - 1]);

        if (user) {
            if (interaction.user.id !== user.user.id) return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`This ${interaction.isSelectMenu() ? 'select menu' : interaction.isButton() ? 'button' : '[Unknown]'} isn\'t yours.`)
                ],
                ephemeral: true
            });
        };
    };

    if (interaction.isButton()) {
        if (interaction.customId.startsWith('star_')) {
            const splitted = interaction.customId.split('_');

            TagsSystem.findById(splitted[1], async (err, data) => {
                if (err) throw err;

                if (data) {
                    if (data.stars.some((userId) => interaction.user.id === userId)) {
                        await TagsSystem.findByIdAndUpdate(splitted[1],
                            {
                                $pull: {
                                    stars: `${interaction.user.id}`
                                }
                            }
                        );

                        return interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription(`Removed a star!`)
                                    .setColor('Green')
                            ],
                            ephemeral: true
                        });
                    } else {
                        await TagsSystem.findByIdAndUpdate(splitted[1],
                            {
                                $push: {
                                    stars: `${interaction.user.id}`
                                }
                            }
                        );

                        return interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription(`Added a star!`)
                                    .setColor('Green')
                            ],
                            ephemeral: true
                        });
                    };
                } else {
                    return interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(`**Error:** The tag is probably deleted.`)
                                .setColor('Red')
                        ],
                        ephemeral: true
                    });
                };
            });
        };

        if (interaction.customId.startsWith('report_')) {
            const splitted = interaction.customId.split('_');

            let dataSchemaReport = await TagsSystemReport.findOne({ guild: interaction.guild.id });

            if (!dataSchemaReport) return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`The report system is not ready.`)
                ],
                ephemeral: true
            });

            const channel = interaction.guild.channels.cache.get(dataSchemaReport.channel);

            if (!channel || channel.type !== 0) return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`**Error:** Couldn't report the tag.`)
                        .setColor('Red')
                ],
                ephemeral: true
            });

            TagsSystem.findById(splitted[1], async (err, data) => {
                if (err) throw err;

                if (data) {
                    if (data.reported, data.reported === true) return interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription('The tag is already been reported by a user.')
                        ],
                        ephemeral: true
                    });

                    await TagsSystem.updateOne(
                        {
                            name: data.name
                        },
                        {
                            $set: {
                                reported: true
                            }
                        }
                    );

                    channel.send({
                        embeds: [
                            new EmbedBuilder()
                                .setAuthor({
                                    name: client.user.username,
                                    iconURL: client.user.displayAvatarURL({ dynamic: true })
                                })
                                .setTitle('New report')
                                .setThumbnail(client.user.displayAvatarURL())
                                .addFields(
                                    {
                                        name: 'Tag', value: `${data.name}`
                                    },
                                    {
                                        name: 'Reporter', value: `${interaction.user}`
                                    }
                                )
                                .setColor('Red')
                        ],
                        components: [
                            new ActionRowBuilder()
                                .addComponents(
                                    new ButtonBuilder()
                                        .setCustomId('forcedel_' + data._id)
                                        .setLabel('Force delete tag')
                                        .setEmoji('🗑️')
                                        .setStyle(ButtonStyle.Danger),
                                    new ButtonBuilder()
                                        .setCustomId('delreport_' + data._id)
                                        .setLabel('Delete report')
                                        .setEmoji('❌')
                                        .setStyle(ButtonStyle.Secondary)
                                )
                        ],
                        fetchReply: true
                    }).then(async (sent) => {
                        sent.reply({
                            files: [
                                new TextFileGenerator(data.content, data.name, data.language)
                            ]
                        });

                        interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription('The tag is now reported. Thanks for reporting!')
                                    .setColor('Green')
                            ],
                            ephemeral: true
                        });
                    });
                } else {
                    return interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(`**Error:** Couldn't find the tag in the database.`)
                                .setColor('Red')
                        ],
                        ephemeral: true
                    });
                };
            });
        };

        if (interaction.customId.startsWith('delreport_')) {
            const splitted = interaction.customId.split('_');

            TagsSystem.findById(splitted[1], async (err, data) => {
                if (err) throw err;

                if (data) {
                    if (data.reported === false) return interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription('The report is already been deleted by a user.')
                        ],
                        ephemeral: true
                    });

                    await TagsSystem.updateOne(
                        {
                            name: data.name
                        },
                        {
                            $set: {
                                reported: false
                            }
                        }
                    );

                    return interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription('The report has been **deleted**, users can report the tag again.')
                                .setColor('Green')
                        ],
                        ephemeral: true
                    });
                } else {
                    return interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(`**Error:** Couldn't find the tag in the database.`)
                                .setColor('Red')
                        ],
                        ephemeral: true
                    });
                };
            });
        };

        if (interaction.customId.startsWith('forcedel_')) {
            const splitted = interaction.customId.split('_');

            TagsSystem.findById(splitted[1], async (err, data) => {
                if (err) throw err;

                if (data) {
                    await TagsSystem.deleteOne(
                        {
                            name: data.name
                        }
                    );

                    return interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription('The tag has been deleted.')
                                .setColor('Green')
                        ],
                        ephemeral: true
                    });
                } else {
                    return interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(`**Error:** Couldn't find the tag in the database.`)
                                .setColor('Red')
                        ],
                        ephemeral: true
                    });
                };
            });
        };
    };
});
