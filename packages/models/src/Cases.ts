import { Column, Entity, Index } from 'typeorm';

@Index('cases_pkey', ['id'], { unique: true })
@Entity('cases', { schema: 'public' })
export class Cases {
	@Column('uuid', {
		primary: true,
		name: 'id',
		default: () => 'gen_random_uuid()',
	})
	public id!: string;

	@Column('text', { name: 'guild' })
	public guild!: string;

	@Column('text', { name: 'message', nullable: true })
	public message!: string | null;

	@Column('integer', { name: 'case_id' })
	public caseId!: number;

	@Column('integer', { name: 'ref_id', nullable: true })
	public refId!: number | null;

	@Column('text', { name: 'target_id' })
	public targetId!: string;

	@Column('text', { name: 'target_tag' })
	public targetTag!: string;

	@Column('text', { name: 'mod_id', nullable: true })
	public modId!: string | null;

	@Column('text', { name: 'mod_tag', nullable: true })
	public modTag!: string | null;

	@Column('integer', { name: 'action' })
	public action!: number;

	@Column('text', { name: 'reason', nullable: true })
	public reason!: string | null;

	@Column('timestamp with time zone', {
		name: 'action_duration',
		nullable: true,
	})
	public actionDuration!: Date | null;

	@Column('boolean', {
		name: 'action_processed',
		nullable: true,
		default: () => 'true',
	})
	public actionProcessed!: boolean | null;

	@Column('timestamp with time zone', {
		name: 'created_at',
		default: () => 'now()',
	})
	public createdAt!: Date;

	@Column('text', { name: 'mute_message', nullable: true })
	public muteMessage!: string | null;
}
