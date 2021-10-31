const Discord = require('discord.js') 
const osu = require('node-osu');
const api = new osu.Api("Osu Api Key", {
    notFoundAsError: true,
    completeScores: false
})
exports.run = async(client, msg, args) => {

    let username = args[0]
console.log(args)
    if (!args[0]) return msg.channel.send({
        embed: {
            description: `:x: **Please, provide a valid user\'s nickname! (osu!)**`
        }
    })

    api.getUser({ u: username }).then(user => {
        const embed = new Discord.MessageEmbed()
            .setAuthor('User Osu Search System', `https://upload.wikimedia.org/wikipedia/commons/4/44/Osu%21Logo_%282019%29.png`)
            .setThumbnail(`http://s.ppy.sh/a/${user.id}}`)
            .setColor("#D0436A")
            .addField('Nickname:', user.name)
            .addField('PP:', Math.round(user.pp.raw), true)
            .addField('Rank:', user.pp.rank, true)
            .addField('Level:', Math.round(user.level), true)
            .addField('Country:', user.country)
            .addField('Country Rank:', user.pp.countryRank)
            .addField('Playcount:', user.counts.plays)
            .addField('Accuracy:', `${user.accuracyFormatted}`, true)
            .setFooter(msg.author.username, msg.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
        msg.channel.send(embed)

    })
};
exports.help = {
    name:"osu",
    usage:"osu <account>"
}