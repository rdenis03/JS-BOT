const Discord = require("discord.js")
const fs = require('fs')
const yaml = require("js-yaml");
const backup = require("discord-backup")
const { attention, permission, msgsfetchlimts, yes, arrowhere, botlog, no, load } = yaml.load(fs.readFileSync("./config.yml"));
exports.run = async (client, msg, args) => {
        try{
		if(!msg.member.hasPermission("ADMINISTRATOR", "MANAGE_GUILD")){
          let permissionsembed = new Discord.MessageEmbed()
            .setTitle(`${attention} **Missing Permissions**`)
            .setDescription(`${permission} You Must Have [ADMINISTRATOR, MANAGE_GUILD] Perms To Use This Command!`)
            .setColor("#ff3300")
            .setFooter(msg.guild.name, client.user.displayAvatarURL())
             msg.channel.send(permissionsembed)
             return;
        }
        msg.channel.send(`${load} Creating Backup... `)
        backup.create(msg.guild, {
            jsonBeautify: true,
            saveImages: "base64",
            maxMessagesPerChannel: msgsfetchlimts,
        }).then((backupData) => {
            let guildicon = msg.guild.iconURL()
            let datacreated = new Discord.MessageEmbed()
            .setAuthor(msg.author.username, msg.author.displayAvatarURL())
            .setDescription(`${yes} New Backup Created\n ${arrowhere} **Backup ID**: ${backupData.id}\n ${arrowhere} **Guild Name**: ${msg.guild.name} `)
            .setColor("#66ff33")
            .setFooter(msg.guild.name, guildicon)
             msg.author.send(datacreated).catch(() => {
                let datacreated1 = new Discord.MessageEmbed()
                .setAuthor(msg.author.username, msg.author.displayAvatarURL())
                .setDescription(`${yes} New Backup Created\n ${arrowhere} **Backup ID**: ${backupData.id}\n ${arrowhere} **Guild Name**: ${msg.guild.name} `)
                .setColor("#66ff33")
                .setFooter(msg.guild.name, guildicon)
                 msg.channel.send("Next time please have dms open.", datacreated1)
             })
             let created = new Discord.MessageEmbed()
             .setAuthor(msg.author.username, msg.author.displayAvatarURL())
             .setDescription(`${yes}New Backup Has Been Created `)
             .setColor("#99ff33")
             .setFooter(msg.guild.name, guildicon)
             let logsembed = new Discord.MessageEmbed()
             .setTitle("Logs MS-60")
             .setDescription(`Backp new **\nBackup ID: ${backupData.id} \nBackup Author: ${msg.author.username} \nGuild name: ${msg.guild.name}`)
             .setColor('#cccc00')
              client.channels.cache.get(botlog).send(logsembed)
            msg.channel.send(created);
        });
    } catch (error) {
        let datacreated3 = new Discord.MessageEmbed()
            .setAuthor(msg.author.username, msg.author.displayAvatarURL())
            .setDescription(`${yes} New Backup Created\n ${arrowhere} **Backup ID**: ${backupData.id}\n ${arrowhere} **Guild Name**: ${msg.guild.name} `)
            .setColor("#66ff33")
            .setFooter(msg.guild.name, guildicon)
        msg.channel.send("Next time please have dms open.", datacreated3)
    }
}
module.exports.help = {
    name:"backup-create",
    usage: 'backup-create.',
  }