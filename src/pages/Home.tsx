import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/src/components/Navbar";
import { 
  CheckCircle2, 
  Download, 
  FileSearch2, 
  Layout, 
  Wand2, 
  ShieldCheck,
  Zap,
  Star,
  FileText
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 md:px-12 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-6">
              <Zap className="w-3 h-3" />
              AI-Powered Resume Builder
            </div>
            <h1 className="text-5xl md:text-7xl font-sans font-bold text-gray-900 leading-[1.1] mb-6 tracking-tight">
              Build Resumes That <span className="text-primary italic">Land</span> Interviews
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-lg leading-relaxed">
              Create professional, ATS-optimized resumes in minutes. Choose from 25+ templates, upload your existing resume, or build from scratch.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/builder" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg font-semibold shadow-lg shadow-primary/20">
                  Build Your Resume
                </Button>
              </Link>
              <Link to="/templates" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-lg font-semibold">
                  Browse Templates
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-4 text-sm text-gray-500">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200" />
                ))}
              </div>
              <p><span className="font-bold text-gray-900">4.9/5</span> from over 10k+ users</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden aspect-[4/5] max-w-md mx-auto">
              <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />
              <div className="p-8">
                <div className="w-24 h-24 bg-gray-100 rounded-lg mb-6" />
                <div className="h-8 w-48 bg-gray-100 rounded mb-4" />
                <div className="h-4 w-32 bg-gray-100 rounded mb-8" />
                <div className="space-y-4">
                  <div className="h-4 w-full bg-gray-50 rounded" />
                  <div className="h-4 w-full bg-gray-50 rounded" />
                  <div className="h-4 w-3/4 bg-gray-50 rounded" />
                </div>
                <div className="mt-12 space-y-4">
                  <div className="h-6 w-32 bg-gray-100 rounded" />
                  <div className="h-16 w-full border-2 border-dashed border-gray-100 rounded-lg" />
                  <div className="h-16 w-full border-2 border-dashed border-gray-100 rounded-lg" />
                </div>
              </div>
            </div>
            {/* Floaties */}
            <div className="absolute -top-4 -right-4 bg-primary text-white p-4 rounded-xl shadow-xl flex items-center gap-3">
              <ShieldCheck className="w-6 h-6" />
              <div>
                <p className="text-xs font-bold uppercase opacity-80">ATS Optimized</p>
                <p className="font-bold">100% Score</p>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-gray-100 flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <Download className="w-5 h-5 text-green-600" />
              </div>
              <p className="font-bold text-gray-900">PDF & DOCX</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-gray-50 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-4">Features</h2>
            <h3 className="text-4xl font-bold text-gray-900 mb-6 font-sans">Everything you need to land interviews</h3>
            <p className="text-lg text-gray-600 font-sans">Our tools are designed to help you create the perfect resume that gets past ATS filters and impresses recruiters.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Zap className="w-6 h-6" />}
              title="ATS Optimized"
              description="Every template is tested against major ATS systems. Your resume gets through to human recruiters."
            />
            <FeatureCard 
              icon={<Wand2 className="w-6 h-6" />}
              title="AI Content Magic"
              description="Use AI to generate professional summaries and bullet points that highlight your best work."
            />
            <FeatureCard 
              icon={<FileSearch2 className="w-6 h-6" />}
              title="Upload & Parse"
              description="Upload your existing resume in PDF format. We auto-extract your information instantly."
            />
            <FeatureCard 
              icon={<Layout className="w-6 h-6" />}
              title="25+ Templates"
              description="Choose from our curated collection of professional, ATS-friendly resume templates."
            />
            <FeatureCard 
              icon={<Download className="w-6 h-6" />}
              title="PDF Export"
              description="Download your resume in high-quality PDF format. Compatible with every job portal."
            />
            <FeatureCard 
              icon={<CheckCircle2 className="w-6 h-6" />}
              title="Instant Preview"
              description="See your resume update in real-time as you type. What you see is what you get."
            />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-4 text-center w-full">Pricing</h2>
            <h3 className="text-4xl font-bold text-gray-900 mb-6 font-sans">Simple, affordable pricing</h3>
            <p className="text-lg text-gray-600 font-sans italic">Build and preview your resume for free. Pay only when you&apos;re ready to download.</p>
          </div>

          <div className="max-w-md mx-auto">
            <Card className="p-8 border-2 border-primary shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rotate-45 translate-x-4 translate-y-2">Best Value</div>
              <div className="mb-8">
                <h4 className="text-2xl font-bold text-gray-900 mb-2">Per Resume Download</h4>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-gray-900">₹20</span>
                  <span className="text-gray-500 font-medium">/ one-time</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                <PricingItem text="Access to all 25+ ATS templates" />
                <PricingItem text="Upload & auto-parse existing resume" />
                <PricingItem text="Real-time resume preview" />
                <PricingItem text="ATS compatibility check" />
                <PricingItem text="Download in high-quality PDF" />
                <PricingItem text="Unlimited edits before download" />
              </ul>

              <Link to="/builder">
                <Button className="w-full h-12 text-lg font-bold shadow-lg shadow-primary/20">
                  Start Building Free
                </Button>
              </Link>
              <p className="text-center text-xs text-gray-500 mt-4 font-medium uppercase tracking-tighter">no subscription required</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100 px-6 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-1 rounded-lg">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg text-gray-900 tracking-tight">NovaCV</span>
          </div>
          
          <div className="flex gap-8 text-sm font-medium text-gray-500">
            <Link to="/templates" className="hover:text-primary transition-colors">Templates</Link>
            <Link to="/builder" className="hover:text-primary transition-colors">Builder</Link>
            <Link to="/#features" className="hover:text-primary transition-colors">Features</Link>
            <Link to="/#pricing" className="hover:text-primary transition-colors">Pricing</Link>
          </div>

          <p className="text-sm text-gray-400">© 2026 NovaCV. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function PricingItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <div className="mt-1 bg-green-50 p-0.5 rounded-full">
        <CheckCircle2 className="w-4 h-4 text-green-600" />
      </div>
      <span className="text-gray-600 font-medium text-sm">{text}</span>
    </li>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-shadow group">
      <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
        {icon}
      </div>
      <h4 className="text-xl font-bold text-gray-900 mb-4 font-sans">{title}</h4>
      <p className="text-gray-600 leading-relaxed font-sans">{description}</p>
    </div>
  );
}
