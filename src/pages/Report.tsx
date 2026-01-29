
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Cell
} from "recharts";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { calculateScores, getCareerRecommendations, ScoreResult } from "@/utils/scoringUtils";
import { Download, ArrowRight, Home } from "lucide-react";

const Report = () => {
    const navigate = useNavigate();
    const [result, setResult] = useState<ScoreResult | null>(null);

    useEffect(() => {
        const savedProgress = localStorage.getItem("navspro_assessment_progress");
        if (savedProgress) {
            const { answers } = JSON.parse(savedProgress);
            if (answers && Object.keys(answers).length > 0) {
                const scores = calculateScores(answers);
                setResult(scores);
            } else {
                navigate("/assessment");
            }
        } else {
            navigate("/assessment");
        }
    }, [navigate]);

    if (!result) return <div className="min-h-screen flex items-center justify-center">Generating Report...</div>;

    // Prepare Data for Charts
    const interestData = [
        { subject: 'Realistic', A: result.subCategoryScores["REALISTIC"], fullMark: 20 },
        { subject: 'Investigative', A: result.subCategoryScores["INVESTIGATIVE"], fullMark: 20 },
        { subject: 'Artistic', A: result.subCategoryScores["ARTISTIC"], fullMark: 20 },
        { subject: 'Social', A: result.subCategoryScores["SOCIAL"], fullMark: 20 },
        { subject: 'Enterprising', A: result.subCategoryScores["ENTERPRISING"], fullMark: 20 },
        { subject: 'Conventional', A: result.subCategoryScores["CONVENTIONAL"], fullMark: 20 },
    ];

    const aptitudeData = [
        { name: 'Logical', score: result.subCategoryScores["LOGICAL"] },
        { name: 'Numerical', score: result.subCategoryScores["NUMERICAL"] },
        { name: 'Verbal', score: result.subCategoryScores["VERBAL"] },
        { name: 'Spatial', score: result.subCategoryScores["SPATIAL"] },
        { name: 'Memory', score: result.subCategoryScores["MEMORY"] },
        { name: 'Critical', score: result.subCategoryScores["CRITICAL_THINKING"] },
    ];

    const recommendations = getCareerRecommendations(result.topInterests, result.topAptitudes);

    return (
        <div className="min-h-screen bg-slate-50 py-8 px-4 print:bg-white print:p-0">
            <div className="max-w-5xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 print:hidden">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Assessment Report</h1>
                        <p className="text-slate-500">Comprehensive analysis of your strengths and interests</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={() => navigate("/")}>
                            <Home className="w-4 h-4 mr-2" /> Home
                        </Button>
                        <Button onClick={() => window.print()}>
                            <Download className="w-4 h-4 mr-2" /> Download PDF
                        </Button>
                        <Button onClick={() => navigate("/dashboard")} className="bg-primary text-white">
                            Go to Dashboard <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </div>

                {/* Print Header */}
                <div className="hidden print:block mb-8 text-center border-b pb-4">
                    <h1 className="text-4xl font-bold text-slate-900">NAVSPRO Analysis Report</h1>
                    <p className="text-slate-500">Student Growth & Mentorship Platform</p>
                </div>

                {/* INTEREST SECTION */}
                <div className="grid md:grid-cols-2 gap-8">
                    <Card className="p-6 shadow-sm border-slate-200 print:shadow-none print:border">
                        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                            <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
                            Interest Profile (RIASEC)
                        </h2>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={interestData}>
                                    <PolarGrid stroke="#e2e8f0" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                                    <PolarRadiusAxis angle={30} domain={[0, 20]} tick={false} axisLine={false} />
                                    <Radar
                                        name="Student"
                                        dataKey="A"
                                        stroke="#2563eb"
                                        strokeWidth={3}
                                        fill="#3b82f6"
                                        fillOpacity={0.2}
                                    />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-4">
                            <h3 className="font-medium text-slate-700 mb-2">Top Interest Areas:</h3>
                            <div className="flex flex-wrap gap-2">
                                {result.topInterests.map(i => (
                                    <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                        {i}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </Card>

                    {/* APTITUDE SECTION */}
                    <Card className="p-6 shadow-sm border-slate-200 print:shadow-none print:border">
                        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                            <span className="w-1 h-6 bg-emerald-600 rounded-full"></span>
                            Aptitude Strengths
                        </h2>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={aptitudeData} layout="vertical" margin={{ left: 40 }}>
                                    <XAxis type="number" hide domain={[0, 15]} />
                                    <YAxis dataKey="name" type="category" width={80} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                                    <Tooltip cursor={{ fill: 'transparent' }} />
                                    <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={20}>
                                        {aptitudeData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.score > 10 ? '#10b981' : '#cbd5e1'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-4">
                            <h3 className="font-medium text-slate-700 mb-2">Key Strengths:</h3>
                            <div className="flex flex-wrap gap-2">
                                {result.topAptitudes.map(a => (
                                    <span key={a} className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                                        {a}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </Card>
                </div>

                {/* PERSONALITY & INSIGHTS */}
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Personality */}
                    <Card className="md:col-span-2 p-6 shadow-sm border-slate-200 print:shadow-none print:border">
                        <h2 className="text-xl font-semibold mb-4 text-slate-800">Your Personality Snapshot</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {Object.entries(result.personalityTraits).map(([trait, level]) => (
                                <div key={trait} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border">
                                    <span className="text-sm font-medium text-slate-600 capitalize">
                                        {trait.replace(/_/g, " ").toLowerCase()}
                                    </span>
                                    <span className={`text-xs px-2 py-1 rounded font-semibold ${level === 'High' ? 'bg-purple-100 text-purple-700' :
                                            level === 'Moderate' ? 'bg-amber-100 text-amber-700' :
                                                'bg-slate-200 text-slate-600'
                                        }`}>
                                        {level}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Metrics */}
                    <Card className="p-6 bg-slate-900 text-white shadow-lg print:bg-white print:text-black print:border">
                        <h2 className="text-xl font-semibold mb-6">Overall Metrics</h2>
                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between text-sm mb-2 opacity-90">
                                    <span>Study Discipline</span>
                                    <span className="font-bold">{Math.round((result.categoryScores["STUDY_STYLE"] / 60) * 100)}%</span>
                                </div>
                                <div className="h-2 bg-slate-700 rounded-full overflow-hidden print:bg-slate-200">
                                    <div
                                        className="h-full bg-blue-400"
                                        style={{ width: `${(result.categoryScores["STUDY_STYLE"] / 60) * 100}%` }}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-2 opacity-90">
                                    <span>Motivation</span>
                                    <span className="font-bold">{Math.round((result.categoryScores["MOTIVATION"] / 50) * 100)}%</span>
                                </div>
                                <div className="h-2 bg-slate-700 rounded-full overflow-hidden print:bg-slate-200">
                                    <div
                                        className="h-full bg-pink-400"
                                        style={{ width: `${(result.categoryScores["MOTIVATION"] / 50) * 100}%` }}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-2 opacity-90">
                                    <span>Env. Support</span>
                                    <span className="font-bold">{Math.round((result.categoryScores["ENVIRONMENT"] / 40) * 100)}%</span>
                                </div>
                                <div className="h-2 bg-slate-700 rounded-full overflow-hidden print:bg-slate-200">
                                    <div
                                        className="h-full bg-cyan-400"
                                        style={{ width: `${(result.categoryScores["ENVIRONMENT"] / 40) * 100}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* CAREER RECOMMENDATIONS */}
                <Card className="p-8 bg-gradient-to-br from-indigo-50 to-white border-indigo-100 shadow-md print:bg-white print:border-slate-200">
                    <h2 className="text-2xl font-bold text-indigo-900 mb-6 flex items-center gap-2">
                        <span className="p-2 bg-indigo-100 rounded-lg">🚀</span>
                        Recommended Career Pathways
                    </h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        {recommendations.length > 0 ? recommendations.map(career => (
                            <div key={career} className="bg-white p-4 rounded-xl border border-indigo-50 shadow-sm flex items-center gap-3 hover:shadow-md transition-shadow">
                                <div className="w-2 h-2 rounded-full bg-indigo-500" />
                                <span className="font-semibold text-slate-700">{career}</span>
                            </div>
                        )) : (
                            <p className="col-span-3 text-slate-500 italic">
                                Your profile is quite balanced! Consider exploring general fields in Science or Humanities based on your academic preferences.
                            </p>
                        )}
                    </div>
                    <p className="mt-8 text-sm text-slate-500 border-t pt-4">
                        * Note: These recommendations are indicative based on your interest and aptitude profile.
                        We recommend discussing this report with a NAVSPRO mentor for detailed guidance.
                    </p>
                </Card>

            </div>
        </div>
    );
};

export default Report;
