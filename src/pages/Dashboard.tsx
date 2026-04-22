import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/src/components/FirebaseProvider";
import { db } from "@/src/lib/firebase";
import { collection, query, where, getDocs, deleteDoc, doc, orderBy } from "firebase/firestore";
import Navbar from "@/src/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Plus, 
  FileText, 
  MoreVertical, 
  Trash2, 
  Edit, 
  ExternalLink,
  Clock,
  Layout
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { motion } from "motion/react";

export default function Dashboard() {
  const { user } = useAuth();
  const [resumes, setResumes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchResumes = async () => {
    if (!user) return;
    try {
      const q = query(
        collection(db, "resumes"), 
        where("userId", "==", user.uid),
        orderBy("updatedAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setResumes(docs);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch resumes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, [user]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this resume?")) return;
    try {
      await deleteDoc(doc(db, "resumes", id));
      setResumes(prev => prev.filter(r => r.id !== id));
      toast.success("Resume deleted.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete resume.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 font-sans">My Resumes</h1>
              <p className="text-gray-500 mt-1">Manage and edit your professional resumes.</p>
            </div>
            <Link to="/builder">
              <Button className="gap-2 h-12 px-6 shadow-lg shadow-primary/20">
                <Plus className="w-5 h-5" /> Create New Resume
              </Button>
            </Link>
          </header>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-64 bg-gray-100 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : resumes.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-200"
            >
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-10 h-10 text-gray-300" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">No resumes yet</h2>
              <p className="text-gray-500 mb-8 max-w-sm mx-auto">Start building your first professional resume today and land your dream job.</p>
              <Link to="/builder">
                <Button variant="outline" size="lg">Build Your First Resume</Button>
              </Link>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resumes.map((resume, i) => (
                <motion.div
                  key={resume.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className="group overflow-hidden rounded-2xl border-gray-100 hover:shadow-xl transition-all h-full flex flex-col">
                    <div className="p-6 flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <div className="bg-primary/5 p-2 rounded-lg">
                          <FileText className="w-6 h-6 text-primary" />
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <Link to={`/builder?id=${resume.id}&template=${resume.templateId}`}>
                              <DropdownMenuItem>
                                <Edit className="w-4 h-4 mr-2" /> Edit Resume
                              </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem 
                              onClick={() => handleDelete(resume.id)}
                              className="text-red-600 focus:text-red-600 focus:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4 mr-2" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 mb-2 font-sans truncate">{resume.name}</h3>
                      
                      <div className="space-y-2 mb-6">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Layout className="w-3 h-3" />
                          <span className="capitalize">{resume.templateId} Template</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          <span>Last edited {new Date(resume.updatedAt?.seconds * 1000).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <Link to={`/builder?id=${resume.id}&template=${resume.templateId}`}>
                        <Button className="w-full gap-2 border-primary/20 hover:bg-primary/5 hover:text-primary" variant="outline">
                          Open Editor <ExternalLink className="w-3 h-3" />
                        </Button>
                      </Link>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
