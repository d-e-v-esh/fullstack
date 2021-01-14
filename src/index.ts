import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import microConfig from "./mikro-orm.config";
const main = async () => {
  // 1. Connect to the database
  // 2. Run migrations
  // 3. Run sql

  const orm = await MikroORM.init(microConfig); // Basically we got the type that init expects for its first parameter

  await orm.getMigrator().up();
  const post = orm.em.create(Post, { title: "my first post" }); // This creates a post object
  await orm.em.persistAndFlush(post); // This pushes the post object inside the table.
};

main().catch((err) => {
  console.error(err);
});
