const projectColumns = [
  {
    id: 1,
    bgColor: "bg-red-200",
    parallax: ["30%", "0%"],
    items: [
      {
        id: 1,
        title: "Bug Tracker",
        description: "asdf",
        link: "https://example.com",
        githubLink: "https://github.com/yourrepo/project1",
        imageStatic: "1.png",
        videoFile: "dg-ready.mp4",

        icons: [""],
      },
    ],
  },
  {
    id: 2,
    bgColor: "bg-green-200",
    parallax: ["0%", "30%"],
    items: [
      {
        id: 3,
        title: "Extra-English",
        description: "Description of Project 2",
        link: "https://www.extra-english.pl/",
        githubLink: "https://github.com/scalony2002/ee_www",
        imageStatic: "1.png",
        icons: ["react", "redux", "sass", "jest", "webpack", "aws"],
        videoFile: "ee-ready.mp4",
      },
    ],
  },

  {
    id: 3,
    bgColor: "bg-blue-200",
    parallax: ["30%", "0%"],
    items: [
      {
        id: 5,
        title: "Dee'n'Duthie",
        description: `<p className="mb-3 break-words whitespace-normal font-semibold">This community-focused navigation app is a proof of concept developed for the 2024 RGU Hackathon. <br/><br/> It features an interactive map with pins for key landmarks of Aberdeen Duthie park. When tapping on a pin users can get read more information about it, or choose to navigate to the pin. The app also has a feed, web-scraped from the 'Friends of Duthie Park' Facebook group. <br/><br/>The app possesses accessability settings, users can engage high contrast mode or increase the font size for better readability.</p>`,
        link: "https://github.com/MikolajMarciniak/RGU-Hack-2024",
        githubLink: "https://github.com/MikolajMarciniak/RGU-Hack-2024",
        imageStatic: "1.png",
        icons: ["react", "next", "openstreetmap"],
        videoFile: "dnd-ready.mp4",
      },
    ],
  },
];

export { projectColumns };
