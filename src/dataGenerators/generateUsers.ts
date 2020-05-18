import faker from "faker";
export interface IUser {
  id: string;
  userName: string;
  name: string;
  email: string;
  profilePic: string;
  password: string;
}

const generateUsers = (numOfUsers: number) => {
  const users = Array.from(Array(numOfUsers)).map((x, i) => {
    const user: IUser = {
      id: faker.random.uuid(),
      userName: "testuser" + i,
      name: faker.name.findName(),
      email: faker.internet.email(),
      profilePic: faker.internet.avatar(),
      password: "password",
    };
    return user;
  });
  return users;
};

export default generateUsers;
