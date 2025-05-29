import { faker } from "@faker-js/faker";

export const ownGigs = Array.from({ length: 8 }, () => ({
  index: faker.string.uuid(),
  title: faker.person.jobTitle(),
  description: faker.lorem.sentence(),
  by: faker.company.name(),
  mode: faker.helpers.arrayElement(["Remote", "On-site", "Hybrid"]),
  pay: faker.helpers.arrayElement(["Commission", "Hourly", "Fixed"]),
  amount: faker.finance.amount({
    max: 1000000,
  }),
  image: faker.image.avatar(),
  eligibility: faker.lorem.sentences(),
  date: faker.date.recent(),
  location: faker.location.city(),
}));

export const activeGigs = Array.from({ length: 3 }, () => ({
  index: faker.string.uuid(),
  title: faker.person.jobTitle(),
  description: faker.lorem.sentence(),
  by: faker.company.name(),
  mode: faker.helpers.arrayElement(["Remote", "On-site", "Hybrid"]),
  pay: faker.helpers.arrayElement(["Commission", "Hourly", "Fixed"]),
  amount: faker.finance.amount({
    max: 1000000,
  }),
  image: faker.image.avatar(),
  eligibility: faker.lorem.sentences(),
  date: faker.date.recent(),
  location: faker.location.city(),
}));

export const AllGigs = Array.from({ length: 20 }, () => ({
  index: faker.string.uuid(),
  title: faker.person.jobTitle(),
  description: faker.lorem.sentence(),
  by: faker.company.name(),
  mode: faker.helpers.arrayElement(["Remote", "On-site", "Hybrid"]),
  pay: faker.helpers.arrayElement(["Commission", "Hourly", "Fixed"]),
  amount: faker.finance.amount({
    max: 1000000,
  }),
  image: faker.image.avatar(),
  eligibility: faker.lorem.sentences(),
  date: faker.date.recent(),
  location: faker.location.city(),
}));

export const GigsPool = [...ownGigs, ...activeGigs, ...AllGigs];

export const TabsData = [
  {
    name: "Manage",
  },
  {
    name: "Active",
  },
  // {
  //   name: "All",
  // },
];

export const GigsTabsData = [
  {
    name: "All",
  },
];
