const Discord = require("discord.js");
const { yes , no , warn , think , loading} = require('../configbot//emojis.json')
module.exports.run = async (client, msg,args) => {
    if (!msg.member.hasPermission('ADMINISTRATOR' ,'MANAGE_MESSAGES')) return msg.channel.send(`${warn}**${msg.author.tag} you dont have enough perms**. Permission required: \`ADMINISTRATOR\` or \`MANAGE_MESSAGES\` ${warn}`)
    let channel = client.channels.cache.get(msg.channel.id)
var posisi = channel.position;
  channel.clone().then((channel2) => {
    channel2.setPosition(posisi)
    channel.delete()
    channel2.send("Channel Has been nuked !",{
    files: ['https://media.tenor.com/images/0754697c9c4dd44ca8504dbf1b36b927/tenor.gif']
    })
  })
    }
module.exports.help = {
        name:"nuke",
        usage:"nuke <channel>",
      }