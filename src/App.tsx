import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/src/pages/Home";
import Builder from "@/src/pages/Builder";
import Templates from "@/src/pages/Templates";
import Dashboard from "@/src/pages/Dashboard";
import { Toaster } from "@/components/ui/sonner";
import { FirebaseProvider } from "@/src/components/FirebaseProvider";

export default function App() {
  return (
    <FirebaseProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/builder" element={<Builder />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </FirebaseProvider>
  );
}
