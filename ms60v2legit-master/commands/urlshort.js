const Discord = require('discord.js');
var shortUrl = require('node-url-shortener');
exports.run = async (client, msg, args) => {

    const regex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/; 
    if(!args[1]) return msg.channel.send("Pune un url pe care trebuie sa il scurtez.")
    if(!regex.exec(args[1])) return msg.channel.send("Pune un url valid pe care trebuie sa il scurtez.")
    shortUrl.short(args[1], function(err, url){
        const embed = new Discord.MessageEmbed()
            .setAuthor("Url Shortener", msg.author.displayAvatarURL({ dynamic: true }))
            .setColor("BLUE")
            .addField("Your Url:", `[CLICK ME](${args[1]})`)
            .addField("Shortened Url:", `[CLICK ME](${url})`)
            .setFooter(`Requested by : ${msg.author.username}`, msg.author.displayAvatarURL({ dynamic: true }))
        return msg.channel.send(embed);
    })
}
exports.help = {
    name:"urlshort",
    usage:"urlshort <url>"
}