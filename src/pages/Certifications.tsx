import { motion } from 'framer-motion';
import { FiAward, FiExternalLink } from 'react-icons/fi';

type Certification = {
  id: number;
  title: string;
  issuer: string;
  date: string;
  credentialUrl: string;
  skills: string[];
};

const Certifications = () => {
  const certifications: Certification[] = [
    {
      id: 1,
      title: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services',
      date: 'Jan 2024',
      credentialUrl: 'https://drive.google.com/file/d/1Mb71KmB8xJFl-74TR-IjJDkXnuPVQJ1W/view?usp=sharing',
      skills: ['Cloud Infrastructure','AWS Services']
    },
    {
      id: 2,
      title: 'MERN Full Stack Certification',
      issuer: 'Ethnus',
      date: 'Dec 2023',
      credentialUrl: 'https://drive.google.com/file/d/1prVP45fh-abpywNb18TmNw4_3bhMGS4n/view?usp=sharing',
      skills: ['MongoDB', 'Express', 'React', 'Node.js']
    },
    {
      id: 3,
      title: 'Git Essential Training',
      issuer: 'LinkedIn Learning',
      date: 'May 2025',
      credentialUrl: 'https://drive.google.com/file/d/1ikrfcKaRAIDBn3yrRFQdQE67uL4GBXaA/view?usp=sharing',
      skills: ['Git', 'Version Control', 'GitHub']
    },
    {
      id: 4,
      title: 'Certificate of Python Training',
      issuer: 'Spoken Tutorial Project, IIT Bombay',
      date: 'Feb 2022',
      credentialUrl: 'https://drive.google.com/file/d/1HRtqyJkb141YHoFsVSEWR-_hH1WCfceD/view?usp=sharing',
      skills: ['Python', 'Programming', 'Algorithms']
    }
  ];

  return (
    <section id="certifications" className="relative py-20 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50"></div>
      
      {/* Animated Blobs */}
      <div className="absolute top-1/4 -left-4 w-72 h-72 bg-gradient-to-r from-indigo-300 to-purple-400 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob"></div>
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-300 to-indigo-300 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-4000"></div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-3 py-1 text-sm font-semibold text-indigo-700 bg-indigo-100 rounded-full mb-4">
            My Credentials
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Certifications & <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Achievements</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-white/20"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <FiAward className="h-8 w-8 text-indigo-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {cert.title}
                  </h3>
                  <p className="text-gray-600">{cert.issuer}</p>
                  <p className="text-sm text-gray-500 mt-1">{cert.date}</p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {cert.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    View Credential
                    <FiExternalLink className="ml-1.5 h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
