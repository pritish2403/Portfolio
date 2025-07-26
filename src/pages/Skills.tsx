import { motion } from "framer-motion";
import * as React from 'react';
import {FaReact,FaNodeJs,FaJs,FaHtml5,FaCss3Alt,FaGitAlt,FaGithub,FaPython,FaAws} from "react-icons/fa";
import {SiTypescript,SiMongodb,SiExpress,SiMysql,SiTailwindcss,} from "react-icons/si";
import { SiAmazon } from 'react-icons/si';

type Skill = {
  name: string;
  icon: React.ReactNode;
  color: string;
};

const Skills = () => {
  const skills: Skill[] = [
    {
      name: "AWS Cloud",
      icon: <SiAmazon className="w-18 h-18 text-amber-600" />,
      color: "from-yellow-400 to-orange-500",
    },
    {
      name: "Python",
      icon: <FaPython className="w-19 h-19 text-blue-400" />,
      color: "from-blue-400 to-yellow-400",
    },
    {
      name: "SQL",
      icon: <SiMysql className="w-24 h-24 text-blue-600" />,
      color: "from-blue-600 to-blue-400",
    },
    {
      name: "Git / GitHub",
      icon: (
        <div className="flex gap-2">
          <FaGitAlt className="w-19 h-19 text-orange-500" />
        </div>
      ),
      color: "from-gray-800 to-gray-500 dark:from-white dark:to-gray-300",
    },
    {
      name: "JavaScript",
      icon: <FaJs className="w-8 h-8 text-yellow-400" />,
      color: "from-yellow-400 to-yellow-200",
    },
    {
      name: "TypeScript",
      icon: <SiTypescript className="w-8 h-8 text-blue-500" />,
      color: "from-blue-600 to-blue-400",
    },
    {
      name: "React.js",
      icon: <FaReact className="w-8 h-8 text-blue-500" />,
      color: "from-cyan-400 to-blue-500",
    },
    {
      name: "React Native",
      icon: <FaReact className="w-8 h-8 text-blue-500" />,
      color: "from-indigo-400 to-blue-500",
    },
    {
      name: "MongoDB",
      icon: <SiMongodb className="w-8 h-8 text-green-600" />,
      color: "from-green-600 to-green-400",
    },
    {
      name: "Express.js",
      icon: <SiExpress className="w-8 h-8 text-gray-800 dark:text-gray-200" />,
      color: "from-gray-400 to-gray-300 dark:from-gray-300 dark:to-gray-200",
    },
    {
      name: "Node.js",
      icon: <FaNodeJs className="w-8 h-8 text-green-500" />,
      color: "from-green-500 to-green-400",
    },
    {
      name: "Tailwind CSS",
      icon: (
        <div className="flex gap-2">
          <SiTailwindcss className="w-18 h-18 text-blue-500" />
        </div>
      ),
      color: "from-orange-400 to-blue-400",
    },
  ];

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            className="text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Skills</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="group relative p-6 bg-[#FEFFFA] rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.1, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-30`}
                />
              </div>
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center text-4xl">
                  {skill.icon}
                </div>
                <h3 className="text-lg font-medium text-gray-900">
                  {skill.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
