import { ResumeData } from "@/src/types";

export default function CreativeTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className="h-full flex bg-white text-gray-800 font-sans overflow-hidden">
      {/* Sidebar - Color Gradient */}
      <div className="w-[35%] bg-gradient-to-b from-indigo-600 to-purple-700 p-8 text-white flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-black leading-tight uppercase mb-2">
            {personalInfo.fullName?.split(" ")[0]}<br/>
            <span className="opacity-70">{personalInfo.fullName?.split(" ").slice(1).join(" ")}</span>
          </h1>
          <p className="text-sm font-bold tracking-widest uppercase text-indigo-200">
            {personalInfo.title}
          </p>
        </div>

        <section className="space-y-4">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] border-b border-white/20 pb-2">Connect</h2>
          <div className="space-y-3 text-xs opacity-90">
             <div className="flex flex-col">
               <span className="font-bold text-[10px] uppercase text-indigo-300">Email</span>
               <span>{personalInfo.email}</span>
             </div>
             <div className="flex flex-col">
               <span className="font-bold text-[10px] uppercase text-indigo-300">Location</span>
               <span>{personalInfo.location}</span>
             </div>
             {personalInfo.website && (
               <div className="flex flex-col">
                 <span className="font-bold text-[10px] uppercase text-indigo-300">Portfolio</span>
                 <span className="truncate">{personalInfo.website}</span>
               </div>
             )}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] border-b border-white/20 pb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <span key={i} className="bg-white/10 px-2 py-1 rounded text-[10px] font-bold">
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-auto">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] border-b border-white/20 pb-2 mb-4">Education</h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <h3 className="font-bold text-xs">{edu.school}</h3>
                <p className="text-[10px] opacity-70">{edu.degree}</p>
                <span className="text-[9px] font-medium opacity-50">{edu.startDate} - {edu.endDate}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 overflow-auto">
        {/* Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-black text-indigo-600 uppercase mb-4 tracking-tight">Profile</h2>
          <p className="text-sm leading-relaxed text-gray-600 font-medium italic">
            "{personalInfo.summary}"
          </p>
        </section>

        {/* Experience */}
        <section className="mb-10">
          <h2 className="text-xl font-black text-indigo-600 uppercase mb-6 tracking-tight">Experience</h2>
          <div className="space-y-8">
            {experience.map((exp) => (
              <div key={exp.id} className="relative">
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="font-black text-lg text-gray-900">{exp.position}</h3>
                  <span className="text-[10px] font-black bg-gray-100 px-2 py-1 rounded">
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
                <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-3">
                  {exp.company} | {exp.location}
                </p>
                <div className="text-xs leading-relaxed text-gray-600 whitespace-pre-line">
                  {exp.description}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <h2 className="text-xl font-black text-indigo-600 uppercase mb-6 tracking-tight">Key Projects</h2>
            <div className="grid grid-cols-2 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="group cursor-default">
                  <h3 className="font-black text-sm text-gray-900 group-hover:text-indigo-600 transition-colors mb-2">
                    {project.name}
                  </h3>
                  <p className="text-[11px] text-gray-500 leading-relaxed font-medium">
                    {project.description}
                  </p>
                  {project.link && (
                    <span className="text-[10px] font-bold text-indigo-400 mt-2 block italic">{project.link}</span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
