import mongoose from "mongoose";

// "new mongoose.Types.ObjectId()" is to create a new ObjectId instance
// (i.e. a MongoDB ID)
const userIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];

export const users = [
  {
    _id: userIds[0],
    firstName: "Nicholas",
    lastName: "Birckett",
    email: "motorbolt@lesfilmsdureel.com",
    password: "$2b$10$eeKYojgCvOUyuy2qgyqhgegYVVWqm16LL/bg9eNJB2m3VI0EjvBD6", // weakPassword
    picturePath: "p1.jpg",
    friends: [],
    location: "Port Angeles, WA",
    occupation: "Electrician",
    viewedProfile: 25684,
    impressions: 125781,
    createdAt: 1584201600,
    updatedAt: 1584201600,
    __v: 0,
  },
  {
    _id: userIds[1],
    firstName: "Francie",
    lastName: "Gilbeau",
    email: "wjddmddl@gmailod.com",
    password: "$2b$10$GPMGSrLqlRkyMDNxJWRLVuJwDRGxockJqATKBtK0e/NoloMi8.mLis", // 123abc
    picturePath: "p2.jpg",
    friends: [],
    location: "Farifield, CT",
    occupation: "Meteorologist",
    viewedProfile: 12351,
    impressions: 55555,
    createdAt: 1598976000,
    updatedAt: 1598976000,
    __v: 0,
  },
  {
    _id: userIds[2],
    firstName: "Ervin",
    lastName: "Hammaker",
    email: "shief@lqmb-giftcode.com",
    password: "$2b$10$usQAHZaUCJSymc0Jx/o8N.GUWpquQ3veah3A.DsjGioFGzCMg183es", //abc123
    picturePath: "p3.jpg",
    friends: [],
    location: "Crawfordville, FL",
    occupation: "Executive",
    viewedProfile: 24169,
    impressions: 85236,
    createdAt: 1617292800,
    updatedAt: 1617292800,
    __v: 0,
  },
  {
    _id: userIds[3],
    firstName: "Maegan",
    lastName: "Moening",
    email: "patchcom@ts5.xyz",
    password: "$2b$10$iayhqfI4z2X9vve/PybI6.XJ6BJUg3LwU902BoDSB2DVyeDy.XXyO", // uselessPassword
    picturePath: "p4.jpg",
    friends: [userIds[8].toString()],
    location: "Montpelier, OH",
    occupation: "Management consultant",
    viewedProfile: 15862,
    impressions: 64125,
    createdAt: 1634486400,
    updatedAt: 1634486400,
    __v: 0,
  },
  {
    _id: userIds[4],
    firstName: "Norma",
    lastName: "Herriges",
    email: "clockwatcher@eqsaucege.com",
    password: "$2b$10$Xi8tJ5NVv2ked7x.HDrwSuzRzt/MXLNvjRYo6KY0gyhvZj3ujTPFm", // something
    picturePath: "p5.jpg",
    friends: [userIds[8].toString()],
    location: "Northbridge, MA",
    occupation: "Literary agent",
    viewedProfile: 25648,
    impressions: 48952,
    createdAt: 1621872000,
    updatedAt: 1621872000,
    __v: 0,
  },
  {
    _id: userIds[5],
    firstName: "Denver",
    lastName: "Towsend",
    email: "shaman1970911@simeonov.xyz",
    password: "$2b$10$hnG2/zUSEnY43Zd1GurGwO5Jp/oZ.RNMgQIdqPSx2C1wkECxf2MTCs", // yes123
    picturePath: "p6.jpg",
    friends: [],
    location: "Port Washington, WI",
    occupation: "Artist",
    viewedProfile: 19254,
    impressions: 58218,
    createdAt: 1645113600,
    updatedAt: 1645113600,
    __v: 0,
  },
  {
    _id: userIds[6],
    firstName: "Bruno",
    lastName: "Fatora",
    email: "firex2@thedentalshop.xyz",
    password: "$2b$10$2o8k85oG.eeHDOtubQMIP.ayoWk5ufoDxZAdV1.aeJRSPga2jjbOi", // boring321
    picturePath: "p7.jpg",
    friends: [],
    location: "Kingsland, GA",
    occupation: "Customs officer",
    viewedProfile: 35052,
    impressions: 48256,
    createdAt: 1612368000,
    updatedAt: 1612368000,
    __v: 0,
  },
  {
    _id: userIds[7],
    firstName: "Jane",
    lastName: "Lundgren",
    email: "dsk0907@nusahomeinteriors.com",
    password: "$2b$10$3PF9TtEoEb3rgHxtjbDGXOk3zF0NDZVLUxlbWiQIL1weeiYbAZQK6", // reallybored
    picturePath: "p8.jpg",
    friends: [userIds[8].toString()],
    location: "Princeton, MA",
    occupation: "Dental nurse",
    viewedProfile: 18527,
    impressions: 35817,
    createdAt: 1617379200,
    updatedAt: 1617379200,
    __v: 0,
  },
  {
    _id: userIds[8],
    firstName: "Mock",
    lastName: "User",
    email: "email1@email.com",
    password: "$2b$10$WWA0oTfmlw0fXjQ949Ykku7id02qixvLHBFjOlzY3WIOVbAskxkES", // password123
    picturePath: "p9.jpg",
    friends: [
      userIds[4].toString(),
      userIds[7].toString(),
      userIds[3].toString(),
    ],
    location: "Somewhere, SW",
    occupation: "Some Worker",
    viewedProfile: 58214,
    impressions: 78258,
    createdAt: 1608393600,
    updatedAt: 1608393600,
    __v: 0,
  },
];

export const posts = [
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[1],
    firstName: "Francie",
    lastName: "Gilbeau",
    location: "Farifield, CT",
    description:
      "egestas congue quisque egestas diam in arcu cursus euismod quis",
    picturePath: "post1.jpg",
    userPicturePath: "p2.jpg",
    likes: new Map([
      [userIds[0], true],
      [userIds[2], true],
      [userIds[3], true],
      [userIds[4], true],
    ]),
    comments: [
      "random comment",
      "another random comment",
      "yet another random comment",
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[3],
    firstName: "Maegan",
    lastName: "Moening",
    location: "Montpelier, OH",
    description:
      "nibh mauris cursus mattis molestie a iaculis at erat pellentesque",
    picturePath: "post2.jpg",
    userPicturePath: "p4.jpg",
    likes: new Map([
      [userIds[7], true],
      [userIds[4], true],
      [userIds[1], true],
      [userIds[2], true],
    ]),
    comments: [
      "one more random comment",
      "and another random comment",
      "no more random comments",
      "I lied, one more random comment",
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[4],
    firstName: "Norma",
    lastName: "Herriges",
    location: "Northbridge, MA",
    description:
      "rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat.",
    picturePath: "post3.jpg",
    userPicturePath: "p5.jpg",
    likes: new Map([
      [userIds[1], true],
      [userIds[6], true],
      [userIds[3], true],
      [userIds[5], true],
    ]),
    comments: [
      "one more random comment",
      "I lied, one more random comment",
      "I lied again, one more random comment",
      "Why am I doing this?",
      "I'm bored",
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[5],
    firstName: "Denver",
    lastName: "Towsend",
    location: "Port Washington, WI",
    description: "id diam vel quam elementum pulvinar etiam non quam lacus",
    picturePath: "post4.jpg",
    userPicturePath: "p6.jpg",
    likes: new Map([
      [userIds[1], true],
      [userIds[6], true],
      [userIds[3], true],
    ]),
    comments: [
      "I lied again, one more random comment",
      "Why am I doing this?",
      "I'm bored",
      "I'm still bored",
      "All I want to do is play video games",
      "I'm going to play video games",
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[6],
    firstName: "Bruno",
    lastName: "Fatora",
    location: "Kingsland, GA",
    description:
      "purus gravida quis blandit turpis cursus in hac habitasse platea dictumst quisque sagittis purus sit.",
    picturePath: "post5.jpg",
    userPicturePath: "p7.jpg",
    likes: new Map([
      [userIds[1], true],
      [userIds[3], true],
      [userIds[5], true],
      [userIds[7], true],
    ]),
    comments: [
      "I lied again, one more random comment",
      "Why am I doing this?",
      "Man I'm bored",
      "What should I do?",
      "I'm going to play video games",
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[7],
    firstName: "Jane",
    lastName: "Lundgren",
    location: "Princeton, MA",
    description:
      "nulla porttitor massa id neque aliquam vestibulum morbi blandit cursus risus at ultrices mi tempus.",
    picturePath: "post6.jpg",
    userPicturePath: "p8.jpg",
    likes: new Map([
      [userIds[1], true],
      [userIds[2], true],
    ]),

    comments: [
      "Can I play video games now?",
      "No let's actually study",
      "Never mind, I'm going to play video games",
      "Stop it.",
      "Michael, stop it.",
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[8],
    firstName: "Mock",
    lastName: "User",
    location: "Somewhere, SW",
    description: "Describing something about me",
    picturePath: "post8.jpg",
    userPicturePath: "p9.jpg",
    likes: new Map([
      [userIds[1], true],
      [userIds[2], true],
    ]),

    comments: [
      "Some comments",
      "Another random comment",
      "Lorem Ipsum comment",
    ],
  },
];

// console.log(`Number of Users: ${users.length}`);
// console.log(`Number of Posts: ${posts.length}`);