const Discord = require('discord.js');
var Jimp = require('jimp');
exports.run = async (client, msg, args) => {
var user = msg.mentions.users.first() || msg.author;
msg.channel.startTyping();
  var user = msg.mentions.users.first() || msg.author;
  if (!msg.guild) user = msg.author;

  Jimp.read(user.avatarURL({format: "png"}), (err, image) => {
      image.resize(295, 295)
      image.gaussian(1)
      Jimp.read("https://cdn.discordapp.com/attachments/444475700871823361/517295012384604181/gta_efekt.png", (err, avatar) => {
          avatar.resize(295, 295)
          image.composite(avatar, 4, 0).write(`./img/gta/${client.user.id}-${user.id}.png`);
          setTimeout(function() {
              msg.channel.send(new Discord.MessageAttachment(`./img/gta/${client.user.id}-${user.id}.png`));
          }, 1000);
    msg.channel.stopTyping();
      });
  });
}
module.exports.help = {
    name:"gta5",
    usage: 'Gta 5 command.',
    group: "misc"
  }

