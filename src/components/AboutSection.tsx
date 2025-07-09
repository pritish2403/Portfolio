import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const AboutSection = () => {
  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#1e293b]"
    >
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text mb-12">
          About Me
        </h2>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-[#1e293b]/60 border border-[#334155] backdrop-blur-sm shadow-md">
            <CardContent className="p-8">
              <p className="text-lg text-gray-300 mb-6 leading-relaxed text-left">
                I'm a passionate Computer Science graduate from VIT Chennai,
                with experience in full-stack development (MERN), cloud computing (AWS Certified),
                and solving problems through data structures and algorithms.
                I love building scalable, secure apps and working with teams to make ideas real.
              </p>

              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-400">
                    Soft Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Critical Thinking",
                      "Time Management",
                      "Problem Solving",
                      "Adaptability",
                      "Teamwork",
                      "Patience",
                      "Creativity",
                    ].map((skill) => (
                      <Badge
                        key={skill}
                        className="bg-blue-500/10 text-blue-200 border border-blue-400/20"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-400">
                    Languages
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {["English", "Hindi", "Marathi"].map((lang) => (
                      <Badge
                        key={lang}
                        className="bg-blue-500/10 text-blue-200 border border-blue-400/20"
                      >
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
