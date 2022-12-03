const client = require('../index');
const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ComponentType } = require('discord.js');
const { TagsSystem } = require('../models/main');

client.on('interactionCreate', async (interaction) => {
    if (interaction.isModalSubmit()) {
        if (interaction.customId === 'modal_tag_create') {
            TagsSystem.findOne(
                {
                    guild: interaction.guild.id,
                    name: interaction.fields.getTextInputValue('modal_tag_create_name')
                },
                async (err, data) => {
                    if (err) throw err;
                    if (data) {
                        return interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription(`The name is already taken.`)
                            ],
                            ephemeral: true
                        });
                    } else {
                        let component = [
                            new SelectMenuBuilder()
                                .setCustomId('select_visibility_' + interaction.id + '_' + interaction.user.id)
                                .setPlaceholder('Select visibility here')
                                .setOptions(
                                    {
                                        label: 'Public',
                                        description: 'Allow everyone to see your tag.',
                                        value: 'public'
                                    },
                                    {
                                        label: 'Private',
                                        description: 'No one can see this tag, except for you.',
                                        value: 'private'
                                    }
                                )
                        ]

                        await interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setTitle('Tag visibility')
                                    .setDescription('Choose a tag visibility type in the select menu below.')
                            ],
                            components: [
                                new ActionRowBuilder()
                                    .addComponents(
                                        component[0]
                                    )
                            ],
                            ephemeral: true
                        });

                        const collector = interaction.channel.createMessageComponentCollector({
                            componentType: ComponentType.SelectMenu
                        });

                        collector.on('collect', async (i) => {
                            if (i.customId !== `select_visibility_${interaction.id}_${interaction.user.id}`) return;

                            await i.reply({
                                embeds: [
                                    new EmbedBuilder()
                                        .setDescription(`Creating the schema of the tag...`)
                                ],
                                ephemeral: true
                            });

                            await interaction.editReply({
                                components: [
                                    new ActionRowBuilder()
                                        .addComponents(
                                            component[0].setDisabled(true).setPlaceholder('Selected: ' + i.values[0])
                                        )
                                ]
                            }).catch(() => { });

                            data = new TagsSystem({
                                guild: interaction.guild.id,
                                author: interaction.user.id,
                                name: interaction.fields.getTextInputValue('modal_tag_create_name'),
                                language: interaction.fields.getTextInputValue('modal_tag_create_lang').toLowerCase(),
                                desc: interaction.fields.getTextInputValue('modal_tag_create_desc') || null,
                                content: interaction.fields.getTextInputValue('modal_tag_create_content'),
                                createdAt: new Date(),
                                stars: [],
                                visibility: i.values[0]
                            });

                            await i.editReply({
                                embeds: [
                                    new EmbedBuilder()
                                        .setDescription(`Saving the schema in the database...`)
                                ]
                            }).catch(() => { });

                            data.save();

                            return i.editReply({
                                embeds: [
                                    new EmbedBuilder()
                                        .setDescription(`The tag \`${interaction.fields.getTextInputValue('modal_tag_create_name')}\` is now created.`)
                                        .setColor('Green')
                                ]
                            })
                        });
                    };
                }
            );
        };

        if (interaction.customId === 'modal_tag_edit') {
            TagsSystem.findOne(
                {
                    guild: interaction.guild.id,
                    name: interaction.fields.getTextInputValue('modal_tag_edit_name')
                },
                async (err, data) => {
                    if (err) throw err;
                    if (!data) {
                        return interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription(`Invalid tag.`)
                            ],
                            ephemeral: true
                        });
                    } else {
                        if (data.author !== interaction.user.id) return interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription(`You don't own the tag, you can't edit it.`)
                            ],
                            ephemeral: true
                        });

                        await interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription(`Updating the tag...`)
                            ],
                            ephemeral: true
                        });

                        await TagsSystem.updateOne(
                            {
                                guild: interaction.guild.id,
                                name: interaction.fields.getTextInputValue('modal_tag_edit_name')
                            },
                            {
                                $set: {
                                    language: interaction.fields.getTextInputValue('modal_tag_edit_lang') ? interaction.fields.getTextInputValue('modal_tag_edit_lang').toLowerCase() : data.language,
                                    desc: interaction.fields.getTextInputValue('modal_tag_edit_desc') || data.desc,
                                    content: interaction.fields.getTextInputValue('modal_tag_edit_content')
                                }
                            }
                        )

                        interaction.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription(`The tag \`${interaction.fields.getTextInputValue('modal_tag_edit_name')}\` is now updated.`)
                                    .setColor('Green')
                            ]
                        });
                    };
                }
            );
        };
    };
});