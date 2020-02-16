import { Column, Entity, Index } from 'typeorm';

@Index('role_states_guild_member_key', ['guild', 'member'], { unique: true })
@Index('role_states_pkey', ['id'], { unique: true })
@Entity('role_states', { schema: 'public' })
export class RoleStates {
	@Column('uuid', {
		primary: true,
		name: 'id',
		default: () => 'gen_random_uuid()',
	})
	public id!: string;

	@Column('text', { name: 'guild' })
	public guild!: string;

	@Column('text', { name: 'member' })
	public member!: string;

	@Column('text', { name: 'roles', array: true, default: () => "'{}'[]" })
	public roles!: string[];
}
