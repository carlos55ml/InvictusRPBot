const { config } = require("./../config.json")
const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require('discord.js');

const client = require("./../main.js")

module.exports = {
    async execute(interaction) {
        const name = interaction.member.user.tag
        const avatarUrl = interaction.member.user.avatarURL()
        const applyEmbed = new EmbedBuilder()
            .setTitle('Nueva postulacion:')
            .setColor(9164269)
            .setAuthor({ name: name, iconURL: avatarUrl})
            .setDescription('Usuario ha enviado una postulacion.')
            .addFields(
                {name: "Nombre:", value: interaction.fields.getTextInputValue('nameInput')},
                {name: "Edad:", value: interaction.fields.getTextInputValue('ageInput')},
                {name: "Experiencia:", value: interaction.fields.getTextInputValue('expInput')},
                {name: "Historia", value: interaction.fields.getTextInputValue('historyInput')}
            )
            .setTimestamp();

        const applyRow = new ActionRowBuilder()
            .addComponents(
                new SelectMenuBuilder()
                    .setCustomId(interaction.customId)
                    .setPlaceholder('Acciones')
                    .addOptions([{
                        label: 'Permitir',
                        description: 'Permite al usuario',
                        value: 'apply_permit'
                    },
                    {
                        label: 'Denegar',
                        description: 'Deniega al usuario. (Sin informacion suficiente.).',
                        value: 'apply_deny1'
                    },
                    {
                        label: 'Denegar',
                        description: 'Deniega al usuario. (Edad no suficiente).',
                        value: 'apply_deny2'
                    },
                    {
                        label: 'Denegar',
                        description: 'Deniega al usuario. (Descripcion de personaje escueta).',
                        value: 'apply_deny3'
                    },
                    {
                        label: 'Borrar',
                        description: 'Borra el mensaje.',
                        value: 'menu_delete'
                    }
                    ])
            )
        
            try {
                const channel = client.channels.cache.get(config.accessAdminChannelId)
                channel.send({ embeds: [applyEmbed], components: [applyRow] })
                channel = client.channel.cache.get(config.accessLogChannelId)
                channel.send({ embeds: [applyEmbed] })
            } catch (err) {
                console.log(err)
            }
    }
}