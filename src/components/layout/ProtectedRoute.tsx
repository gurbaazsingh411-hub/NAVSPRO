
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { Loader2 } from "lucide-react";

const ProtectedRoute = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div className="h-screen w-full flex items-center justify-center"><Loader2 className="animate-spin" /></div>;
    }

    return user ? <Outlet /> : <Navigate to="/auth" />;
};

export default ProtectedRoute;
