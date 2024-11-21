import Link from 'next/link';
import { 
  TicketIcon, 
  ArrowRight, 
  Bot, 
  Clock, 
  LineChart,
  MessageCircle,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const features = [
    {
      icon: <Bot className="h-8 w-8 text-primary" />,
      title: "AI-Powered Support",
      description: "Get instant answers to common technical questions and troubleshooting assistance, no login required.",
      gradient: "from-violet-500/20 via-purple-500/20 to-indigo-500/20"
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-primary" />,
      title: "Live Chat Support",
      description: "Connect with our AI assistant for immediate technical guidance and general support questions.",
      gradient: "from-blue-500/20 via-cyan-500/20 to-teal-500/20"
    },
    {
      icon: <CheckCircle2 className="h-8 w-8 text-primary" />,
      title: "Quick Solutions",
      description: "Access our knowledge base and get solutions for common technical issues instantly.",
      gradient: "from-emerald-500/20 via-green-500/20 to-lime-500/20"
    }
  ];

  const ticketFeatures = [
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: "Ticket Tracking",
      description: "Create an account to track your support tickets and get personalized assistance.",
      gradient: "from-orange-500/20 via-amber-500/20 to-yellow-500/20"
    },
    {
      icon: <LineChart className="h-8 w-8 text-primary" />,
      title: "Issue History",
      description: "Access your complete support history and track resolution progress.",
      gradient: "from-pink-500/20 via-rose-500/20 to-red-500/20"
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-primary" />,
      title: "Secure Access",
      description: "Your support tickets and personal information are protected with enterprise-grade security.",
      gradient: "from-sky-500/20 via-blue-500/20 to-indigo-500/20"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-blue-500/10 animate-gradient"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-[800px] h-[800px] blur-3xl opacity-20">
              <div className="absolute w-96 h-96 bg-primary/50 rounded-full mix-blend-multiply animate-blob"></div>
              <div className="absolute w-96 h-96 bg-purple-500/50 rounded-full mix-blend-multiply animate-blob animation-delay-2000"></div>
              <div className="absolute w-96 h-96 bg-blue-500/50 rounded-full mix-blend-multiply animate-blob animation-delay-4000"></div>
            </div>
          </div>
        </div>

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
              Get Technical Support When You Need It
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Instant solutions for your technical issues, no login required
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/chat">
                  Get Help Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <Link href="/submit-ticket">
                  Submit Ticket
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Instant Technical Support
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get immediate assistance with our AI-powered support system
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-background p-8 transition-all hover:shadow-2xl hover:-translate-y-1"
              >
                <div 
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${feature.gradient} blur-xl`}
                />
                
                <div className="relative z-10">
                  <div className="mb-6 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/50 via-purple-500/50 to-blue-500/50 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative bg-background/80 backdrop-blur-sm p-4 rounded-xl border border-primary/20 group-hover:border-primary/40 transition-colors">
                      {feature.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Advanced Ticket Management
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Create an account to access additional support features
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {ticketFeatures.map((feature, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-background p-8 transition-all hover:shadow-2xl hover:-translate-y-1"
              >
                <div 
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${feature.gradient} blur-xl`}
                />
                
                <div className="relative z-10">
                  <div className="mb-6 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/50 via-purple-500/50 to-blue-500/50 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative bg-background/80 backdrop-blur-sm p-4 rounded-xl border border-primary/20 group-hover:border-primary/40 transition-colors">
                      {feature.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Choose how you'd like to receive support
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/chat">
                  Chat Now
                  <MessageCircle className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/register">
                  Create Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}