import enableMocks, { token } from "../index";
import { IStory } from "../dataGenerators/generateStories";

const sampleStory: IStory = {
  id: "",
  profilePic: "",
  name: "",
  storyMedia: ["", "", ""],
  time: new Date(),
};

const mockServer = () => enableMocks();

let mockInstance: ReturnType<typeof mockServer>;

beforeEach(() => {
  mockInstance = mockServer();
});

afterEach(() => {
  mockInstance.shutdown();
});

describe("Testing Story APIs", () => {
  it("GET /api/stories", async () => {
    const responseObject = await fetch("/api/stories", {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });
    expect(responseObject.status).toBe(200);
    const response = await responseObject.json();
    expect(response.status).toBe("SUCCESS");
    response.data.stories.forEach((story) => {
      Object.keys(sampleStory).forEach((storyProp) => {
        expect(story).toHaveProperty(storyProp);
      });
    });
  });
});
