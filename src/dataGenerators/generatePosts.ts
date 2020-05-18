import faker from "faker";

export interface IComment {
  id: string;
  profilePic: string;
  name: string;
  caption: string;
  time: Date;
}

export interface IPost {
  id: string;
  profilePic: string;
  name: string;
  image: string;
  location: string;
  caption: string;
  time: Date;
  comments: IComment[];
}

const generatePosts = (numOfPosts: number) => {
  let posts: IPost[] = [];
  Array.from(Array(numOfPosts)).forEach((x, i) => {
    const comments: IComment[] = Array.from(
      Array(Math.floor(Math.random() * 50) + 1)
    ).map(() => {
      return {
        id: faker.random.uuid(),
        profilePic: faker.internet.avatar(),
        name: faker.name.findName(),
        caption: faker.lorem.text(),
        time: faker.date.past(),
      };
    });

    posts.push({
      id: faker.random.uuid(),
      profilePic: faker.internet.avatar(),
      name: faker.name.findName(),
      image: faker.image.image(),
      location: faker.address.city(),
      caption: faker.lorem.text(),
      time: faker.date.past(),
      comments,
    });
  });
  return posts;
};

export default generatePosts;
