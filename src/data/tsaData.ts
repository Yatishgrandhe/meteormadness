export interface Event {
  name: string;
  description: string;
  sponsorAppeal: string;
  category: string;
}

export interface Leadership {
  name: string;
  position: string;
  image?: string;
}

export interface ChapterInfo {
  schoolName: string;
  chapterName: string;
  headline: string;
  subHeadline: string;
  mission: string;
  meetingInfo: {
    day: string;
    time: string;
    room: string;
  };
  contact: {
    advisorName: string;
    advisorEmail: string;
    presidentEmail: string;
    socialMedia: string;
  };
}

export const chapterInfo: ChapterInfo = {
  schoolName: "Central Academy of Technology and Arts",
  chapterName: "Cougar Chapter",
  headline: "Central Academy of Technology and Arts TSA: Innovating the Future, Today.",
  subHeadline: "Welcome to the official home of the Cougar Chapter of the Technology Student Association. We are a community of thinkers, designers, and creators dedicated to exploring the challenges of tomorrow through STEM.",
  mission: "The Technology Student Association (TSA) is a national organization of students engaged in science, technology, engineering, and mathematics (STEM). Our mission at Central Academy of Technology and Arts is to provide students with opportunities for leadership, personal growth, and career development through exciting, hands-on competitive events and community projects. We empower our members to become the next generation of innovators and leaders.",
  meetingInfo: {
    day: "[Day of the week]",
    time: "[Time]",
    room: "[Room Number]"
  },
  contact: {
    advisorName: "[Advisor's Name]",
    advisorEmail: "[Advisor's Email]",
    presidentEmail: "[President's Email]",
    socialMedia: "[Link to Social Media]"
  }
};

export const leadership: Leadership[] = [
  { name: "[President's Name]", position: "President" },
  { name: "[Vice President's Name]", position: "Vice President" },
  { name: "[Secretary's Name]", position: "Secretary" },
  { name: "[Treasurer's Name]", position: "Treasurer" },
  { name: "[Advisor's Name]", position: "Faculty Advisor" }
];

export const events: Event[] = [
  // Architecture & Engineering
  {
    name: "Architectural Design",
    description: "Develop a portfolio for a client-server architectural problem, including drawings, a model, and a presentation.",
    sponsorAppeal: "Highlights skills in CAD, project management, and client communication.",
    category: "Architecture & Engineering"
  },
  {
    name: "Computer-Aided Design (CAD), Architecture",
    description: "Participants create detailed architectural drawings and visualizations using CAD software.",
    sponsorAppeal: "Develops high-demand drafting and design skills for architecture and construction firms.",
    category: "Architecture & Engineering"
  },
  {
    name: "Computer-Aided Design (CAD), Engineering",
    description: "Participants create detailed 3D models and representations of engineering parts or assemblies.",
    sponsorAppeal: "Showcases proficiency in industry-standard software for mechanical engineering and product design.",
    category: "Architecture & Engineering"
  },
  {
    name: "Engineering Design",
    description: "A team works to solve a design problem by creating a portfolio and a functional prototype.",
    sponsorAppeal: "Showcases the full engineering lifecycle, from concept to creation.",
    category: "Architecture & Engineering"
  },
  {
    name: "Structural Design & Engineering",
    description: "Teams design, build, and test a truss structure to determine its design efficiency.",
    sponsorAppeal: "Demonstrates understanding of physics, material science, and structural integrity.",
    category: "Architecture & Engineering"
  },
  {
    name: "Transportation Modeling",
    description: "Participants design and create a scale model of a transportation vehicle that fits a specific theme.",
    sponsorAppeal: "Encourages research, design, and modeling skills relevant to the automotive and aerospace industries.",
    category: "Architecture & Engineering"
  },
  
  // Manufacturing & Transportation
  {
    name: "Computer Integrated Manufacturing (CIM)",
    description: "Teams design, build, and program a manufacturing system to solve a specified problem.",
    sponsorAppeal: "Addresses modern industrial automation, robotics, and quality control processes.",
    category: "Manufacturing & Transportation"
  },
  {
    name: "Dragster Design",
    description: "Design, produce, and race a CO2-powered dragster, showcasing principles of aerodynamics and engineering.",
    sponsorAppeal: "A classic event that teaches design, fabrication, and the physics of motion.",
    category: "Manufacturing & Transportation"
  },
  {
    name: "Flight Endurance",
    description: "Design, build, and fly a model aircraft to achieve the longest possible flight time.",
    sponsorAppeal: "Highlights principles of aerodynamics, lightweight construction, and aircraft design.",
    category: "Manufacturing & Transportation"
  },
  {
    name: "Manufacturing Prototype",
    description: "Teams develop a prototype for a marketable product, documenting the design and manufacturing process.",
    sponsorAppeal: "Mirrors a real-world product development cycle, from ideation to physical prototype.",
    category: "Manufacturing & Transportation"
  },
  
  // Technology, Design, & Communication
  {
    name: "3D Animation",
    description: "Teams create a 3D animation on a given topic, showcasing their skills in modeling, rendering, and storytelling.",
    sponsorAppeal: "Develops talent for the growing fields of digital media, advertising, and entertainment.",
    category: "Technology, Design, & Communication"
  },
  {
    name: "Animatronics",
    description: "Design and build an animatronic device with at least three movements, documenting the process in a portfolio.",
    sponsorAppeal: "Combines mechanical engineering, electronics, and creative design.",
    category: "Technology, Design, & Communication"
  },
  {
    name: "Audio Podcasting",
    description: "Teams produce a podcast episode on a given theme, demonstrating skills in recording, editing, and storytelling.",
    sponsorAppeal: "Taps into modern media creation, relevant for marketing and communication roles.",
    category: "Technology, Design, & Communication"
  },
  {
    name: "Board Game Design",
    description: "Participants design, build, and market an original board game.",
    sponsorAppeal: "Showcases creativity, strategic thinking, branding, and physical product design.",
    category: "Technology, Design, & Communication"
  },
  {
    name: "Children's Stories",
    description: "Teams create an illustrated children's story of high artistic, instructional, and social value.",
    sponsorAppeal: "Fosters skills in writing, illustration, and educational content creation.",
    category: "Technology, Design, & Communication"
  },
  {
    name: "Digital Video Production",
    description: "Teams create a short film based on a specific theme.",
    sponsorAppeal: "Develops skills in filmmaking, editing, and visual storytelling for media and advertising.",
    category: "Technology, Design, & Communication"
  },
  {
    name: "Fashion Design & Technology",
    description: "Research, design, and create a portfolio and prototype for a fashion line, incorporating technology.",
    sponsorAppeal: "Innovative fusion of design, material science, and wearable tech.",
    category: "Technology, Design, & Communication"
  },
  {
    name: "Game Design",
    description: "Develop a video game that addresses a specific theme.",
    sponsorAppeal: "Taps into a major tech industry, showcasing skills in programming, narrative design, and user experience.",
    category: "Technology, Design, & Communication"
  },
  {
    name: "Graphic Design",
    description: "Create a graphic design solution for a client, such as a logo, branding package, or promotional materials.",
    sponsorAppeal: "Develops practical marketing and visual communication skills.",
    category: "Technology, Design, & Communication"
  },
  {
    name: "Music Production",
    description: "Participants create an original piece of music for a specified purpose, demonstrating technical and creative skill.",
    sponsorAppeal: "Highlights proficiency with digital audio workstations (DAWs) and audio engineering.",
    category: "Technology, Design, & Communication"
  },
  {
    name: "On Demand Video",
    description: "Teams write, shoot, and edit a short video in a single day at the conference.",
    sponsorAppeal: "Proves ability to work effectively and creatively under tight deadlines.",
    category: "Technology, Design, & Communication"
  },
  {
    name: "Photographic Technology",
    description: "Demonstrate skills in photography by capturing, editing, and presenting a portfolio of images.",
    sponsorAppeal: "Highlights proficiency in digital tools and creative composition.",
    category: "Technology, Design, & Communication"
  },
  {
    name: "Promotional Design",
    description: "Create a promotional piece for a TSA-related theme.",
    sponsorAppeal: "Focuses on marketing, branding, and visual storytelling.",
    category: "Technology, Design, & Communication"
  },
  {
    name: "Scientific Visualization (SciVis)",
    description: "Participants use 3D computer graphics to create a visualization of a scientific or medical concept.",
    sponsorAppeal: "Develops highly specialized skills for medical, research, and educational fields.",
    category: "Technology, Design, & Communication"
  },
  {
    name: "Webmaster",
    description: "A team designs, builds, and launches a website for a given prompt.",
    sponsorAppeal: "Directly applicable skills in web development, UX/UI design, and digital content management.",
    category: "Technology, Design, & Communication"
  },
  
  // Computer Science & IT
  {
    name: "Coding",
    description: "Participants solve a series of programming problems using a designated programming language within a set time.",
    sponsorAppeal: "Pure demonstration of in-demand coding and problem-solving abilities.",
    category: "Computer Science & IT"
  },
  {
    name: "Cybersecurity",
    description: "Respond to a series of challenges related to cybersecurity, including networking, encryption, and threat mitigation.",
    sponsorAppeal: "Addresses a critical and growing need in the tech industry.",
    category: "Computer Science & IT"
  },
  {
    name: "Data Science and Analytics",
    description: "Teams analyze a large dataset to extract insights and present their findings.",
    sponsorAppeal: "Focuses on one of the fastest-growing fields in tech, combining statistics, programming, and business intelligence.",
    category: "Computer Science & IT"
  },
  {
    name: "Drone Challenge (UAV)",
    description: "Teams design, build, and fly a drone to complete specific tasks, emphasizing flight skills and mission planning.",
    sponsorAppeal: "Direct application in logistics, surveying, and defense technology.",
    category: "Computer Science & IT"
  },
  {
    name: "Robotics",
    description: "Design, build, and program a robot to complete a specific task in a head-to-head competition.",
    sponsorAppeal: "Premier event showcasing programming, mechanical engineering, and strategic thinking.",
    category: "Computer Science & IT"
  },
  {
    name: "Software Development",
    description: "Teams develop a software application to solve a real-world problem, documenting their process.",
    sponsorAppeal: "Mirrors a professional software development lifecycle, from requirements to deployment.",
    category: "Computer Science & IT"
  },
  {
    name: "System Control Technology",
    description: "A team builds a control system to solve a problem, typically using a combination of hardware and software.",
    sponsorAppeal: "Focuses on automation and industrial control principles.",
    category: "Computer Science & IT"
  },
  
  // STEM & Leadership
  {
    name: "Biotechnology Design",
    description: "Research and create a solution to a biotechnological problem, presenting the findings in a display and portfolio.",
    sponsorAppeal: "Addresses a cutting-edge field with applications in medicine, agriculture, and environmental science.",
    category: "STEM & Leadership"
  },
  {
    name: "Debating Technological Issues",
    description: "A team researches and debates a controversial technology topic.",
    sponsorAppeal: "Develops critical thinking, research, and persuasive communication skills essential for leadership.",
    category: "STEM & Leadership"
  },
  {
    name: "Essays on Technology",
    description: "Participants write a research-based essay on a specified technology topic.",
    sponsorAppeal: "Cultivates strong research, writing, and analytical skills.",
    category: "STEM & Leadership"
  },
  {
    name: "Extemporaneous Speech",
    description: "Participants give a 3-5 minute speech on a technology topic with limited preparation time.",
    sponsorAppeal: "Demonstrates the ability to think critically and communicate clearly under pressure.",
    category: "STEM & Leadership"
  },
  {
    name: "Forensic Science",
    description: "Teams use forensic science skills to analyze a mock crime scene and identify a suspect.",
    sponsorAppeal: "Fosters analytical reasoning, attention to detail, and scientific process skills.",
    category: "STEM & Leadership"
  },
  {
    name: "Future Technology Teacher",
    description: "Participants explore the career of a technology teacher by planning and delivering a lesson.",
    sponsorAppeal: "Builds the pipeline for future STEM educators, a critical need for the industry.",
    category: "STEM & Leadership"
  },
  {
    name: "Geospatial Technology",
    description: "Participants use Geographic Information Systems (GIS) to analyze a real-world scenario.",
    sponsorAppeal: "Develops skills in a powerful technology used for urban planning, logistics, and environmental management.",
    category: "STEM & Leadership"
  },
  {
    name: "Prepared Presentation",
    description: "Deliver a compelling oral presentation on a technology-related topic.",
    sponsorAppeal: "Develops crucial public speaking and professional communication skills.",
    category: "STEM & Leadership"
  },
  {
    name: "Technology Bowl",
    description: "A team demonstrates their knowledge of TSA and technology concepts in a quiz-bowl format.",
    sponsorAppeal: "Showcases a broad and deep understanding of the tech landscape.",
    category: "STEM & Leadership"
  },
  {
    name: "Technology Problem Solving",
    description: "A pair of students works to solve a surprise technical problem on-site with limited materials.",
    sponsorAppeal: "The ultimate test of on-the-spot problem-solving, ingenuity, and teamwork.",
    category: "STEM & Leadership"
  }
];

export const eventCategories = [
  "Architecture & Engineering",
  "Manufacturing & Transportation", 
  "Technology, Design, & Communication",
  "Computer Science & IT",
  "STEM & Leadership"
];
