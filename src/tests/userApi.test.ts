import enableMocks, { token } from "../index";
import { IUser } from "../dataGenerators/generateUsers";

const mockServer = () => enableMocks();

let mockInstance: ReturnType<typeof mockServer>;

beforeEach(() => {
  mockInstance = mockServer();
});

afterEach(() => {
  mockInstance.shutdown();
});

const sampleUser: IUser = {
  id: "",
  userName: "testuser",
  name: "",
  email: "",
  profilePic: "",
  password: "password",
};

describe("Testing User APIs", () => {
  it("GET /api/users", async () => {
    const responseObject = await fetch("/api/users");
    expect(responseObject.status).toBe(200);
    const response = await responseObject.json();
    expect(response.status).toBe("SUCCESS");
    expect(response.data.users).toBeTruthy();
    response.data.users.forEach((user) => {
      Object.keys(sampleUser).forEach((userProp) => {
        expect(user).toHaveProperty(userProp);
      });
    });
  });

  it("POST /api/users/login", async () => {
    const responseObject = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: "testuser0",
        password: "password",
      }),
    });
    expect(responseObject.status).toBe(200);
    const response = await responseObject.json();
    expect(response.status).toBe("SUCCESS");
    expect(response.data.token).toBe(token);
  });
});
