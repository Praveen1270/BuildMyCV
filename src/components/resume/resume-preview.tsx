"use client";

interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    summary: string;
  };
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    gpa?: string;
  }>;
  experience: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
    current: boolean;
  }>;
  skills: Array<{
    id: string;
    name: string;
    level: string;
  }>;
  projects: Array<{
    id: string;
    name: string;
    description: string;
    technologies: string;
    url?: string;
  }>;
  awards: Array<{
    id: string;
    title: string;
    organization: string;
    date: string;
    description: string;
  }>;
}

interface ResumePreviewProps {
  data: ResumeData;
}

export function ResumePreview({ data }: ResumePreviewProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString + "-01");
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-red-200";
      case "intermediate":
        return "bg-yellow-200";
      case "advanced":
        return "bg-blue-200";
      case "expert":
        return "bg-green-200";
      default:
        return "bg-gray-200";
    }
  };

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg max-h-[800px] overflow-y-auto print:shadow-none print:max-h-none">
      {/* Header */}
      <div className="border-b-2 border-gray-300 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {data.personalInfo.fullName || "Your Name"}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.address && (
            <span>{data.personalInfo.address}</span>
          )}
        </div>
        {data.personalInfo.summary && (
          <p className="mt-3 text-gray-700 leading-relaxed">
            {data.personalInfo.summary}
          </p>
        )}
      </div>

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">
            Experience
          </h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {exp.position}
                  </h3>
                  <p className="text-gray-700">{exp.company}</p>
                </div>
                <div className="text-sm text-gray-600">
                  {formatDate(exp.startDate)} -{" "}
                  {exp.current ? "Present" : formatDate(exp.endDate)}
                </div>
              </div>
              {exp.description && (
                <p className="text-gray-700 text-sm leading-relaxed">
                  {exp.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">
            Education
          </h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <p className="text-gray-700">{edu.institution}</p>
                  {edu.gpa && (
                    <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                  )}
                </div>
                <div className="text-sm text-gray-600">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">
            Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {data.skills.map((skill) => (
              <div key={skill.id} className="flex items-center justify-between">
                <span className="text-gray-700">{skill.name}</span>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${getSkillLevelColor(skill.level)}`}
                >
                  {skill.level.charAt(0).toUpperCase() + skill.level.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">
            Projects
          </h2>
          {data.projects.map((project) => (
            <div key={project.id} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold text-gray-900">{project.name}</h3>
                {project.url && (
                  <a
                    href={project.url}
                    className="text-blue-600 text-sm hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Project
                  </a>
                )}
              </div>
              {project.technologies && (
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Technologies:</strong> {project.technologies}
                </p>
              )}
              {project.description && (
                <p className="text-gray-700 text-sm leading-relaxed">
                  {project.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Awards */}
      {data.awards.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">
            Awards & Achievements
          </h2>
          {data.awards.map((award) => (
            <div key={award.id} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{award.title}</h3>
                  {award.organization && (
                    <p className="text-gray-700">{award.organization}</p>
                  )}
                  {award.description && (
                    <p className="text-gray-700 text-sm leading-relaxed mt-1">
                      {award.description}
                    </p>
                  )}
                </div>
                {award.date && (
                  <div className="text-sm text-gray-600">
                    {formatDate(award.date)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
