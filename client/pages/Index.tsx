import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ExternalLink, Mail, MapPin, Calendar, ChevronRight, Github, Linkedin, ArrowUpRight, Sparkles, Brain, Target, Zap } from 'lucide-react';

export default function Index() {
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Intersection Observer for active section detection
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );
    
    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Ambient Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-3xl transition-all duration-1000"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.02)_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      {/* Sophisticated Navigation - F-Pattern Optimized */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50 transition-all duration-300">
        <div className="max-width-wide mx-auto section-padding">
          <div className="flex items-center justify-between h-16">
            {/* Top-left focal point (F-pattern) */}
            <div className="group cursor-pointer">
              <div className="text-xl font-semibold tracking-tight relative">
                Saumil Shah
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-500 group-hover:w-full" />
              </div>
            </div>
            
            {/* Horizontal scanning line (F-pattern) */}
            <div className="hidden md:flex items-center space-x-1">
              {[
                { href: '#hero', label: 'Home', icon: Target },
                { href: '#story', label: 'Story', icon: Brain },
                { href: '#experience', label: 'Experience', icon: Zap },
                { href: '#projects', label: 'Projects', icon: Sparkles },
                { href: '#contact', label: 'Contact', icon: Mail },
              ].map(({ href, label, icon: Icon }) => (
                <a
                  key={href}
                  href={href}
                  className={`px-4 py-2 text-sm rounded-lg transition-all duration-300 group relative ${
                    activeSection === href.slice(1)
                      ? 'text-foreground bg-accent/50'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/30'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                    {label}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Z-Pattern Design for Maximum Impact */}
      <section 
        ref={heroRef}
        id="hero" 
        className="min-h-screen flex items-center justify-center section-padding relative"
      >
        <div className="max-width-content mx-auto">
          {/* Z-Pattern: Top-left to top-right diagonal */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Primary content (Z-pattern start) */}
            <div className="animate-fade-in space-y-8">
              {/* Dopamine trigger - Status badge */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Badge variant="secondary" className="px-4 py-2 bg-green-50 text-green-700 border-green-200 animate-pulse">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                    Available for opportunities
                  </Badge>
                </div>
              </div>
              
              {/* Primary headline - F-pattern top line */}
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-none">
                  <span className="block text-foreground">Saumil</span>
                  <span className="block text-primary relative">
                    Shah
                    <div className="absolute -bottom-2 left-0 w-16 h-1 bg-primary/20 rounded-full" />
                  </span>
                </h1>
                
                {/* Emotional storytelling hook */}
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                  Chemical engineering meets artificial intelligence. 
                  <span className="text-foreground font-medium"> Building the future </span>
                  where traditional engineering and cutting-edge technology converge.
                </p>
              </div>
              
              {/* Z-pattern diagonal - Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="group bg-primary hover:bg-primary/90 shadow-large transition-all duration-300 hover:shadow-xl hover:scale-105"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Start a conversation
                  <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="group border-2 hover:border-primary/50 transition-all duration-300"
                >
                  Explore my work
                  <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Button>
              </div>
              
              {/* Supporting information - F-pattern left scan */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-muted-foreground pt-4 border-t border-border/50">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary/60" />
                  <span>Vadodara, Gujarat • SVNIT Surat</span>
                </div>
                <div className="hidden sm:block w-1 h-1 bg-muted-foreground/30 rounded-full" />
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary/60" />
                  <span>Chemical Engineering • CGPA 8.08</span>
                </div>
              </div>
            </div>
            
            {/* Right side - Visual element (Z-pattern end) */}
            <div className="relative">
              <div className="relative">
                {/* Geometric background pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent rounded-3xl transform rotate-3" />
                <div className="absolute inset-0 bg-gradient-to-tl from-secondary/20 via-transparent to-primary/5 rounded-3xl transform -rotate-2" />
                
                {/* Content card */}
                <Card className="relative p-8 border-0 shadow-large bg-card/80 backdrop-blur-sm">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                      <span className="text-sm font-medium text-muted-foreground">Current Impact</span>
                    </div>
                    
                    {/* Achievement metrics - dopamine triggers */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary mb-1">90%+</div>
                        <div className="text-xs text-muted-foreground">Efficiency Improvement</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary mb-1">15-20%</div>
                        <div className="text-xs text-muted-foreground">Cost Savings</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary mb-1">5000+</div>
                        <div className="text-xs text-muted-foreground">Data Points</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary mb-1">8.08</div>
                        <div className="text-xs text-muted-foreground">CGPA</div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-border/50">
                      <p className="text-sm text-muted-foreground italic">
                        "Bridging the gap between chemical engineering and AI"
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator - psychological nudge */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-muted-foreground/30 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Story Section - Emotional Connection */}
      <section id="story" className="py-20 section-padding bg-gradient-to-b from-muted/20 to-background">
        <div className="max-width-content mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">The Story Behind the Science</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Every line of code tells a story. Every algorithm solves a real problem. 
              This is my journey from chemical reactions to digital solutions.
            </p>
          </div>
          
          {/* Timeline with emotional storytelling */}
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary/30" />
            
            <div className="space-y-12">
              {[
                {
                  year: "2024",
                  title: "The Beginning",
                  subtitle: "Started Chemical Engineering at SVNIT",
                  description: "Fascinated by the mathematical precision of chemical processes, I began to see patterns everywhere - in reactions, in data, in solutions.",
                  emotion: "curiosity",
                  icon: Brain
                },
                {
                  year: "2025",
                  title: "The Awakening", 
                  subtitle: "Discovered Data Science & AI",
                  description: "Machine learning wasn't just code to me - it was a new language for understanding complex systems, just like chemical engineering.",
                  emotion: "excitement",
                  icon: Sparkles
                },
                {
                  year: "2025",
                  title: "The Impact",
                  subtitle: "Built Smart Process Analytics",
                  description: "90% efficiency improvement wasn't just a number - it was proof that engineering intuition and AI could create something extraordinary.",
                  emotion: "achievement",
                  icon: Target
                },
                {
                  year: "Present",
                  title: "The Vision",
                  subtitle: "Leading at MINDBEND",
                  description: "Managing events taught me that leadership is like chemical catalysis - small inputs creating massive, positive reactions.",
                  emotion: "purpose",
                  icon: Zap
                }
              ].map((item, index) => (
                <div key={index} className="relative pl-20">
                  <div className="absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-medium" />
                  <Card className="p-6 border-0 shadow-soft hover:shadow-medium transition-all duration-500 hover:translate-x-2">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="outline" className="text-xs">{item.year}</Badge>
                          <Badge variant="secondary" className="text-xs capitalize">{item.emotion}</Badge>
                        </div>
                        <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                        <p className="text-primary font-medium mb-2">{item.subtitle}</p>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section - Cognitive Load Optimized */}
      <section id="experience" className="py-20 section-padding">
        <div className="max-width-content mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Professional Journey</h2>
            <p className="text-xl text-muted-foreground">
              Where leadership meets innovation
            </p>
          </div>
          
          <Card className="p-8 border-0 shadow-large bg-gradient-to-br from-card via-card to-accent/5">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Company info - F-pattern left */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-2">MINDBEND</h3>
                  <p className="text-lg text-muted-foreground">SVNIT, Surat</p>
                  <Badge className="mt-2">2025 - Present</Badge>
                </div>
                
                <div className="pt-4 border-t border-border/50">
                  <h4 className="font-semibold mb-2">Executive Role</h4>
                  <p className="text-sm text-muted-foreground">
                    Strategic leadership in event management and organizational development
                  </p>
                </div>
              </div>
              
              {/* Achievements - F-pattern center */}
              <div className="md:col-span-2 space-y-6">
                <h4 className="font-semibold text-lg mb-4">Key Achievements</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    {
                      metric: "20+",
                      label: "Participants Coordinated",
                      description: "Managed complex logistics for high-impact managerial events"
                    },
                    {
                      metric: "5+",
                      label: "Team Members",
                      description: "Led cross-functional organizing teams to success"
                    },
                    {
                      metric: "100%",
                      label: "Event Success Rate",
                      description: "Flawless execution as stage anchor and coordinator"
                    },
                    {
                      metric: "∞",
                      label: "Learning Mindset",
                      description: "Continuous growth in leadership and management"
                    }
                  ].map((item, index) => (
                    <Card key={index} className="p-4 border-0 bg-accent/20 hover:bg-accent/30 transition-colors">
                      <div className="text-2xl font-bold text-primary mb-1">{item.metric}</div>
                      <div className="font-medium text-sm mb-2">{item.label}</div>
                      <div className="text-xs text-muted-foreground">{item.description}</div>
                    </Card>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground italic">
                    "Leadership is like chemical catalysis - creating conditions where 
                    great things happen naturally through small, strategic interventions."
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Projects Section - Visual Hierarchy Excellence */}
      <section id="projects" className="py-20 section-padding bg-gradient-to-b from-background to-muted/20">
        <div className="max-width-content mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Featured Innovation</h2>
            <p className="text-xl text-muted-foreground">
              Where chemical engineering meets artificial intelligence
            </p>
          </div>
          
          <Card className="overflow-hidden border-0 shadow-large bg-gradient-to-br from-card to-primary/5">
            <div className="grid lg:grid-cols-5 gap-0">
              {/* Visual impact area */}
              <div className="lg:col-span-2 bg-gradient-to-br from-primary/10 to-accent/20 p-8 flex items-center justify-center">
                <div className="text-center space-y-6">
                  <div className="w-24 h-24 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                    <Brain className="w-12 h-12 text-primary" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">90%+</div>
                    <div className="text-sm text-muted-foreground">Efficiency Boost</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-primary">15-20%</div>
                      <div className="text-xs text-muted-foreground">Cost Savings</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-primary">5000+</div>
                      <div className="text-xs text-muted-foreground">Data Points</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Content area - F-pattern optimized */}
              <div className="lg:col-span-3 p-8 space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Smart Process Analytics & Prediction System</h3>
                  <p className="text-primary font-medium mb-1">May 2025 - June 2025</p>
                  <p className="text-muted-foreground">Developer & Analyst</p>
                </div>
                
                <p className="text-lg leading-relaxed">
                  A revolutionary data science platform that transforms chemical process optimization 
                  through machine learning, achieving unprecedented efficiency improvements and 
                  cost-saving opportunities.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Technical Excellence</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2.5 flex-shrink-0" />
                        <span>Advanced regression, clustering, and time-series forecasting algorithms</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2.5 flex-shrink-0" />
                        <span>Real-time prediction models with 5000+ synthetic industrial data points</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2.5 flex-shrink-0" />
                        <span>Interactive Streamlit dashboard with Plotly visualizations</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Technology Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Python', 'Scikit-learn', 'XGBoost', 'Streamlit', 'Plotly', 'Pandas', 'NumPy'].map((tech) => (
                        <Badge key={tech} variant="outline" className="hover:bg-primary/10 transition-colors">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    <Button variant="outline" size="sm" className="group">
                      <Github className="w-4 h-4 mr-2" />
                      View Code
                      <ArrowUpRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Button>
                    <Button variant="outline" size="sm" className="group">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                      <ArrowUpRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Button>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border/50">
                  <p className="text-sm text-muted-foreground">
                    <strong>Collaborators:</strong> Kalpit Nagar, Viral Kapadia
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Skills Section - Dopamine-Driven Gamification */}
      <section className="py-20 section-padding">
        <div className="max-width-content mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Technical Arsenal</h2>
            <p className="text-xl text-muted-foreground">
              A carefully curated collection of tools and technologies
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                category: "Engineering & Simulation",
                icon: Target,
                color: "bg-blue-50 text-blue-600 border-blue-200",
                skills: [
                  { name: "Aspen Plus", level: 60, experience: "Basic" },
                  { name: "MATLAB", level: 75, experience: "Intermediate" },
                  { name: "Excel (Solver)", level: 90, experience: "Advanced" },
                  { name: "DWSIM", level: 70, experience: "Intermediate" }
                ]
              },
              {
                category: "Data Science & AI",
                icon: Brain,
                color: "bg-purple-50 text-purple-600 border-purple-200",
                skills: [
                  { name: "Python", level: 95, experience: "Expert" },
                  { name: "Scikit-learn", level: 85, experience: "Advanced" },
                  { name: "XGBoost", level: 80, experience: "Advanced" },
                  { name: "R", level: 45, experience: "Basic" }
                ]
              },
              {
                category: "Development & Tools",
                icon: Zap,
                color: "bg-green-50 text-green-600 border-green-200",
                skills: [
                  { name: "Git", level: 85, experience: "Advanced" },
                  { name: "Flask", level: 70, experience: "Intermediate" },
                  { name: "SQL", level: 75, experience: "Intermediate" },
                  { name: "VS Code", level: 90, experience: "Expert" }
                ]
              }
            ].map((category, categoryIndex) => (
              <Card key={categoryIndex} className="p-6 border-0 shadow-soft hover:shadow-medium transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-2 rounded-lg ${category.color}`}>
                    <category.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold">{category.category}</h3>
                </div>
                
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {skill.experience}
                        </Badge>
                      </div>
                      <div className="relative">
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                        <div className="text-xs text-muted-foreground mt-1 text-right">
                          {skill.level}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Conversion Optimized */}
      <section id="contact" className="py-20 section-padding bg-gradient-to-b from-muted/20 to-background">
        <div className="max-width-content mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Let's Create Something Extraordinary</h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Whether you're interested in discussing innovative projects, exploring collaboration opportunities, 
              or simply connecting over our shared passion for technology and engineering - I'd love to hear from you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg" 
                className="group bg-primary hover:bg-primary/90 shadow-large transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                <Mail className="w-5 h-5 mr-3" />
                saumilshah321@gmail.com
                <ChevronRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="group border-2 hover:border-primary/50 transition-all duration-300"
              >
                <span className="mr-2">📞</span>
                +91 9327996533
              </Button>
            </div>
            
            <div className="flex justify-center gap-6">
              <Button variant="ghost" size="sm" className="group">
                <Github className="w-4 h-4 mr-2" />
                GitHub
                <ArrowUpRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Button>
              <Button variant="ghost" size="sm" className="group">
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
                <ArrowUpRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Button>
            </div>
            
            {/* Trust signals */}
            <div className="mt-12 pt-8 border-t border-border/50">
              <p className="text-sm text-muted-foreground">
                Currently pursuing B.Tech Chemical Engineering at SVNIT Surat • CGPA 8.08 • Available for internships and collaborations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Minimalist Closure */}
      <footer className="py-8 section-padding border-t border-border">
        <div className="max-width-content mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 Saumil Shah. Crafted with passion, precision, and purpose.
            </p>
            <p className="text-sm text-muted-foreground">
              Built with React, TypeScript & Advanced Psychology Principles
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
