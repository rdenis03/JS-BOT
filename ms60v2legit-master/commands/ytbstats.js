const fetch = require("node-superfetch"); // npm install node-superfetch
const Discord = require("discord.js");
module.exports.run = async (client, msg, args) => {
console.log(args)
let name = args.join(" ");
if (!name) return msg.channel.send("Unknown channel name.");

const channel = await fetch.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${name}&key=AIzaSyAhAi-DqLDG5IY3-cf_MtB4D2SMuYlHSZA&maxResults=1&type=channel`)
.catch(() => msg.channel.send("Unknown channel error."));

if (!channel.body.items[0]) return msg.channel.send("No channel result. Try again.");

const data = await fetch.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics,brandingSettings&id=${channel.body.items[0].id.channelId}&key=AIzaSyAhAi-DqLDG5IY3-cf_MtB4D2SMuYlHSZA`)
.catch(() => msg.channel.send("Unknown channel data error."));

const embed = new Discord.MessageEmbed()
.setColor(0x7289DA)
.setThumbnail(channel.body.items[0].snippet.thumbnails.high.url)
.setTimestamp(new Date())
.addField("Channel Name", channel.body.items[0].snippet.channelTitle, true)
.addField("Channel Description", channel.body.items[0].snippet.description, true)
.addField("Subscribers Count", parseInt(data.body.items[0].statistics.subscriberCount).toLocaleString(), true)
.addField("Total Views", parseInt(data.body.items[0].statistics.viewCount).toLocaleString(), true)
.addField("Total Video(s)", parseInt(data.body.items[0].statistics.videoCount).toLocaleString(), true)
.addField("Date Created", new Date(channel.body.items[0].snippet.publishedAt).toDateString(), true)
.addField("Link", `[${channel.body.items[0].snippet.channelTitle}](https://www.youtube.com/channel/${channel.body.items[0].id.channelId})`, true)
return msg.channel.send(embed);
}
exports.help = {
    name:"ytbstats",
    usage:"<prefix>ytbstats <args>"
}