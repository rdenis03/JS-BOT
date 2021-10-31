const Discord = require('discord.js');
const got = require('got')
exports.run = async (client, msg, args) => {
got('https://www.reddit.com/r/memes/random/.json').then(response => {
    
    let content = JSON.parse(response.body);
    let permalink = content[0].data.children[0].data.permalink;
    let memeUrl = `https://reddit.com${permalink}`;
    let memeImage = content[0].data.children[0].data.url;
    let memeTitle = content[0].data.children[0].data.title;
    let memeUpvotes = content[0].data.children[0].data.ups;
    let memeDownvotes = content[0].data.children[0].data.downs;
    let memeNumComments = content[0].data.children[0].data.num_comments;
    const embed = new Discord.MessageEmbed()
    embed.setTitle(`${memeTitle}`)
    embed.setURL(`${memeUrl}`)
    embed.setImage(memeImage)
    embed.setColor('RANDOM')
    embed.setFooter(`👍 ${memeUpvotes} 👎 ${memeDownvotes} 💬 ${memeNumComments}`)
    embed.setColor("#ff7900")
    msg.channel.send(embed);
})
}
module.exports.help = {
    name:"meme",
    usage: 'daily meme from reddit.',
  }