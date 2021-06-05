All the interactions are loaded from this folder, to setup a new interaction use the following structure and name it something similar to `myInteraction.js`.

```js
let bot;

module.exports = {
	init : (botInstance) => {  // If you do not need a reference to bot, simply remove this function
		bot = botInstance;
		// Ensures a local reference for bot
		// This is mostly useful if you want to do things like:
		// bot.channels.cache.get()
		// bot.users.get
		// etc
	},
	execute : (message) => { // Main event code that will be executed on call
		// Code to be run here
	}
}
```
