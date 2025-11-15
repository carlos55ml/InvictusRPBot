const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fs = require('fs');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('sendsocial')
        .setDescription('Manda el mensaje de redes.'),
    async execute(interaction, client) {
        if (interaction.member.permissions.has('ADMINISTRATOR')) {
            try {
                const { config } = require('./../config.json')
                const embedFile = './embeds/social.json'
                const embedContent = fs.readFileSync(embedFile, 'UTF-8')
                const json = JSON.parse(embedContent)
                const embed = new MessageEmbed(json);
                const social_channel = client.channels.cache.get(config.socialChannel)
                social_channel.send({ embeds: [embed] });

                await interaction.reply({content: "Reglas enviados correctamente", ephemeral: true})
            } catch (err) {
                console.error(err)
                await interaction.reply({content: "Error al mandar los Reglas", ephemeral: true})
            }
        } else {
            await interaction.reply({content: "No tienes permiso para hacer eso.", ephemeral: true})
        }


    },
};