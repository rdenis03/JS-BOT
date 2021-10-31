
const { MessageEmbed } = require('discord.js')

exports.run = (client, msg, args) => {

    if (!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send(`${message.author.tag} you don't have enough perms.Required permissions: \`ADMINISTRATOR\`. `).then(m => {
        setTimeout(() => {
            m.delete()
        }, 10000);
    })

    if(client.settings.get(msg.guild.id, "antiinvite")) {
        client.settings.set(msg.guild.id, false, "antiinvite")
        let embed1 = new MessageEmbed()
        .setDescription(`${msg.author} anti-invite is now disabled. Use \`<prefix>anti-invite\` to enable anti-invite.`)
        .setColor("#ccff66")
        msg.channel.send(embed1)
        return;
    } else if(!client.settings.get(msg.guild.id, "antiinvite")) {
        client.settings.set(msg.guild.id, true, "antiinvite")
        let embed = new MessageEmbed()
        .setDescription(`${msg.author} anti-invite is now enabled. Use <prefix>anti-invite\` to disable anti-invite.`)
        .setColor("#ccff66")
      msg.channel.send(embed)
        return;
    }

    
}


  module.exports.help = {
    name:"anti-invite",
    usage:'Disable users from sending invites in your server.',
  }