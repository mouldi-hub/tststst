const giveaway = require('../../giveaway')
const ms =  require('ms')

module.exports = {
  name: "start",
  description: "Start a giveaway",
  run: async (client, message, args) => {

  if(!message.member.permissions.has("MANAGE_GUILD") && !message.member.roles.cache.some(m => m.name.toLowerCase() === 'giveaways')) return message.channel.send('معكش برمشن')

  let time = args[0]
  if(!time) return message.channel.send(`💥 Please include a length of time, and optionally a number of winners and a prize!
Example usage: \`!gstart 30m 5w Nitro\``)
  if(isNaN(time.replace('s', '').replace('m', '').replace('h', '').replace('d', '').replace('w', '').replace('mo', ''))) return message.channel.send('💥 Please include a vaild time')

  if(ms(time) > 1209600000) return message.channel.send(`💥 Giveaway time must not be longer than 2 weeks`)
    
  let winners = args[1]
  let prize = args.join(" ").slice(time.length + winners?.length + 2)

  if(winners && winners.toLowerCase().slice(-1) == 'w') {
	  winners = parseInt(winners.slice(0, -1))
  } else {
	  winners = 1
	  prize = args.join(" ").slice(time.length + 1)
  }
  
  giveaway.start(message, time, winners, prize)

  }
}