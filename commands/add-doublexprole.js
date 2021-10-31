const Discord = require('discord.js')

const { yes , no , warn , think , loading} = require('../configbot//emojis.json')
exports.run = (client, msg, args) => {
if (!msg.member.hasPermission("ADMINISTRATOR",'MANAGE_ROLES')) return msg.channel.send(`${warn}**${message.author.tag} you dont have enough perms**. Permission required: \`ADMINISTRATOR\` or \`MANAGE_ROLES\`${warn}`)
  let role = msg.guild.roles.cache.find(r => r.name.toLowerCase() === args.join(" ").toLowerCase()) || msg.guild.roles.cache.get(args[0]) || msg.mentions.roles.first()
  if(!role) return msg.channel.send(`I could not find a role by the name of that.${no}`)

 let arr = client.settings.get(msg.guild.id, "doublexproles")
   
   let index = arr.findIndex(obj => obj === role.id)
   if (arr.includes(role.id)) {
    msg.channel.send(`That role was already being rewarded with double XP, I removed it from being awarded with double xp. ${yes}`)
    client.settings.delete(msg.guild.id, `doublexproles.${index}`)
    return;
   }
   const doublexp = new  Discord.MessageEmbed()
   .setTitle(`Setup done ${yes}`)
   .setDescription(`${role.toString()} has been added to gaining double xp.`)
   .setColor('#2bfe72')
   msg.channel.send(doublexp)
   //msg.channel.send(`${role.toString()} has been added to gaining double xp.`)
   client.settings.push(msg.guild.id, role.id, "doublexproles")//End
  }
  


module.exports.help = {
    name:"add-doublexprole",
    usage: "<prefix>add-doublexprole <role>"
  }
