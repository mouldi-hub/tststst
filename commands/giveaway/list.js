const Giveaways = require('../../models/giveaway')
const giveaway = require('../../giveaway')

module.exports = {
  name: "reroll",
  description: "End a giveaway",
  run: async (client, message, args) => {
    
  if(!message.member?.permissions.has("MANAGE_GUILD") && !message.member.roles.cache.some(m => m.name.toLowerCase() === 'giveaways')) return message.channel.send('معكش برمشن');

  let msg = await message.channel.send("Please wait...")
  let giveaways = await Giveaways.find({})
  let emoji = await giveaway.getEmoji(message)
  
  if(giveaways.filter(m => !m.ended).length == 0) return msg.edit("💥 There are no giveaways running on the server!")

  let array = []
  giveaways.forEach(async data => {
	if(data.ended) return;
	array.push(`\`${data.messageID}\` | <#${data.channelID}> | **${data.winners}** winner${data.winners > 1 ? "s" : ""} | ${data.prize ? `Prize: ${data.prize}` : "No prize specified"} | Ends in **<t:${data.time.toString().slice(0,10)}:R>**`)
  })

  msg.edit({ content: `${emoji.emoji} __Active Giveaways on **${message.guild.name}**:__\n\n${array.join('\n')}` })


  }
}