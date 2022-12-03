const { EmbedBuilder } = require('discord.js');
const { TagsSystemReport } = require('../models/main');

module.exports = {
    name: 'setup-report',
    description: 'Setup the report system.',
    type: 1,
    options: [
        {
            name: 'enable',
            description: 'Enable the report system.',
            type: 1,
            options: [
                {
                    name: 'channel',
                    description: 'The channel to send the reports.',
                    type: 7,
                    required: true
                }
            ]
        },
        {
            name: 'disable',
            description: 'Disable the report system.',
            type: 1
        }
    ],
    run: async (client, interaction) => {

        if (interaction.options._subcommand === "enable") {
            if (interaction.guild.channels.cache.get(interaction.options.get('channel').value).type !== 0) return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`The chosen channel is not a text channel.`)
                ],
                ephemeral: true
            });

            TagsSystemReport.findOne({
                guild: interaction.guild.id
            }, async (err, data) => {
                if (err) throw err;
                if (!data) {
                    data = new TagsSystemReport(
                        {
                            guild: interaction.guild.id,
                            channel: interaction.options.get('channel').value
                        }
                    );

                    data.save();

                    return interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(`The report setup has been successfully **enabled**.`)
                                .setColor('Green')
                        ],
                        ephemeral: true
                    });
                } else {
                    return interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(`The system is already enabled.`)
                        ],
                        ephemeral: true
                    });
                };
            });
        }

        if (interaction.options._subcommand === "disable") {
            TagsSystemReport.findOne({
                guild: interaction.guild.id
            }, async (err, data) => {
                if (err) throw err;
                if (data) {
                    await TagsSystemReport.deleteOne({
                        guild: interaction.guild.id
                    });

                    return interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(`The report setup has been successfully **disabled**.`)
                                .setColor('Green')
                        ],
                        ephemeral: true
                    });
                } else {
                    return interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(`The system is already disabled.`)
                        ],
                        ephemeral: true
                    });
                };
            });
        };

    },
};