const { Command } = require('discord-akairo');
const { CONSTANTS: { ACTIONS }, logEmbed } = require('../../util');

class BanCommand extends Command {
	constructor() {
		super('ban', {
			aliases: ['ban'],
			category: 'mod',
			description: {
				content: '.',
				usage: '<member> <...reason>',
				examples: ['ban @Crawl']
			},
			channel: 'guild',
			clientPermissions: ['MANAGE_ROLES'],
			ratelimit: 2,
			args: [
				{
					id: 'member',
					type: 'member',
					prompt: {
						start: message => `${message.author}, what member do you want to ban?`,
						retry: message => `${message.author}, please mention a member.`
					}
				},
				{
					'id': 'reason',
					'match': 'rest',
					'type': 'string',
					'default': ''
				}
			]
		});
	}

	async exec(message, { member, reason }) {
		const staffRole = message.member.roles.has(this.client.settings.get(message.guild, 'modRole'));
		if (!staffRole) return message.util.send('You know, I know, we should just leave it at that.');
		if (member.roles.has(staffRole)) {
			return message.util.send('Nuh-uh! You know you can\'t do this.');
		}
		const key = `${message.guild.id}:${member.id}:BAN`;
		if (this.client._cachedCases.has(key)) {
			return message.util.send('That user is currently being moderated by someone else.');
		}
		this.client._cachedCases.add(key);

		try {
			await member.ban(`Banned by ${message.author.tag}`);
		} catch (error) {
			this.client._cachedCases.delete(key);
			return message.util.send(`There was an error banning this member: \`${error}\``);
		}

		const totalCases = this.client.settings.get(message.guild, 'caseTotal', 0) + 1;
		this.client.settings.set(message.guild, 'caseTotal', totalCases);

		if (!reason) {
			const prefix = this.handler.prefix(message);
			reason = `Use \`${prefix}reason ${totalCases} <...reason>\` to set a reason for this case`;
		}

		const modLogChannel = this.client.settings.get(message.guild, 'modLogChannel');
		let modMessage;
		if (modLogChannel) {
			const embed = logEmbed({ message, member, action: 'Ban', caseNum: totalCases, reason });
			modMessage = await this.client.channels.get(modLogChannel).send(embed);
		}
		await this.client.db.models.cases.create({
			guild: message.guild.id,
			message: modMessage ? modMessage.id : null,
			case_id: totalCases,
			target_id: member.id,
			target_tag: member.user.tag,
			mod_id: message.author.id,
			mod_tag: message.author.tag,
			action: ACTIONS.BAN,
			reason
		});

		return message.util.send(`Successfully banned ${member.user.tag}`);
	}
}

module.exports = BanCommand;