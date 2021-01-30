import { Post } from "../entities/Post";
import { MyContext } from "../types";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import { sleep } from "../utils/sleep";
@Resolver()
export class PostResolver {
  // Getting all posts
  @Query(() => [Post])
  async posts(): Promise<Post[]> {
    await sleep(3000);
    return Post.find();
  }

  // Reading a Post
  // In typeorm, null => undefined
  @Query(() => Post, { nullable: true })
  post(@Arg("id", () => Int) id: number): Promise<Post | undefined> {
    return Post.findOne();
  }

  // Create Post

  // Queries are for getting data
  // Mutation is for creating, updating and deleting (anything that changes things on the server)

  @Mutation(() => Post)
  async createPost(@Arg("title") title: string): Promise<Post> {
    return Post.create({ title }).save();
  }

  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg("id") id: number,
    @Arg("title", () => String, { nullable: true }) title: string
    // We need to define the type when we want to make that field optional and set nullable to true
  ): Promise<Post | null> {
    const post = await Post.findOne(id);
    // we can do .findOne(id) || .findOne({where}: {id})
    if (!post) {
      return null;
    }
    if (typeof title !== "undefined") {
      post.title = title;
      // We will update the post based on the id that we fetched and the new title
      await Post.update({ id }, { title });
    }
    return post;
  }

  @Mutation(() => Boolean)
  async deletePost(@Arg("id") id: number): Promise<boolean> {
    await Post.delete(id);
    return true;
  }
}
