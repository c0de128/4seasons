import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logoPath from "@/assets/images/logo_sm.png";
import logoLarge from "@/assets/images/logo.png";
import heroVideo from "@/assets/videos/hero.mp4";
import { 
  Menu, 
  X, 
  Zap, 
  Shield, 
  Smartphone, 
  Layers, 
  TrendingUp, 
  Settings,
  Code,
  Book,
  CheckCircle,
  Github,
  Twitter,
  MessageSquare,
  ChevronDown
} from "lucide-react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const features = [
    {
      icon: Zap,
      title: "Fast Development",
      description: "Hot reload, fast refresh, and optimized build process for rapid development cycles.",
      color: "text-primary"
    },
    {
      icon: Shield,
      title: "Type Safety", 
      description: "Full TypeScript integration with strict type checking and IntelliSense support.",
      color: "text-secondary"
    },
    {
      icon: Smartphone,
      title: "Responsive Design",
      description: "Mobile-first approach with Tailwind CSS utility classes for all screen sizes.",
      color: "text-accent"
    },
    {
      icon: Layers,
      title: "Component Architecture",
      description: "Modular, reusable components following React best practices and patterns.",
      color: "text-primary"
    },
    {
      icon: TrendingUp,
      title: "Performance Optimized",
      description: "Built-in optimizations including code splitting, image optimization, and caching.",
      color: "text-secondary"
    },
    {
      icon: Settings,
      title: "Developer Experience",
      description: "ESLint, Prettier, and development tools configured for productive coding.",
      color: "text-accent"
    }
  ];

  const techStack = [
    {
      name: "Next.js 14",
      description: "Full-stack React framework with App Router",
      icon: "⚛️",
      bgColor: "bg-slate-900"
    },
    {
      name: "TypeScript",
      description: "Static type checking for better code quality",
      icon: "TS",
      bgColor: "bg-blue-600"
    },
    {
      name: "Tailwind CSS",
      description: "Utility-first CSS framework for rapid UI development",
      icon: "TW",
      bgColor: "bg-cyan-500"
    },
    {
      name: "Modern Tooling",
      description: "ESLint, Prettier, and development tools",
      icon: "🛠️",
      bgColor: "bg-slate-800"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <img src={logoPath} alt="Logo" className="w-[90px] h-[56px]" />
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#buy" className="text-slate-600 hover:text-primary transition-colors duration-200">Buy</a>
              <a href="#sell" className="text-slate-600 hover:text-primary transition-colors duration-200">Sell</a>
              <a href="#property-management" className="text-slate-600 hover:text-primary transition-colors duration-200">Property Management</a>
              
              {/* Resources Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-slate-600 hover:text-primary transition-colors duration-200">
                  Resources
                  <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>
                    <a href="#home-valuation" className="w-full">Home Valuation</a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a href="#city-guides" className="w-full">City Guides</a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a href="#school-districts" className="w-full">School Districts</a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a href="#property-investment" className="w-full">Property Investment</a>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <a href="#blog" className="w-full">Blog</a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a href="#faq" className="w-full">FAQ</a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a href="#terms" className="w-full">Terms & Conditions</a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a href="#contact" className="w-full">Contact Us</a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white">
            <div className="px-4 py-4 space-y-3">
              <a href="#buy" className="block text-slate-600 hover:text-primary">Buy</a>
              <a href="#sell" className="block text-slate-600 hover:text-primary">Sell</a>
              <a href="#property-management" className="block text-slate-600 hover:text-primary">Property Management</a>
              
              {/* Resources - Mobile Expanded */}
              <div className="border-t border-slate-100 pt-3 mt-3">
                <p className="text-sm font-medium text-slate-500 mb-2">Resources</p>
                <div className="pl-4 space-y-2">
                  <a href="#home-valuation" className="block text-slate-600 hover:text-primary text-sm">Home Valuation</a>
                  <a href="#city-guides" className="block text-slate-600 hover:text-primary text-sm">City Guides</a>
                  <a href="#school-districts" className="block text-slate-600 hover:text-primary text-sm">School Districts</a>
                  <a href="#property-investment" className="block text-slate-600 hover:text-primary text-sm">Property Investment</a>
                  <a href="#blog" className="block text-slate-600 hover:text-primary text-sm">Blog</a>
                  <a href="#faq" className="block text-slate-600 hover:text-primary text-sm">FAQ</a>
                  <a href="#terms" className="block text-slate-600 hover:text-primary text-sm">Terms & Conditions</a>
                  <a href="#contact" className="block text-slate-600 hover:text-primary text-sm">Contact Us</a>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src={heroVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight text-shadow-lg" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
              It's Good to be <span className="text-primary">Home!</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/95 mb-8 max-w-4xl leading-relaxed text-shadow" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
              At 4Seasons Real Estate, we offer expert guidance for all your property needs—whether you're buying, selling, or renting—complemented by our reliable property management services. Your goals, our priority, every season of the year.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Button className="px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-white hover:opacity-90" style={{ backgroundColor: '#1f2937' }}>
                Explore Properties
              </Button>
              <Button variant="outline" className="border-2 border-white text-white px-8 py-4 text-lg font-semibold hover:bg-white hover:text-slate-900 bg-transparent">
                Contact Us
              </Button>
            </div>
          </div>
          
          
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          
          {/* Company Introduction and Logo */}
          <div className="grid lg:grid-cols-4 gap-12 mb-16">
            {/* Company Introduction - 75% width */}
            <div className="lg:col-span-3">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">About 4Seasons Real Estate</h3>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Welcome to 4Seasons Real Estate, your trusted partner for all your real estate needs in North Texas! We are a dedicated team of local experts passionate about helping you navigate the dynamic North Texas property market with ease and confidence.
                </p>
                <p>
                  At 4Seasons Real Estate we meticulously manage every aspect of your Real Estate transaction, ensuring no detail is overlooked. We pride ourselves on diving into the complexities, handling all the logistics and nuances so you don't have to. You'll breathe easy and savor the journey, knowing our expert team is diligently working hard for you.
                </p>
              </div>
            </div>
            
            {/* Company Logo - 25% width */}
            <div className="lg:col-span-1 flex justify-center items-center">
              <img src={logoLarge} alt="4Seasons Real Estate" className="w-full max-w-sm object-contain" />
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-slate-50 hover:shadow-lg transition-all duration-300 border border-slate-200 hover:border-primary/20">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Component Showcase */}
      <section id="components" className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Component Library
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Pre-built, customizable components ready for your application
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Buttons Component */}
            <Card className="shadow-sm border border-slate-200">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-6">Buttons</h3>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-3">
                    <Button className="bg-primary text-white hover:bg-blue-600">Primary</Button>
                    <Button className="bg-secondary text-white hover:bg-violet-600">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost" className="text-primary hover:text-blue-600">Ghost</Button>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button size="lg" className="bg-primary text-white hover:bg-blue-600">Large</Button>
                    <Button size="sm" className="bg-primary text-white hover:bg-blue-600">Small</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Forms Component */}
            <Card className="shadow-sm border border-slate-200">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-6">Form Elements</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-slate-700 mb-2">Email Address</Label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-sm font-medium text-slate-700 mb-2">Message</Label>
                    <Textarea id="message" placeholder="Your message here..." rows={3} />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms" className="text-sm text-slate-700">I agree to the terms and conditions</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Cards Component */}
            <Card className="shadow-sm border border-slate-200">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-6">Cards</h3>
                <div className="space-y-4">
                  <Card className="border border-slate-200">
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-slate-900 mb-2">Basic Card</h4>
                      <p className="text-slate-600 text-sm">This is a basic card component with header and content.</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-r from-primary to-secondary text-white">
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">Gradient Card</h4>
                      <p className="text-blue-100 text-sm">A card with gradient background and white text.</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
            
            {/* Navigation Component */}
            <Card className="shadow-sm border border-slate-200">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-6">Navigation</h3>
                <div className="space-y-4">
                  <nav className="flex space-x-6">
                    <a href="#" className="text-primary border-b-2 border-primary pb-1">Active</a>
                    <a href="#" className="text-slate-600 hover:text-primary transition-colors">Inactive</a>
                    <a href="#" className="text-slate-600 hover:text-primary transition-colors">Another</a>
                  </nav>
                  <div className="flex items-center space-x-2 bg-slate-100 rounded-lg p-1">
                    <Button size="sm" variant="default" className="bg-white text-slate-900 shadow-sm">Tab 1</Button>
                    <Button size="sm" variant="ghost" className="text-slate-600 hover:bg-white">Tab 2</Button>
                    <Button size="sm" variant="ghost" className="text-slate-600 hover:bg-white">Tab 3</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Modern Tech Stack
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Built with industry-leading technologies for performance and developer experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {techStack.map((tech, index) => (
              <div key={index} className="text-center group">
                <div className={`w-20 h-20 ${tech.bgColor} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-white text-2xl font-bold">{tech.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{tech.name}</h3>
                <p className="text-slate-600 text-sm">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start Guide */}
      <section id="examples" className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Quick Start Guide
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Get your development environment up and running in minutes
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Create New Project</h3>
                  <p className="text-slate-300 mb-3">Initialize a new Next.js project with TypeScript and Tailwind CSS configured.</p>
                  <div className="bg-slate-800 rounded-lg p-3">
                    <code className="text-green-400 text-sm">npx create-next-app@latest my-app --typescript --tailwind</code>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Install Dependencies</h3>
                  <p className="text-slate-300 mb-3">Navigate to your project directory and install all required packages.</p>
                  <div className="bg-slate-800 rounded-lg p-3">
                    <code className="text-green-400 text-sm">cd my-app && npm install</code>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Start Development</h3>
                  <p className="text-slate-300 mb-3">Launch the development server and start building your application.</p>
                  <div className="bg-slate-800 rounded-lg p-3">
                    <code className="text-green-400 text-sm">npm run dev</code>
                  </div>
                </div>
              </div>
            </div>
            
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-slate-400 text-sm ml-4">project structure</span>
                </div>
                <div className="text-slate-300 text-sm font-mono space-y-1">
                  <div>📁 my-app/</div>
                  <div className="ml-4">📁 app/</div>
                  <div className="ml-8">📄 layout.tsx</div>
                  <div className="ml-8">📄 page.tsx</div>
                  <div className="ml-8">📄 globals.css</div>
                  <div className="ml-4">📁 components/</div>
                  <div className="ml-8">📁 ui/</div>
                  <div className="ml-4">📁 lib/</div>
                  <div className="ml-4">📁 public/</div>
                  <div className="ml-4">📄 package.json</div>
                  <div className="ml-4">📄 tailwind.config.js</div>
                  <div className="ml-4">📄 tsconfig.json</div>
                  <div className="text-accent mt-2">✨ Ready to customize!</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Start your next project with our modern, production-ready template. 
            Save hours of setup time and focus on what matters most - building your application.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button className="bg-white text-primary px-8 py-4 text-lg font-semibold hover:bg-slate-50 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
              <Code className="mr-2 h-5 w-5" />
              Start Building Now
            </Button>
            <Button variant="outline" className="border-2 border-white text-white px-8 py-4 text-lg font-semibold hover:bg-white hover:text-primary">
              <Book className="mr-2 h-5 w-5" />
              View Documentation
            </Button>
          </div>
          
          <div className="mt-12 flex justify-center items-center space-x-8 text-blue-100">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span>Free & Open Source</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span>MIT License</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span>Active Community</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg">⚛️</span>
                </div>
                <span className="font-bold text-xl text-white">NextJS Template</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                A modern starter template for building scalable web applications with Next.js, TypeScript, and Tailwind CSS.
              </p>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#components" className="hover:text-primary transition-colors">Components</a></li>
                <li><a href="#examples" className="hover:text-primary transition-colors">Examples</a></li>
                <li><a href="#docs" className="hover:text-primary transition-colors">Documentation</a></li>
              </ul>
            </div>
            
            {/* Resources */}
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-primary transition-colors">Getting Started</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Tutorials</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Best Practices</a></li>
              </ul>
            </div>
            
            {/* Community */}
            <div>
              <h3 className="text-white font-semibold mb-4">Community</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-primary transition-colors">GitHub</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Discussions</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-slate-400">
              © 2024 NextJS Template. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                <MessageSquare className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
