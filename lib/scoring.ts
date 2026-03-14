import { Answer, DimensionScores } from "./types";
import { QUESTIONS } from "./questions";
import { getPersonality } from "./personalities";

const DIMENSION_QUESTIONS: Record<string, number[]> = {
  S_N: [1, 5, 9, 13, 17],
  T_A: [2, 6, 10, 14, 18],
  D_B: [3, 7, 11, 15, 19],
  S_R: [4, 8, 12, 16, 20],
};

const POINTS_PER_QUESTION = 20;

export function calculateScores(answers: Answer[]): DimensionScores {
  const answerMap = new Map(answers.map((a) => [a.question_index, a.answer]));

  const scores: DimensionScores = {
    S_N: { left: 0, right: 0 },
    T_A: { left: 0, right: 0 },
    D_B: { left: 0, right: 0 },
    S_R: { left: 0, right: 0 },
  };

  for (const [dimension, questionIndices] of Object.entries(
    DIMENSION_QUESTIONS
  )) {
    let leftCount = 0;
    for (const qi of questionIndices) {
      if (answerMap.get(qi) === "A") leftCount++;
    }
    const dim = dimension as keyof DimensionScores;
    scores[dim] = {
      left: leftCount * POINTS_PER_QUESTION,
      right: (questionIndices.length - leftCount) * POINTS_PER_QUESTION,
    };
  }

  return scores;
}

const DIMENSION_LETTERS: Record<string, [string, string]> = {
  S_N: ["S", "N"],
  T_A: ["T", "A"],
  D_B: ["D", "B"],
  S_R: ["S", "R"],
};

export function determineMbti(scores: DimensionScores): string {
  let mbti = "";
  for (const [dimension, [leftLetter, rightLetter]] of Object.entries(
    DIMENSION_LETTERS
  )) {
    const dim = dimension as keyof DimensionScores;
    mbti += scores[dim].left >= scores[dim].right ? leftLetter : rightLetter;
  }
  return mbti;
}

export function getFullResult(answers: Answer[]) {
  const scores = calculateScores(answers);
  const mbti = determineMbti(scores);
  const personality = getPersonality(mbti);

  return {
    mbti,
    type_name: personality?.name ?? "未知虾",
    description: personality?.description ?? "",
    traits: scores,
  };
}

export { QUESTIONS };
