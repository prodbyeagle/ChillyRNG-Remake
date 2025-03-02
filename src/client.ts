import { Client, Collection } from 'discord.js';
import { Command } from './types';

export class EagleClient extends Client {
	public commands: Collection<string, Command> = new Collection();

	constructor() {
		super({
			intents: [
				'Guilds',
				'GuildMessages',
				'DirectMessages',
				'MessageContent',
			],
		});
	}
}
