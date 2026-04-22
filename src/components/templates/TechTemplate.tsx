import { ResumeData } from "@/src/types";

export default function TechTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className="h-full p-10 text-slate-800 flex flex-col font-mono bg-white">
      {/* Header */}
      <header className="border-b-4 border-slate-900 pb-6 mb-8">
        <h1 className="text-4xl font-black tracking-tighter text-slate-900 uppercase">
          {personalInfo.fullName || "Your Full Name"}
        </h1>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm font-bold text-slate-500">
          <span>{personalInfo.title || "Software Engineer"}</span>
          <span className="text-slate-300">/</span>
          <span>{personalInfo.email}</span>
          <span className="text-slate-300">/</span>
          <span>{personalInfo.phone}</span>
          {personalInfo.website && (
            <>
              <span className="text-slate-300">/</span>
              <span className="text-slate-900 underline underline-offset-2">{personalInfo.website}</span>
            </>
          )}
        </div>
      </header>

      <div className="flex-1 space-y-8 overflow-hidden">
        {/* Experience */}
        <section>
          <h2 className="text-lg font-black bg-slate-900 text-white inline-block px-3 py-1 mb-6 skew-x-[-10deg]">
            LOAD_EXPERIENCE();
          </h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id} className="relative pl-6">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-100" />
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-black text-slate-900">{exp.position}</h3>
                    <p className="text-sm font-bold text-slate-400">@ {exp.company}</p>
                  </div>
                  <span className="text-xs font-bold text-slate-400">
                    [{exp.startDate} - {exp.current ? "Present" : exp.endDate}]
                  </span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-600 whitespace-pre-line">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-12 gap-8">
          {/* Tech Stack */}
          <div className="col-span-12 lg:col-span-5">
            <h2 className="text-lg font-black bg-slate-900 text-white inline-block px-3 py-1 mb-6 skew-x-[-10deg]">
              STACK_INFO();
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <span key={i} className="text-[11px] font-bold border-2 border-slate-200 px-2 py-1 hover:border-slate-900 transition-colors">
                  &gt; {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Education & Projects */}
          <div className="col-span-12 lg:col-span-7 space-y-8">
            <section>
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-tighter border-b-2 border-slate-200 mb-4">
                Education
              </h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-black text-xs">{edu.school}</h3>
                    <p className="text-[10px] text-slate-500">{edu.degree}</p>
                  </div>
                ))}
              </div>
            </section>

            {projects.length > 0 && (
              <section>
                <h2 className="text-sm font-black text-slate-900 uppercase tracking-tighter border-b-2 border-slate-200 mb-4">
                  Projects
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {projects.map((project) => (
                    <div key={project.id} className="p-3 bg-slate-50 border border-slate-100">
                      <h3 className="font-black text-[11px] mb-1">{project.name}</h3>
                      <p className="text-[9px] text-slate-500 line-clamp-2">{project.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
