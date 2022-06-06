const Guild = require('../../models/guild')
const Discord = require('discord.js')

module.exports = {
  name: "emoji",
  description: "End a giveaway",
  run: async (client, message, args) => {

  let emoji = args[0]
  let customEmoji = Discord.Util.parseEmoji(emoji);

  if(customEmoji.id) {
    if(!message.guild.emojis.cache.find(m => m.id === customEmoji.id)) return message.channel.send(`This emoji is not in the server!`)
    Guild.findOne({ id: message.guild.id }, (err, guild) => {
      if(!guild) {
        new Guild({ id: message.guild.id, reaction: customEmoji.id }).save().catch(err => console.log(err))
      } else {
        guild.reaction = customEmoji.id
        guild.save().catch(err => console.log(err))
      }
    })
    message.channel.send(`Emoji has been successfully changed to <:${customEmoji.name}:${customEmoji.id}>`)
  } else {
    let CheckEmoji = parse(emoji, { assetType: "png" })
    if (!CheckEmoji[0]) return message.channel.send({ content: `Please specify a valid emoji!` })
    
    message.channel.send({ content: `You can only use custom emojies` });
  }

  }
}