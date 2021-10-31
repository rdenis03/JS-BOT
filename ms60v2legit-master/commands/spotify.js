const Discord = require("discord.js");
const convert = require("parse-ms");

exports.run = async (client, msg, args) => {
    let user;
    if (msg.mentions.users.first()) {
        user = msg.mentions.users.first();
    } else {
        user = msg.author;
    }

    let status;
    if (user.presence.activities.length === 1) status = user.presence.activities[0];
    else if (user.presence.activities.length > 1) status = user.presence.activities[1];

    if (user.presence.activities.length === 0 || status.name !== "Spotify" && status.type !== "LISTENING") {
        return msg.channel.send("You don't listen to spotify.If you don't know how to connect your spotify to follow this steps:\n\nGo to settings => Connections => Then you press on spotify icon. => Connect your spotify account and make sure Display Spotify as status is on");
    }

    if (status !== null && status.type === "LISTENING" && status.name === "Spotify" && status.assets !== null) {
        let image = `https://i.scdn.co/image/${status.assets.largeImage.slice(8)}`,
            url = `https:/open.spotify.com/track/${status.syncID}`,
            name = status.details,
            artist = status.state,
            album = status.assets.largeText,
            timeStart = status.timestamps.start,
            timeEnd = status.timestamps.end,
            timeConvert = convert(timeEnd - timeStart);

        let minutes = timeConvert.minutes < 10 ? `0${timeConvert.minutes}` : timeConvert.minutes;
        let seconds = timeConvert.seconds < 10 ? `0${timeConvert.seconds}` : timeConvert.seconds;
        let time = `${minutes}:${seconds}`;

        const embed = new Discord.MessageEmbed()
        .setAuthor("Informations:", "https://image.flaticon.com/icons/svg/2111/2111624.svg")
        .setColor(0x1ED768)
        .setThumbnail(image)
        .addField("Name:", name, true)
        .addField("Album:", album, true)
        .addField("Artist:", artist, true)
        .addField("Duration of song:", time, false)
        .addField("Listen now on Spotify!", `[\`${artist} - ${name}\`](${url})`, false)
        return msg.channel.send(embed)
    }
}
exports.help = {
    name:"spotify",
    usage:"spotify < user | author > "
}
