let stockx = require('../configbot/stockx.js');
let Discord = require('discord.js');
module.exports.run = async(client, msg,args) => {
    let product = args.join(' ');
		stockx.getData(product, null, (err, data) => {
			if (!err && data !== null) {
				msg.channel.send({
					embed: {
					    color: 3447003,
					    author: {
					      	name: client.user.username,
					      	icon_url: 'https://pbs.twimg.com/profile_images/880500140984946689/YLtBaLZS_400x400.jpg'
					    },
					    title: data.name,
					    description: `${data.deadstock_sold} sold to date. Big boof.`,
					    url: data.link,
					    thumbnail: {
					    	url: data.image_url
					    },
					    fields: [
					    	{
					        	name: 'Lowest Ask',
					        	value: data.lowest_ask,
					        	inline: true
					      	},
					      	{
					       		name: 'Highest Bid',
					        	value: data.highest_bid,
					        	inline: true
					      	},
					      	{
					        	name: 'Last Sale',
					        	value: data.last_sale,
					        	inline: true
					      	},
					      	{
					        	name: '72-Hour Sales',
					        	value: data.sales_last_72,
					        	inline: true
					      	}
					    ],
					    timestamp: new Date().toISOString(),
				  	}
				});
			}
			else {
                return msg.channel.send(`\`[${new Date().toISOString()}]\`Error finding data for: '${product}'`);
			}
        });
  }
  exports.help = {
    name:"stockx",
    usage:"<prefix>stockx <object>"
}