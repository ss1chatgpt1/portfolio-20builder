import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ExternalLink, Mail, MapPin, Calendar, ChevronRight, Github, Linkedin } from 'lucide-react';

export default function Index() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
        <div className="max-width-wide mx-auto section-padding">
          <div className="flex items-center justify-between h-16">
            <div className="text-xl font-semibold tracking-tight">
              Saumil Shah
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                About
              </a>
              <a href="#experience" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Experience
              </a>
              <a href="#projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Projects
              </a>
              <a href="#skills" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Skills
              </a>
              <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 section-padding">
        <div className="max-width-content mx-auto">
          <div className="animate-fade-in">
            <div className="mb-6">
              <Badge variant="secondary" className="mb-4">
                Available for opportunities
              </Badge>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-6">
                Saumil Shah
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl">
                Chemical Engineering student passionate about data science and process optimization. 
                Building intelligent systems that bridge engineering and technology.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button size="lg" className="group">
                <Mail className="w-4 h-4 mr-2" />
                Get in touch
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                View resume
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Vadodara, Gujarat
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                B.Tech Chemical Engineering, 2024-present
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 section-padding bg-muted/30">
        <div className="max-width-content mx-auto">
          <div className="animate-slide-up">
            <h2 className="text-3xl font-semibold mb-8">About</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <p className="text-lg text-muted-foreground mb-6">
                  I'm a Chemical Engineering student at SVNIT Surat with a strong passion for data science 
                  and process optimization. I bridge the gap between traditional engineering and modern 
                  technology by applying machine learning to solve complex industrial challenges.
                </p>
                <p className="text-lg text-muted-foreground">
                  Currently serving as an Executive at MINDBEND, where I manage high-impact events and 
                  develop leadership skills while pursuing my academic excellence with a CGPA of 8.08.
                </p>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Current Focus</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Machine Learning in Chemical Processes</li>
                    <li>• Data Science Specialization (Coursera)</li>
                    <li>• Process Simulation & Optimization</li>
                    <li>• Event Management & Leadership</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-3">Languages</h3>
                  <div className="flex gap-2">
                    <Badge variant="outline">English</Badge>
                    <Badge variant="outline">Hindi</Badge>
                    <Badge variant="outline">Gujarati</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 section-padding">
        <div className="max-width-content mx-auto">
          <h2 className="text-3xl font-semibold mb-12">Experience</h2>
          <div className="space-y-8">
            <Card className="p-8 border-0 shadow-soft hover:shadow-medium transition-shadow">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Executive</h3>
                  <p className="text-lg text-primary font-medium mb-1">MINDBEND</p>
                  <p className="text-muted-foreground">SVNIT, Surat</p>
                </div>
                <Badge variant="secondary" className="mt-2 md:mt-0">
                  2025 - Present
                </Badge>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0"></div>
                  <span>Managed operations and logistics for two high-impact managerial events, coordinating 20+ participants and 5+ organizing members</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0"></div>
                  <span>Acted as stage anchor for formal and informal events, engaging all participants and judges while ensuring smooth program flow</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0"></div>
                  <span>Collaborated across departments for event planning, time management, and issue resolution during live sessions</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0"></div>
                  <span>Participated in intra-college events, gaining exposure to event dynamics and crowd management</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 section-padding bg-muted/30">
        <div className="max-width-content mx-auto">
          <h2 className="text-3xl font-semibold mb-12">Featured Project</h2>
          <Card className="p-8 border-0 shadow-soft hover:shadow-medium transition-shadow">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
              <div>
                <h3 className="text-2xl font-semibold mb-2">Smart Process Analytics & Prediction System</h3>
                <p className="text-lg text-muted-foreground mb-4">Developer & Analyst</p>
                <p className="text-muted-foreground mb-4">May 2025 - June 2025</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Github className="w-4 h-4 mr-2" />
                  Code
                </Button>
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Demo
                </Button>
              </div>
            </div>
            
            <div className="space-y-6">
              <p className="text-lg">
                Built a comprehensive data science platform to optimize chemical processes using machine learning, 
                achieving remarkable efficiency improvements and cost-saving opportunities.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold mb-3">Key Achievements</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Improved process efficiency by 90%+</li>
                    <li>• Identified 15-20% cost-saving opportunities</li>
                    <li>• Processed 5000+ row synthetic industrial datasets</li>
                    <li>• Implemented real-time prediction models</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Python</Badge>
                    <Badge variant="outline">Scikit-learn</Badge>
                    <Badge variant="outline">XGBoost</Badge>
                    <Badge variant="outline">Streamlit</Badge>
                    <Badge variant="outline">Plotly</Badge>
                    <Badge variant="outline">Pandas</Badge>
                    <Badge variant="outline">NumPy</Badge>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Technical Implementation</h4>
                <p className="text-muted-foreground">
                  Applied advanced machine learning techniques including regression analysis, clustering algorithms, 
                  and time-series forecasting to create a comprehensive solution for chemical process optimization.
                </p>
              </div>
              
              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  <strong>Collaborators:</strong> Kalpit Nagar, Viral Kapadia
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 section-padding">
        <div className="max-width-content mx-auto">
          <h2 className="text-3xl font-semibold mb-12">Skills & Expertise</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 border-0 shadow-soft">
              <h3 className="font-semibold mb-4">Engineering & Simulation</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Aspen Plus</span>
                  <Badge variant="outline" className="text-xs">Basic</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">MATLAB</span>
                  <Badge variant="outline" className="text-xs">Intermediate</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Excel (Solver)</span>
                  <Badge variant="outline" className="text-xs">Advanced</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">DWSIM</span>
                  <Badge variant="outline" className="text-xs">Intermediate</Badge>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-0 shadow-soft">
              <h3 className="font-semibold mb-4">Data Science & AI</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Python</span>
                  <Badge variant="outline" className="text-xs">Advanced</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Scikit-learn</span>
                  <Badge variant="outline" className="text-xs">Advanced</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">R</span>
                  <Badge variant="outline" className="text-xs">Basic</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">MLflow</span>
                  <Badge variant="outline" className="text-xs">Intermediate</Badge>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-0 shadow-soft">
              <h3 className="font-semibold mb-4">Web & Integration</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Flask</span>
                  <Badge variant="outline" className="text-xs">Intermediate</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">SQL</span>
                  <Badge variant="outline" className="text-xs">Intermediate</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Git</span>
                  <Badge variant="outline" className="text-xs">Advanced</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">VS Code</span>
                  <Badge variant="outline" className="text-xs">Advanced</Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="py-20 section-padding bg-muted/30">
        <div className="max-width-content mx-auto">
          <h2 className="text-3xl font-semibold mb-12">Education & Certifications</h2>
          <div className="space-y-8">
            <Card className="p-8 border-0 shadow-soft">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Bachelor of Technology</h3>
                  <p className="text-lg text-primary font-medium mb-1">Chemical Engineering</p>
                  <p className="text-muted-foreground">Sardar Vallabhbhai National Institute of Technology, Surat</p>
                </div>
                <div className="mt-4 md:mt-0 text-right">
                  <Badge variant="secondary" className="mb-2">2024 - Present</Badge>
                  <p className="text-sm text-muted-foreground">CGPA: 8.08</p>
                </div>
              </div>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 border-0 shadow-soft">
                <h3 className="font-semibold mb-4">Certifications</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0"></div>
                    <div>
                      <p className="font-medium">Data Science Specialization</p>
                      <p className="text-sm text-muted-foreground">Coursera - Ongoing</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0"></div>
                    <div>
                      <p className="font-medium">Aspen Plus Simulation Software</p>
                      <p className="text-sm text-muted-foreground">NPTEL - IIT Guwahati</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 section-padding">
        <div className="max-width-content mx-auto text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-semibold mb-6">Let's Connect</h2>
            <p className="text-lg text-muted-foreground mb-8">
              I'm always interested in discussing new opportunities, innovative projects, 
              or collaborations in data science and process optimization.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="group">
                <Mail className="w-4 h-4 mr-2" />
                saumilshah321@gmail.com
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                +91 9327996533
              </Button>
            </div>
            
            <div className="flex justify-center gap-4">
              <Button variant="ghost" size="sm">
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </Button>
              <Button variant="ghost" size="sm">
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 section-padding border-t border-border">
        <div className="max-width-content mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 Saumil Shah. Designed with precision and care.
            </p>
            <p className="text-sm text-muted-foreground">
              Built with React, TypeScript & Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
