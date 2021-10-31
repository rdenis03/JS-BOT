const Discord = require("discord.js")

exports.run = (client, msg, args) => {
    let channel = msg.mentions.channels.first()
    
    if(!channel) {
      return msg.channel.send("Please Mention the channel first")
    }
    const setupw = db.get(`modlog_${msg.guild.id}`, channel.id)
    if(setupw) return msg.channel.send('Oh nooo ... i see that you already have a modlog channel. use <prefix>delete-modlog to delete the modlog channel.')
    db.set(`modlog_${msg.guild.id}`, channel.id)
    let embed = new Discord.MessageEmbed()
    .setTitle(`Mod log setup is Done!`)
    .setDescription(`Every command will appear in ${channel}`)
    .setColor("YELLOW")
    .setFooter('Note: logs will be only if you use one of my commands. Use m?help to see what commands.')
    msg.channel.send(embed)
  }
  exports.help = {
    name:"setupmodlog",
    usage:"<prefix>setupmodlog <channel>"
}