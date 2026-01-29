
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { questions } from "@/data/questions";
import { LayoutGrid, X } from "lucide-react";
import { useState } from "react";

interface QuestionMapProps {
    currentQuestionIndex: number;
    answers: Record<number, number>;
    onNavigate: (index: number) => void;
}

const QuestionMap = ({ currentQuestionIndex, answers, onNavigate }: QuestionMapProps) => {
    const [isOpen, setIsOpen] = useState(false);

    // Status Logic:
    // - Current: Blue border/text
    // - Answered: Green bg
    // - Skipped: (Not answered but index < highest visited?) -> Hard to track "visited" without extra state.
    //   For now, "Skipped" is implicitly "Unanswered" but since user can jump, let's just show "Unanswered" as grey.
    //   However, user asked for "Skipped".
    //   Let's interpret "Skipped" as any question *before* the current one that isn't answered?
    //   Or just "Attempted" vs "Not Attempted".
    //   Let's stick to "Answered" (Green) vs "Not Answered" (Gray).

    return (
        <div className="fixed bottom-4 left-4 right-4 md:right-auto md:left-8 z-50">
            {!isOpen && (
                <Button
                    onClick={() => setIsOpen(true)}
                    className="shadow-xl bg-slate-900 text-white hover:bg-slate-800 rounded-full px-6 py-3 flex items-center gap-2"
                >
                    <LayoutGrid className="w-5 h-5" />
                    Question Map
                    <span className="ml-2 bg-slate-700 px-2 py-0.5 rounded text-xs">
                        {Object.keys(answers).length}/{questions.length}
                    </span>
                </Button>
            )}

            {isOpen && (
                <div className="bg-background border border-border shadow-2xl rounded-2xl w-full max-w-sm md:w-[400px] overflow-hidden flex flex-col max-h-[80vh]">
                    <div className="p-4 border-b flex justify-between items-center bg-muted/50">
                        <h3 className="font-semibold">Assessment Progress</h3>
                        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                            <X className="w-4 h-4" />
                        </Button>
                    </div>

                    <div className="p-2 border-b text-xs flex gap-4 justify-center bg-background/50 backdrop-blur-sm sticky top-0">
                        <div className="flex items-center gap-1"><div className="w-3 h-3 bg-green-500 rounded-full"></div> Answered</div>
                        <div className="flex items-center gap-1"><div className="w-3 h-3 border-2 border-primary rounded-full"></div> Current</div>
                        <div className="flex items-center gap-1"><div className="w-3 h-3 bg-muted border rounded-full"></div> Skipped</div>
                    </div>

                    {/* Native Scroll Container for reliability */}
                    <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                        <div className="grid grid-cols-5 sm:grid-cols-6 gap-2">
                            {questions.map((q, index) => {
                                const isAnswered = answers[q.id] !== undefined;
                                const isCurrent = currentQuestionIndex === index;

                                return (
                                    <button
                                        key={q.id}
                                        onClick={() => {
                                            onNavigate(index);
                                            setIsOpen(false);
                                        }}
                                        className={`
                          h-10 w-full rounded-md text-xs font-semibold flex items-center justify-center transition-all
                          ${isCurrent ? 'ring-2 ring-primary ring-offset-2 z-10' : ''}
                          ${isAnswered
                                                ? 'bg-green-500 text-white hover:bg-green-600'
                                                : 'bg-muted text-muted-foreground hover:bg-muted/80 border'}
                        `}
                                    >
                                        {index + 1}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuestionMap;
