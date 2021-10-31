const Discord = require("discord.js")
const fs = require('fs')
const yaml = require("js-yaml");
const backup = require("discord-backup")
const { attention, permission, msgsfetchlimts, yes, arrowhere, botlog } = yaml.load(fs.readFileSync("./config.yml"));

exports.run = async (client, msg, args) => {

      const guildicon2 = msg.guild.iconURL()

      if(!msg.member.hasPermission("ADMINISTRATOR", "MANAGE_GUILD")){
        let permissionsembed = new Discord.MessageEmbed()
        .setTitle(`${attention} **Missing Permissions**`)
        .setDescription(`${permission} You Must Have [ADMINISTRATOR, MANAGE_GUILD] Perms To Use This Command!`)
        .setFooter(msg.guild.name, client.user.displayAvatarURL())
         msg.channel.send(permissionsembed)
         return;
    }
    let backupID = args[0];
    if(!backupID){
       let Speficyid = new Discord.MessageEmbed()
      .setAuthor(msg.author.username, msg.author.displayAvatarURL())
      .setDescription(`${attention} You Must Speficy a Vaild Backup ID!`)
      .setFooter(msg.guild.name, guildicon2)

        return msg.channel.send(Speficyid);
    }
    // Fetching the backup to know if it exists
    backup.fetch(backupID).then(async () => {
      let warning = new Discord.MessageEmbed()
      .setAuthor(msg.author.username, msg.author.displayAvatarURL())
      .setDescription(`${attention}If you want to load a backup all channels and roles will be deleted.\nSome rules before loading a backup:\nWhen you \`create\`/\`load\` a backup make sure that MS-60 role is the highest.${attention}\nType *confirm** to confirm the backup load.`)
      .setColor("#66ff99")
      .setFooter(msg.guild.name, guildicon2)

         msg.channel.send(warning);
            await msg.channel.awaitMessages(m => (m.author.id === msg.author.id) && (m.content === "confirm"), {
                max: 1,
                time: 20000,
                errors: ["time"]
            }).catch((err) => {
              let guildicon2 = msg.guild.iconURL()
              let timeisup = new Discord.MessageEmbed()
              .setAuthor(msg.author.username, msg.author.displayAvatarURL())
              .setDescription(`${attention} Time's up! Cancelled backup loading!`)
              .setFooter(msg.guild.name, guildicon2)

                 return msg.channel.send(timeisup);
            });
             let loadingstarting = new Discord.MessageEmbed()
            .setAuthor(msg.autor.username, msg.author.displayAvatarURL())
            .setDescription(`${yes} Start loading the backup!`)
            .setColor("#33cc33")
            .setFooter(msg.guild.name, guildicon2)

             msg.channel.send(loadingstarting);
             client.channels.cache.get(botlog).send(`** LOADING NEW BACKUP **\nBackup ID: ||${backup.id}||\nBackup Author: ${msg.author.username}\nBackup Size: ${backupID.size}\nGuild: ${msg.guild.name}`)
               
             backup.load(backupID, msg.guild).then(() => {
                 //backup.remove(backupID);
            }).catch((err) => {
               let permissionserorr = new Discord.MessageEmbed()
              .setAuthor(msg.author.username, msg.author.displayAvatarURL())
              .setDescription(`${attention}  Sorry, an error occurred... Please check that I have administrator permissions!`)
              .setFooter(msg.guild.name, guildicon2)
              client.channels.cache.get(botlog)(botlog).send(`** BACKUP FAILED TO LOAD **\nBackup ID: ${backupID} \nBackup Author: ${msg.author.username}\nBackup Size: ${backupID.size}\nGuild: ${msg.guild.name}`)

                 return msg.author.send(permissionserorr);
            });
    }).catch((err) => {
        console.log(err);
         let nobackupfound = new Discord.MessageEmbed()
        .setAuthor(msg.author.username, msg.author.displayAvatarURL())
        .setColor("#cc3300")
        .setDescription(`${attention} No backup found for ${backupID}!`)
        .setFooter(msg.guild.name, guildicon2)

         return msg.channel.send(nobackupfound);
    });

}
module.exports.help = {
    name:"backup-load",
    usage: '<prefix>backup-load <backupid>',
  }