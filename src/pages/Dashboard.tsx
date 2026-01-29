
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
    CheckCircle2,
    Circle,
    BookOpen,
    User,
    Trophy,
    ArrowRight
} from "lucide-react";

const Dashboard = () => {
    const navigate = useNavigate();
    const [userName] = useState("Student"); // Mock user name

    useEffect(() => {
        // Ideally check if assessment is done
        const savedProgress = localStorage.getItem("navspro_assessment_progress");
        if (!savedProgress) {
            navigate("/assessment");
        }
    }, [navigate]);

    const tasks = [
        { id: 1, title: "Complete Interest Assessment", status: "completed", type: "Assessment" },
        { id: 2, title: "Read Assessment Report", status: "pending", type: "Review" },
        { id: 3, title: "Schedule Mentor Call", status: "locked", type: "Mentorship" },
        { id: 4, title: "Explore 'Engineering' Careers", status: "locked", type: "Exploration" },
    ];

    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Welcome Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-2xl shadow-sm border">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Welcome back, {userName}! 👋</h1>
                        <p className="text-slate-500">You are on the path to discovering your true potential.</p>
                    </div>
                    <Button onClick={() => navigate("/report")} variant="outline" className="mt-4 md:mt-0">
                        View My Report
                    </Button>
                </div>

                <div className="grid md:grid-cols-3 gap-8">

                    {/* Main Content - Tasks */}
                    <div className="md:col-span-2 space-y-6">
                        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            <CheckCircle2 className="text-primary" /> Your Growth Tasks
                        </h2>

                        <div className="space-y-4">
                            {tasks.map((task) => (
                                <Card key={task.id} className="p-4 flex items-center justify-between hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-4">
                                        {task.status === 'completed' ? (
                                            <CheckCircle2 className="w-6 h-6 text-green-500" />
                                        ) : (
                                            <Circle className="w-6 h-6 text-slate-300" />
                                        )}
                                        <div>
                                            <h3 className={`font-semibold ${task.status === 'completed' ? 'text-slate-500 line-through' : 'text-slate-800'}`}>
                                                {task.title}
                                            </h3>
                                            <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded inline-block mt-1">
                                                {task.type}
                                            </span>
                                        </div>
                                    </div>
                                    {task.status === 'pending' && (
                                        <Button size="sm" variant="secondary" onClick={() => task.id === 2 ? navigate("/report") : null}>
                                            Start <ArrowRight className="w-3 h-3 ml-1" />
                                        </Button>
                                    )}
                                </Card>
                            ))}
                        </div>

                        {/* Recent Analysis Teaser */}
                        <Card className="p-6 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
                            <h3 className="font-bold text-primary mb-2 flex items-center gap-2">
                                <Trophy className="w-5 h-5" /> Quick Insight
                            </h3>
                            <p className="text-slate-700 text-sm">
                                Your assessment shows strong <strong>Analytical</strong> aptitude.
                                We have unlocked 3 new engineering-related articles for you in the 'Exploration' tab.
                            </p>
                        </Card>
                    </div>

                    {/* Sidebar - Mentor & Stats */}
                    <div className="space-y-6">
                        {/* Progress */}
                        <Card className="p-6">
                            <h3 className="font-semibold text-slate-800 mb-4">Your Journey</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Profile Completion</span>
                                    <span className="font-bold text-primary">25%</span>
                                </div>
                                <Progress value={25} className="h-2" />
                            </div>
                        </Card>

                        {/* Mentor */}
                        <Card className="p-6 border-l-4 border-l-purple-500">
                            <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                <User className="text-purple-600 w-5 h-5" /> Your Mentor
                            </h3>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center text-xl">👨‍🏫</div>
                                <div>
                                    <p className="font-bold text-slate-900">Dr. Anjali Sharma</p>
                                    <p className="text-xs text-slate-500">Career Psychologist</p>
                                </div>
                            </div>
                            <p className="text-sm text-slate-600 mb-4 bg-slate-50 p-3 rounded italic">
                                "Great job completing the assessment! I'm reviewing your report and will assign new tasks shortly."
                            </p>
                            <Button className="w-full bg-slate-900 text-white hover:bg-slate-800">
                                Message Mentor
                            </Button>
                        </Card>

                        {/* Resources */}
                        <Card className="p-6">
                            <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                <BookOpen className="text-emerald-600 w-5 h-5" /> Recommended Reads
                            </h3>
                            <ul className="space-y-3 text-sm text-slate-600">
                                <li className="hover:text-primary cursor-pointer border-b pb-2">Future of AI Careers</li>
                                <li className="hover:text-primary cursor-pointer border-b pb-2">Top 10 Engineering Colleges</li>
                                <li className="hover:text-primary cursor-pointer">Stress Management 101</li>
                            </ul>
                        </Card>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;
