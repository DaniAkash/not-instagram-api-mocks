import enableMocks, { token } from "../index";
import { IPost, IComment } from "../dataGenerators/generatePosts";

const mockServer = () => enableMocks();

let mockInstance: ReturnType<typeof mockServer>;

beforeEach(() => {
  mockInstance = mockServer();
});

afterEach(() => {
  mockInstance.shutdown();
});

const samplePost: IPost = {
  id: "",
  caption: "",
  comments: [],
  image: "",
  location: "",
  name: "",
  profilePic: "",
  time: new Date(),
};

const sampleComment: IComment = {
  id: "",
  caption: "",
  name: "",
  profilePic: "",
  time: new Date(),
};

let loadedPosts: IPost[] = [];

describe("Testing Feed APIs", () => {
  it("GET /api/feed", async () => {
    const responseObject = await fetch("/api/feed", {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });
    expect(responseObject.status).toBe(200);
    const response = await responseObject.json();
    expect(response.status).toBe("SUCCESS");
    expect(response.data.posts).toBeTruthy();
    loadedPosts = response.data.posts;
    response.data.posts.forEach((post: IPost) => {
      Object.keys(samplePost).forEach((postProp) => {
        expect(post).toHaveProperty(postProp);
      });
      post.comments.forEach((comment) => {
        Object.keys(sampleComment).forEach((commentProp) => {
          expect(comment).toHaveProperty(commentProp);
        });
      });
    });
  });

  it("GET /api/post/:id/comments", async () => {
    loadedPosts.forEach(async (post) => {
      const responseObject = await fetch(`/api/post/${post.id}/comments`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      expect(responseObject.status).toBe(200);
      const response = await responseObject.json();
      expect(response.status).toBe("SUCCESS");
      expect(response.data.comments).toBeTruthy();
    });
  });

  it("POST /api/post/:id/comments", async () => {
    loadedPosts.forEach(async (post) => {
      const requestObject = {
        comment: "My new Comment",
      };

      const responseObject = await fetch(`/api/post/${post.id}/comments`, {
        method: "POST",
        headers: {
          Authorization: token,
        },
        body: JSON.stringify(requestObject),
      });
      expect(responseObject.status).toBe(200);
      const response = await responseObject.json();
      expect(response.status).toBe("SUCCESS");
      const commentResponseObject = await fetch(
        `/api/post/${post.id}/comments`,
        {
          method: "GET",
          headers: {
            Authorization: token,
          },
        }
      );
      expect(commentResponseObject.status).toBe(200);
      const commentResponse = await responseObject.json();
      expect(commentResponse.status).toBe("SUCCESS");
      const newComment = commentResponse.data.comments.find(
        (commObject) => commObject.caption === requestObject.comment
      );
      expect(newComment).toBeTruthy();
    });
  });
});
