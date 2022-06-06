const { Client, Intents, Collection } = require("discord.js")
const { readdirSync, readdir } = require("fs");
const { database, token } = require("./config.json")

const mongoose = require("mongoose")
mongoose.connect(database, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }).then(() => console.log("Database connected"))

const client = new Client({
  partials: ["MESSAGE", "USER", "GUILD_MEMBER", "REACTION", "CHANNEL"],
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
  allowedMentions: { parse: ["users", "roles"], repliedUser: false },
})

client.config = require("./config.json")
client.commands = new Collection();

readdirSync("./commands/").map(async dir => {
  readdirSync(`./commands/${dir}/`).map(async (cmd) => {
	  client.commands.set(cmd.split(".")[0], require(`./commands/${dir}/${cmd}`));
  })
})

readdir("./events/", (err, files) => {
  files.forEach(file => {
    const event = require(`./events/${file}`);
    client.on(file.split(".")[0], event.bind(null, client));
  });
});


client.login(token)