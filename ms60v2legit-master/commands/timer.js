const Discord = module.require('discord.js');
const ms = require('ms');
module.exports.run = async(client, msg) => {

    //start

  //defining args
  const args = msg.content.split(" ").slice(1)

  //Timer
  let Timer = args[0]; 

  //if no time specified
  if(!args[0]) {
    return msg.channel.send("Please Enter A Valid Time To Start The Timer");
  }

  //valid time needed
  if(args[0] <= 0) {
    return msg.channel.send("Please Enter A Valid Time To Start The Timer");
  }

  //if undefined
  if(args[0] === undefined) {
    return msg.channel.send("**Please tell the Time period** \n __EXAMPLE__ : **1d , 1h , 1m , 1s**");
  } 

  //reason
  let reason = args.slice(1).join(' '); //reason is not a required field

  //send when timer has been started 
  const timer = await msg.channel.send(`**Timer has Been Started For \`${ms(ms(Timer))}\` Reason - \`${reason}\`**`)

  
  //function
  setTimeout(function(){

  //end embed
    let embed = new Discord.MessageEmbed()
    .setTitle("Timer has ended")
    .setDescription(`**Timer Has Been Ended . Timer lasts till** \`${ms(ms(Timer))}\` Reason - \`${reason}\``)
    .setColor("GREEN")

  //send timer end to msg author
    msg.author.send(embed)

  //send timer end to the started channel
    msg.channel.send(embed)

  //end
  }, ms(Timer));
}
exports.help = {
    name:"timer",
    usage:"timer <time>"
}
