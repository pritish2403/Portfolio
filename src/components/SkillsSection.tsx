import { Card, CardContent } from "@/components/ui/card";

export const SkillsSection = () => {
  const skills = [
    "AWS Cloud", "Python", "SQL", "Git / GitHub",
    "JavaScript", "TypeScript", "React.js", "React Native",
    "MongoDB", "Express.js", "Node.js", "HTML / CSS"
  ];

  return (
    <section
      id="skills"
      className="py-20 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#1e293b]"
    >
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text mb-12">
          Skills
        </h2>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {skills.map((skill) => (
              <Card
                key={skill}
                className="bg-[#1e293b]/60 border border-[#334155] hover:bg-[#334155]/60 backdrop-blur-md transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-blue-500/20"
              >
                <CardContent className="p-4 text-center">
                  <span className="text-blue-200 font-medium">{skill}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
