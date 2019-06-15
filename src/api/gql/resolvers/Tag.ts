import { Resolver, Query, Ctx, Arg } from 'type-graphql';
import { Context } from '../../';
import { Tag } from '../../models/Tags';

interface FindOption {
	guild?: string;
	user?: string;
}

@Resolver(() => Tag)
export class TagResolver {
	@Query(() => [Tag], { nullable: true })
	public async tags(
		@Ctx() context: Context,
		@Arg('guild_id', { nullable: true }) guild_id?: string,
		@Arg('user_id', { nullable: true }) user_id?: string
	): Promise<Tag[] | undefined> {
		if (!context.req.user) {
			return undefined;
		}
		const tags = context.db.getRepository(Tag);
		const where: FindOption = {};
		if (guild_id) where.guild = guild_id;
		if (user_id) where.user = user_id;
		const dbTags = await tags.find(where);
		if (!dbTags) return undefined;
		return dbTags;
	}
}
