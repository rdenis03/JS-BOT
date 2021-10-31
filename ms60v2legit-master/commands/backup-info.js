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
            .setDescription(`${arrowhere} You must specify a valid backup ID ${no}`)
            .setColor("#990000")
            .setFooter(msg.author.username, msg.author.displayAvatarURL())
                
            return msg.channel.send(notvaild);
        }
        backup.fetch(backupID).then((backupInfos) => {
            const date = new Date(backupInfos.data.createdTimestamp);
            const yyyy = date.getFullYear().toString(), mm = (date.getMonth()+1).toString(), dd = date.getDate().toString();
            const formatedDate = `${yyyy}/${(mm[1]?mm:"0"+mm[0])}/${(dd[1]?dd:"0"+dd[0])}`;
            let backups = new Discord.MessageEmbed()
           .setAuthor(msg.author.username, msg.author.displayAvatarURL())
           .setDescription(`** BACKUP INFO **\n ${arrowhere} Backup ID: ${backupInfos.id} \n ${arrowhere} Server ID: ${backupInfos.data.guildID} \n ${arrowhere} Backup Size: ${backupInfos.size} mb \n ${arrowhere} Backup Created At: ${formatedDate}`)
           .setFooter(`${attention} MS-60`, client.user.displayAvatarURL())
           .setColor("#ff9933")           
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
    name:"backup-info",
    usage: 'backup-info <id>',
  }