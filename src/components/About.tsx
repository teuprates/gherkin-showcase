import { GherkinBlock, GherkinLine } from "./GherkinSyntax";

export const About = () => {
  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-primary mb-16 text-center">
          O que eu amo
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-foreground">Product Management</h3>
            <p className="text-muted-foreground leading-relaxed">
              Sou apaixonado por transformar ideias em produtos de valor, utilizando frameworks ágeis para entregar soluções que realmente impactam os usuários.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-foreground">Metodologias Ágeis</h3>
            <p className="text-muted-foreground leading-relaxed">
              Extremamente dedicado às práticas ágeis, facilitando cerimônias Scrum e promovendo a melhoria contínua em times de alta performance.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-foreground">Transformação Digital</h3>
            <p className="text-muted-foreground leading-relaxed">
              Adoro liderar iniciativas de transformação digital, implementando processos que aumentam a eficiência e geram valor para o negócio.
            </p>
          </div>
        </div>

        <div className="bg-card border rounded-2xl p-8 shadow-sm">
          <h2 className="text-3xl font-bold text-foreground mb-6">Sobre Mim</h2>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground leading-relaxed mb-6">
              Olá, sou <strong className="text-foreground">Luis Alberto Oliveira</strong>, Product Owner na <strong className="text-primary">V8.TECH</strong> em Salvador, Bahia. 
              Com mais de 5 anos de experiência em metodologias ágeis, tenho me dedicado a transformar ideias em produtos digitais de sucesso.
            </p>

            <GherkinBlock className="my-8" title="BDD Profile" animated={true}>
              <GherkinLine keyword="Background" text="Perfil Professional" animated={true} delay={200} />
              <GherkinLine keyword="Given" text="que trabalho como Product Owner na V8.TECH" indent={1} animated={true} delay={400} />
              <GherkinLine keyword="And" text="tenho certificações em Scrum e metodologias ágeis" indent={1} animated={true} delay={600} />
              <GherkinLine keyword="And" text="possuo experiência em transformação digital" indent={1} animated={true} delay={800} />
              <GherkinLine keyword="When" text="lidero equipes de desenvolvimento" indent={1} animated={true} delay={1000} />
              <GherkinLine keyword="Then" text="entrego produtos que geram valor real" indent={1} animated={true} delay={1200} />
              <GherkinLine keyword="And" text="promovo cultura de melhoria contínua" indent={1} animated={true} delay={1400} />
            </GherkinBlock>

            <p className="text-muted-foreground leading-relaxed">
              Acredito que a combinação de visão estratégica, foco no usuário e excelência em execução são fundamentais 
              para criar produtos digitais que realmente fazem a diferença no mercado.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};