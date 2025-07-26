import { motion, Variants } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaGithub, FaLinkedin, FaWhatsapp, FaTwitter } from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiReact } from 'react-icons/si';

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

const itemVariant: Variants = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

const Contact = () => {
  const contactInfo = [
    {
      icon: <FiPhone className="w-5 h-5" />, title: 'Phone', value: '+91 8237882403',
    },
    {
      icon: <FiMapPin className="w-5 h-5" />, title: 'Location', value: 'Nashik, Maharashtra',
    },
    {
      icon: <FiMail className="w-5 h-5" />, title: 'Email', value: 'pritishdivate@gmail.com', href: 'mailto:pritishdivate@gmail.com',
    },
  ];

  const socialLinks = [
    {
      icon: <FaGithub className="w-5 h-5" />, name: 'GitHub', url: 'https://github.com/pritish2403', bg: 'hover:bg-gray-700', text: 'hover:text-white',
    },
    {
      icon: <FaLinkedin className="w-5 h-5" />, name: 'LinkedIn', url: 'https://www.linkedin.com/in/pritish-divate-72888421b/', bg: 'hover:bg-blue-600', text: 'hover:text-white',
    },
    {
      icon: <FaWhatsapp className="w-5 h-5" />, name: 'WhatsApp', url: 'https://wa.me/918237882403', bg: 'hover:bg-green-500', text: 'hover:text-white',
    },
    {
      icon: <FaTwitter className="w-5 h-5" />, name: 'X (Twitter)', url: 'https://twitter.com/impritish24', bg: 'hover:bg-blue-600', text: 'hover:text-white',
    },
  ];

  return (
    <section id="contact" className="relative min-h-screen flex items-center justify-center w-full overflow-hidden bg-white">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-indigo-300 to-purple-400 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/2 -left-20 w-96 h-96 bg-gradient-to-r from-pink-300 to-rose-400 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-gradient-to-r from-cyan-300 to-blue-400 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-1/4 left-1/4 text-indigo-300/50 text-4xl animate-float">
          <SiReact className="w-12 h-12" />
        </div>
        <div className="absolute top-1/3 right-1/4 text-blue-300/40 text-5xl animate-float animation-delay-2000">
          <SiTypescript className="w-12 h-12" />
        </div>
        <div className="absolute bottom-1/4 left-1/3 text-cyan-300/40 text-6xl animate-float animation-delay-3000">
          <SiNextdotjs className="w-12 h-12" />
        </div>
      </div>

      <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
        {/* Get In Touch Badge */}
        <motion.div
          variants={itemVariant}
          initial="hidden"
          animate="show"
          className="mb-6 flex justify-center"
        >
          <span className="inline-flex items-center px-6 py-2 text-sm font-semibold text-indigo-700 bg-indigo-100 rounded-full backdrop-blur-sm shadow">
            <span className="relative z-10">Get In Touch</span>
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
          </span>
        </motion.div>

        {/* Contact Card */}
        <motion.div
          className="bg-white/60 backdrop-blur-sm rounded-md shadow-xl p-4 border border-white/20 mx-auto mt-16"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Side */}
            <div className="flex-1 space-y-8">
              {contactInfo.map((info, index) => (
                <motion.div key={index} variants={itemVariant} className="flex items-start group">
                  <div className="p-2.5 bg-indigo-100 text-indigo-600 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                    {info.icon}
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-500">{info.title}</h4>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-base text-gray-700 hover:text-indigo-600 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-base text-gray-700">{info.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}

              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-4">Connect with me</h4>
                <div className="flex gap-4">
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 shadow-sm bg-white/80 backdrop-blur-sm text-gray-700 transition-all duration-300 hover:scale-110 ${link.bg} ${link.text}`}
                      aria-label={link.name}
                      title={link.name}
                      whileHover={{ y: -5 }}
                    >
                      {link.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px bg-gray-300 mx-4"></div>

            {/* Right Side */}
            <div className="flex-1 text-center flex flex-col items-center justify-center">
              <motion.h1
                variants={itemVariant}
                className="text-xl sm:text-5xl md:text-4xl font-bold text-stone-800 mb-4"
              >
                Let's{' '}
                <span className="relative inline-block">
                  <span className="relative z-8 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                    Connect
                  </span>
                  <span className="absolute -bottom-1 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-purple-600 -z-0 rounded-full"></span>
                </span>
              </motion.h1>

              <motion.p variants={itemVariant} className="text-lg text-gray-600 max-w-xl mb-4">
                I'm always open to new opportunities and collaborations. Whether you have a
                project in mind, want to connect, or just say hello — feel free to reach out.
                I'd love to hear from you!
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
