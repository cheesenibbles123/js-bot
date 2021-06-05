const config = require("./config.json");
const Discord = require("discord.js");
const bot = new Discord.Client();

const commands = require("./commandHandler.js");
const events = require("./eventHandler.js");
const interactions = require("./interactionHandler.js");

bot.on("ready", () => {
	// Wafflebot is ready!
	commands.init(bot);
	events.init(bot);
	interactions.init(bot);
	bot.user.setActivity("Chilling"); // Set "Playing XXX"
	console.log(bot.user.username + ' is ready!');
});

bot.on("message", async message => {
	
	// Ignore bots
	if (message.author.bot) return;

	// Random + intentional interactions + reactions
	interactions.handler(message);

	// Ignore if it doesnt start with the provided prefix
	if (!message.content.startsWith(config.prefix)) return;

	// Split message into a list of [command, argument1, argument2, etc..]
	let messagearray = message.content.split(/[ ]+/);
	// Isolate command
	let command = messagearray[0].substring(1);
	// Convert to lowercase
	command = command.toLowerCase();
	// Isolate arguments
	let args = messagearray.slice(1);

	// Try run command
	commands.handler(message,command,args);

});

bot.on("raw", async event => {
	events.handler(event);
});

bot.on('error', console.error);
//bot.on('debug', console.log) // Uncomment to see debug info
bot.on("warn", (e) => console.warn(e));
bot.login(config.token);