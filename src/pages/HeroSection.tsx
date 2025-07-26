import { motion, AnimatePresence } from "framer-motion";
import {
  FiArrowRight,
  FiCode,
  FiCpu,
  FiDatabase,
  FiGithub,
  FiLinkedin,
  FiFileText,
} from "react-icons/fi";
import { FaGithub, FaLinkedin, FaReact, FaNodeJs } from "react-icons/fa";
import { BsFileEarmarkPdf } from "react-icons/bs";
import {
  SiTypescript,
  SiTailwindcss,
  SiNextdotjs,
  SiGraphql,
} from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";

const HeroSection = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 100 },
    },
  };

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      const navbarHeight = 80; // Adjust this value based on your navbar height
      const targetPosition = section.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center w-full overflow-hidden bg-white">
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50"></div>

        {/* Animated floating blobs - Reduced opacity and blur */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-indigo-300 to-purple-400 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/2 -left-20 w-96 h-96 bg-gradient-to-r from-pink-300 to-rose-400 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-gradient-to-r from-cyan-300 to-blue-400 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-4000"></div>

        {/* Animated grid pattern - Lighter and more subtle */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        {/* Floating tech icons */}
        <div className="absolute top-1/4 left-1/4 text-indigo-300/50 text-4xl animate-float">
          <FaReact className="w-12 h-12" />
        </div>
        <div className="absolute top-1/3 right-1/4 text-blue-300/40 text-5xl animate-float animation-delay-2000">
          <SiTypescript className="w-12 h-12" />
        </div>
        <div className="absolute bottom-1/4 left-1/3 text-cyan-300/40 text-6xl animate-float animation-delay-3000">
          <SiNextdotjs className="w-12 h-12" />
        </div>
      </div>

      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
        <motion.div
          className="w-full text-center"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item} className="mb-6 relative group">
            <span className="inline-flex items-center px-4 py-2 text-sm font-semibold text-indigo-700 bg-indigo-100 rounded-full backdrop-blur-sm">
              <span className="relative z-10">Welcome to my portfolio</span>
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
            </span>
          </motion.div>

          <motion.div variants={item} className="mb-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-stone-800 mb-4">
              Hi, I'm{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                  Pritish
                </span>
                <span className="absolute -bottom-1 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-purple-600 -z-0 rounded-full"></span>
              </span>
            </h1>
            <div className="h-1 w-20 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"></div>
          </motion.div>

          <motion.div variants={item} className="mb-10 max-w-3xl mx-auto">
            <p className="text-xl text-gray-800 font-medium mb-8 leading-relaxed text-center">
              I'm a passionate full-stack developer who crafts beautiful and
              functional web experiences. I specialize in modern web
              technologies with a focus on creating seamless user experiences.
            </p>
          </motion.div>

          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row justify-center gap-4 mt-8"
          >
            <motion.a
              href="#contact"
              onClick={(e) => handleScroll(e, "contact")}
              className="group relative inline-flex items-center justify-center bg-white text-gray-800 border-2 border-indigo-500 px-8 py-3 rounded-full overflow-hidden font-medium shadow-lg"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center">
                Get in Touch
                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="absolute inset-0 bg-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </motion.a>

            <motion.a
              href="#projects"
              onClick={(e) => handleScroll(e, "projects")}
              className="group relative inline-flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3.5 rounded-full overflow-hidden font-medium shadow-lg"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center">
                View My Work
                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>              
            </motion.a>
          </motion.div>

          <motion.div
            variants={item}
            className="flex justify-center space-x-6 mt-14"
          >
            <a
              href="https://github.com/Pritish2403"
              target="_blank"
              rel="noopener noreferrer"
              title="Visit GitHub"
              className="group p-4 rounded-full bg-gray-600 hover:bg-gray-700 border border-gray-700 hover:scale-110 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/30 backdrop-blur-sm"
            >
              <FaGithub
                size={28}
                className="text-gray-400 group-hover:text-white transition-colors"
              />
            </a>
            <a
              href="https://linkedin.com/in/pritish-divate-72888421b"
              target="_blank"
              rel="noopener noreferrer"
              title="Visit LinkedIn"
              className="group p-4 rounded-full bg-blue-500 hover:bg-blue-700 border border-blue-700 hover:border-blue-400 transition-all duration-300 hover:scale-110 backdrop-blur-sm hover:shadow-xl hover:shadow-blue-400/40"
            >
              <FaLinkedin
                size={28}
                className="text-gray-400 group-hover:text-white transition-colors"
              />
            </a>
            <a
              href="https://drive.google.com/file/d/1wy-09QbVyajBkwF0ni-iKMOSAInwgqD5/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              title="View Resume"
              className="group p-4 rounded-full bg-red-500 hover:bg-red-700 border border-red-700 hover:border-red-400 transition-all duration-300 hover:scale-110 backdrop-blur-sm hover:shadow-xl hover:shadow-red-400/40"
            >
              <BsFileEarmarkPdf
                size={28}
                className="text-gray-400 group-hover:text-white transition-colors"
              />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
