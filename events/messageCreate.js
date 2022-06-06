const Discord = require("discord.js");

module.exports = async (client, message) => {
  
  if(!message.guild) return;

  if (message.author.bot) return;

  if(message.content.indexOf(client.config.prefix) !== 0) return;

  let args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    
  let commandName = args.shift().toLowerCase();
    
  if(!message.guild.members.cache.get(client.user.id).permissions.has(Discord.Permissions.FLAGS.SEND_MESSAGES)) return;

  let command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
  if(!command) return;

  command.run(client, message, args); 

};