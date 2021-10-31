const { Util } = require('discord.js');
const { RequestError } = require('got/dist/source');
const Discord = require('discord.js')
const { yes , no , warn , think , loading} = require('../configbot//emojis.json')
module.exports.run = async (client, msg, args) => {

if (!msg.member.hasPermission("ADMINISTRATOR","MANAGE_GUILD")) {
	msg.reply(`${warn}You don\'t enough perms. Required permissions:\`ADMINISTRATOR\` or \`MANAGE_GUILD\``)
	return;
}

  let check = client.settings.get(msg.guild.id, "levelsystem")
  if(check === false) {
	  let embed1 = new Discord.MessageEmbed()
	  .setDescription(`${msg.author} level system is now enabled. ${yes}`)
	  .setColor("#66ffff")
  	msg.channel.send(embed1)
  	client.settings.set(msg.guild.id, true, "levelsystem")
  } else if (check === true) {
	let embed1 = new Discord.MessageEmbed()
	.setDescription(`${msg.author} level system is now disabled. ${no}`)
	.setColor("#66ffff")
	msg.channel.send(embed1)
  	client.settings.set(msg.guild.id, false, "levelsystem")
  }

}

exports.help = {
	name:"disablelevelsystem",
	usage: "disablelevelsystem",
}