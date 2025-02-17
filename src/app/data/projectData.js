const projectColumns = [
  {
    id: 1,
    bgColor: "bg-red-200",
    parallax: ["30%", "0%"],
    items: [
      {
        id: 1,
        title: "DriveGuage",
        description: `<div class="mb-3 break-words whitespace-normal font-semibold">DriveGuage, is a blackbox driver performance monitoring system. The system runs on a Raspberry Pi, which connects to the car's OBD port to collect driving data.<br/><br/>The data is uploaded to a server, processed, and displayed through a user-friendly web application. Authenticated clients can track changes in their 'driver score,' a measure of driving habits, like speeding, sharp turns, and rapid acceleration.</div>`,
        githubLink: "https://github.com/MikolajMarciniak/drivegauge",
        imageStatic: "dg-poster.png",
        videoFile: "dg-ready.mp4",
        icons: [
          { path: "react", label: "React" },
          { path: "next", label: "Next.js" },
          { path: "raspberrypi", label: "Raspberry Pi" },
          { path: "python", label: "Python" },
          { path: "flask", label: "Python Flask" },
          { path: "postgresql", label: "PostgreSQL" },
        ],
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
        description: `<p className="mb-3 break-words whitespace-normal font-semibold">
        While at Premium Faber Ltd., I focused on developing a single-page application (SPA) for the Extra-English language school.<br/><br/>
        The initial version of the app was static, providing key client-facing information. I later expanded its functionality to include a photo gallery, an infinite news feed, a client sign-up form, and an interactive language quiz.
        <br/><br/>
        After leaving Premium Faber, I continued working directly with Extra-English. Recently, I implemented user authentication, lesson management and attendance tracking, and automated payment calculations.
        </p>`,
        link: "https://www.extra-english.pl/",
        githubLink: "https://github.com/scalony2002/ee_www",
        imageStatic: "ee-poster.png",
        icons: [
          { path: "react", label: "React" },
          { path: "redux", label: "Redux" },
          { path: "sass", label: "Sass" },
          { path: "jest", label: "Jest" },
          { path: "webpack", label: "Webpack" },
          { path: "aws", label: "AWS" },
        ],
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
        githubLink: "https://github.com/MikolajMarciniak/RGU-Hack-2024",
        imageStatic: "dnd-poster-expanded.png",
        icons: [
          { path: "react", label: "React" },
          { path: "next", label: "Next.js" },
          { path: "openstreetmap", label: "OpenStreetMap" },
        ],
        videoFile: "dnd-ready.mp4",
      },
    ],
  },
];

export { projectColumns };

/* 
<p class="mb-3 break-words whitespace-normal font-semibold">
  This is a Jupyter notebook framework for measuring data leakage and testing differential privacy techniques to mitigate vulnerabilities in online machine learning models. It was my honours year project for my undergraduate degree.
  <br/><br/>
  The framework is designed in a modular way which allows the users to customise an attack scenario, including parameters of the target model and type of attack (blackbox, whitebox), target features. It also allows the user to test the effectiveness of differntial privacy, implemented via laplacian noise and the exponential mechanism.
  <br/><br/> 
    Its focus is attribute inference attacks, where adversaries use public datasets and machine learning models to predict sensitive information not included in the training set.  <br/><br/>
  <br/><br/>
    Attack performance is evaluated using entropy, mutual information, F1 score, precision, recall, and accuracy.
  </p>
*/
