/* eslint-disable @typescript-eslint/no-explicit-any */
import { REST, Routes } from 'discord.js';
import { config } from 'config/config';
import { ChillyClient } from 'client';
import { logMessage } from 'lib/utils';
import { profileCommand } from 'commands/profile';
import { eventCommand } from 'commands/event';
import { robCommand } from 'commands/rob';
import { leaderboardCommand } from 'commands/leaderboard';
import { banCommand } from 'commands/ban';
import { unbanCommand } from 'commands/unban';
import { lockCommand } from 'commands/lock';
import { unlockCommand } from 'commands/unlock';
import { commandsCommand } from 'commands/commands';

/**
 * Initializes and registers all commands for the bot.
 */
export const initializeCommands = async (client: ChillyClient) => {
	const rest = new REST({ version: '10' }).setToken(config.token);

	const commands = new Map<string, any>();

	commands.set(profileCommand.name, profileCommand);
	commands.set(eventCommand.name, eventCommand);
	commands.set(robCommand.name, robCommand);
	commands.set(leaderboardCommand.name, leaderboardCommand);
	commands.set(banCommand.name, banCommand);
	commands.set(unbanCommand.name, unbanCommand);
	commands.set(lockCommand.name, lockCommand);
	commands.set(unlockCommand.name, unlockCommand);
	commands.set(commandsCommand.name, commandsCommand);

	client.commands.set(profileCommand.name, profileCommand);
	client.commands.set(eventCommand.name, eventCommand);
	client.commands.set(robCommand.name, robCommand);
	client.commands.set(leaderboardCommand.name, leaderboardCommand);
	client.commands.set(banCommand.name, banCommand);
	client.commands.set(unbanCommand.name, unbanCommand);
	client.commands.set(lockCommand.name, lockCommand);
	client.commands.set(unlockCommand.name, unlockCommand);
	client.commands.set(commandsCommand.name, commandsCommand);

	try {
		await rest.put(Routes.applicationCommands(client.user.id), {
			body: Array.from(commands.values()).map((command) =>
				command.data.toJSON()
			),
		});
		logMessage('Commands successfully registered.', 'info');
	} catch (error) {
		logMessage(
			`Error while refreshing commands: ${error.message}`,
			'error'
		);
	}
};
