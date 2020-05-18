import { Server, Response } from "miragejs";
import generateUsers from "./dataGenerators/generateUsers";
import generatePosts from "./dataGenerators/generatePosts";
import generateStories from "./dataGenerators/generateStories";
import faker from "faker";

const users = generateUsers(5);
const posts = generatePosts(50);
const stories = generateStories(50);

export const token = "JWT TOKEN GOES HERE";

const enableMocks = () => {
  return new Server({
    environment: "test",
    routes() {
      this.namespace = "/api";

      this.get("/users", () => {
        return new Response(
          200,
          {},
          {
            status: "SUCCESS",
            data: {
              users,
            },
          }
        );
      });

      this.post("/users/login", (schema: any, request) => {
        const requestBodyString = request.requestBody;

        const requestBody = JSON.parse(requestBodyString);

        const user = users.find((user) => {
          return (
            user.userName === requestBody.userName &&
            user.password === requestBody.password
          );
        });

        if (user) {
          return new Response(
            200,
            {},
            {
              status: "SUCCESS",
              data: {
                token,
              },
            }
          );
        }
        return new Response(400);
      });

      this.get("/feed", (schema: any, request) => {
        const { authorization } = request.requestHeaders;
        if (authorization === token) {
          return new Response(
            200,
            {},
            {
              status: "SUCCESS",
              data: {
                posts,
              },
            }
          );
        }
        return new Response(401);
      });

      this.get("/post/:id/comments", (schema: any, request) => {
        const { authorization } = request.requestHeaders;
        if (authorization === token) {
          const { id } = request.params;
          const post = posts.find((post) => post.id === id);
          if (post) {
            return new Response(
              200,
              {},
              {
                status: "SUCCESS",
                data: {
                  comments: post.comments,
                },
              }
            );
          }
          return new Response(400);
        }
        return new Response(401);
      });

      this.post("/post/:id/comments", (schema: any, request) => {
        const requestBodyString = request.requestBody;
        const { comment } = JSON.parse(requestBodyString);
        const { authorization } = request.requestHeaders;
        const { id } = request.params;

        if (authorization === token) {
          const post = posts.find((post) => post.id === id);
          if (post) {
            post.comments.push({
              id: faker.random.uuid(),
              profilePic: faker.internet.avatar(),
              name: "You",
              caption: comment,
              time: new Date(),
            });
            return new Response(200, {}, { status: "SUCCESS" });
          }
          return new Response(400);
        }
        return new Response(401);
      });

      this.get("/stories", (schema: any, request) => {
        const { authorization } = request.requestHeaders;
        if (authorization === token) {
          return new Response(
            200,
            {},
            {
              status: "SUCCESS",
              data: {
                stories,
              },
            }
          );
        }
        return new Response(401);
      });
    },
  });
};

export default enableMocks;
