const Discord = require("discord.js");
const db = require('quick.db')
exports.run = (client, msg, args) => {
    if(!msg.member.hasPermission("MANAGE_CHANNELS","ADMINISTRATOR")) {
        return msg.channel.send(`**${msg.author.tag} you dont have enough perms**. Permission required: \`MANAGE_CHANNELS\` or \`ADMINISTRATOR\``)
      }
    var time = msg.content.split(' ').slice(1).join(' ')
    if(!time) return msg.reply('Please enter a time in seconds! Ex: <prefix>slowmode 5s')
   msg.channel.setRateLimitPerUser(time)
   const embed1= new Discord.MessageEmbed()
   .setTitle(`Slowmode`)
   .setDescription(`${msg.author.tag} slowmode is now : **${time}**`)
   .setColor('GREEN')
   .setTimestamp()
   msg.channel.send(embed1)
   let chx = db.get(`modlog_${msg.guild.id}`, channel.id)
  
   if(chx === null) {
     return;
   } 
   const embed = new Discord.MessageEmbed()
   .setAuthor(`${msg.author.tag} - ${msg.author.id}`,msg.author.displayAvatarURL({size: 4096, dynamic: true}))
   .setTitle(`Slowmode was changed on #${msg.channel.name} by ${msg.author.tag}`)
   .setDescription(`Time: ${time}`)
   .setTimestamp()
   bot.channels.cache.get(chx).send(embed)
}
exports.help = {
    name:"slowmode",
    usage:"slowmode <time>"
}
  