const { EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, codeBlock } = require('discord.js');
const { TextFileGenerator } = require('super-djs');
const { TagsSystem } = require('../models/main');

module.exports = {
    name: 'tag',
    description: 'Create, edit, delete, view, or get information a tag.',
    type: 1,
    options: [
        {
            name: 'create',
            description: 'Create a tag.',
            type: 1,
            options: []
        },
        {
            name: 'edit',
            description: 'Edit a tag.',
            type: 1,
            options: []
        },
        {
            name: 'delete',
            description: 'Delete a tag.',
            type: 1,
            options: [
                {
                    name: 'name',
                    description: 'The tag name to delete.',
                    type: 3,
                    required: true
                }
            ]
        },
        {
            name: 'view',
            description: 'View a tag.',
            type: 1,
            options: [
                {
                    name: 'name',
                    description: 'The tag name to view.',
                    type: 3,
                    required: true
                }
            ]
        },
        {
            name: 'info',
            description: 'Edit a tag.',
            type: 2,
            options: [
                {
                    name: 'get',
                    description: 'The tag name to get info.',
                    type: 1,
                    options: [
                        {
                            name: 'name',
                            description: 'The tag name to view it\'s information.',
                            type: 3,
                            required: true
                        }
                    ]
                }
            ]
        },
        {
            name: 'leaderboard',
            description: 'Show the top starred tags.',
            type: 1,
            options: []
        },
        {
            name: 'force-del-all',
            description: 'Delete all the available tags.',
            type: 1,
            options: []
        }
    ],
    run: async (client, interaction) => {

        const subcommand = interaction.options._subcommand;

        if (subcommand === 'create') {
            await interaction.showModal(
                new ModalBuilder()
                    .setCustomId('modal_tag_create')
                    .setTitle('Create a tag')
                    .addComponents(
                        new ActionRowBuilder()
                            .addComponents(
                                new TextInputBuilder()
                                    .setLabel('Tag name:')
                                    .setCustomId('modal_tag_create_name')
                                    .setPlaceholder('The tag name (Choose like: hello-world, ban-command... etc.)')
                                    .setStyle(TextInputStyle.Short)
                                    .setRequired(true)
                                    .setMaxLength(20)
                                    .setMinLength(3)
                            ),
                        new ActionRowBuilder()
                            .addComponents(
                                new TextInputBuilder()
                                    .setLabel('Tag language:')
                                    .setCustomId('modal_tag_create_lang')
                                    .setPlaceholder('The tag\'s programming language')
                                    .setStyle(TextInputStyle.Short)
                                    .setRequired(true)
                                    .setMaxLength(15)
                                    .setMinLength(2)
                            ),
                        new ActionRowBuilder()
                            .addComponents(
                                new TextInputBuilder()
                                    .setLabel('Tag description:')
                                    .setCustomId('modal_tag_create_desc')
                                    .setPlaceholder('The tag description (Ex: Small guide of using this tag)')
                                    .setStyle(TextInputStyle.Paragraph)
                                    .setRequired(false)
                                    .setMaxLength(2500)
                            ),
                        new ActionRowBuilder()
                            .addComponents(
                                new TextInputBuilder()
                                    .setLabel('Tag content:')
                                    .setCustomId('modal_tag_create_content')
                                    .setPlaceholder('The main content of the tag')
                                    .setStyle(TextInputStyle.Paragraph)
                                    .setRequired(true)
                                    .setMaxLength(4000)
                                    .setMinLength(10)
                            )
                    )
            );
        };

        if (subcommand === 'edit') {
            await interaction.showModal(
                new ModalBuilder()
                    .setCustomId('modal_tag_edit')
                    .setTitle('Edit a tag')
                    .addComponents(
                        new ActionRowBuilder()
                            .addComponents(
                                new TextInputBuilder()
                                    .setLabel('Tag name:')
                                    .setCustomId('modal_tag_edit_name')
                                    .setPlaceholder('The tag name to edit (Unchangeable)')
                                    .setStyle(TextInputStyle.Short)
                                    .setRequired(true)
                                    .setMaxLength(20)
                                    .setMinLength(3)
                            ),
                        new ActionRowBuilder()
                            .addComponents(
                                new TextInputBuilder()
                                    .setLabel('Tag language:')
                                    .setCustomId('modal_tag_edit_lang')
                                    .setPlaceholder('The tag\'s new programming language')
                                    .setStyle(TextInputStyle.Short)
                                    .setRequired(false)
                                    .setMaxLength(15)
                                    .setMinLength(2)
                            ),
                        new ActionRowBuilder()
                            .addComponents(
                                new TextInputBuilder()
                                    .setLabel('Tag description:')
                                    .setCustomId('modal_tag_edit_desc')
                                    .setPlaceholder('The tag\'s new description')
                                    .setStyle(TextInputStyle.Paragraph)
                                    .setRequired(false)
                                    .setMaxLength(2500)
                            ),
                        new ActionRowBuilder()
                            .addComponents(
                                new TextInputBuilder()
                                    .setLabel('Tag content:')
                                    .setCustomId('modal_tag_edit_content')
                                    .setPlaceholder('The new main content of the tag')
                                    .setStyle(TextInputStyle.Paragraph)
                                    .setRequired(true)
                                    .setMaxLength(4000)
                                    .setMinLength(10)
                            )
                    )
            );
        };

        if (subcommand === 'delete') {
            const subcommandOptionName = interaction.options.get('name')?.value;

            TagsSystem.findOne({
                name: subcommandOptionName,
                guild: interaction.guild.id
            }, async (err, data) => {
                if (err) throw err;

                if (data) {
                    if (data.author !== interaction.user.id) return interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(`You don't own that tag.`)
                        ],
                        ephemeral: true
                    });

                    await TagsSystem.deleteOne({
                        guild: interaction.guild.id,
                        name: subcommandOptionName
                    });

                    return interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(`The tag \`${subcommandOptionName}\` has been deleted.`)
                                .setColor('Green')
                        ],
                        ephemeral: true
                    });
                } else {
                    return interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(`Invalid tag.`)
                        ],
                        ephemeral: true
                    });
                };
            });
        };

        if (subcommand === 'view') {
            const subcommandOptionName = interaction.options.get('name')?.value;

            TagsSystem.findOne({
                guild: interaction.guild.id,
                name: subcommandOptionName
            }, async (err, data) => {
                if (err) throw err;

                if (data) {
                    let components = [
                        new ButtonBuilder()
                            .setCustomId('turntocodeblock_' + interaction.user.id)
                            .setLabel('Turn to code block')
                            .setEmoji('↔️')
                            .setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder()
                            .setCustomId('star_' + data._id + '_' + interaction.user.id)
                            .setLabel(`Star${data.stars.length >= 1 ? 's' : ''} (` + data.stars.length + ')')
                            .setEmoji('⭐')
                            .setStyle(ButtonStyle.Success),
                        new ButtonBuilder()
                            .setCustomId('report_' + data._id + '_' + interaction.user.id)
                            .setLabel('Report')
                            .setEmoji('🚩')
                            .setStyle(ButtonStyle.Danger)
                    ];

                    if (data.visibility === 'private' && data.author !== interaction.user.id) {
                        return interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription('The tag is saved as **private**, you can\'t view it.')
                            ],
                            ephemeral: true
                        });
                    } else if (data.visibility === 'private' && data.author === interaction.user.id) {
                        await interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription('The tag content has been sent to your DMs.')
                                    .setColor('Green')
                            ],
                            fetchReply: true
                        });

                        try {
                            await interaction.user.send({
                                embeds: [
                                    new EmbedBuilder()
                                        .setAuthor({
                                            name: client.user.username,
                                            iconURL: client.user.displayAvatarURL({ dynamic: true })
                                        })
                                        .setTitle('Tag: ' + data.name)
                                        .setThumbnail(client.user.displayAvatarURL())
                                        .setDescription(data.desc ?? '[No description]')
                                ],
                                components: [
                                    new ActionRowBuilder()
                                        .addComponents(
                                            components[1].setDisabled(true),
                                            components[2].setDisabled(true)
                                        )
                                ]
                            }).then(async (sent) => {
                                sent.reply({
                                    content: `${codeBlock(data.language.toLowerCase(), data.content)}`,
                                    files: [
                                        new TextFileGenerator(data.content, data.name, data.language.toLowerCase())
                                    ]
                                });
                            });
                        } catch {
                            return interaction.editReply({
                                embeds: [
                                    new EmbedBuilder()
                                        .setDescription('**Error:** Your DMs are disabled.')
                                        .setColor('Red')
                                ]
                            });
                        };
                    } else {
                        interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setAuthor({
                                        name: client.user.username,
                                        iconURL: client.user.displayAvatarURL({ dynamic: true })
                                    })
                                    .setTitle('Tag: ' + data.name)
                                    .setThumbnail(client.user.displayAvatarURL())
                                    .setDescription(data.desc || '[No description]')
                            ],
                            components: [
                                new ActionRowBuilder()
                                    .addComponents(
                                        components[1],
                                        components[2]
                                    )
                            ],
                            fetchReply: true
                        }).then(async (sent) => {
                            var sent2 = await sent.reply({
                                files: [
                                    new TextFileGenerator(data.content, data.name, data.language)
                                ],
                                components: [
                                    new ActionRowBuilder()
                                        .addComponents(
                                            components[0]
                                        )
                                ]
                            });

                            const collector = interaction.channel.createMessageComponentCollector({
                                componentType: ComponentType.Button,
                                filter: m => m.user.id === interaction.user.id,
                                time: 30000
                            });

                            collector.on('collect', async (i) => {
                                if (i.customId === `turntocodeblock_${interaction.user.id}`) {
                                    await i.update({
                                        content: `${codeBlock(data.language.toLowerCase(), data.content)}`,
                                        files: [],
                                        components: [
                                            new ActionRowBuilder()
                                                .addComponents(
                                                    components[0]
                                                        .setCustomId(`turntofile_${interaction.user.id}`)
                                                        .setLabel('Turn to downloadable file')
                                                        .setEmoji('↔️')
                                                )
                                        ]
                                    }).catch(() => { });
                                };

                                if (i.customId === `turntofile_${interaction.user.id}`) {
                                    await i.update({
                                        content: null,
                                        files: [
                                            new TextFileGenerator(data.content, data.name, data.language)
                                        ],
                                        components: [
                                            new ActionRowBuilder()
                                                .addComponents(
                                                    components[0]
                                                        .setCustomId(`turntocodeblock_${interaction.user.id}`)
                                                        .setLabel('Turn to code block')
                                                        .setEmoji('↔️')
                                                )
                                        ]
                                    }).catch(() => { });
                                };
                            });

                            collector.on('end', async () => {
                                if (collector.endReason === 'time') return sent2.edit({
                                    components: [
                                        new ActionRowBuilder()
                                            .addComponents(
                                                components[0].setDisabled(true)
                                            )
                                    ]
                                }).catch(() => { });
                            })
                        });
                    };
                } else {
                    return interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription('Invalid tag.')
                        ],
                        ephemeral: true
                    });
                };
            });
        };

        if (subcommand === 'get') {
            const subcommandOptionName = interaction.options.get('name')?.value;

            TagsSystem.findOne({
                guild: interaction.guild.id,
                name: subcommandOptionName
            }, async (err, data) => {
                if (err) throw err;

                if (data) {
                    return interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setAuthor({
                                    name: client.user.username,
                                    iconURL: client.user.displayAvatarURL({ dynamic: true })
                                })
                                .setTitle('Tag information: ' + subcommandOptionName)
                                .addFields(
                                    {
                                        name: 'Author', value: `${interaction.guild.members.cache.get(data.author) || '[Unknown]'} (${data.author})`, inline: true
                                    },
                                    {
                                        name: 'Language', value: `${data.language}`, inline: true
                                    },
                                    {
                                        name: 'Created at', value: `<t:${new Date(data.createdAt).getTime() / 1000}> (<t:${new Date(data.createdAt).getTime() / 1000}:R>)`, inline: true
                                    },
                                    {
                                        name: 'Visibility', value: `${data.visibility}`, inline: true
                                    },
                                    {
                                        name: 'Stars', value: `${data.stars.length || 0}`, inline: true
                                    },
                                    {
                                        name: 'Tag data ID', value: `${data._id}`, inline: true
                                    }
                                )
                        ]
                    })
                } else {
                    return interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription('Invalid tag.')
                        ],
                        ephemeral: true
                    });
                };
            });
        };

        if (subcommand === 'leaderboard') {
            TagsSystem.find({
                guild: interaction.guild.id
            }, async (err, data) => {
                if (err) throw err;

                if (data && data?.length > 0) {
                    const sorted = data.sort((a, b) => b.stars.length - a.stars.length)
                        .slice(0, 10)
                        .map((w, i) => {
                            return `\`#${i + 1}\`: ${w.name} (**${w.stars.length || '0'}** ⭐)`
                        });

                    return interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setAuthor({
                                    name: client.user.username,
                                    iconURL: client.user.displayAvatarURL({ dynamic: true })
                                })
                                .setTitle('Top 10 starred tags')
                                .setDescription(sorted.join('\n'))
                                .setColor('Gold')
                        ]
                    })
                } else {
                    return interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription('No tags were created in this guild.')
                        ],
                        ephemeral: true
                    });
                };
            });
        };

        if (subcommand === 'force-del-all') {
            if (interaction.guild.ownerId !== interaction.user.id) return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription('You are not the guild owner.')
                ],
                ephemeral: true
            });

            TagsSystem.find({
                guild: interaction.guild.id
            }, async (err, data) => {
                if (err) throw err;

                if (data && data?.length > 0) {
                    await interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription('Started deleting...')
                                .setColor('Red')
                        ]
                    });

                    await data.forEach(async (inData) => {
                        await TagsSystem.deleteOne({
                            guild: interaction.guild.id,
                            name: inData.name
                        });
                    });

                    return interaction.editReply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription('Successfully deleted all the tags.')
                                .setColor('Green')
                        ]
                    });
                } else {
                    return interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription('No tags were created in this guild.')
                        ],
                        ephemeral: true
                    });
                };
            });
        };

    },
};
