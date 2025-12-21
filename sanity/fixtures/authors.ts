import { Author } from "../types";

export const authorFixtures: Omit<
  Author,
  "_id" | "_createdAt" | "_updatedAt" | "_rev"
>[] = [
  {
    _type: "author",
    name: "Ryan Green",
    slug: {
      current: "ryan-green",
      _type: "slug",
    },
    title: "CEO & Founder",
    bio: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Ryan is the CEO and Founder of RosterLab, bringing over a decade of experience in workforce management and AI-powered automation. He is passionate about solving complex scheduling challenges in healthcare, hospitality, and other industries with dynamic staffing needs.",
          },
        ],
      },
    ],
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/ryan-green-rosterlab/",
    },
  },
  {
    _type: "author",
    name: "RosterLab",
    slug: {
      current: "rosterlab",
      _type: "slug",
    },
    title: "RosterLab Team",
    bio: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "The RosterLab team is dedicated to revolutionising workforce management through AI-powered rostering solutions. Our mission is to help organisations optimise staffing, reduce costs, and improve employee satisfaction through intelligent scheduling technology.",
          },
        ],
      },
    ],
    socialLinks: {
      linkedin: "https://www.linkedin.com/company/rosterlab/",
      website: "https://www.rosterlab.com",
    },
  },
  {
    _type: "author",
    name: "Sunny Dhillon",
    slug: {
      current: "sunny-dhillon",
      _type: "slug",
    },
    title: "Content Marketing Manager",
    bio: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Sunny is the Content Marketing Manager at RosterLab, specialising in workforce management insights and industry trends. With a background in healthcare operations, Sunny brings practical expertise to creating content that helps organisations solve their staffing challenges.",
          },
        ],
      },
    ],
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/sunny-dhillon-rosterlab/",
    },
  },
  {
    _type: "author",
    name: "Isaac Chen",
    slug: {
      current: "isaac-chen",
      _type: "slug",
    },
    title: "Product Manager",
    bio: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Isaac is the Product Manager at RosterLab, focusing on developing innovative features that empower managers to create better rosters. He works closely with customers to understand their needs and translate them into powerful scheduling solutions.",
          },
        ],
      },
    ],
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/isaac-chen-rosterlab/",
    },
  },
  {
    _type: "author",
    name: "Daniel Martinez",
    slug: {
      current: "daniel-martinez",
      _type: "slug",
    },
    title: "Customer Success Manager",
    bio: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Daniel is the Customer Success Manager at RosterLab, dedicated to helping organisations maximise the value of their rostering platform. He brings extensive experience in workforce optimisation and is passionate about driving measurable results for customers.",
          },
        ],
      },
    ],
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/daniel-martinez-rosterlab/",
    },
  },
  {
    _type: "author",
    name: "Chris Thompson",
    slug: {
      current: "chris-thompson",
      _type: "slug",
    },
    title: "Technical Lead",
    bio: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Chris is the Technical Lead at RosterLab, specialising in AI-powered scheduling algorithms and system architecture. With a background in machine learning and operations research, Chris leads the development of intelligent rostering solutions that solve complex scheduling problems.",
          },
        ],
      },
    ],
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/chris-thompson-rosterlab/",
      github: "https://github.com/cthompson-rosterlab",
    },
  },
];
