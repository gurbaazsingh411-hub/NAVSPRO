export type Category =
    | "INTEREST"
    | "APTITUDE"
    | "PERSONALITY"
    | "STUDY_STYLE"
    | "MOTIVATION"
    | "ENVIRONMENT";

export type SubCategory =
    // Interest (RIASEC)
    | "REALISTIC" | "INVESTIGATIVE" | "ARTISTIC" | "SOCIAL" | "ENTERPRISING" | "CONVENTIONAL"
    // Aptitude
    | "LOGICAL" | "NUMERICAL" | "VERBAL" | "SPATIAL" | "MEMORY" | "CRITICAL_THINKING"
    // Personality
    | "EXTROVERSION" | "ADAPTABILITY" | "EMOTIONAL_STABILITY" | "RISK_TAKING" | "AUTONOMY" | "CONSCIENTIOUSNESS"
    // Others
    | "GENERAL";

export interface Question {
    id: number;
    text: string;
    category: Category;
    subCategory?: SubCategory;
}

export const questions: Question[] = [
    // INTEREST ASSESSMENT (RIASEC)
    // Realistic
    { id: 1, text: "I enjoy working with tools, machines, or physical objects.", category: "INTEREST", subCategory: "REALISTIC" },
    { id: 2, text: "I prefer learning by doing rather than only reading or listening.", category: "INTEREST", subCategory: "REALISTIC" },
    { id: 3, text: "Outdoor or field-based work feels more interesting than desk work.", category: "INTEREST", subCategory: "REALISTIC" },
    { id: 4, text: "I feel satisfied when I can see the physical result of my work.", category: "INTEREST", subCategory: "REALISTIC" },

    // Investigative
    { id: 5, text: "I enjoy understanding how things work at a deeper level.", category: "INTEREST", subCategory: "INVESTIGATIVE" },
    { id: 6, text: "I like solving complex problems even if they take time.", category: "INTEREST", subCategory: "INVESTIGATIVE" },
    { id: 7, text: "Subjects like science, maths, or research-based topics interest me.", category: "INTEREST", subCategory: "INVESTIGATIVE" },
    { id: 8, text: "I ask why and how questions more than others around me.", category: "INTEREST", subCategory: "INVESTIGATIVE" },

    // Artistic
    { id: 9, text: "I enjoy expressing myself through art, writing, music, or design.", category: "INTEREST", subCategory: "ARTISTIC" },
    { id: 10, text: "I dislike rigid rules when working on creative tasks.", category: "INTEREST", subCategory: "ARTISTIC" },
    { id: 11, text: "I often think of unique or different ways to do things.", category: "INTEREST", subCategory: "ARTISTIC" },
    { id: 12, text: "I feel motivated when I can use imagination in my work.", category: "INTEREST", subCategory: "ARTISTIC" },

    // Social
    { id: 13, text: "I enjoy helping others solve their problems.", category: "INTEREST", subCategory: "SOCIAL" },
    { id: 14, text: "I feel comfortable explaining things to classmates or friends.", category: "INTEREST", subCategory: "SOCIAL" },
    { id: 15, text: "I feel satisfied when my work positively impacts people.", category: "INTEREST", subCategory: "SOCIAL" },
    { id: 16, text: "I prefer working with people rather than working alone all the time.", category: "INTEREST", subCategory: "SOCIAL" },

    // Enterprising
    { id: 17, text: "I like taking initiative and leading group activities.", category: "INTEREST", subCategory: "ENTERPRISING" },
    { id: 18, text: "I feel confident convincing others about my ideas.", category: "INTEREST", subCategory: "ENTERPRISING" },
    { id: 19, text: "I am interested in business, management, or leadership roles.", category: "INTEREST", subCategory: "ENTERPRISING" },
    { id: 20, text: "I enjoy taking responsibility for decisions.", category: "INTEREST", subCategory: "ENTERPRISING" },

    // Conventional
    { id: 21, text: "I like working in a structured and well-organized environment.", category: "INTEREST", subCategory: "CONVENTIONAL" },
    { id: 22, text: "I feel comfortable following clear instructions and procedures.", category: "INTEREST", subCategory: "CONVENTIONAL" },
    { id: 23, text: "I enjoy tasks that involve planning, organizing, or record-keeping.", category: "INTEREST", subCategory: "CONVENTIONAL" },
    { id: 24, text: "Accuracy and correctness are more important to me than creativity.", category: "INTEREST", subCategory: "CONVENTIONAL" },

    // APTITUDE TENDENCIES
    // Logical
    { id: 25, text: "I can identify patterns or connections between ideas quickly.", category: "APTITUDE", subCategory: "LOGICAL" },
    { id: 26, text: "I enjoy puzzles or problems that require logical thinking.", category: "APTITUDE", subCategory: "LOGICAL" },
    { id: 27, text: "I can break a big problem into smaller steps easily.", category: "APTITUDE", subCategory: "LOGICAL" },

    // Numerical
    { id: 28, text: "I feel comfortable working with numbers and calculations.", category: "APTITUDE", subCategory: "NUMERICAL" },
    { id: 29, text: "I can quickly estimate or calculate things in daily life.", category: "APTITUDE", subCategory: "NUMERICAL" },
    { id: 30, text: "Subjects involving numbers do not scare me.", category: "APTITUDE", subCategory: "NUMERICAL" },

    // Verbal
    { id: 31, text: "I can clearly express my thoughts in words.", category: "APTITUDE", subCategory: "VERBAL" },
    { id: 32, text: "I understand what I read without much difficulty.", category: "APTITUDE", subCategory: "VERBAL" },
    { id: 33, text: "I feel confident participating in discussions or debates.", category: "APTITUDE", subCategory: "VERBAL" },

    // Spatial
    { id: 34, text: "I can easily understand diagrams, maps, or layouts.", category: "APTITUDE", subCategory: "SPATIAL" },
    { id: 35, text: "I am good at assembling, fixing, or building things.", category: "APTITUDE", subCategory: "SPATIAL" },
    { id: 36, text: "I can imagine how an object will look from different angles.", category: "APTITUDE", subCategory: "SPATIAL" },

    // Memory
    { id: 37, text: "I can remember information for exams once I understand it.", category: "APTITUDE", subCategory: "MEMORY" },
    { id: 38, text: "I can recall what I studied even after some time.", category: "APTITUDE", subCategory: "MEMORY" },
    { id: 39, text: "I remember instructions or steps without repeated reminders.", category: "APTITUDE", subCategory: "MEMORY" },

    // Critical Thinking/Application
    { id: 40, text: "I stay calm and try different approaches when a solution does not work.", category: "APTITUDE", subCategory: "CRITICAL_THINKING" },
    { id: 41, text: "I enjoy challenges that make me think deeply.", category: "APTITUDE", subCategory: "CRITICAL_THINKING" },
    { id: 42, text: "I can apply what I learn to real-life situations.", category: "APTITUDE", subCategory: "CRITICAL_THINKING" },

    // PERSONALITY
    // Extroversion
    { id: 43, text: "I feel energized after interacting with people for a long time.", category: "PERSONALITY", subCategory: "EXTROVERSION" },
    { id: 44, text: "I prefer discussing ideas with others rather than thinking alone.", category: "PERSONALITY", subCategory: "EXTROVERSION" },
    { id: 45, text: "I feel comfortable expressing my opinions in a group.", category: "PERSONALITY", subCategory: "EXTROVERSION" },

    // Adaptability
    { id: 46, text: "I like having a fixed routine for my studies and daily activities.", category: "PERSONALITY", subCategory: "ADAPTABILITY" }, // Note: High adaptability might mean disagreeing with this? Mapping assumes direct positive for now, will handle specific logic if needed. Or maybe this is Conscientiousness? Sticking to flexible mapping for now. Correcting: Question implies structure. High score = Structured. Low score = Flexible? Master file says "Personality". I will map as Structure/Adaptability.
    { id: 47, text: "Sudden changes in plans do not disturb me much.", category: "PERSONALITY", subCategory: "ADAPTABILITY" },
    { id: 48, text: "I can adjust quickly when things do not go as planned.", category: "PERSONALITY", subCategory: "ADAPTABILITY" },

    // Emotional Stability
    { id: 49, text: "I remain calm even when I am under pressure.", category: "PERSONALITY", subCategory: "EMOTIONAL_STABILITY" },
    { id: 50, text: "Failures or mistakes do not discourage me for long.", category: "PERSONALITY", subCategory: "EMOTIONAL_STABILITY" },
    { id: 51, text: "I can manage my emotions during stressful situations.", category: "PERSONALITY", subCategory: "EMOTIONAL_STABILITY" },

    // Risk Taking
    { id: 52, text: "I am willing to try new things even if success is not guaranteed.", category: "PERSONALITY", subCategory: "RISK_TAKING" },
    { id: 53, text: "I am comfortable taking calculated risks.", category: "PERSONALITY", subCategory: "RISK_TAKING" },
    { id: 54, text: "Fear of failure does not stop me from attempting something new.", category: "PERSONALITY", subCategory: "RISK_TAKING" },

    // Autonomy
    { id: 55, text: "I can take responsibility for my decisions.", category: "PERSONALITY", subCategory: "AUTONOMY" },
    { id: 56, text: "I prefer solving my problems on my own before seeking help.", category: "PERSONALITY", subCategory: "AUTONOMY" },
    { id: 57, text: "I stay motivated even when no one is supervising me.", category: "PERSONALITY", subCategory: "AUTONOMY" },

    // Conscientiousness
    { id: 58, text: "I complete my tasks even when they feel boring or difficult.", category: "PERSONALITY", subCategory: "CONSCIENTIOUSNESS" },
    { id: 59, text: "I pay attention to details in my work.", category: "PERSONALITY", subCategory: "CONSCIENTIOUSNESS" },
    { id: 60, text: "I try to improve myself when I receive feedback.", category: "PERSONALITY", subCategory: "CONSCIENTIOUSNESS" },

    // STUDY STYLE & DISCIPLINE
    { id: 61, text: "I am able to concentrate on my studies without getting distracted easily.", category: "STUDY_STYLE", subCategory: "GENERAL" },
    { id: 62, text: "I can study the same subject continuously for at least 45 minutes.", category: "STUDY_STYLE", subCategory: "GENERAL" },
    { id: 63, text: "I complete my homework and assignments on time.", category: "STUDY_STYLE", subCategory: "GENERAL" },
    { id: 64, text: "I revise my lessons regularly, not only before exams.", category: "STUDY_STYLE", subCategory: "GENERAL" },
    { id: 65, text: "I am able to manage my time well between studies and other activities.", category: "STUDY_STYLE", subCategory: "GENERAL" },
    { id: 66, text: "I usually plan what I need to study in advance.", category: "STUDY_STYLE", subCategory: "GENERAL" },
    { id: 67, text: "I feel confident about preparing for exams.", category: "STUDY_STYLE", subCategory: "GENERAL" },
    { id: 68, text: "I can handle academic pressure during exams.", category: "STUDY_STYLE", subCategory: "GENERAL" },
    { id: 69, text: "I continue studying even when the syllabus feels difficult.", category: "STUDY_STYLE", subCategory: "GENERAL" },
    { id: 70, text: "I am consistent with my study routine.", category: "STUDY_STYLE", subCategory: "GENERAL" },
    { id: 71, text: "I take responsibility for my academic performance.", category: "STUDY_STYLE", subCategory: "GENERAL" },
    { id: 72, text: "I am willing to improve my study habits if guided properly.", category: "STUDY_STYLE", subCategory: "GENERAL" },

    // MOTIVATION & STRESS HANDLING
    { id: 73, text: "I feel motivated to work hard for my future goals.", category: "MOTIVATION", subCategory: "GENERAL" },
    { id: 74, text: "I have a clear idea of what I want to achieve in life.", category: "MOTIVATION", subCategory: "GENERAL" },
    { id: 75, text: "Even when results are slow, I continue putting in effort.", category: "MOTIVATION", subCategory: "GENERAL" },
    { id: 76, text: "I do not give up easily when faced with difficulties.", category: "MOTIVATION", subCategory: "GENERAL" },
    { id: 77, text: "I am able to stay positive during stressful academic situations.", category: "MOTIVATION", subCategory: "GENERAL" },
    { id: 78, text: "I can manage pressure without panicking.", category: "MOTIVATION", subCategory: "GENERAL" },
    { id: 79, text: "I recover quickly after a setback or failure.", category: "MOTIVATION", subCategory: "GENERAL" },
    { id: 80, text: "I am open to guidance and mentoring when I feel stuck.", category: "MOTIVATION", subCategory: "GENERAL" },
    { id: 81, text: "I believe consistent effort can improve my abilities.", category: "MOTIVATION", subCategory: "GENERAL" },
    { id: 82, text: "I feel confident that I can shape my own future.", category: "MOTIVATION", subCategory: "GENERAL" },

    // ENVIRONMENT & CONSTRAINTS
    { id: 83, text: "My family supports my education and career goals.", category: "ENVIRONMENT", subCategory: "GENERAL" },
    { id: 84, text: "My family is open to different career options, not only traditional ones.", category: "ENVIRONMENT", subCategory: "GENERAL" },
    { id: 85, text: "My family can support higher education if required.", category: "ENVIRONMENT", subCategory: "GENERAL" },
    { id: 86, text: "I am willing to move to another city or place for better opportunities.", category: "ENVIRONMENT", subCategory: "GENERAL" },
    { id: 87, text: "I am comfortable with long-term preparation for competitive exams.", category: "ENVIRONMENT", subCategory: "GENERAL" },
    { id: 88, text: "I have access to guidance, coaching, or mentorship when needed.", category: "ENVIRONMENT", subCategory: "GENERAL" },
    { id: 89, text: "My daily responsibilities at home do not heavily disturb my studies.", category: "ENVIRONMENT", subCategory: "GENERAL" },
    { id: 90, text: "I feel my environment allows me to focus on building my future.", category: "ENVIRONMENT", subCategory: "GENERAL" }
];
