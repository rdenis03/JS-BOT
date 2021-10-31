const Discord = require('discord.js');
const request = require('request');

exports.run = async (client, msg, args) => {

    let username = args[0];

    if (!username) {await client.sendErrorEmbed(msg.channel, 'Please provide a minecraft username'); return;}

    let embed = new Discord.MessageEmbed()
      .setColor('#b00b1e')

    request(`https://api.mojang.com/users/profiles/minecraft/${username}`, async function(err, response, body) {

        if (err) {
            console.log(err);
            await client.sendErrorEmbed(msg.channel, `Error getting user`);
            return;
        }

        if (!body) {
            await msg.channel.send(
                'Please send a valid name.'
            )
            return;
        }

        body = JSON.parse(body);

        embed.addField("Username", body.name);
        embed.addField("UUID", body.id)
        embed.addField("Skin", `
        View: [Click-Here](https://minotar.net/skin/${username})
        Download: [Click-Here](https://minotar.net/download/${username})
        `)
        embed.setThumbnail(`https://minotar.net/body/${username}/100.png`);

        await msg.channel.send(embed);
        return;
    });

}
module.exports.help = {
    name:"mcuser",
    usage: '<prefix>mcuser <user>',
  }
