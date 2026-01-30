
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, RefreshCw, FileText } from "lucide-react";
import { toast } from "sonner";

interface StudentProfile {
    id: string;
    full_name: string;
    email: string;
    created_at: string;
    assessment_progress?: {
        answers: any;
        updated_at: string;
    }[];
}

const Admin = () => {
    const [students, setStudents] = useState<StudentProfile[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchStudents = async () => {
        setLoading(true);
        try {
            // Fetch profiles with their assessment progress
            // Note: This query requires RLS policies that allow the admin to view all profiles
            const { data, error } = await supabase
                .from('profiles')
                .select(`
                    id, 
                    full_name, 
                    email, 
                    created_at,
                    assessment_progress ( answers, updated_at )
                `)
                .order('created_at', { ascending: false });

            if (error) {
                console.error("Error fetching students:", error);
                toast.error("Failed to fetch data. Check your admin permissions.");
                return;
            }

            if (data) {
                setStudents(data);
            }
        } catch (error) {
            console.error("Unexpected error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const getStatus = (student: StudentProfile) => {
        const progress = student.assessment_progress?.[0];
        if (!progress) return "Not Started";

        const answerCount = Object.keys(progress.answers || {}).length;
        if (answerCount >= 90) return "Completed"; // Approx 90 questions
        if (answerCount > 0) return "In Progress";
        return "Not Started";
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Completed": return <Badge className="bg-green-500">Completed</Badge>;
            case "In Progress": return <Badge variant="secondary">In Progress</Badge>;
            default: return <Badge variant="outline">Not Started</Badge>;
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
                        <p className="text-slate-500">Overview of student progress</p>
                    </div>
                    <Button onClick={fetchStudents} variant="outline" disabled={loading}>
                        <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                        Refresh Data
                    </Button>
                </div>

                <Card className="shadow-sm border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Joined</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-24 text-center">
                                        <div className="flex justify-center items-center gap-2 text-slate-500">
                                            <Loader2 className="animate-spin w-4 h-4" /> Loading records...
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : students.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-24 text-center text-slate-500">
                                        No students found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                students.map((student) => (
                                    <TableRow key={student.id}>
                                        <TableCell className="font-medium">{student.full_name || "N/A"}</TableCell>
                                        <TableCell>{student.email || "N/A"}</TableCell>
                                        <TableCell>{new Date(student.created_at).toLocaleDateString()}</TableCell>
                                        <TableCell>{getStatusBadge(getStatus(student))}</TableCell>
                                        <TableCell className="text-right">
                                            {/* Future: View Report Button */}
                                            <Button size="sm" variant="ghost" disabled>
                                                <FileText className="w-4 h-4 mr-1" /> View Report
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </div>
    );
};

export default Admin;
