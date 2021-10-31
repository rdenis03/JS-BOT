const Discord = module.require("discord.js");
exports.run = async (client, msg, args) => {
   if (!msg.member.hasPermission('MANAGE_SERVER', 'MANAGE_CHANNELS','ADMINISTRATOR')) {
   return msg.channel.send(`**${msg.author.tag} you dont have enough perms**. Permission required: \`MANAGE_CHANNELS\` or \`ADMINISTRATOR\``)
   }
   msg.channel.overwritePermissions([
     {
        id: msg.guild.id,
        allow : ['SEND_MESSAGES'],
     },
    ],);
   const embed = new Discord.MessageEmbed()
   .setTitle("Channel Unlocked")
   .setDescription(`🔒 ${msg.channel} is now unlocked.`)
   .setColor("DARK-GREEN");
   await msg.channel.send(embed);
   msg.delete();
}
exports.help = {
   name:"unlock",
   usage:"<prefix>unlock channel"
}