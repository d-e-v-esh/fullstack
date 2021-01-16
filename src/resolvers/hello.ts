import { Query, Resolver } from "type-graphql";

// We can just stack the decorators here
@Resolver()
export class HelloResolver {
  @Query(() => String)
  hello() {
    return "bye";
  }
}
