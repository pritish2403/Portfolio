import { Card, CardContent } from "@/components/ui/card";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

export const ContactSection = () => {
  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#1e293b]"
    >
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-center mb-12">
          Get In Touch
        </h2>
        <div className="max-w-4xl mx-auto">
          <Card className="bg-[#1e293b]/60 border border-[#334155] backdrop-blur-lg shadow-lg shadow-blue-500/5">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Contact Info */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <MdPhone size={28} className="text-cyan-400" />
                    <span className="text-gray-200 hover:text-cyan-400 transition-colors">
                      +91 8237882403
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MdEmail size={28} className="text-cyan-400" />
                    <span className="text-gray-200 hover:text-cyan-400 transition-colors">
                      pritishdivate@gmail.com
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MdLocationOn size={28} className="text-cyan-400" />
                    <span className="text-gray-200 hover:text-cyan-400 transition-colors">
                      Nashik, Maharashtra
                    </span>
                  </div>

                  {/* Social Icons */}
                  <div className="flex gap-4 pt-4">
                    <a
                      href="https://github.com/Pritish2403"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-md bg-[#334155] text-gray-300 hover:bg-stone-500 hover:text-white transition"
                      title="GitHub"
                    >
                      <FaGithub size={20} />
                    </a>
                    <a
                      href="https://linkedin.com/in/pritish-divate-72888421b"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-md bg-[#334155] text-gray-300 hover:bg-blue-600 hover:text-white transition"
                      title="LinkedIn"
                    >
                      <FaLinkedin size={20} />
                    </a>
                    <a
                      href="https://wa.me/918237882403"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-md bg-[#334155] text-gray-300 hover:bg-green-600 hover:text-white transition"
                      title="WhatsApp"
                    >
                      <FaWhatsapp size={20} />
                    </a>
                    <a
                      href="mailto:pritishdivate@gmail.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-md bg-[#334155] text-gray-300 hover:bg-red-600 hover:text-white transition"
                      title="Email"
                    >
                      <MdEmail size={20} />
                    </a>
                  </div>
                </div>

                {/* Right Side Text */}
                <div className="space-y-6 text-center md:text-left">
                  <h3 className="text-xl font-semibold text-blue-400">
                    Let’s Connect
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    I'm always open to new opportunities and collaborations.
                    Whether you have a project in mind, want to connect, or just
                    say hello — feel free to reach out. I’d love to hear from
                    you!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
