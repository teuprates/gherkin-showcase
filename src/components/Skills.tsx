import { GherkinBlock, GherkinLine } from "./GherkinSyntax";
import { Badge } from "@/components/ui/badge";

export const Skills = () => {
  const skillCategories = [
    {
      title: "Product Management",
      skills: ["Product Strategy", "Roadmap Planning", "User Stories", "Backlog Management", "Stakeholder Management", "Data Analysis"]
    },
    {
      title: "Metodologias Ágeis",
      skills: ["Scrum", "Kanban", "SAFe", "OKRs", "Design Thinking", "Lean Startup"]
    },
    {
      title: "Ferramentas",
      skills: ["Jira", "Confluence", "Miro", "Figma", "Azure DevOps", "Power BI"]
    },
    {
      title: "Soft Skills",
      skills: ["Liderança", "Comunicação", "Facilitação", "Coaching", "Negociação", "Resolução de Conflitos"]
    }
  ];

  return (
    <section id="skills" className="py-20 px-6 bg-secondary/30">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-primary mb-16 text-center">
          Habilidades & Especialidades
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <GherkinBlock className="h-fit" title="Skills Assessment" animated={true}>
              <GherkinLine keyword="Feature" text="Competências Técnicas" animated={true} delay={200} />
              <div className="mt-4"></div>
              <GherkinLine keyword="Scenario" text="Avaliação de habilidades" indent={1} animated={true} delay={400} />
              <GherkinLine keyword="Given" text="que possuo expertise em Product Management" indent={2} animated={true} delay={600} />
              <GherkinLine keyword="And" text="domino metodologias ágeis" indent={2} animated={true} delay={800} />
              <GherkinLine keyword="And" text="tenho experiência com ferramentas modernas" indent={2} animated={true} delay={1000} />
              <GherkinLine keyword="When" text="aplico essas competências em projetos" indent={2} animated={true} delay={1200} />
              <GherkinLine keyword="Then" text="entrego resultados mensuráveis" indent={2} animated={true} delay={1400} />
              <GherkinLine keyword="And" text="promovo melhoria contínua" indent={2} animated={true} delay={1600} />
            </GherkinBlock>
          </div>

          <div className="space-y-8">
            {skillCategories.map((category, index) => (
              <div key={index} className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground border-b border-border pb-2">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge 
                      key={skillIndex} 
                      variant="secondary" 
                      className="text-sm py-1 px-3 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};