const fs = require('fs');

let bot;

function loopOverFolders(folder){
	fs.readdirSync(__dirname + folder).forEach((file) => {

		// Check if file is a folder/directory
		if (fs.statSync(__dirname + folder + "/" + file).isDirectory()){
			// Loop through folder
			loopOverFolders(folder + "/" + file);
		}

		// Only load if it is a js file, and does not start with an underscore
		if (file.startsWith("_") || !file.endsWith(".js")) return;
		// Load command
		let command = require(__dirname + folder + "/" + file);

		// Check if command name already exists
		if (!bot.commands[command.name.toLowerCase()]){

			// Execute init function on command if it exists
			if (typeof(command.init) === 'function'){
				command.init(bot);
			}

			// Store command
			bot.commands[command.name.toLowerCase()] = command;
		}else{
			console.log("Error loading command: " + command.name);
			console.log("From file: " + folder + "/" + file);
		}
	});
}

module.exports = {
	init: (botInstance) => {
		botInstance['commands'] = {}; // Initialize an empty object to store the commands
		bot = botInstance; // Save bot reference

		let folder = "/commands"; // Specifies which folder the commands are in

		loopOverFolders(folder); // Load all commands in folder
	},
	handler: (message,command,args) => {
		command = command.toLowerCase(); // Convert to lowercase

		if (bot.commands[command]){ // Checks if the command exists

			let cmd = bot.commands[command]; // Store temporarily to cmd refernce for readability
			let missingRole = true;
			let allowedUser = false;

			// Check arguments
			if (cmd.args){
				if (typeof(cmd.args) === typeof([])){
					// if arguments are a range between [min,max]
					if (cmd.args[0] > args || cmd.args[1] < args){
						message.channel.send("Please check your argument length");
						return;
					}
				// if arguments are a fixed length
				}else if (cmd.args.length < args.length || cmd.args.length > args.length){
					message.channel.send("Please check your argument length");
					return;
				}
			}

			// Check permissions
			if (cmd.roles){
				let roles = cmd.roles;

				// Loop over all allowed roles
				for (let i=0; i<roles.length; i++){
					if (message.member.roles.cache.has(roles[i])){
						missingRole = false;
					}
				}
			}

			// Check Users
			if (cmd.users){
				let users = cmd.users;

				for (let i=0; i < users.length; i++){
					if (users[i] === message.author.id){
						allowedUser = true;
					}
				}
			}

			if ((cmd.roles && !missingRole) || (!cmd.roles && missingRole) || allowedUser){
				// Execute command
				cmd.execute(message,args);
			}else{
				// Respond missing permissions
				message.channel.send("You do not have permission to use this command!");
			}
		}
	}
}