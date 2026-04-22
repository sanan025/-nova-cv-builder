import { ResumeData } from "@/src/types";

export default function ExecutiveTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className="h-full p-12 text-gray-800 flex flex-col font-sans bg-[#fcfcfc]">
      {/* Header */}
      <header className="flex justify-between items-start border-b-2 border-gray-900 pb-8 mb-8">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-gray-900 uppercase leading-none">{personalInfo.fullName || "Your Full Name"}</h1>
          <p className="text-lg font-bold text-gray-500 mt-2 uppercase tracking-[0.2em]">{personalInfo.title || "Professional Title"}</p>
        </div>
        <div className="text-right text-sm space-y-1 font-medium">
          <p className="text-gray-900">{personalInfo.location}</p>
          <p className="text-gray-600">{personalInfo.email}</p>
          <p className="text-gray-600">{personalInfo.phone}</p>
          {personalInfo.website && <p className="text-gray-900 font-bold underline decoration-1 underline-offset-4">{personalInfo.website}</p>}
        </div>
      </header>

      <div className="flex-1 space-y-10">
        {/* Experience Section */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-lg font-black uppercase tracking-widest text-gray-900">Professional Background</h2>
            <div className="flex-1 h-[2px] bg-gray-100" />
          </div>
          <div className="space-y-8">
            {experience.map((exp) => (
              <div key={exp.id} className="relative pl-6 border-l-2 border-gray-200">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-gray-900" />
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-black text-gray-900 uppercase text-sm">{exp.position}</h3>
                    <p className="text-sm font-bold text-gray-500">{exp.company}</p>
                  </div>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{exp.startDate} — {exp.current ? "Present" : exp.endDate}</span>
                </div>
                <p className="text-xs leading-relaxed text-gray-600 whitespace-pre-line">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-2 gap-12">
          {/* Education */}
          <section>
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-sm font-black uppercase tracking-widest text-gray-900">Education</h2>
              <div className="flex-1 h-[1px] bg-gray-200" />
            </div>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-bold text-sm text-gray-900">{edu.school}</h3>
                  <p className="text-xs text-gray-500 font-medium">{edu.degree}</p>
                  <p className="text-[10px] text-gray-400 mt-1 font-bold">{edu.startDate} — {edu.endDate}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section>
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-sm font-black uppercase tracking-widest text-gray-900">Competencies</h2>
              <div className="flex-1 h-[1px] bg-gray-200" />
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <span key={i} className="text-[10px] font-black text-gray-800 bg-gray-100 px-3 py-1 rounded-sm uppercase tracking-tighter">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
