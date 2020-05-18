import faker from "faker";

export interface IStory {
  id: string;
  profilePic: string;
  name: string;
  storyMedia: string[];
  time: Date;
}

const generateStories = (numOfStories: number) => {
  let stories: IStory[] = [];
  Array.from(Array(numOfStories)).forEach(() => {
    const storyMedia: string[] = Array.from(
      Array(Math.floor(Math.random() * 5) + 1)
    ).map(() => {
      return faker.image.image();
    });

    stories.push({
      id: faker.random.uuid(),
      profilePic: faker.internet.avatar(),
      name: faker.name.findName(),
      storyMedia,
      time: faker.date.past(),
    });
  });
  return stories;
};

export default generateStories;
