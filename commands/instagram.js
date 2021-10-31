const { MessageEmbed } = require("discord.js")
const { stripIndents } = require("common-tags");
const insta = require("user-instagram");

exports.run = async (client, msg, args) => {
    //get the name to search for
    let name = args[0];

    //if there is no name send a msg to the channel
    if(!name) return msg.channel.send('Enter an account to search for!');

    await insta(name).then(res => {

      //create a new embed with the result info and send it to the channel
      let embed = new MessageEmbed()
        .setColor('#ff99ff')
        .setTitle(res.fullName)
        .setURL(res.link)
        .setThumbnail(res.profilePicHD)
        .addField('Profile info:', stripIndents`**Username:** ${res.username}
        **Full name:** ${res.fullName}
        **Biography:** ${res.biography.length == 0 ? 'None' : res.biography}
        **Posts:** ${res.postsCount}
        **Followers:** ${res.subscribersCount}
        **Following:** ${res.subscribtions}
        **Private:** ${res.isPrivate ? 'Yes 🔐' : 'No 🔓'}`)
        .setFooter(`© ${msg.guild.me.displayName}`, client.user.displayAvatarURL());

      msg.channel.send(embed);
    }).catch(err => {
      console.log(err);
      return msg.reply("Are you sure that account exists?");
    });
}
module.exports.help = {
    name:"instagram",
    usage: 'instagram <name>',
  }