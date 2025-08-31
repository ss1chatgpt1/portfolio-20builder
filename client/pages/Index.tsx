import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ExternalLink, Mail, MapPin, Calendar, ChevronRight, Github, Linkedin, ArrowUpRight, Sparkles, Brain, Target, Zap, Download } from 'lucide-react';
import { useSpring, animated, useTrail } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Premium Components
import { HeroScene } from '@/components/3d/HeroScene';
import { MagneticCursor } from '@/components/effects/MagneticCursor';
import { AnimatedText } from '@/components/effects/AnimatedText';
import { LoadingSequence } from '@/components/effects/LoadingSequence';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function Index() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const heroRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);

  // Initialize smooth scrolling
  const { scrollTo } = useSmoothScroll({
    duration: 1.5,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });

  // Hero animation
  const heroSpring = useSpring({
    from: { opacity: 0, y: 100 },
    to: { opacity: mounted && !loading ? 1 : 0, y: mounted && !loading ? 0 : 100 },
    config: { tension: 120, friction: 25 },
    delay: loading ? 0 : 200,
  });

  // Navigation items trail
  const navItems = [
    { href: '#hero', label: 'Home', icon: Target },
    { href: '#story', label: 'Story', icon: Brain },
    { href: '#experience', label: 'Experience', icon: Zap },
    { href: '#projects', label: 'Projects', icon: Sparkles },
    { href: '#contact', label: 'Contact', icon: Mail },
  ];

  const navTrail = useTrail(navItems.length, {
    from: { opacity: 0, x: -20 },
    to: { opacity: mounted && !loading ? 1 : 0, x: mounted && !loading ? 0 : -20 },
    config: { tension: 200, friction: 25 },
    delay: loading ? 0 : 800,
  });

  useEffect(() => {
    setMounted(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
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

    // GSAP scroll animations
    const sections = gsap.utils.toArray('.animate-on-scroll');
    sections.forEach((section: any) => {
      gsap.fromTo(section, 
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  const handleNavClick = (href: string) => {
    scrollTo(href, { duration: 1.5 });
  };

  if (!mounted) return null;

  return (
    <>
      {loading && <LoadingSequence onComplete={handleLoadingComplete} />}
      
      <div className="min-h-screen bg-background relative overflow-x-hidden">
        {/* Custom Cursor */}
        <MagneticCursor />
        
        {/* Premium Navigation */}
        <nav 
          ref={navRef}
          className="fixed top-0 w-full bg-background/70 backdrop-blur-xl border-b border-border/20 z-50 transition-all duration-500"
        >
          <div className="max-width-wide mx-auto section-padding">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <animated.div 
                style={heroSpring}
                className="group cursor-pointer" 
                data-magnetic
              >
                <div className="text-xl font-bold tracking-tight relative">
                  <span className="bg-gradient-to-r from-primary via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                    Saumil Shah
                  </span>
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-purple-500 transition-all duration-500 group-hover:w-full" />
                </div>
              </animated.div>
              
              {/* Navigation Items */}
              <div className="hidden md:flex items-center space-x-1">
                {navTrail.map((style, index) => {
                  const item = navItems[index];
                  return (
                    <animated.a
                      key={item.href}
                      style={style}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.href);
                      }}
                      className={`px-4 py-2 text-sm rounded-xl transition-all duration-300 group relative ${
                        activeSection === item.href.slice(1)
                          ? 'text-foreground bg-accent/50 shadow-soft'
                          : 'text-muted-foreground hover:text-foreground hover:bg-accent/30'
                      }`}
                      data-magnetic
                    >
                      <div className="flex items-center gap-2">
                        <item.icon className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                        {item.label}
                      </div>
                    </animated.a>
                  );
                })}
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section with 3D Background */}
        <section 
          ref={heroRef}
          id="hero" 
          className="min-h-screen flex items-center justify-center section-padding relative overflow-hidden"
        >
          {/* 3D Background */}
          <HeroScene />
          
          {/* Hero Content */}
          <div className="max-width-content mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left side - Main content */}
              <animated.div style={heroSpring} className="space-y-8">
                {/* Status Badge */}
                <div className="flex items-center gap-3">
                  <div className="relative" data-magnetic>
                    <Badge 
                      variant="secondary" 
                      className="px-4 py-2 bg-green-50/90 text-green-700 border-green-200/50 backdrop-blur-sm animate-pulse shadow-soft"
                    >
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                      Available for opportunities
                    </Badge>
                  </div>
                </div>
                
                {/* Main Headline */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <AnimatedText 
                      animation="reveal"
                      className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-none text-foreground"
                      delay={0.2}
                    >
                      Saumil Shah
                    </AnimatedText>
                  </div>
                  
                  <AnimatedText 
                    animation="typewriter"
                    className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl"
                    delay={1.5}
                  >
                    Chemical engineering meets artificial intelligence. Building the future where traditional engineering and cutting-edge technology converge.
                  </AnimatedText>
                </div>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4" data-magnetic>
                  <Button
                    size="lg"
                    className="group bg-gradient-to-r from-primary via-purple-500 to-cyan-500 hover:from-primary/90 hover:via-purple-500/90 hover:to-cyan-500/90 shadow-large transition-all duration-500 hover:shadow-xl hover:scale-105 backdrop-blur-sm magnetic-button"
                    onClick={() => handleNavClick('#contact')}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Start a conversation
                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="group border-2 border-border/50 hover:border-primary/50 transition-all duration-300 backdrop-blur-sm hover:bg-accent/20 magnetic-button"
                    data-magnetic
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Resume
                    <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Button>
                </div>
                
                {/* Quick Info */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-muted-foreground pt-4 border-t border-border/20">
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
              </animated.div>
              
              {/* Right side - Photo and Info */}
              <animated.div
                style={heroSpring}
                className="relative space-y-6"
              >
                {/* Professional Photo Section */}
                <Card className="relative border-0 shadow-2xl bg-card/80 backdrop-blur-xl border border-border/20 hover:shadow-3xl transition-all duration-500 overflow-hidden">
                  <div className="relative">
                    {/* Photo placeholder - you can replace with actual photo */}
                    <div className="aspect-square bg-gradient-to-br from-primary/20 via-purple-500/20 to-cyan-500/20 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
                      <div className="relative z-10 text-center">
                        <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary via-purple-500 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl mb-4">
                          <span className="text-4xl font-bold text-white">S</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Professional Photo</p>
                        <p className="text-xs text-muted-foreground/60">Upload your photo here</p>
                      </div>

                      {/* Floating particles for visual appeal */}
                      <div className="absolute inset-0">
                        {[...Array(20)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-1 h-1 bg-primary/20 rounded-full animate-pulse"
                            style={{
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`,
                              animationDelay: `${Math.random() * 2}s`,
                              animationDuration: `${2 + Math.random() * 2}s`,
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Quick quote overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-background/80 backdrop-blur-sm rounded-lg p-3 border border-border/20">
                        <AnimatedText
                          animation="typewriter"
                          className="text-xs text-muted-foreground italic text-center"
                          delay={3}
                        >
                          "Bridging chemical engineering and AI"
                        </AnimatedText>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Metrics Section - Separate Card */}
                <Card className="relative p-6 border-0 shadow-xl bg-card/80 backdrop-blur-xl border border-border/20 hover:shadow-2xl transition-all duration-500">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-3 h-3 bg-gradient-to-r from-primary to-purple-500 rounded-full animate-pulse" />
                      <span className="text-sm font-medium text-muted-foreground">Current Impact</span>
                    </div>

                    {/* Achievement metrics */}
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { value: '90%+', label: 'Efficiency Improvement' },
                        { value: '15-20%', label: 'Cost Savings' },
                        { value: '5000+', label: 'Data Points' },
                        { value: '8.08', label: 'CGPA' },
                      ].map((metric, index) => (
                        <div key={index} className="text-center group">
                          <div className="text-xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent mb-1 group-hover:scale-110 transition-transform">
                            {metric.value}
                          </div>
                          <div className="text-xs text-muted-foreground">{metric.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </animated.div>
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
            <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center backdrop-blur-sm">
              <div className="w-1 h-3 bg-muted-foreground/30 rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section id="story" className="py-20 section-padding bg-gradient-to-b from-muted/10 to-background animate-on-scroll">
          <div className="max-width-content mx-auto">
            <div className="text-center mb-16">
              <AnimatedText 
                animation="reveal"
                className="text-4xl md:text-5xl font-bold mb-6"
              >
                The Story Behind the Science
              </AnimatedText>
              <AnimatedText 
                animation="typewriter"
                className="text-xl text-muted-foreground max-w-3xl mx-auto"
                delay={0.5}
              >
                Every line of code tells a story. Every algorithm solves a real problem. This is my journey from chemical reactions to digital solutions.
              </AnimatedText>
            </div>
            
            {/* Enhanced Timeline */}
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-purple-500 to-cyan-500" />
              
              <div className="space-y-16">
                {[
                  {
                    year: "2024",
                    title: "The Beginning",
                    subtitle: "Started Chemical Engineering at SVNIT",
                    description: "Fascinated by the mathematical precision of chemical processes, I began to see patterns everywhere - in reactions, in data, in solutions.",
                    emotion: "curiosity",
                    icon: Brain,
                    color: "from-blue-500 to-cyan-500"
                  },
                  {
                    year: "2025",
                    title: "The Awakening", 
                    subtitle: "Discovered Data Science & AI",
                    description: "Machine learning wasn't just code to me - it was a new language for understanding complex systems, just like chemical engineering.",
                    emotion: "excitement",
                    icon: Sparkles,
                    color: "from-purple-500 to-pink-500"
                  },
                  {
                    year: "2025",
                    title: "The Impact",
                    subtitle: "Built Smart Process Analytics",
                    description: "90% efficiency improvement wasn't just a number - it was proof that engineering intuition and AI could create something extraordinary.",
                    emotion: "achievement",
                    icon: Target,
                    color: "from-green-500 to-emerald-500"
                  },
                  {
                    year: "Present",
                    title: "The Vision",
                    subtitle: "Leading at MINDBEND",
                    description: "Managing events taught me that leadership is like chemical catalysis - small inputs creating massive, positive reactions.",
                    emotion: "purpose",
                    icon: Zap,
                    color: "from-orange-500 to-red-500"
                  }
                ].map((item, index) => (
                  <div key={index} className="relative pl-20 group">
                    <div className="absolute left-6 w-4 h-4 rounded-full border-4 border-background shadow-large z-10">
                      <div className={`w-full h-full bg-gradient-to-r ${item.color} rounded-full animate-pulse`} />
                    </div>
                    <Card className="p-8 border-0 shadow-soft hover:shadow-large transition-all duration-500 hover:translate-x-4 backdrop-blur-sm border border-border/20">
                      <div className="flex items-start gap-6">
                        <div className={`p-3 bg-gradient-to-r ${item.color} rounded-xl shadow-soft`}>
                          <item.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <Badge variant="outline" className="text-xs font-medium">{item.year}</Badge>
                            <Badge variant="secondary" className="text-xs capitalize bg-accent/50">{item.emotion}</Badge>
                          </div>
                          <AnimatedText 
                            animation="reveal"
                            className="text-xl font-bold mb-2"
                          >
                            {item.title}
                          </AnimatedText>
                          <p className="text-primary font-semibold mb-3">{item.subtitle}</p>
                          <AnimatedText 
                            animation="typewriter"
                            className="text-muted-foreground leading-relaxed"
                            delay={0.3}
                          >
                            {item.description}
                          </AnimatedText>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20 section-padding animate-on-scroll">
          <div className="max-width-content mx-auto">
            <div className="text-center mb-16">
              <AnimatedText 
                animation="reveal"
                className="text-4xl md:text-5xl font-bold mb-6"
              >
                Professional Journey
              </AnimatedText>
              <AnimatedText 
                animation="typewriter"
                className="text-xl text-muted-foreground"
                delay={0.5}
              >
                Where leadership meets innovation
              </AnimatedText>
            </div>
            
            <Card className="p-8 border-0 shadow-2xl bg-gradient-to-br from-card via-card to-accent/5 backdrop-blur-sm border border-border/20 hover:shadow-3xl transition-all duration-500">
              <div className="grid md:grid-cols-3 gap-8">
                {/* Company info */}
                <div className="space-y-6">
                  <div>
                    <AnimatedText 
                      animation="reveal"
                      className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent mb-2"
                    >
                      MINDBEND
                    </AnimatedText>
                    <p className="text-lg text-muted-foreground">SVNIT, Surat</p>
                    <Badge className="mt-2 bg-gradient-to-r from-primary to-purple-500 text-white">
                      2025 - Present
                    </Badge>
                  </div>
                  
                  <div className="pt-4 border-t border-border/20">
                    <h4 className="font-semibold mb-2">Executive Role</h4>
                    <p className="text-sm text-muted-foreground">
                      Strategic leadership in event management and organizational development
                    </p>
                  </div>
                </div>
                
                {/* Achievements */}
                <div className="md:col-span-2 space-y-6">
                  <AnimatedText 
                    animation="reveal"
                    className="font-semibold text-lg mb-4"
                  >
                    Key Achievements
                  </AnimatedText>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      {
                        metric: "20+",
                        label: "Participants Coordinated",
                        description: "Managed complex logistics for high-impact managerial events",
                        color: "from-blue-500 to-cyan-500"
                      },
                      {
                        metric: "5+",
                        label: "Team Members",
                        description: "Led cross-functional organizing teams to success",
                        color: "from-purple-500 to-pink-500"
                      },
                      {
                        metric: "100%",
                        label: "Event Success Rate",
                        description: "Flawless execution as stage anchor and coordinator",
                        color: "from-green-500 to-emerald-500"
                      },
                      {
                        metric: "∞",
                        label: "Learning Mindset",
                        description: "Continuous growth in leadership and management",
                        color: "from-orange-500 to-red-500"
                      }
                    ].map((item, index) => (
                      <Card key={index} className="p-4 border-0 bg-accent/10 hover:bg-accent/20 transition-all duration-300 backdrop-blur-sm group">
                        <div className={`text-2xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent mb-1 group-hover:scale-110 transition-transform`}>
                          {item.metric}
                        </div>
                        <div className="font-medium text-sm mb-2">{item.label}</div>
                        <div className="text-xs text-muted-foreground">{item.description}</div>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-muted/20 rounded-xl backdrop-blur-sm">
                    <AnimatedText
                      animation="typewriter"
                      className="text-sm text-muted-foreground italic"
                      delay={0.5}
                    >
                      "Leadership is like chemical catalysis - creating conditions where great things happen naturally through small, strategic interventions."
                    </AnimatedText>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 section-padding bg-gradient-to-b from-background to-muted/10 animate-on-scroll">
          <div className="max-width-content mx-auto">
            <div className="text-center mb-16">
              <AnimatedText 
                animation="reveal"
                className="text-4xl md:text-5xl font-bold mb-6"
              >
                Featured Innovation
              </AnimatedText>
              <AnimatedText 
                animation="typewriter"
                className="text-xl text-muted-foreground"
                delay={0.5}
              >
                Where chemical engineering meets artificial intelligence
              </AnimatedText>
            </div>
            
            <Card className="overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-card to-primary/5 backdrop-blur-sm border border-border/20 hover:shadow-3xl transition-all duration-500">
              <div className="grid lg:grid-cols-5 gap-0">
                {/* Visual impact area */}
                <div className="lg:col-span-2 bg-gradient-to-br from-primary/10 via-purple-500/10 to-cyan-500/10 p-8 flex items-center justify-center relative overflow-hidden">
                  <div className="text-center space-y-6 relative z-10">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary via-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl animate-pulse">
                      <Brain className="w-12 h-12 text-white" />
                    </div>
                    <div>
                      <div className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent mb-2">90%+</div>
                      <div className="text-sm text-muted-foreground">Efficiency Boost</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">15-20%</div>
                        <div className="text-xs text-muted-foreground">Cost Savings</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">5000+</div>
                        <div className="text-xs text-muted-foreground">Data Points</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-20">
                    {[...Array(50)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-primary rounded-full animate-pulse"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animationDelay: `${Math.random() * 2}s`,
                          animationDuration: `${2 + Math.random() * 2}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Content area */}
                <div className="lg:col-span-3 p-8 space-y-6">
                  <div>
                    <AnimatedText 
                      animation="reveal"
                      className="text-2xl md:text-3xl font-bold mb-2"
                    >
                      Smart Process Analytics & Prediction System
                    </AnimatedText>
                    <p className="text-primary font-semibold mb-1">May 2025 - June 2025</p>
                    <p className="text-muted-foreground">Developer & Analyst</p>
                  </div>
                  
                  <AnimatedText 
                    animation="typewriter"
                    className="text-lg leading-relaxed"
                    delay={0.5}
                  >
                    A revolutionary data science platform that transforms chemical process optimization through machine learning, achieving unprecedented efficiency improvements and cost-saving opportunities.
                  </AnimatedText>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Technical Excellence</h4>
                      <ul className="space-y-2 text-muted-foreground">
                        {[
                          'Advanced regression, clustering, and time-series forecasting algorithms',
                          'Real-time prediction models with 5000+ synthetic industrial data points',
                          'Interactive Streamlit dashboard with Plotly visualizations'
                        ].map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-gradient-to-r from-primary to-purple-500 rounded-full mt-2.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3">Technology Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {['Python', 'Scikit-learn', 'XGBoost', 'Streamlit', 'Plotly', 'Pandas', 'NumPy'].map((tech) => (
                          <Badge key={tech} variant="outline" className="hover:bg-primary/10 transition-colors backdrop-blur-sm" data-magnetic>
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                      <Button variant="outline" size="sm" className="group backdrop-blur-sm" data-magnetic>
                        <Github className="w-4 h-4 mr-2" />
                        View Code
                        <ArrowUpRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </Button>
                      <Button variant="outline" size="sm" className="group backdrop-blur-sm" data-magnetic>
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                        <ArrowUpRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-border/20">
                    <p className="text-sm text-muted-foreground">
                      <strong>Collaborators:</strong> Kalpit Nagar, Viral Kapadia
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 section-padding bg-gradient-to-b from-muted/10 to-background animate-on-scroll">
          <div className="max-width-content mx-auto text-center">
            <div className="max-w-4xl mx-auto">
              <AnimatedText 
                animation="reveal"
                className="text-4xl md:text-5xl font-bold mb-6"
              >
                Let's Create Something Extraordinary
              </AnimatedText>
              <AnimatedText 
                animation="typewriter"
                className="text-xl text-muted-foreground mb-12 leading-relaxed"
                delay={0.5}
              >
                Whether you're interested in discussing innovative projects, exploring collaboration opportunities, or simply connecting over our shared passion for technology and engineering - I'd love to hear from you.
              </AnimatedText>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-primary via-purple-500 to-cyan-500 hover:from-primary/90 hover:via-purple-500/90 hover:to-cyan-500/90 shadow-2xl transition-all duration-500 hover:shadow-3xl hover:scale-105 backdrop-blur-sm magnetic-button"
                  data-magnetic
                >
                  <Mail className="w-5 h-5 mr-3" />
                  saumilshah321@gmail.com
                  <ChevronRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="group border-2 border-border/50 hover:border-primary/50 transition-all duration-300 backdrop-blur-sm hover:bg-accent/20 magnetic-button"
                  data-magnetic
                >
                  <span className="mr-2">📞</span>
                  +91 9327996533
                </Button>
              </div>
              
              <div className="flex justify-center gap-6">
                <Button variant="ghost" size="sm" className="group backdrop-blur-sm magnetic-button" data-magnetic>
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                  <ArrowUpRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Button>
                <Button variant="ghost" size="sm" className="group backdrop-blur-sm magnetic-button" data-magnetic>
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                  <ArrowUpRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Button>
              </div>
              
              {/* Trust signals */}
              <div className="mt-12 pt-8 border-t border-border/20">
                <AnimatedText
                  animation="typewriter"
                  className="text-sm text-muted-foreground"
                  delay={1}
                >
                  Currently pursuing B.Tech Chemical Engineering at SVNIT Surat • CGPA 8.08 • Available for internships and collaborations
                </AnimatedText>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 section-padding border-t border-border/20 backdrop-blur-sm">
          <div className="max-width-content mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-muted-foreground">
                © 2025 Saumil Shah. Crafted with passion, precision, and cutting-edge technology.
              </p>
              <p className="text-sm text-muted-foreground">
                Built with React, Three.js, GSAP, Lenis & Advanced Animation Libraries
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
