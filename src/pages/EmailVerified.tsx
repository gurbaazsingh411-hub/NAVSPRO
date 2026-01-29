
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const EmailVerified = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Automatically redirect after 3 seconds
        const timer = setTimeout(() => {
            navigate("/dashboard");
        }, 3000);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
            >
                <Card className="w-full max-w-md p-8 shadow-xl text-center space-y-6 border-green-200 bg-green-50/50">
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold text-slate-800">Email Verified!</h1>
                        <p className="text-slate-600">
                            Your email has been successfully verified. You are now being redirected to your dashboard.
                        </p>
                    </div>

                    <Button
                        onClick={() => navigate("/dashboard")}
                        className="w-full bg-green-600 hover:bg-green-700 gap-2"
                    >
                        Go to Dashboard <ArrowRight className="w-4 h-4" />
                    </Button>
                </Card>
            </motion.div>
        </div>
    );
};

export default EmailVerified;
