const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    name: 'report',
    description: 'Report a tag.',
    type: 1,
    options: [],
    run: async (client, interaction) => {
        const modal = new ModalBuilder()
            .setCustomId('modal_tag_report')
            .setTitle('Report a tag')
            .addComponents(
                new ActionRowBuilder()
                    .addComponents(
                        new TextInputBuilder()
                            .setLabel('Tag ID:')
                            .setCustomId('modal_tag_report_id')
                            .setPlaceholder('You can get the tag ID by using /tag get [tag].')
                            .setStyle(TextInputStyle.Short)
                            .setRequired(true)
                            .setMaxLength(30)
                            .setMinLength(20)
                    ),
                new ActionRowBuilder()
                    .addComponents(
                        new TextInputBuilder()
                            .setLabel('Report Reason:')
                            .setCustomId('modal_tag_report_reason')
                            .setPlaceholder('The report reason, like: Spamming, Swearing... etc.')
                            .setStyle(TextInputStyle.Paragraph)
                            .setRequired(true)
                            .setMaxLength(300)
                            .setMinLength(10)
                    )
            )

        await interaction.showModal(modal);
    },
};
