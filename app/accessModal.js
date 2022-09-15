const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    async execute(interaction, client) {
        const modal = new ModalBuilder()
            .setCustomId(interaction.user.id)
            .setTitle('Postulacion Acceso');

        // Add components to modal

        // Create the text input components
        const nameInput = new TextInputBuilder()
            .setCustomId('nameInput')
            // The label is the prompt the user sees for this input
            .setLabel("Tu nombre")
            .setRequired(true)
            .setMaxLength(32)
            // Short means only a single line of text
            .setStyle(TextInputStyle.Short);

        const ageInput = new TextInputBuilder()
            .setCustomId('ageInput')
            .setLabel("Tu edad")
            .setRequired(true)
            .setMaxLength(32)
            // Paragraph means multiple lines of text.
            .setStyle(TextInputStyle.Short);
        
        const expInput = new TextInputBuilder()
            .setCustomId('expInput')
            .setLabel("Experiencia en Roleplay")
            .setStyle(TextInputStyle.Short)
            .setMaxLength(32)
            .setRequired(true);

        const historyInput = new TextInputBuilder()
            .setCustomId('historyInput')
            .setLabel("Resumen de tu historia en InvictusRP")
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true)
            .setMinLength(250)
            .setMaxLength(1000);

        // An action row only holds one text input,
        // so you need one action row per text input.
        const row1 = new ActionRowBuilder().addComponents(nameInput);
        const row2 = new ActionRowBuilder().addComponents(ageInput);
        const row3 = new ActionRowBuilder().addComponents(expInput);
        const row4 = new ActionRowBuilder().addComponents(historyInput);

        // Add inputs to the modal
        modal.addComponents(row1, row2, row3, row4);

        // Show the modal to the user
        await interaction.showModal(modal);
    },
};