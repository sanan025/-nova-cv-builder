import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, CreditCard, ShieldCheck, Zap } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function PaymentModal({ isOpen, onClose, onSuccess }: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment gateway delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setShowSuccess(true);
    
    // Smooth transition
    setTimeout(() => {
      onSuccess();
      onClose();
      // Reset for next time (though it should be unmounted)
      setShowSuccess(false);
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !isProcessing && !showSuccess && onClose()}>
      <DialogContent className="sm:max-w-[400px] overflow-hidden">
        <AnimatePresence mode="wait">
          {!showSuccess ? (
            <motion.div
              key="payment"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-6"
            >
              <DialogHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                  <CreditCard className="w-6 h-6" />
                </div>
                <DialogTitle className="text-2xl font-bold font-sans">Ready to download?</DialogTitle>
                <DialogDescription className="font-medium text-gray-500">
                  Pay once and get unlimited downloads for this resume.
                </DialogDescription>
              </DialogHeader>

              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium text-gray-500">Plan</span>
                  <span className="text-sm font-bold text-gray-900">One-time Download</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <span className="text-sm font-medium text-gray-500">Price</span>
                  <span className="text-2xl font-black text-gray-900">₹20</span>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <CheckCircle2 className="w-3 h-3 text-green-500" /> High-quality PDF
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <CheckCircle2 className="w-3 h-3 text-green-500" /> ATS Compatibility Check
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100 italic">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                <p className="text-xs text-blue-800 font-medium leading-tight">
                  Secure checkout processed via our encrypted payment partner.
                </p>
              </div>

              <DialogFooter>
                <Button 
                  className="w-full h-12 text-lg font-bold shadow-lg shadow-primary/20" 
                  onClick={handlePayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 animate-spin" /> Processing...
                    </div>
                  ) : (
                    "Pay ₹20 now"
                  )}
                </Button>
              </DialogFooter>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 flex flex-col items-center text-center space-y-4"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-2">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Payment Successful!</h3>
              <p className="text-gray-500">Unlocking your download...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
