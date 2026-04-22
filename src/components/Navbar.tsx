import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Github, Twitter, Linkedin, LogOut, User as UserIcon } from "lucide-react";
import { useAuth } from "@/src/components/FirebaseProvider";
import { signInWithGoogle, auth } from "@/src/lib/firebase";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navbar() {
  const { user } = useAuth();

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 h-16 flex items-center justify-between px-6 md:px-12">
      <Link to="/" className="flex items-center gap-2">
        <div className="bg-primary p-1.5 rounded-lg">
          <FileText className="w-5 h-5 text-white" />
        </div>
        <span className="font-sans font-bold text-xl tracking-tight text-gray-900">NovaCV</span>
      </Link>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
        <Link to="/templates" className="hover:text-primary transition-colors">Templates</Link>
        <Link to="/#features" className="hover:text-primary transition-colors">Features</Link>
        <Link to="/#pricing" className="hover:text-primary transition-colors">Pricing</Link>
      </div>

      <div className="flex items-center gap-4">
        {!user ? (
          <>
            <Button variant="ghost" className="hidden sm:flex" onClick={signInWithGoogle}>Log In</Button>
            <Link to="/builder">
              <Button>Get Started</Button>
            </Link>
          </>
        ) : (
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="outline" className="hidden sm:flex">Dashboard</Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer border-2 border-primary/20">
                  <AvatarImage src={user.photoURL || ""} />
                  <AvatarFallback className="bg-primary/10 text-primary uppercase">
                    {user.displayName?.charAt(0) || user.email?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="p-2 border-b border-gray-100 mb-1">
                  <p className="text-sm font-bold text-gray-900">{user.displayName}</p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
                <DropdownMenuItem onClick={() => auth.signOut()} className="text-red-600 focus:text-red-600 focus:bg-red-50">
                  <LogOut className="w-4 h-4 mr-2" />
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </nav>
  );
}
