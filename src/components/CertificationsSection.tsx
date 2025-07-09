import { Card, CardContent } from "@/components/ui/card";

export const CertificationsSection = () => {
  const certifications = [
    {
      title: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      year: "2024",
      link: "https://drive.google.com/file/d/1Mb71KmB8xJFl-74TR-IjJDkXnuPVQJ1W/view?usp=sharing",
    },
    {
      title: "MERN Full Stack Certification",
      issuer: "Ethnus",
      year: "2023",
      link: "https://drive.google.com/file/d/1prVP45fh-abpywNb18TmNw4_3bhMGS4n/view?usp=sharing",
    },
    {
      title: "Git Essential Training",
      issuer: "LinkedIn Learning",
      year: "2025",
      link: "https://drive.google.com/file/d/1ikrfcKaRAIDBn3yrRFQdQE67uL4GBXaA/view?usp=sharing",
    },
    {
      title: "Certificate of Python Training",
      issuer: "Spoken Tutorial Project, IIT Bombay",
      year: "2022",
      link: "https://drive.google.com/file/d/1HRtqyJkb141YHoFsVSEWR-_hH1WCfceD/view?usp=sharing",
    },
  ];

  return (
    <section
      id="certifications"
      className="py-20 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#1e293b]"
    >
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text">
          Certifications
        </h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {certifications.map((cert) => (
            <a
              key={cert.title}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              title="Tap to open"
              className="block group"
            >
              <Card className="bg-[#1e293b]/60 border border-[#334155] backdrop-blur-lg shadow-md hover:shadow-blue-500/20 transition-all hover:scale-[1.02] cursor-pointer hover:bg-zinc-700" >
                <CardContent className="p-6 space-y-2">
                  <h3 className="text-xl font-semibold text-blue-300 group-hover:text-white transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-gray-400">{cert.issuer}</p>
                  <p className="text-gray-500 text-sm">{cert.year}</p>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
