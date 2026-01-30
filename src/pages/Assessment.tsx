
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { questions } from "@/data/questions";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import {
    ArrowRight,
    ArrowLeft,
    CheckCircle2,
    AlertCircle
} from "lucide-react";
import QuestionMap from "@/components/assessment/QuestionMap";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

// Likert Scale Options
const OPTIONS = [
    { value: 1, label: "Strongly Disagree", color: "bg-red-500/10 text-red-600 border-red-200" },
    { value: 2, label: "Disagree", color: "bg-orange-500/10 text-orange-600 border-orange-200" },
    { value: 3, label: "Neutral", color: "bg-gray-500/10 text-gray-600 border-gray-200" },
    { value: 4, label: "Agree", color: "bg-blue-500/10 text-blue-600 border-blue-200" },
    { value: 5, label: "Strongly Agree", color: "bg-green-500/10 text-green-600 border-green-200" },
];

const Assessment = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [isLoaded, setIsLoaded] = useState(false);

    // Load progress from Supabase or Local Storage
    useEffect(() => {
        const loadProgress = async () => {
            if (user) {
                try {
                    const { data, error } = await supabase
                        .from('assessment_progress')
                        .select('current_question_index, answers')
                        .eq('user_id', user.id)
                        .maybeSingle(); // Use maybeSingle to avoid 406 on no rows

                    if (data) {
                        const restoredIndex = data.current_question_index || 0;
                        if (restoredIndex >= 0 && restoredIndex < questions.length) {
                            setCurrentQuestionIndex(restoredIndex);
                        }
                        setAnswers(data.answers || {});
                        toast.success("Progress loaded from your account");
                    }
                } catch (error) {
                    console.error("Error loading progress:", error);
                }
            } else {
                // Fallback to local storage
                const savedProgress = localStorage.getItem("navspro_assessment_progress");
                if (savedProgress) {
                    try {
                        const { currentQuestionIndex, answers } = JSON.parse(savedProgress);
                        const restoredIndex = currentQuestionIndex || 0;
                        if (restoredIndex >= 0 && restoredIndex < questions.length) {
                            setCurrentQuestionIndex(restoredIndex);
                        }
                        setAnswers(answers || {});
                        toast.success("Progress restored from local storage");
                    } catch (e) {
                        console.error("Failed to load local progress", e);
                    }
                }
            }
            setIsLoaded(true);
        };

        loadProgress();
    }, [user]);

    // Save progress automatically
    useEffect(() => {
        if (!isLoaded) return;

        const saveProgress = async () => {
            if (user) {
                try {
                    await supabase
                        .from('assessment_progress')
                        .upsert({
                            user_id: user.id,
                            current_question_index: currentQuestionIndex,
                            answers: answers,
                            updated_at: new Date().toISOString()
                        }, { onConflict: 'user_id' });
                } catch (error) {
                    console.error("Error saving progress:", error);
                }
            } else {
                localStorage.setItem("navspro_assessment_progress", JSON.stringify({
                    currentQuestionIndex,
                    answers
                }));
            }
        };

        // Debounce saving slightly or save on every change
        const timeout = setTimeout(saveProgress, 500);
        return () => clearTimeout(timeout);

    }, [currentQuestionIndex, answers, isLoaded, user]);

    const handleAnswer = (value: number) => {
        const question = questions[currentQuestionIndex];
        setAnswers(prev => ({ ...prev, [question.id]: value }));

        // Auto-advance after small delay for better UX
        setTimeout(() => {
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
            }
        }, 200);
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const handleFinish = () => {
        if (Object.keys(answers).length < questions.length) {
            const confirm = window.confirm("You haven't answered all questions. Submit anyway?");
            if (!confirm) return;
        }
        // Navigate to report
        navigate("/report");
    };

    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) {
        // Fallback for edge cases
        return <div className="min-h-screen flex items-center justify-center p-4">
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
                <p className="mb-4">We couldn't load the question. Please try resetting.</p>
                <Button onClick={() => {
                    localStorage.removeItem("navspro_assessment_progress");
                    window.location.reload();
                }}>Reset Assessment</Button>
            </div>
        </div>;
    }

    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    if (!isLoaded) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center">

            {/* Header / Progress */}
            <div className="w-full max-w-3xl space-y-4 mb-8">
                <div className="flex justify-between items-center text-sm font-medium text-muted-foreground">
                    <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                    <span>{Math.round(progress)}% Completed</span>
                </div>
                <Progress value={progress} className="h-2" />
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>{currentQuestion.category}</span>
                    {currentQuestion.subCategory && <span>{currentQuestion.subCategory}</span>}
                </div>
            </div>

            {/* Question Card */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentQuestion.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full max-w-3xl"
                >
                    <Card className="p-6 md:p-10 shadow-lg border-primary/10 bg-card/50 backdrop-blur-sm">
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 leading-relaxed">
                            {currentQuestion.text}
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 md:gap-4">
                            {OPTIONS.map((option) => {
                                const isSelected = answers[currentQuestion.id] === option.value;
                                return (
                                    <button
                                        key={option.value}
                                        onClick={() => handleAnswer(option.value)}
                                        className={`
                      relative p-4 rounded-xl border-2 transition-all duration-200
                      flex flex-col items-center justify-center gap-2
                      ${isSelected
                                                ? 'border-primary bg-primary/5 shadow-md scale-105'
                                                : 'border-border hover:border-primary/50 hover:bg-accent/50'}
                    `}
                                    >
                                        <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                      ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}
                    `}>
                                            {option.value}
                                        </div>
                                        <span className={`text-xs md:text-sm font-medium text-center ${isSelected ? 'text-primary' : 'text-muted-foreground'}`}>
                                            {option.label}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </Card>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="w-full max-w-3xl mt-8 flex justify-between items-center">
                <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentQuestionIndex === 0}
                    className="gap-2"
                >
                    <ArrowLeft className="w-4 h-4" /> Previous
                </Button>

                {isLastQuestion ? (
                    <Button
                        size="lg"
                        onClick={handleFinish}
                        className="gap-2 bg-green-600 hover:bg-green-700"
                    >
                        Finish Assessment <CheckCircle2 className="w-4 h-4" />
                    </Button>
                ) : (
                    <Button
                        variant="ghost"
                        onClick={handleNext}
                        className="text-muted-foreground hover:text-foreground"
                    >
                        Skip for now <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                )}
            </div>


            {/* Hint/Footer */}
            <div className="mt-8 text-center text-sm text-muted-foreground flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span>Your progress is saved automatically to your account.</span>
            </div>

            <QuestionMap
                currentQuestionIndex={currentQuestionIndex}
                answers={answers}
                onNavigate={setCurrentQuestionIndex}
            />

        </div>
    );
};

export default Assessment;
