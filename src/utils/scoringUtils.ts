import { questions, Category, SubCategory, Question } from "@/data/questions";

// IDs of questions that are reverse scored (5 becomes 1, 1 becomes 5)
// Q46: "I like having a fixed routine" -> High score = Low Adaptability
const REVERSE_SCORED_IDS = [46];

export interface ScoreResult {
    categoryScores: Record<Category, number>;
    subCategoryScores: Record<SubCategory, number>;
    maxSubCategoryScores: Record<SubCategory, number>; // To calculate percentage
    topInterests: SubCategory[];
    topAptitudes: SubCategory[];
    personalityTraits: Record<SubCategory, "Low" | "Moderate" | "High">;
}

export const calculateScores = (answers: Record<number, number>): ScoreResult => {
    const categoryScores: Record<string, number> = {};
    const subCategoryScores: Record<string, number> = {};
    const subCategoryCounts: Record<string, number> = {};

    // Initialize
    questions.forEach(q => {
        if (!categoryScores[q.category]) categoryScores[q.category] = 0;
        if (q.subCategory) {
            if (!subCategoryScores[q.subCategory]) subCategoryScores[q.subCategory] = 0;
            if (!subCategoryCounts[q.subCategory]) subCategoryCounts[q.subCategory] = 0;
        }
    });

    // Calculate
    questions.forEach(q => {
        let score = answers[q.id] || 3; // Default to Neutral if missed (shouldn't happen with validation)

        // Handle Reverse Scoring
        if (REVERSE_SCORED_IDS.includes(q.id)) {
            score = 6 - score; // 5->1, 4->2, 3->3, 2->4, 1->5
        }

        categoryScores[q.category] += score;
        if (q.subCategory) {
            subCategoryScores[q.subCategory] += score;
            subCategoryCounts[q.subCategory] += 5; // Max score per question is 5
        }
    });

    // Determine Levels and Tops
    const percentageScores: Record<string, number> = {};
    Object.keys(subCategoryScores).forEach(key => {
        percentageScores[key] = (subCategoryScores[key] / subCategoryCounts[key]) * 100;
    });

    // Top Interests (RIASEC)
    const interestKeys: SubCategory[] = ["REALISTIC", "INVESTIGATIVE", "ARTISTIC", "SOCIAL", "ENTERPRISING", "CONVENTIONAL"];
    const topInterests = interestKeys
        .sort((a, b) => percentageScores[b] - percentageScores[a])
        .slice(0, 2);

    // Top Aptitudes (Threshold > 60% or top 3)
    const aptitudeKeys: SubCategory[] = ["LOGICAL", "NUMERICAL", "VERBAL", "SPATIAL", "MEMORY", "CRITICAL_THINKING"];
    const topAptitudes = aptitudeKeys
        .filter(key => percentageScores[key] >= 60) // Threshold
        .sort((a, b) => percentageScores[b] - percentageScores[a])
        .slice(0, 3);

    // Personality Levels
    const personalityKeys: SubCategory[] = ["EXTROVERSION", "ADAPTABILITY", "EMOTIONAL_STABILITY", "RISK_TAKING", "AUTONOMY", "CONSCIENTIOUSNESS"];
    const personalityTraits: Record<string, "Low" | "Moderate" | "High"> = {};

    personalityKeys.forEach(key => {
        const pct = percentageScores[key];
        if (pct < 40) personalityTraits[key] = "Low";
        else if (pct < 70) personalityTraits[key] = "Moderate";
        else personalityTraits[key] = "High";
    });

    return {
        categoryScores: categoryScores as Record<Category, number>,
        subCategoryScores: subCategoryScores as Record<SubCategory, number>,
        maxSubCategoryScores: subCategoryCounts as Record<SubCategory, number>,
        topInterests,
        topAptitudes,
        personalityTraits: personalityTraits as any
    };
};

export const getCareerRecommendations = (topInterests: SubCategory[], topAptitudes: SubCategory[]): string[] => {
    // Simple rule-based engine (Expandable)
    const recommendations: string[] = [];
    const combined = [...topInterests, ...topAptitudes].join(",");

    // RIASEC Logic
    if (combined.includes("INVESTIGATIVE")) {
        if (combined.includes("REALISTIC")) recommendations.push("Engineering", "Robotics", "Pilot", "Biotechnology");
        if (combined.includes("ARTISTIC")) recommendations.push("Architecture", "Product Design", "UX/UI Design");
        if (combined.includes("SOCIAL")) recommendations.push("Medicine", "Psychology", "Nursing", "Public Health");
        if (recommendations.length === 0) recommendations.push("Research Scientist", "Data Analyst", "Cybersecurity");
    }

    if (combined.includes("ARTISTIC")) {
        if (combined.includes("ENTERPRISING")) recommendations.push("Advertising", "Media Management", "Entrepreneurship", "Fashion Management");
        if (combined.includes("SOCIAL")) recommendations.push("Teaching Arts", "Therapy", "Journalism");
        recommendations.push("Graphic Design", "Content Creation", "Film-making", "Animation");
    }

    if (combined.includes("SOCIAL")) {
        if (combined.includes("ENTERPRISING")) recommendations.push("Human Resources", "Event Management", "Public Relations");
        recommendations.push("Social Work", "Counseling", "Teaching", "Hospitality");
    }

    if (combined.includes("ENTERPRISING")) {
        if (combined.includes("CONVENTIONAL")) recommendations.push("Business Administration", "Finance", "Accounting", "Banking");
        recommendations.push("Sales", "Marketing", "Management", "Real Estate");
    }

    if (combined.includes("CONVENTIONAL")) {
        recommendations.push("Accounting", "Banking", "Data Entry", "Logistics", "Library Science");
    }

    if (combined.includes("REALISTIC")) {
        recommendations.push("Mechanical Trades", "Agriculture", "Armed Forces", "Sports Science");
    }

    // Aptitude Boosters
    if (combined.includes("NUMERICAL") && combined.includes("LOGICAL")) {
        recommendations.push("Data Science", "Actuarial Science");
    }
    if (combined.includes("VERBAL") && combined.includes("SOCIAL")) {
        recommendations.push("Law", "Mass Communication");
    }
    if (combined.includes("SPATIAL") && combined.includes("REALISTIC")) {
        recommendations.push("Civil Engineering", "Interior Design");
    }

    // Deduplicate
    return Array.from(new Set(recommendations));
};
