import { Column, Entity, Index } from 'typeorm';

@Index('tags_guild_name_key', ['guild', 'name'], { unique: true })
@Index('tags_pkey', ['id'], { unique: true })
@Entity('tags', { schema: 'public' })
export class Tags {
	@Column('uuid', {
		primary: true,
		name: 'id',
		default: () => 'gen_random_uuid()',
	})
	public id!: string;

	@Column('text', { name: 'guild' })
	public guild!: string;

	@Column('text', { name: 'user' })
	public user!: string;

	@Column('text', { name: 'name' })
	public name!: string;

	@Column('text', { name: 'aliases', array: true, default: () => "'{}'[]" })
	public aliases!: string[];

	@Column('text', { name: 'content' })
	public content!: string;

	@Column('boolean', {
		name: 'hoisted',
		nullable: true,
		default: () => 'false',
	})
	public hoisted!: boolean | null;

	@Column('integer', { name: 'uses', default: () => '0' })
	public uses!: number;

	@Column('text', { name: 'last_modified', nullable: true })
	public lastModified!: string | null;

	@Column('timestamp with time zone', {
		name: 'created_at',
		default: () => 'now()',
	})
	public createdAt!: Date;

	@Column('timestamp with time zone', {
		name: 'updated_at',
		default: () => 'now()',
	})
	public updatedAt!: Date;

	@Column('boolean', { name: 'templated', default: () => 'false' })
	public templated!: boolean;
}
