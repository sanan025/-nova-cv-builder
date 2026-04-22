import { motion } from "motion/react";
import { Link } from "react-router-dom";
import Navbar from "@/src/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Star } from "lucide-react";

const templates = [
  {
    id: "modern",
    name: "Modern Minimal",
    category: "Creative",
    description: "Clean, two-column layout perfect for tech and creative roles.",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80",
    popular: true
  },
  {
    id: "classic",
    name: "Classic Professional",
    category: "Traditional",
    description: "Traditional single-column design ideal for banking and legal industries.",
    image: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=800&q=80",
    popular: false
  },
  {
    id: "executive",
    name: "Executive Suite",
    category: "Senior",
    description: "Elegant and sophisticated design for leadership positions.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80",
    popular: true
  },
  {
    id: "tech",
    name: "Tech Forward",
    category: "IT / Tech",
    description: "Systematic layout highlighting technical proficiencies.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    popular: false
  },
  {
    id: "creative",
    name: "Creative Spirit",
    category: "Design",
    description: "Vibrant two-tone layout for designers and marketing pros.",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&q=80",
    popular: true
  }
];

export default function Templates() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <header className="mb-12 text-center max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 font-sans">Pick Your Perfect Template</h1>
            <p className="text-gray-600 text-lg">All templates are tested with major ATS systems including Workday, Greenhouse, and Lever.</p>
          </header>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template, i) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="group overflow-hidden rounded-2xl border-gray-100 hover:shadow-2xl transition-all h-full flex flex-col">
                  <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                    <img 
                      src={template.image} 
                      alt={template.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {template.popular && (
                      <Badge className="absolute top-4 right-4 bg-primary text-white gap-1">
                        <Star className="w-3 h-3 fill-current" /> Popular
                      </Badge>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Link to={`/builder?template=${template.id}`}>
                        <Button className="font-bold underline decoration-2 underline-offset-4" variant="secondary">
                          Use This Template
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                       <span className="text-xs font-bold text-primary uppercase tracking-widest">{template.category}</span>
                       <div className="flex items-center gap-1 text-green-600 text-xs font-bold">
                         <CheckCircle2 className="w-3 h-3" /> ATS Friendly
                       </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 font-sans">{template.name}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed font-sans flex-1">{template.description}</p>
                    <Link to={`/builder?template=${template.id}`} className="mt-4">
                      <Button className="w-full" variant="outline">Select Template</Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
