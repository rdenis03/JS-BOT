const Discord = require("discord.js")
const fs = require('fs')
const yaml = require("js-yaml");
const backup = require("discord-backup")
const { attention, permission, msgsfetchlimts, yes, arrowhere, botlog, no } = yaml.load(fs.readFileSync("./config.yml"));

exports.run = async (client, msg, args) => {
        let backupID = args[0];
        if(!backupID){
            let notvaild = new Discord.MessageEmbed()
            .setAuthor(client.user.username, client.user.displayAvatarURL)
            .setDescription(`${arrowhere} You must specify a valid backup ID To Remove ${no}`)
            .setColor("#ff9900")
            .setFooter(msg.author.username, msg.author.displayAvatarURL())
                
            return msg.channel.send(notvaild);
        }
        backup.fetch(backupID).then((backupInfos) => {
            backup.remove(backupID)
             let backups = new Discord.MessageEmbed()
           .setAuthor(msg.author.username, msg.author.displayAvatarURL())
           .setDescription(`BACKUP DELETE`)
           .setColor('#ff0000')
           .setFooter(client.user.username, client.user.displayAvatarURL())
           client.channels.cache.get(botlog).send(`Backup was deleted.\n Author: ${msg.author.username}`)
   msg.channel.send(backups)
}).catch((err) => {
    let nobackupfound = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.displayAvatarURL)
    .setDescription(`No Backup Found For ${backupID} ${attention}`)
    .setFooter(msg.author.username, msg.author.displayAvatarURL())
    return msg.channel.send(nobackupfound);
});
}
module.exports.help = {
    name:"backup-remove",
    usage: '<prefix>backup-remove <backup.id>',
  }
