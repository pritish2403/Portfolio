import { motion } from "framer-motion";
import { Variants } from "framer-motion";

const Education = () => {
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

  const educationData = [
    {
      degree: "B.Tech in Computer Science and Engineering",
      score: "7.7 CGPA",
      institution: "Vellore Institute of Technology, Chennai",
      year: "2025",
    },
    {
      degree: "12th HSC",
      score: "91%",
      institution: "Matoshri Junior College, Nashik",
      year: "2021",
    },
    {
      degree: "10th SSC",
      score: "87%",
      institution: "Maratha High School, Nashik",
      year: "2019",
    },
  ];

  return (
    <section id="education" className="relative py-20 overflow-hidden bg-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={item}>
            <span className="inline-flex items-center px-4 py-1.5 text-sm font-semibold text-indigo-700 bg-indigo-100 rounded-full mb-0">
              Education
            </span>
          </motion.div>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 w-0.5 h-full bg-gradient-to-b from-indigo-200 to-purple-200 transform -translate-x-1/2"></div>

          <motion.div
            className="space-y-1"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {educationData.map((edu, index) => (
              <motion.div
                key={index}
                className={`relative flex w-full ${
                  index % 2 === 0 ? "justify-start" : "justify-end"
                }`}
                variants={item}
              >
                <div className="w-1/2">
                  <div
                    className={`bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl shadow-md border border-purple-100 ${index % 2 === 0 ? "text-right pr-10" : "text-left pl-10"}  
                    ${
                      index % 2 === 0 ? "text-right pr-10" : "text-left pl-10"
                    }`}
                  >
                    <h3 className="text-xl font-bold text-gray-900">{edu.degree}</h3>
                    <p className="text-lg text-gray-600">{edu.institution}</p>
                    <div className="mt-2">
                      <span className="inline-block px-3 py-1 text-sm font-medium text-indigo-700 bg-indigo-100 rounded-full">
                        {edu.score}
                      </span>
                      <p className="text-gray-500 mt-1">{edu.year}</p>
                    </div>
                  </div>
                </div>

                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 border-4 border-white shadow-md"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education;
