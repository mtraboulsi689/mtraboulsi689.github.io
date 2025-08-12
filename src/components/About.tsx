
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Award, Languages, BookOpen } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-gradient-coastal">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-ocean">
            About Me
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Passionate coastal and civil engineer with expertise in fluid mechanics, 
            numerical modeling, and data analysis. Currently pursuing advanced research 
            in environmental fluid mechanics at Université Grenoble Alpes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="animate-fade-up">
              <h3 className="text-2xl font-semibold mb-4 text-primary">
                Professional Focus
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                My work centers on understanding and modeling complex fluid dynamics 
                in coastal and civil engineering applications. I specialize in sediment 
                transport, turbulence analysis, and the development of numerical models 
                to predict environmental changes and their impacts on coastal infrastructure.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                With extensive experience in both experimental and computational approaches, 
                I bridge the gap between theoretical research and practical engineering solutions.
              </p>
            </div>

            <div className="flex items-center space-x-4 text-muted-foreground">
              <MapPin className="text-accent" size={20} />
              <span>Based in Orléans, France</span>
            </div>
          </div>

          <div className="space-y-4">
            <Card className="shadow-coastal hover:shadow-ocean transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Languages className="text-accent" size={24} />
                  <h4 className="font-semibold text-lg">Languages</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Arabic</span>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-3 h-3 rounded-full bg-accent"></div>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>English</span>
                    <div className="flex space-x-1">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="w-3 h-3 rounded-full bg-accent"></div>
                      ))}
                      <div className="w-3 h-3 rounded-full bg-accent opacity-50"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>French</span>
                    <div className="flex space-x-1">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="w-3 h-3 rounded-full bg-accent"></div>
                      ))}
                      {[...Array(2)].map((_, i) => (
                        <div key={i} className="w-3 h-3 rounded-full bg-muted"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-coastal hover:shadow-ocean transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Award className="text-accent" size={24} />
                  <h4 className="font-semibold text-lg">Key Achievements</h4>
                </div>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• CRNA Grant Scholarship Recipient</li>
                  <li>• Ranked 1st in Master's Program (Très Bien)</li>
                  <li>• Published Research in International Journal</li>
                  <li>• Data Analysis & ML Bootcamp Graduate</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
