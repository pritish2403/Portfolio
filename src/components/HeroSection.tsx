import { Github, Linkedin, Mail, ArrowDown, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  scrollToSection: (sectionId: string) => void;
}

export const HeroSection = ({ scrollToSection }: HeroSectionProps) => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Enhanced Background with Multiple Gradients */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-cyan-900/30"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-purple-800/20 via-transparent to-blue-800/20"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-24 h-24 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-cyan-500/10 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Profile Image with Enhanced Design */}
        <div className="mb-8">
          <div className="relative w-48 h-48 mx-auto mb-10">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-400 p-[3px]">
              <div className="w-full h-full rounded-full bg-gray-900 p-[6px]">
                <img
                  src="https://res.cloudinary.com/dszxnwtiy/image/upload/f_auto,q_auto,w_400,h_400,c_fill,g_face/v1752384788/Img_kege8t.jpg"
                  srcSet="
          https://res.cloudinary.com/dszxnwtiy/image/upload/f_auto,q_auto,w_400,h_400,c_fill,g_face/v1752384788/Img_kege8t.jpg 1x,
          https://res.cloudinary.com/dszxnwtiy/image/upload/f_auto,q_auto,w_800,h_800,c_fill,g_face/v1752384788/Img_kege8t.jpg 2x
        "
                  alt="Pritish Divate"
                  width={192}
                  height={192}
                  className="w-full h-full rounded-full object-cover border border-gray-800"
                  style={{
                    imageRendering: "auto",
                  }}
                />
              </div>
            </div>
          </div>
          {/* Enhanced Typography */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Pritish Divate
              </span>
            </h1>

            <div className="relative">
              <div className="absolute -bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
            </div>
            <br></br>

            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto animate-fade-in leading-relaxed">
              Passionate about building{" "}
              <span className="text-blue-400 font-semibold">secure</span>,
              <span className="text-purple-400 font-semibold"> scalable</span>,
              and
              <span className="text-cyan-400 font-semibold">
                {" "}
                user-friendly
              </span>{" "}
              applications
            </p>

            {/* Enhanced CTA Button */}
            <div className="flex justify-center items-center mb-8">
              <Button
                onClick={() => scrollToSection("projects")}
                size="lg"
                className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
              >
                <span className="mr-2">View My Projects</span>
                <ArrowDown
                  size={20}
                  className="group-hover:translate-y-1 transition-transform"
                />
              </Button>
            </div>
          </div>
        </div>
        {/* Enhanced Social Links */}
        <div className="flex justify-center space-x-6 mt-8">
          <a
            href="https://github.com/Pritish2403"
            target="_blank"
            rel="noopener noreferrer"
            title="Visit GitHub"
            className="group p-4 rounded-full bg-gray-800/50 border border-gray-600 hover:border-blue-400 transition-all duration-300 hover:scale-110 hover:bg-stone-700 backdrop-blur-sm hover:shadow-lg hover:shadow-blue-500/20"
          >
            <Github
              size={28}
              className="text-gray-400 group-hover:text-white transition-colors"
            />
          </a>
          <a
            href="https://linkedin.com/in/pritish-divate-72888421b"
            target="_blank"
            rel="noopener noreferrer"
            title="Visit LinkedIn"
            className="group p-4 rounded-full bg-gray-800/50 border border-gray-600 hover:border-blue-400 transition-all duration-300 hover:scale-110 hover:bg-blue-600 backdrop-blur-sm hover:shadow-lg hover:shadow-blue-500/20"
          >
            <Linkedin
              size={28}
              className="text-gray-400 group-hover:text-white transition-colors"
            />
          </a>
          <a
            href="https://drive.google.com/file/d/1YsNp9aUMJj_L0twT7rymSyJ2qX70lBBb/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            title="View Resume"
            className="group p-4 rounded-full bg-gray-800/50 border border-gray-600 hover:border-blue-400 transition-all duration-300 hover:scale-110 hover:bg-red-500 backdrop-blur-sm hover:shadow-lg hover:shadow-blue-500/20"
          >
            <FileDown
              size={28}
              className="text-gray-400 group-hover:text-white transition-colors"
            />
          </a>
        </div>
      </div>
    </section>
  );
};
