This folder contains all the commands. To create a new command simply use the template before and name it something similar to `myCommand.js`.

```js
let bot;

module.exports = {
	name : "", // The actual command that users will use

	// Arguments have two options, use EITHER one OR the other
	args : [X, Y], // Multiple arguments accepted between X and Y
	args : 0, // Exactly one arugment required

	roles : ["",""], // To lock a command to specifc roles simply add those roles here
	users : ["",""], // To lock a command to specifc users simply add those user IDs here

	init : (botInstance) => { // If you do not need a reference to bot, simply remove this function
		bot = botInstance;
		// Ensures a local reference for bot
		// This is mostly useful if you want to do things like:
		// bot.channels.cache.get()
		// bot.users.get
		// etc
	},
	execute: (message,args) => { // Main command that will be executed on call
		// Code to be run here
	}
}
```

Any not required fields should be removed to ensure correct implementation. **Note:** You cannot have two commands that have the same name, should this occur the [**Command Handler**](https://github.com/cheesenibbles123/js-bot/blob/main/commandHandler.js) will notify you in the console that it was unable to load the command.
