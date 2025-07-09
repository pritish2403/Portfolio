import { Card, CardContent } from "@/components/ui/card";

export const EducationSection = () => {
  return (
    <section
      id="education"
      className="py-20 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#1e293b]"
    >
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-center mb-12">
          Education
        </h2>

        <div className="max-w-4xl mx-auto space-y-6">
          {[
            {
              title: "B.Tech in Computer Science and Engineering",
              place: "Vellore Institute of Technology, Chennai",
              year: "2025",
              score: "CGPA: 7.7",
            },
            {
              title: "12th HSC",
              place: "Matoshri Junior College, Nashik",
              year: "2021",
              score: "91%",
            },
            {
              title: "10th SSC",
              place: "Maratha High School, Nashik",
              year: "2019",
              score: "87%",
            },
          ].map((edu, index) => (
            <Card
              key={index}
              className="bg-[#1e293b]/60 border border-[#334155] hover:bg-[#334155]/60 transition-colors backdrop-blur-sm"
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2 flex-col sm:flex-row sm:items-center">
                  <h3 className="text-xl font-semibold text-blue-200">
                    {edu.title}
                  </h3>
                  <span className="text-blue-400 font-medium">{edu.score}</span>
                </div>
                <p className="text-gray-400 mb-1">{edu.place}</p>
                <p className="text-gray-500">{edu.year}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
