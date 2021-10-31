const Discord = require('discord.js')
const googleTTS = require('google-tts-api')
module.exports.run = async (bot, message, args) => {
let ttsusage = args.slice(0).join(" ");
if (ttsusage.length > 200)
  return message.channel.send(
    "Maxim 200 de carctere."
  );
if (!ttsusage)
  return message.channel.send("Correct format: <prefix>tts <text>. \`Note: For now support's only Romanian language \`");
googleTTS(ttsusage, "ro-RO", 1)
  .then(function (url) {
    const attachtts = new Discord.MessageAttachment(url).setName(
      `${message.author.tag}.mp3`
    );
    message.channel.send(attachtts);
  })
  .catch(function (err) {
    console.error(err.stack);
  });
}
exports.help = {
    name:"tts",
    usage:"tts <text>"
}