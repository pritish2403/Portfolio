import { motion, Variants } from "framer-motion";
import { FiDownload } from "react-icons/fi";
import { FaCode, FaServer, FaMobileAlt, FaDatabase } from "react-icons/fa";

type StatCardProps = {
  icon: React.ReactNode;
  value: string;
  label: string;
};

const StatCard = ({ icon, value, label }: StatCardProps) => (
  <motion.div
    whileHover={{ y: -5, scale: 1.03 }}
    className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
  >
    <div className="text-3xl text-indigo-500 mb-2">{icon}</div>
    <p className="text-3xl font-bold text-gray-800">{value}</p>
    <p className="text-gray-600">{label}</p>
  </motion.div>
);

const AboutMe = () => {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item: Variants = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const stats = [
    { 
      icon: <FaCode className="w-8 h-8" />, 
      value: "Fresher", 
      label: "Years Experience" 
    },
    { 
      icon: <FaServer className="w-8 h-8" />, 
      value: "10+", 
      label: "Projects Built" 
    },
  ];

  return (
    <section id="about" className="relative py-20 overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-r from-indigo-300 to-purple-400 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-blob"></div>
        <div className="absolute top-1/2 -right-20 w-96 h-96 bg-gradient-to-r from-pink-300 to-rose-400 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/4 w-64 h-64 bg-gradient-to-r from-cyan-300 to-blue-400 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={container}
        >
          {/* Image Section */}
          <motion.div
            className="relative"
            variants={item}
          >
            <div className="relative z-10 w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/30 to-purple-100/30 mix-blend-overlay z-10"></div>
              <img
                src="https://res.cloudinary.com/dszxnwtiy/image/upload/f_auto,q_auto,w_800,h_800,c_fill,g_face/v1752384788/Img_kege8t.jpg"
                alt="Pritish Divate"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-indigo-200/30 rounded-full -z-10"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-purple-200/30 rounded-full -z-10"></div>
          </motion.div>

          {/* Content Section */}
          <motion.div className="space-y-8">
            <motion.div variants={item}>
              <span className="inline-flex items-center px-4 py-1.5 text-sm font-semibold text-indigo-700 bg-indigo-100 rounded-full mb-4">
                About Me
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                A passionate developer
              </h2>
            </motion.div>

            <motion.p
              variants={item}
              className="text-lg text-gray-700 leading-relaxed"
            >
              I'm a dedicated Computer Science graduate from VIT Chennai, with
              hands-on experience in full-stack development (MERN), cloud
              computing (AWS Certified), and solving complex problems using data
              structures and algorithms. I thrive on building scalable, secure
              applications and enjoy working closely with teams to bring
              impactful ideas to life.
            </motion.p>

            {/* Stats */}
            <motion.div 
              variants={item} 
              className="grid grid-cols-2 gap-4 mt-12"
            >
              {stats.map((stat, index) => (
                <StatCard 
                  key={index}
                  icon={stat.icon}
                  value={stat.value}
                  label={stat.label}
                />
              ))}
            </motion.div>

            <motion.div variants={item} className="pt-6">
              <a
                href="https://drive.google.com/file/d/1wy-09QbVyajBkwF0ni-iKMOSAInwgqD5/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center px-8 py-3.5 rounded-full overflow-hidden font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg"
              >
                <span className="relative z-10 flex items-center">
                  Download CV
                  <FiDownload className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default AboutMe;
