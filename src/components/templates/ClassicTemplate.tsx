import { ResumeData } from "@/src/types";

export default function ClassicTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className="h-full p-12 text-gray-800 flex flex-col gap-6 font-serif">
      {/* Header */}
      <header className="text-center border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 uppercase">{personalInfo.fullName || "Your Full Name"}</h1>
        <p className="text-lg text-gray-600 mt-1 italic">{personalInfo.title || "Professional Title"}</p>
        
        <div className="flex justify-center flex-wrap gap-x-4 gap-y-1 mt-4 text-xs font-medium">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span className="before:content-['|'] before:mr-4">{personalInfo.phone}</span>}
          {personalInfo.location && <span className="before:content-['|'] before:mr-4">{personalInfo.location}</span>}
          {personalInfo.website && <span className="before:content-['|'] before:mr-4 font-bold">{personalInfo.website}</span>}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section>
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-400 mb-3 pb-0.5">Professional Summary</h2>
          <p className="text-xs leading-relaxed text-gray-700 italic">{personalInfo.summary}</p>
        </section>
      )}

      {/* Skills */}
      <section>
        <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-400 mb-3 pb-0.5">Skills</h2>
         <p className="text-xs leading-relaxed text-gray-700">
           <span className="font-bold">Expertise: </span>
           {skills.join(" • ")}
         </p>
      </section>

      {/* Experience */}
      <section>
        <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-400 mb-4 pb-0.5">Professional Experience</h2>
        <div className="space-y-6">
          {experience.map((exp) => (
            <div key={exp.id}>
              <div className="flex justify-between items-baseline mb-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-gray-900 uppercase">{exp.company}</h3>
                  <span className="text-[10px] text-gray-500 italic">— {exp.location}</span>
                </div>
                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-tight">{exp.startDate} — {exp.current ? "Present" : exp.endDate}</span>
              </div>
              <p className="text-[11px] font-bold text-gray-700 italic mb-2 tracking-wide">{exp.position}</p>
              <div className="text-[11px] leading-relaxed text-gray-600 pl-4 border-l-2 border-gray-50 whitespace-pre-line">
                {exp.description}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section>
        <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-400 mb-4 pb-0.5">Education</h2>
        <div className="space-y-4">
          {education.map((edu) => (
            <div key={edu.id} className="flex justify-between items-baseline">
              <div>
                <h3 className="font-bold text-sm text-gray-900">{edu.school}</h3>
                <p className="text-[11px] italic text-gray-700">{edu.degree}</p>
              </div>
              <span className="text-[10px] uppercase font-bold text-gray-500">{edu.startDate} — {edu.endDate}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      {projects.length > 0 && (
        <section>
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-400 mb-4 pb-0.5">Selected Projects</h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id}>
                <h3 className="font-bold text-xs text-gray-900 uppercase">{project.name}</h3>
                <p className="text-[11px] text-gray-600 mt-1 leading-relaxed italic">{project.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
