const Giveaways = require('../../models/giveaway')
const giveaway = require('../../giveaway')

module.exports = {
  name: "end",
  description: "End a giveaway",
  run: async (client, message, args) => {

  if(!message.member?.permissions.has("MANAGE_GUILD") && !message.member.roles.cache.some(m => m.name.toLowerCase() === 'giveaways')) return message.channel.send('معكش برمشن');

  let id = args[0]
  if(!id) return message.channel.send(`💥 I couldn't determine a winner for that giveaway.`)

  let giveawayData = await Giveaways.findOne({ messageID: id })  
  if(!giveawayData) return message.channel.send(`💥 I couldn't determine a winner for that giveaway.`)

  giveaway.end(giveawayData, message.client)

  message.channel.send("Giveaway has been successfully ended!").thne(msg => msg.delete({ timeout: 3000 }))

  }
}