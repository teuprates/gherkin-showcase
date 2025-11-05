import { GherkinBlock, GherkinLine } from "./GherkinSyntax";
import { Button } from "@/components/ui/button";
import { Linkedin, Mail, Download } from "lucide-react";

export const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center px-6 pt-20">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-muted-foreground text-lg">Olá, sou</p>
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground">
                LUIS ALBERTO
                <br />
                OLIVEIRA
              </h1>
              <p className="text-xl text-muted-foreground uppercase tracking-wide">
                Product Owner & Scrum Master
              </p>
            </div>

            <Button 
              size="lg" 
              className="gap-2"
              onClick={() => {
                // Simulate CV download
                const link = document.createElement('a');
                link.href = '#';
                link.download = 'Luis_Alberto_Oliveira_CV.pdf';
                link.click();
              }}
            >
              <Download className="w-4 h-4" />
              Download Currículo
            </Button>

            <div className="flex gap-4 pt-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => window.open('https://www.linkedin.com/in/luis-alberto-oliveira-product-owner/', '_blank')}
              >
                <Linkedin className="w-5 h-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => window.open('mailto:luis.alberto.oliveira@email.com', '_blank')}
              >
                <Mail className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Right Side - Code Block */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-hero rounded-3xl transform rotate-3"></div>
            <GherkinBlock className="relative bg-card border shadow-xl rounded-2xl overflow-hidden">
              <div className="bg-muted/50 px-6 py-3 border-b flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <span className="ml-2 text-sm text-muted-foreground">ProductOwner.gherkin</span>
              </div>
              <div className="p-6">
                <GherkinLine keyword="1" text="class ProductOwner {" />
                <GherkinLine keyword="2" text="  constructor() {" indent={1} />
                <GherkinLine keyword="3" text='    this.name = "Luis Alberto Oliveira";' indent={1} />
                <GherkinLine keyword="4" text='    this.role = ["PRODUCT", "SCRUM"];' indent={1} />
                <GherkinLine keyword="5" text="    this.experience = '5+ anos';" indent={1} />
                <GherkinLine keyword="6" text="    this.location = 'Salvador, BA';" indent={1} />
                <GherkinLine keyword="7" text="  }" indent={1} />
                <GherkinLine keyword="8" text="}" />
              </div>
            </GherkinBlock>
          </div>
        </div>
      </div>
    </section>
  );
};