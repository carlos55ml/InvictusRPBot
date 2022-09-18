const { config } = require("./../config.json")
const { EmbedBuilder } = require('discord.js');

const client = require("./../main.js")

module.exports = {
    async execute(interaction, reason) {
        var targetMember
        var targetMemberId
        if (interaction.isSelectMenu()) {
            targetMemberId = interaction.customId;
            targetMember = interaction.guild.members.cache.get(targetMemberId);
        }

        if (interaction.isCommand()) {
            targetMemberId = interaction.options.getUser('user');
            targetMember = interaction.guild.members.cache.get(targetMemberId.id);
        }

        if (!targetMember) {
            console.log("ERROR CRITICO")
            return
        }

        const admin = interaction.user.tag;
        const results_channel = client.channels.cache.get(config.resultsChannelId)
        
        const avatarUrl = client.user.avatarURL()

        const embed = new EmbedBuilder()
            .setColor(14680135)
            .setTitle(':cry: Malas noticias.')
            .setAuthor({ name: 'InvictusRP', iconURL: avatarUrl })
            .setDescription('No has sido permitido en el servidor. Por favor, corrije lo abajo indicado para volver a enviar la postulacion.')
            .addFields({
                name:"Razon: ", value: '\`' + reason + '\`'
            })
            .setTimestamp()
            .setFooter({ text: 'Denegado por: ' + admin });

        if (interaction.member.permissions.has('MANAGE_ROLES')) {
            if (targetMember.roles.cache.has(config.userRoleId)) {
                if (interaction.isSelectMenu()){
                    await interaction.update({ content: ':yellow_circle: El Usuario <@' + interaction.customId + '> YA ES UN MIEMBRO verificado.', embeds: [], components: [] })
                } else {
                    await interaction.reply(":yellow_circle: El usuario <@"+targetMemberId+"> YA ES UN MIEMBRO verificado.")
                }

            } else {
                targetMember.send({ embeds: [embed] });
                if (interaction.isSelectMenu()){
                    await interaction.update({ content: ':no_entry_sign: Usuario <@' + interaction.customId + '> Denegado por <@' + interaction.user.id + '> con razon \`' + reason + '\`', embeds: [], components: [] });
                    results_channel.send(':no_entry_sign: Usuario <@' + interaction.customId + '> Denegado por ' + admin + ' con razon \`' + reason + '\`')
                } else {
                    await interaction.reply(":no_entry_sign: El usuario <@"+targetMemberId+"> ha sido denegado con razon: \`"+reason+"\`. \nDenegado por <@"+interaction.user.id+">.");
                    results_channel.send(':no_entry_sign: Usuario <@' + targetMemberId + '> Denegado por '+ admin + ' con razon \`' + reason + '\`')
                }
                
            }
        } else {
            if (interaction.isSelectMenu()){
                await interaction.update({ content: ':yellow_circle: <@' + interaction.user.id + '> No tienes permisos para hacer eso.', embeds: [], components: [] })
            } else {
                await interaction.reply("No tienes permisos para hacer eso.")
            }
        }
    }
}