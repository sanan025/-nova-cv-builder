import { ResumeData } from "@/src/types";

export default function ModernTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className="h-full p-12 text-gray-800 flex flex-col gap-8 font-sans">
      {/* Header */}
      <header className="border-b-2 border-primary pb-6">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 uppercase">{personalInfo.fullName || "Your Full Name"}</h1>
        <p className="text-xl text-primary font-medium mt-1">{personalInfo.title || "Professional Title"}</p>
        
        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-sm text-gray-500 font-medium">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.website && <span className="text-primary underline">{personalInfo.website}</span>}
        </div>
      </header>

      <div className="grid grid-cols-3 gap-12 flex-1">
        {/* Left Column */}
        <div className="col-span-2 space-y-8">
          {/* Summary */}
          {personalInfo.summary && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Professional Summary</h2>
              <p className="text-sm leading-relaxed text-gray-600">{personalInfo.summary}</p>
            </section>
          )}

          {/* Work Experience */}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-5 border-b border-gray-100 pb-1">Experience</h2>
            <div className="space-y-6">
              {experience.length > 0 ? experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-gray-900">{exp.position}</h3>
                    <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-0.5 rounded uppercase">{exp.startDate} — {exp.current ? "Present" : exp.endDate}</span>
                  </div>
                  <p className="text-sm font-medium text-gray-700 mb-2">{exp.company}</p>
                  <p className="text-xs leading-relaxed text-gray-500 whitespace-pre-line">{exp.description}</p>
                </div>
              )) : (
                <p className="text-xs text-gray-400 italic">No experience added yet.</p>
              )}
            </div>
          </section>

          {/* Projects */}
          {projects.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-5 border-b border-gray-100 pb-1">Key Projects</h2>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id}>
                    <h3 className="font-bold text-sm text-gray-900">{project.name}</h3>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{project.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column (Sidebar) */}
        <div className="space-y-8">
          {/* Skills */}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Core Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.length > 0 ? skills.map((skill, i) => (
                <span key={i} className="text-[10px] font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded uppercase tracking-wide">
                  {skill}
                </span>
              )) : (
                <p className="text-xs text-gray-400 italic">No skills listed.</p>
              )}
            </div>
          </section>

          {/* Education */}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Education</h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-bold text-sm text-gray-900">{edu.degree}</h3>
                  <p className="text-xs text-gray-600 font-medium">{edu.school}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{edu.startDate} — {edu.current ? "Present" : edu.endDate}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Languages */}
          {data.languages.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Languages</h2>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {data.languages.map((lang, i) => (
                  <span key={i} className="text-xs font-medium text-gray-600">{lang}</span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
