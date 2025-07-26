import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

type Project = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  githubUrl: string;
  liveUrl: string;
  category: string[];
};

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const projects: Project[] = [
    {
      id: 1,
      title: 'Melofy - Music Platform',
      description: 'A full-stack music streaming platform that allows users to discover, stream, and organize their favorite music. Built with modern web technologies, Melofy provides a seamless listening experience across all devices.',
      tags: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'TypeScript', 'REST APIs'],
      image: '/images/Melofy.png',
      githubUrl: 'https://github.com/pritish2403/Melofy',
      liveUrl: 'https://github.com/pritish2403/Melofy/tree/main/Demo',
      category: ['fullstack'],
    },
    {
      id: 2,
      title: 'MiniHubApp',
      description: 'A multifunctional mobile app featuring 11 tools—ranging from utilities like BMI calculator, budget tracker, and to-do list, to games like word scramble and quick math. Built with React Native, Expo, and TypeScript, it also integrates APIs for movie and quote suggestions.',
      tags: ['React Native', 'Expo', 'TypeScript', 'REST APIs'],
      image: '/images/MiniHub.png',
      githubUrl: 'https://github.com/pritish2403/MiniHubApp',
      liveUrl: 'https://github.com/pritish2403/MiniHubApp/tree/main/Demo',
      category: ['mobile'],
    },
    
    {
      id: 3,
      title: 'Inkpost - Blogging Platform',
      description: 'A full-stack blogging platform where users can securely register, log in, and publish blogs with genre tags. Featuring a modern React frontend and a robust Node.js/Express backend, Inkpost makes it easy to create, edit, and explore blog content.',
      tags: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'TypeScript', 'Tailwind CSS'],
      image: '/images/InkPost.png',
      githubUrl: 'https://github.com/pritish2403/Inkpost',
      liveUrl: 'https://github.com/pritish2403/Inkpost/tree/main/Demo',
      category: ['fullstack'],
    },
    {
      id: 4,
      title: 'Color-Blindness Assistance Extension',
      description: 'A Chrome extension aimed at enhancing web accessibility for individuals with color vision deficiencies. It applies customizable visual filters and displays color names on hover to improve readability and perception.',
      tags: ['JavaScript', 'HTML', 'CSS', 'Chrome Extension APIs'],
      image: '/images/Chrome.png',
      githubUrl: 'https://github.com/pritish2403/ChromeExtension',
      liveUrl: 'https://github.com/pritish2403/ChromeExtension/tree/main/Demo',
      category: ['Other'],
    },
    {
      id: 5,
      title: 'Kivy Quiz App',
      description: 'A fun and interactive quiz game built with Python\'s Kivy framework, featuring a modern GUI, timed questions, scoring system, and audio feedback.',
      tags: ['Python', 'Kivy', 'GUI', 'OOP'],
      image: '/images/Kivy.png',
      githubUrl: 'https://github.com/pritish2403/KivyQuizApp',
      liveUrl: 'https://github.com/pritish2403/KivyQuizApp/tree/main/Demo',
      category: ['Python'],
    },
    {
      id: 6,
      title: 'Task Manager',
      description: 'A full-stack task management application with both CLI and GUI interfaces, built using Flask for the backend and React for the frontend.',
      tags: ['Python', 'Flask', 'React', 'JavaScript', 'HTML/CSS'],
      image: '/images/TaskManager.png',
      githubUrl: 'https://github.com/pritish2403/TaskManager/',
      liveUrl: 'https://github.com/pritish2403/TaskManager/tree/main/Demo',
      category: ['fullstack', 'Python'],
    },
    {
      id: 7,
      title: 'Snake Game',
      description: 'Classic Snake Game built with Python using the Turtle graphics module. Eat food, grow longer, and avoid crashing into walls or yourself. Includes a score system and Game Over popup.',
      tags: ['Python', 'Turtle', 'Tkinter'],
      image: '/images/Snake.png',
      githubUrl: 'https://github.com/pritish2403/SnakeGame',
      liveUrl: 'https://github.com/pritish2403/SnakeGame/tree/main/Demo',
      category: ['Python'],
    },
  ];

  const filters = [
    { id: 'all', name: 'All Projects' },
    { id: 'fullstack', name: 'Full Stack' },
    { id: 'mobile', name: 'Mobile' },
    { id: 'Python', name: 'Python' },
    { id: 'Other', name: 'Other' },
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category.includes(activeFilter));

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <section id="projects" className="relative py-20 overflow-hidden">
      {/* Background and animations */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50"></div>
      <div className="absolute top-1/4 -left-4 w-72 h-72 bg-gradient-to-r from-indigo-200 to-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob"></div>
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-gradient-to-r from-pink-200 to-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-200 to-indigo-300 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-4000"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-3 py-1 text-sm font-semibold text-indigo-700 bg-indigo-100 rounded-full mb-4">
            My Work
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Projects</span>
          </h2>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md'
                  : 'bg-white/80 text-gray-700 hover:bg-white/90 shadow-sm hover:shadow-md'
              }`}
            >
              {filter.name}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              // variants={item}
              className="group relative bg-white/80 backdrop-blur-sm rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-white/20"
              whileHover={{ y: -5 }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="space-x-4">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors duration-300"
                      aria-label="GitHub Repository"
                    >
                      <FiGithub className="w-5 h-5" />
                    </a>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors duration-300"
                      aria-label="Live Demo"
                    >
                      <FiExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;