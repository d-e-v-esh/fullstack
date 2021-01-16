import { Post } from "../entities/Post";
import { MyContext } from "../types";
import { Ctx, Query, Resolver } from "type-graphql";
// Need to put relative paths, default absolute paths will crash the app

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts(@Ctx() { em }: MyContext): Promise<Post[]> {
    return em.find(Post, {});
  }
}
