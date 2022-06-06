const Guild = require('../../models/guild')
const Discord = require('discord.js')
const imgbbUploader = require("imgbb-uploader");

module.exports = {
  name: "banner",
  description: "End a giveaway",
  run: async (client, message, args) => {

  let msg = await message.channel.send({ content: "Please wait..." })
  message.delete()

  const attachment = message.attachments.first()

  if(!attachment) {
	Guild.findOne({ id: message.guild.id }, async (err, guild) => {
	  if(!guild) {
		return;
	  } else {
		guild.banner = ""
		await guild.save()
	  }
	})
	return msg.edit("Banner has been successfully removed!")
  }

  imgbbUploader({ apiKey: "7b6508ac3ea321fa1a886e4b8cedac3f", imageUrl: attachment.url }).then(async ({ display_url }) => {
	await Guild.findOne({ id: message.guild.id }, async (err, guild) => {
	  if(!guild) {
		new Guild({ id: message.guild.id, banner: display_url }).save()
	  } else {
		guild.banner = display_url
		await guild.save()
	  }
	})
	await msg.edit({ content: 'ㅤ', embeds: [new Discord.MessageEmbed().setDescription(`**Giveaways banner has been successfully set to**`).setImage(display_url)] })
  })

  }
}