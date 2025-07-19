import { Github, ExternalLink } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const ProjectsSection = () => {
  const projects = [
    {
      title: "MiniHubApp",
      description:
        "A multifunctional mobile app featuring 11 tools—ranging from utilities like BMI calculator, budget tracker, and to-do list, to games like word scramble and quick math. Built with React Native, Expo, and TypeScript, it also integrates APIs for movie and quote suggestions.",
      tech: ["React Native", "Expo", "TypeScript", "REST APIs"],
      github: "https://github.com/pritish2403/MiniHubApp",
      demo: "https://github.com/pritish2403/MiniHubApp/tree/main/Demo",
    },
    {
      title: "Melofy - Music Platform",
      description:
        "Full-stack music streaming app featuring a secure OTP-based authentication system, integrated music search powered by the Spotify API, and reliable song previews enhanced with an iTunes API fallback, all built using the MERN stack.",
      tech: [
        "MongoDB",
        "Express.js",
        "React.js",
        "Node.js",
        "Typescript",
        "Rest APIs",
      ],
      github: "",
      demo: "",
    },
    {
      title: "Color-Blindness Assistance Extension",
      description:
        "A Chrome extension aimed at enhancing web accessibility for individuals with color vision deficiencies. It applies customizable visual filters and displays color names on hover to improve readability and perception.",
      tech: ["JavaScript", "HTML", "CSS", "Chrome Extension APIs"],
      github: "https://github.com/pritish2403/ChromeExtension",
      demo: "https://github.com/pritish2403/ChromeExtension/tree/main/Demo",
    },

    {
      title: "Kivy Quiz App",
      description:
        "A fun and interactive quiz game built with Python's Kivy framework, featuring a modern GUI, timed questions, scoring system, and audio feedback.",
      tech: ["Python", "Kivy", "GUI", "OOP"],
      github: "https://github.com/pritish2403/KivyQuizApp",
      demo: "https://github.com/pritish2403/KivyQuizApp/tree/main/Demo",
    },
    {
      title: "Task Manager",
      description:
        "A full-stack task management application with both CLI and GUI interfaces, built using Flask for the backend and React for the frontend.",
      tech: ["Python", "Flask", "React", "JavaScript", "HTML/CSS"],
      github: "https://github.com/pritish2403/TaskManager/",
      demo: "https://github.com/pritish2403/TaskManager/tree/main/Demo",
    },
    {
      title: "Snake Game",
      description:
        "Classic Snake Game built with Python using the Turtle graphics module. Eat food, grow longer, and avoid crashing into walls or yourself. Includes a score system and Game Over popup.",
      tech: ["Python", "Turtle", "Tkinter"],
      github: "https://github.com/pritish2403/SnakeGame",
      demo: "https://github.com/pritish2403/SnakeGame/tree/main/Demo",
    },
  ];

  return (
    <section
      id="projects"
      className="py-20 bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a]"
    >
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text min-h-[3rem]">
          Projects
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project) => (
            <Card
              key={project.title}
              className="bg-[#1e293b]/60 border border-[#334155] backdrop-blur-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-blue-500/20"
            >
              <CardHeader>
                <CardTitle className="text-blue-300 group-hover:text-white transition-colors text-xl">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="bg-blue-500/20 text-blue-300 font-medium"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex space-x-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="border border-gray-600 hover:bg-blue-600 hover:text-white transition-all"
                    >
                      <Github size={16} className="mr-1" />
                      Code
                    </Button>
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="border border-gray-600 hover:bg-purple-600 hover:text-white transition-all"
                    >
                      <ExternalLink size={16} className="mr-1" />
                      Demo
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
