import { Column, Entity, Index } from 'typeorm';

@Index('lockdowns_guild_channel_key', ['channel', 'guild'], { unique: true })
@Index('lockdowns_pkey', ['id'], { unique: true })
@Entity('lockdowns', { schema: 'public' })
export class Lockdowns {
	@Column('uuid', {
		primary: true,
		name: 'id',
		default: () => 'gen_random_uuid()',
	})
	public id!: string;

	@Column('text', { name: 'guild' })
	public guild!: string;

	@Column('text', { name: 'channel' })
	public channel!: string;

	@Column('timestamp with time zone', { name: 'duration' })
	public duration!: Date;
}
