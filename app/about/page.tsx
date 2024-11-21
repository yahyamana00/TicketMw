'use client';

import Link from 'next/link';
import { TicketIcon, MapPin, Mail, Phone, Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-blue-500/10 animate-gradient"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-[500px] h-[500px] blur-3xl opacity-20">
              <div className="absolute w-96 h-96 bg-primary/50 rounded-full mix-blend-multiply animate-blob"></div>
              <div className="absolute w-96 h-96 bg-purple-500/50 rounded-full mix-blend-multiply animate-blob animation-delay-2000"></div>
              <div className="absolute w-96 h-96 bg-blue-500/50 rounded-full mix-blend-multiply animate-blob animation-delay-4000"></div>
            </div>
          </div>
        </div>

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
              About TicketMe
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Transforming customer support through innovative ticketing solutions
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-8">
              At TicketMe, we're dedicated to revolutionizing how companies handle customer support. Our mission is to create custom ticketing systems that streamline communication, enhance efficiency, and deliver exceptional customer experiences for businesses of all sizes.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card border rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">Vision</h3>
                <p className="text-muted-foreground">
                  To become the leading provider of intelligent ticketing solutions, empowering businesses to deliver outstanding customer support through innovative technology.
                </p>
              </div>
              <div className="bg-card border rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">Values</h3>
                <p className="text-muted-foreground">
                  Innovation, reliability, and customer success drive everything we do. We believe in creating solutions that make a real difference in how businesses operate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Contact */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="bg-card border rounded-xl p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-6">Our Location</h3>
                  <div className="space-y-4">
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="h-5 w-5 mr-3 text-primary" />
                      <span>Chicago, Illinois</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Mail className="h-5 w-5 mr-3 text-primary" />
                      <a href="mailto:contact@ticketme.io" className="hover:text-primary">
                        contact@ticketme.io
                      </a>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Phone className="h-5 w-5 mr-3 text-primary" />
                      <span>(312) 555-0123</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-6">Leadership</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-xl font-bold text-primary">YM</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">Yahya Mana</h4>
                        <p className="text-sm text-muted-foreground">Founder & CEO</p>
                      </div>
                    </div>
                    <div className="flex space-x-4 mt-4">
                      <Button variant="ghost" size="icon" asChild>
                        <a href="https://github.com/yahyamana" target="_blank" rel="noopener noreferrer">
                          <Github className="h-5 w-5" />
                        </a>
                      </Button>
                      <Button variant="ghost" size="icon" asChild>
                        <a href="https://linkedin.com/in/yahyamana" target="_blank" rel="noopener noreferrer">
                          <Linkedin className="h-5 w-5" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Support?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join us in revolutionizing customer support with our innovative ticketing system.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/register">Get Started</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}