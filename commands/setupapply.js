const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { config } = require('./../config.json')
const fs = require('fs')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setupapply')
        .setDescription('Manda el mensaje de apertura modal acceso'),
    async execute(interaction, client) {
        if (interaction.member.permissions.has('ADMINISTRATOR')) {
            try {
                const embedFile = './embeds/accessInstructions.json'
                const embedContent = fs.readFileSync(embedFile, 'UTF-8')
                const json = JSON.parse(embedContent)
                const embed = new EmbedBuilder(json);

                const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('openModal')
                            .setLabel('Mandar plantilla!')
                            .setStyle(ButtonStyle.Primary),
                    );

                const channel = client.channels.cache.get(config.accessChannelId)
                channel.send({ embeds: [embed], components: [row] })

                await interaction.reply({content: "Mensaje enviado correctamente", ephemeral: true})
            } catch (err) {
                console.log(err)
                await interaction.reply({ content: "Error al mandar los mensajes", ephemeral: true })
            }
        }

    },
};
