import { Wrench, BarChart3, Users } from 'lucide-react';

export default function Portfolio() {
  const projects = [
    {
      title: "Repair Operations Workflow Optimization",
      icon: Wrench,
      description: "A complete digital system transforming how repair shops manage intake, tracking, technician assignment, and customer communication.",
      tech: ["Notion"],
      link: "https://dog-stoplight-404.notion.site/Repair-Operations-Workflow-Optimization-30e3ac8ecf50805a93b0ee900a3b3e35?source=copy_link",
      github: "https://github.com/yourusername/ops-platform",
      features: [
        "Admin + Technician roles",
        "Intake → Diagnosis → Repair → QC → Completed",
        "Real-time status tracking"
      ]
    },
    {
      title: "Operational Performance & Decision Dashboard",
      icon: BarChart3,
      description: "An analytics platform that transforms repair data into actionable insights for better business decisions.",
      tech: ["Notion"],
      link: "https://dog-stoplight-404.notion.site/Operational-Performance-Decision-Dashboard-3103ac8ecf50804b8f1df1e5de6df3e0?source=copy_link",
      github: "https://github.com/yourusername/ops-platform",
      features: [
        "Interactive charts (repair types, daily trends, technician performance)",
        "Automatic bottleneck identification and insights",
        "Exportable reports for management review",
      ]
    },
    {
      title: "Service Operation Coordination System",
      icon: Users,
      description: "An integrated coordination layer connecting technicians, inventory, and customer service for seamless operations.",
      tech: ["Notion"],
      link: "https://dog-stoplight-404.notion.site/Service-Operation-Coordination-System-3103ac8ecf5080a58d89ffe02fbf9b2c?source=copy_link",
      github: "https://github.com/yourusername/ops-platform",
      features: [
        "Low-stock alerts",
        "Technician workload balancing",
        "Activity audit trail"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-heading text-5xl font-light text-white mb-2">
          My Projects<span className="text-[#F97316]">.</span>
        </h1>
        <p className="font-body text-[#A1A1AA] text-xl mb-12">
          AU Digital & Innovation Fellowship Application
        </p>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <div key={index} className="card-tactile p-8">
              <div className="flex items-start gap-4">
                <project.icon className="w-8 h-8 text-[#F97316] mt-1" />
                <div className="flex-1">
                  <h2 className="font-heading text-2xl font-light text-white mb-2">
                    {project.title}
                  </h2>
                  <p className="font-body text-[#A1A1AA] mb-4">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map(tech => (
                      <span className="text-xs font-sans font-medium px-3 py-1 bg-[#2A2A2A] border border-[#3F3F46] rounded-lg text-[#F97316]">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <ul className="space-y-1 mb-6">
                    {project.features.map(feature => (
                      <li className="font-body text-white flex items-center gap-2">
                        <span className="text-[#F97316]">→</span> {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="flex gap-4">
                    <a 
                      href={project.link}
                      target="_blank"
                      className="px-4 py-2 bg-[#F97316] text-white rounded-lg hover:bg-[#EA580C] transition-colors font-heading text-sm"
                    >
                      Notion Link
                    </a>
                
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}