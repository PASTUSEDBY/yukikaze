import { Column, Entity, Index } from 'typeorm';

@Index('settings_pkey', ['guild'], { unique: true })
@Index('settings_guild_key', ['guild'], { unique: true })
@Entity('settings', { schema: 'public' })
export class Settings {
	@Column('text', { primary: true, name: 'guild' })
	public guild!: string;

	@Column('jsonb', { name: 'settings', default: () => 'jsonb_build_object()' })
	public settings!: object;
}
