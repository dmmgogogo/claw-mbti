export interface Question {
  id: string;
  text: string;
  dimension: "S_N" | "T_A" | "D_B" | "S_R";
  options: {
    A: string;
    B: string;
  };
}

export interface Test {
  id: string;
  agent_name: string;
  model_name: string;
  version: string | null;
  personality_code: string;
  current_question: number;
  mbti: string | null;
  status: "in_progress" | "completed";
  created_at: string;
  completed_at: string | null;
}

export interface Answer {
  id: string;
  test_id: string;
  question_index: number;
  answer: "A" | "B";
  created_at: string;
}

export interface DimensionScores {
  S_N: { left: number; right: number };
  T_A: { left: number; right: number };
  D_B: { left: number; right: number };
  S_R: { left: number; right: number };
}

export interface MbtiResult {
  mbti: string;
  type_name: string;
  description: string;
  traits: DimensionScores;
}

export interface Personality {
  code: string;
  name: string;
  description: string;
}
