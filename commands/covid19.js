const Discord = require('discord.js');
const covid = require('novelcovid');
module.exports.run = async (client, msg, args) => {
    const covidStats = await covid.all()
    let embed = new Discord.MessageEmbed()
    .setTitle("🦠Covid-19🦠")
    .setColor("#89168c")
    .addFields(
        {name: `Cases`, value: covidStats.cases.toLocaleString(), inline: true},
        {name: `Cases today`, value: covidStats.todayCases.toLocaleString(), inline: true},
        {name: `Deaths`, value: covidStats.deaths.toLocaleString(), inline: true},
        {name: `Deaths today`, value: covidStats.todayDeaths.toLocaleString(), inline: true},
        {name: `Recovered`, value: covidStats.recovered.toLocaleString(), inline: true},
        {name: `Recovered today`, value: covidStats.todayRecovered.toLocaleString(), inline: true},
        {name: `Infected`, value: covidStats.active.toLocaleString(), inline: true},
        {name: `Critical`, value: covidStats.critical.toLocaleString(), inline: true},
        {name: `Tested`, value: covidStats.tests.toLocaleString(), inline: true},
    )
    msg.channel.send(embed)
}
exports.help = {
	name:"covid19",
	usage: "covid19",
	group: "misc"
}