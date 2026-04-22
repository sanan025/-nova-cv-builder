import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "@/src/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Plus, 
  Trash2, 
  Download, 
  Sparkles, 
  FileUp, 
  Eye, 
  Layout, 
  Settings,
  Save,
  CreditCard,
  FileSearch2
} from "lucide-react";
import { ResumeData, emptyResume, Experience, Education, Project } from "@/src/types";
import { toast } from "sonner";
import { parseResumeText, optimizeResumeContent } from "@/src/lib/gemini";

// Templates will be imported later
import ClassicTemplate from "@/src/components/templates/ClassicTemplate";
import ModernTemplate from "@/src/components/templates/ModernTemplate";
import ExecutiveTemplate from "@/src/components/templates/ExecutiveTemplate";
import TechTemplate from "@/src/components/templates/TechTemplate";
import CreativeTemplate from "@/src/components/templates/CreativeTemplate";
import PaymentModal from "@/src/components/PaymentModal";

import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/src/components/FirebaseProvider";
import { db } from "@/src/lib/firebase";
import { doc, setDoc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";

export default function Builder() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const templateFromUrl = searchParams.get("template");
  const resumeIdFromUrl = searchParams.get("id");

  // State
  const [resume, setResume] = useState<ResumeData>({
    personalInfo: {
      fullName: "Alex Rivera",
      email: "alex.rivera@example.com",
      phone: "+1 (555) 000-1234",
      location: "San Francisco, CA",
      website: "alexrivera.dev",
      summary: "Strategic Full Stack Developer with 8+ years of experience in building scalable web applications. Expert in React, Node.js, and cloud architecture. Passionate about creating seamless user experiences and optimizing performance.",
      title: "Senior Full Stack Developer",
    },
    experience: [
      {
        id: "1",
        company: "TechNova Solutions",
        position: "Senior Software Engineer",
        startDate: "Jan 2020",
        endDate: "Present",
        current: true,
        location: "San Francisco, CA",
        description: "- Spearheaded the development of a real-time analytics dashboard used by 500+ enterprise clients.\n- Optimized backend performance by 40% through efficient database indexing and caching strategies.\n- Mentored a team of 5 junior developers and implemented standardized code review processes."
      }
    ],
    education: [
      {
        id: "2",
        school: "Stanford University",
        degree: "B.S. in Computer Science",
        startDate: "2012",
        endDate: "2016",
        current: false,
        location: "Stanford, CA"
      }
    ],
    skills: ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS", "Docker", "Git", "GraphQL"],
    projects: [
      {
        id: "3",
        name: "OpenSource CRM",
        link: "github.com/alex/crm",
        description: "A lightweight CRM built with Next.js and Prisma, featuring automated lead tracking and email integrations."
      }
    ],
    languages: ["English (Native)", "Spanish (Fluent)"],
    certifications: ["AWS Certified Solutions Architect", "Google Cloud Professional Engineer"]
  });
  const [activeTemplate, setActiveTemplate] = useState(templateFromUrl || "modern");
  const [isParsing, setIsParsing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [atsScore, setAtsScore] = useState<number | null>(null);
  const [isCheckingATS, setIsCheckingATS] = useState(false);
  const previewRef = React.useRef<HTMLDivElement>(null);

  const calculateATS = async () => {
    setIsCheckingATS(true);
    // Simulate complex check
    await new Promise(r => setTimeout(r, 1500));
    
    let score = 50;
    if (resume.personalInfo.summary.length > 100) score += 10;
    if (resume.experience.length > 0) score += 15;
    if (resume.skills.length > 5) score += 15;
    if (resume.education.length > 0) score += 10;
    
    setAtsScore(Math.min(score, 100));
    setIsCheckingATS(false);
    toast.success("ATS check complete!");
  };

  // Load resume if ID is present
  useEffect(() => {
    const loadResume = async () => {
      if (resumeIdFromUrl) {
        const docRef = doc(db, "resumes", resumeIdFromUrl);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.userId === user?.uid) {
            setResume(data.data);
            setActiveTemplate(data.templateId || "modern");
            setIsPaid(data.isPaid || false);
          } else {
            toast.error("You don't have permission to view this resume.");
          }
        }
      }
    };
    loadResume();
  }, [resumeIdFromUrl, user]);

  const saveResume = async () => {
    if (!user) {
      toast.error("Please log in to save your resume.");
      return;
    }

    setIsSaving(true);
    const id = resumeIdFromUrl || Math.random().toString(36).substr(2, 9);
    
    try {
      await setDoc(doc(db, "resumes", id), {
        userId: user.uid,
        name: resume.personalInfo.fullName || "Untitled Resume",
        data: resume,
        templateId: activeTemplate,
        isPaid: isPaid,
        updatedAt: serverTimestamp(),
        createdAt: resumeIdFromUrl ? undefined : serverTimestamp()
      }, { merge: true });

      if (!resumeIdFromUrl) {
        navigate(`/builder?id=${id}&template=${activeTemplate}`, { replace: true });
      }
      toast.success("Resume saved!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save resume.");
    } finally {
      setIsSaving(false);
    }
  };

   const downloadPDF = async () => {
    if (!previewRef.current) return;
    setIsDownloading(true);
    
    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${resume.personalInfo.fullName || 'resume'}.pdf`);
      toast.success("Resume downloaded successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate PDF.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadClick = async () => {
    if (!user) {
      toast.error("Please log in to download your resume.");
      return;
    }

    if (!resumeIdFromUrl) {
      toast.info("Please save your resume before downloading.");
      await saveResume();
      return;
    }

    if (isPaid) {
      downloadPDF();
    } else {
      setShowPaymentModal(true);
    }
  };

  const handlePaymentSuccess = async () => {
    if (resumeIdFromUrl) {
      try {
        await updateDoc(doc(db, "resumes", resumeIdFromUrl), {
          isPaid: true,
          updatedAt: serverTimestamp()
        });
        setIsPaid(true);
        toast.success("Payment verified! You can now download your resume.");
        // Trigger download automatically after success
        setTimeout(downloadPDF, 500);
      } catch (error) {
        console.error(error);
        toast.error("Failed to update payment status.");
      }
    }
  };

  const updatePersonalInfo = (field: string, value: string) => {
    setResume(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsParsing(true);
    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await fetch("/api/parse-resume", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      
      if (data.text) {
        const parsed = await parseResumeText(data.text);
        setResume(parsed);
        toast.success("Resume parsed successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to parse resume.");
    } finally {
      setIsParsing(false);
    }
  };

  const generateAIOptimization = async (type: 'summary' | 'experience' | 'skills', index?: number) => {
    let textToOptimize = "";
    if (type === 'summary') textToOptimize = resume.personalInfo.summary;
    else if (type === 'experience' && index !== undefined) textToOptimize = resume.experience[index].description;
    
    if (!textToOptimize) {
      toast.error("Add some content first to optimize!");
      return;
    }

    toast.promise(optimizeResumeContent(textToOptimize, type), {
      loading: 'Optimizing with AI...',
      success: (optimized) => {
        if (type === 'summary') updatePersonalInfo('summary', optimized);
        else if (type === 'experience' && index !== undefined) {
           const newExp = [...resume.experience];
           newExp[index].description = optimized;
           setResume(prev => ({ ...prev, experience: newExp }));
        }
        return 'Optimized successfully!';
      },
      error: 'Failed to optimize.'
    });
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Math.random().toString(36).substr(2, 9),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      location: "",
      description: ""
    };
    setResume(prev => ({ ...prev, experience: [...prev.experience, newExp] }));
  };

  const removeExperience = (id: string) => {
    setResume(prev => ({ ...prev, experience: prev.experience.filter(e => e.id !== id) }));
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Math.random().toString(36).substr(2, 9),
      school: "",
      degree: "",
      startDate: "",
      endDate: "",
      current: false,
      location: ""
    };
    setResume(prev => ({ ...prev, education: [...prev.education, newEdu] }));
  };

  const addProject = () => {
    const newProject: Project = {
      id: Math.random().toString(36).substr(2, 9),
      name: "",
      link: "",
      description: ""
    };
    setResume(prev => ({ ...prev, projects: [...prev.projects, newProject] }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-16 flex overflow-hidden">
        {/* Editor Side */}
        <div className="w-full lg:w-[45%] border-r border-gray-200 bg-white flex flex-col">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
            <h2 className="font-bold text-gray-900 flex items-center gap-2">
              <Layout className="w-4 h-4" />
              Resume Editor
            </h2>
            <div className="flex items-center gap-2">
               <label className="cursor-pointer">
                 <input type="file" className="hidden" accept=".pdf" onChange={handleFileUpload} disabled={isParsing} />
                 <Button variant="outline" size="sm" className="gap-2" disabled={isParsing}>
                   <FileUp className="w-4 h-4" />
                   {isParsing ? "Parsing..." : "Upload PDF"}
                 </Button>
               </label>
            </div>
          </div>

          <ScrollArea className="flex-1 p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid grid-cols-4 gap-2 bg-gray-50 p-1 rounded-xl">
                <TabsTrigger value="personal" className="rounded-lg">Info</TabsTrigger>
                <TabsTrigger value="experience" className="rounded-lg">Work</TabsTrigger>
                <TabsTrigger value="education" className="rounded-lg">Education</TabsTrigger>
                <TabsTrigger value="more" className="rounded-lg">Skills & More</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-4 outline-none">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input value={resume.personalInfo.fullName} onChange={e => updatePersonalInfo('fullName', e.target.value)} placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label>Profile Title</Label>
                    <Input value={resume.personalInfo.title} onChange={e => updatePersonalInfo('title', e.target.value)} placeholder="Full Stack Developer" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input value={resume.personalInfo.email} onChange={e => updatePersonalInfo('email', e.target.value)} placeholder="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input value={resume.personalInfo.phone} onChange={e => updatePersonalInfo('phone', e.target.value)} placeholder="+1 234 567 890" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="flex justify-between items-center">
                    Professional Summary
                    <Button variant="ghost" size="sm" onClick={() => generateAIOptimization('summary')} className="h-7 text-xs gap-1 text-primary hover:text-primary hover:bg-primary/5">
                      <Sparkles className="w-3 h-3" /> Enhance with AI
                    </Button>
                  </Label>
                  <Textarea 
                    value={resume.personalInfo.summary} 
                    onChange={e => updatePersonalInfo('summary', e.target.value)} 
                    placeholder="Briefly describe your professional background..."
                    className="min-h-[120px]"
                  />
                </div>
              </TabsContent>

              <TabsContent value="experience" className="space-y-6 outline-none">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-900">Work Experience</h3>
                  <Button onClick={addExperience} size="sm" variant="outline" className="gap-2">
                    <Plus className="w-4 h-4" /> Add Experience
                  </Button>
                </div>
                {resume.experience.map((exp, index) => (
                  <Card key={exp.id} className="p-4 space-y-4 bg-gray-50/50 border-gray-100">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-sm text-gray-700">Experience #{index + 1}</h4>
                      <Button variant="ghost" size="icon" onClick={() => removeExperience(exp.id)} className="text-gray-400 hover:text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Company</Label>
                        <Input 
                          value={exp.company} 
                          onChange={e => {
                            const newExp = [...resume.experience];
                            newExp[index].company = e.target.value;
                            setResume(prev => ({ ...prev, experience: newExp }));
                          }} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Position</Label>
                        <Input 
                          value={exp.position} 
                          onChange={e => {
                            const newExp = [...resume.experience];
                            newExp[index].position = e.target.value;
                            setResume(prev => ({ ...prev, experience: newExp }));
                          }} 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="flex justify-between items-center">
                        Description
                        <Button variant="ghost" size="sm" onClick={() => generateAIOptimization('experience', index)} className="h-7 text-xs gap-1 text-primary hover:text-primary hover:bg-primary/5">
                          <Sparkles className="w-3 h-3" /> Enhance
                        </Button>
                      </Label>
                      <Textarea 
                        value={exp.description} 
                        onChange={e => {
                          const newExp = [...resume.experience];
                          newExp[index].description = e.target.value;
                          setResume(prev => ({ ...prev, experience: newExp }));
                        }}
                        placeholder="Key responsibilities and achievements..."
                      />
                    </div>
                  </Card>
                ))}
              </TabsContent>
              
              {/* Add other TabsContent for Education and More */}
              <TabsContent value="education" className="space-y-6 outline-none">
                 <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-900">Education</h3>
                  <Button onClick={addEducation} size="sm" variant="outline" className="gap-2">
                    <Plus className="w-4 h-4" /> Add Education
                  </Button>
                </div>
                {resume.education.map((edu, index) => (
                  <Card key={edu.id} className="p-4 space-y-4 bg-gray-50/50 border-gray-100">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-sm text-gray-700">Education #{index + 1}</h4>
                      <Button variant="ghost" size="icon" onClick={() => setResume(prev => ({ ...prev, education: prev.education.filter(e => e.id !== edu.id) }))} className="text-gray-400 hover:text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>School / University</Label>
                        <Input value={edu.school} onChange={e => {
                          const newEdu = [...resume.education];
                          newEdu[index].school = e.target.value;
                          setResume(prev => ({ ...prev, education: newEdu }));
                        }} placeholder="Stanford University" />
                      </div>
                      <div className="space-y-2">
                        <Label>Degree</Label>
                        <Input value={edu.degree} onChange={e => {
                          const newEdu = [...resume.education];
                          newEdu[index].degree = e.target.value;
                          setResume(prev => ({ ...prev, education: newEdu }));
                        }} placeholder="B.S. in Computer Science" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Start Date</Label>
                        <Input value={edu.startDate} onChange={e => {
                          const newEdu = [...resume.education];
                          newEdu[index].startDate = e.target.value;
                          setResume(prev => ({ ...prev, education: newEdu }));
                        }} placeholder="2012" />
                      </div>
                      <div className="space-y-2">
                        <Label>End Date</Label>
                        <Input value={edu.endDate} onChange={e => {
                          const newEdu = [...resume.education];
                          newEdu[index].endDate = e.target.value;
                          setResume(prev => ({ ...prev, education: newEdu }));
                        }} placeholder="2016" />
                      </div>
                    </div>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="more" className="space-y-6 outline-none">
                 <div className="space-y-2">
                    <Label>Skills (comma separated)</Label>
                    <Input 
                      value={resume.skills.join(", ")} 
                      onChange={e => setResume(prev => ({ ...prev, skills: e.target.value.split(",").map(s => s.trim()).filter(s => s !== "") }))} 
                      placeholder="React, TypeScript, Node.js..." 
                    />
                 </div>

                 <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-gray-900">Projects</h3>
                    <Button onClick={addProject} size="sm" variant="outline" className="gap-2">
                       <Plus className="w-4 h-4" /> Add Project
                    </Button>
                  </div>
                  {resume.projects.map((project, index) => (
                    <Card key={project.id} className="p-4 space-y-3 bg-gray-50/50 border-gray-100">
                       <div className="flex justify-between items-start">
                          <Input className="font-bold" placeholder="Project Name" value={project.name} onChange={e => {
                            const next = [...resume.projects];
                            next[index].name = e.target.value;
                            setResume(prev => ({ ...prev, projects: next }));
                          }} />
                          <Button variant="ghost" size="icon" onClick={() => setResume(prev => ({ ...prev, projects: prev.projects.filter(p => p.id !== project.id) }))} className="text-gray-400 hover:text-red-500 ml-2">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                       </div>
                       <Input placeholder="Project Link (Optional)" value={project.link} onChange={e => {
                         const next = [...resume.projects];
                         next[index].link = e.target.value;
                         setResume(prev => ({ ...prev, projects: next }));
                       }} />
                       <Textarea placeholder="Description" value={project.description} onChange={e => {
                         const next = [...resume.projects];
                         next[index].description = e.target.value;
                         setResume(prev => ({ ...prev, projects: next }));
                       }} />
                    </Card>
                  ))}
                 </div>

                 <div className="space-y-2">
                    <Label>Languages (comma separated)</Label>
                    <Input 
                      value={resume.languages.join(", ")} 
                      onChange={e => setResume(prev => ({ ...prev, languages: e.target.value.split(",").map(s => s.trim()).filter(s => s !== "") }))} 
                      placeholder="English, Spanish (Fluent)..." 
                    />
                 </div>
              </TabsContent>
            </Tabs>
          </ScrollArea>
        </div>

        {/* Preview Side */}
        <div className="hidden lg:flex flex-1 bg-gray-100 flex-col items-center justify-center p-8 overflow-auto">
          {/* Templates Toolbar */}
          <div className="fixed bottom-8 left-[45%] translate-x-1/2 bg-white/80 backdrop-blur-md rounded-full border border-gray-200 p-2 flex items-center gap-2 shadow-2xl z-20">
            <Button 
              variant={activeTemplate === 'modern' ? 'default' : 'ghost'} 
              size="sm" 
              onClick={() => setActiveTemplate('modern')}
              className="rounded-full px-4"
            >
              Modern
            </Button>
            <Button 
              variant={activeTemplate === 'classic' ? 'default' : 'ghost'} 
              size="sm" 
              onClick={() => setActiveTemplate('classic')}
              className="rounded-full px-4"
            >
              Classic
            </Button>
            <Button 
              variant={activeTemplate === 'executive' ? 'default' : 'ghost'} 
              size="sm" 
              onClick={() => setActiveTemplate('executive')}
              className="rounded-full px-4"
            >
              Executive
            </Button>
            <Button 
              variant={activeTemplate === 'tech' ? 'default' : 'ghost'} 
              size="sm" 
              onClick={() => setActiveTemplate('tech')}
              className="rounded-full px-4"
            >
              Tech
            </Button>
            <Button 
              variant={activeTemplate === 'creative' ? 'default' : 'ghost'} 
              size="sm" 
              onClick={() => setActiveTemplate('creative')}
              className="rounded-full px-4"
            >
              Creative
            </Button>
            <div className="w-[1px] h-6 bg-gray-200 mx-2" />
            
            {atsScore !== null && (
              <div className="flex flex-col items-center justify-center mr-2">
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">ATS Score</div>
                <div className={`text-sm font-black ${atsScore > 80 ? 'text-green-600' : atsScore > 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {atsScore}%
                </div>
              </div>
            )}

            <Button 
              size="icon" 
              variant="ghost" 
              className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors" 
              onClick={calculateATS} 
              disabled={isCheckingATS}
              title="Check ATS Compatibility"
            >
              <FileSearch2 className={isCheckingATS ? "animate-pulse w-4 h-4" : "w-4 h-4"} />
            </Button>

            <Button size="icon" className="rounded-full" onClick={saveResume} disabled={isSaving} title="Save to Dashboard">
              <Save className={isSaving ? "animate-pulse w-4 h-4" : "w-4 h-4"} />
            </Button>
            <Button 
              size="icon" 
              className={`rounded-full ${isPaid ? 'bg-green-600 hover:bg-green-700' : ''}`} 
              onClick={handleDownloadClick} 
              disabled={isDownloading} 
              title={isPaid ? "Download PDF (Purchased)" : "Pay ₹20 to Download"}
            >
              <Download className={isDownloading ? "animate-bounce w-4 h-4" : "w-4 h-4"} />
            </Button>
          </div>

          <div ref={previewRef} className="w-full max-w-[800px] aspect-[1/1.414] bg-white shadow-2xl origin-top transition-transform">
             {activeTemplate === 'modern' && <ModernTemplate data={resume} />}
             {activeTemplate === 'classic' && <ClassicTemplate data={resume} />}
             {activeTemplate === 'executive' && <ExecutiveTemplate data={resume} />}
             {activeTemplate === 'tech' && <TechTemplate data={resume} />}
             {activeTemplate === 'creative' && <CreativeTemplate data={resume} />}
          </div>
        </div>
      </div>
      <PaymentModal 
        isOpen={showPaymentModal} 
        onClose={() => setShowPaymentModal(false)} 
        onSuccess={handlePaymentSuccess} 
      />
    </div>
  );
}
