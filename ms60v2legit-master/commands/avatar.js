const Discord = require("discord.js");
exports.run = async (client, msg, args) => {
  var user = msg.mentions.users.first() || msg.author;
  avatar = user.displayAvatarURL({dynamic: true , size: 1024});
  const embed = new Discord.MessageEmbed()
  .setTitle(`${user.tag}'s avatar`)
  .setDescription(`[Avatar **${user.tag}**](${avatar})`)
  .setColor(0x1d1d1d)
  .setImage(avatar)
  .setFooter(`Requested by: ${msg.author.tag}`)
  
  return msg.channel.send(embed);
}

module.exports.help = {
  name:"avatar",
  usage: '!avatar <person | user >',
}