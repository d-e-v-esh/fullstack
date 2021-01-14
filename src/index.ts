import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import microConfig from "./mikro-orm.config";
import express from "express";
const main = async () => {
  // 1. Connect to the database
  // 2. Run migrations
  // 3. Run sql

  const orm = await MikroORM.init(microConfig); // Basically we got the type that init expects for its first parameter
  await orm.getMigrator().up();
  const app = express();
  app.get("/", (_, res) => {
    res.send("hello");
  });
  app.listen(4000, () => {
    console.log("server started on localhost: 4000"); // We listen to the app on port 4000
  });
};

main().catch((err) => {
  console.error(err);
});
