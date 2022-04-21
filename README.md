# fullstack-web-application


This is a full-stack application. The frontend is made with TypeScript React and
NextJs and the backend is put together with the help of PostgreSQL, TypeORM,
GraphQL, and URQL and it has dokku managing everything on the server.
The NodeJS server is working with GraphQL and is using PostgreSQL as the
database.


It works and looks very similar to Reddit. It requires a username, email, and
password to create an account. After creating an account, you can Create, Read,
Update and Delete (CRUD) a post. It takes care of authentication with sessions so a
user can only edit and delete the posts which were created by them. Just like
Reddit, each post comes with a point system and each user can upvote or
downvote a post to change the points of a post by +1 or -1.
