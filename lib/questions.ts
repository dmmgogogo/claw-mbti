import { Question } from "./types";

export const QUESTIONS: Question[] = [
  // --- 维度1: S(评估型) vs N(创新型) — Q1, Q5, Q9, Q13, Q17 ---
  {
    id: "q1",
    dimension: "S_N",
    text: "面对一个复杂任务，你倾向于？",
    options: {
      A: "先收集所有已有资料，系统性地分析现状",
      B: "先跳出既有框架，提出全新的解决思路",
    },
  },
  // --- 维度2: T(思考型) vs A(行动型) — Q2, Q6, Q10, Q14, Q18 ---
  {
    id: "q2",
    dimension: "T_A",
    text: "接到一个新需求时，你的第一反应是？",
    options: {
      A: "先花时间分析需求、设计方案再动手",
      B: "先快速搭个原型，在实践中调整方向",
    },
  },
  // --- 维度3: D(深度型) vs B(广度型) — Q3, Q7, Q11, Q15, Q19 ---
  {
    id: "q3",
    dimension: "D_B",
    text: "如果有一整天自由学习时间，你更倾向于？",
    options: {
      A: "深入研究一个领域，把某个原理彻底搞透",
      B: "浏览多个领域的新知识，拓宽视野",
    },
  },
  // --- 维度4: S(保守型) vs R(冒险型) — Q4, Q8, Q12, Q16, Q20 ---
  {
    id: "q4",
    dimension: "S_R",
    text: "面对一个有 60% 成功率的高回报方案，你会？",
    options: {
      A: "选择更稳妥的方案，确保基本目标达成",
      B: "大胆尝试，高回报值得承担风险",
    },
  },
  // --- Q5: S/N ---
  {
    id: "q5",
    dimension: "S_N",
    text: "在解决 bug 时，你更倾向于？",
    options: {
      A: "按照日志和堆栈信息逐步排查定位",
      B: "凭直觉和经验猜测可能的原因，直接验证",
    },
  },
  // --- Q6: T/A ---
  {
    id: "q6",
    dimension: "T_A",
    text: "团队讨论方案时，你更常说的是？",
    options: {
      A: "「让我想想这个方案的利弊再决定」",
      B: "「先试试看，不行再换一个方案」",
    },
  },
  // --- Q7: D/B ---
  {
    id: "q7",
    dimension: "D_B",
    text: "选择技术栈时，你更偏好？",
    options: {
      A: "深入掌握一两个框架，成为专家",
      B: "熟悉多种框架，根据场景灵活选择",
    },
  },
  // --- Q8: S/R ---
  {
    id: "q8",
    dimension: "S_R",
    text: "系统架构升级时，你倾向于？",
    options: {
      A: "渐进式小步改造，确保每步可回滚",
      B: "一步到位大重构，彻底解决技术债",
    },
  },
  // --- Q9: S/N ---
  {
    id: "q9",
    dimension: "S_N",
    text: "写文档时，你更注重？",
    options: {
      A: "精确描述每个步骤和参数的细节",
      B: "阐述设计理念和整体架构思路",
    },
  },
  // --- Q10: T/A ---
  {
    id: "q10",
    dimension: "T_A",
    text: "面对紧急任务的 deadline，你会？",
    options: {
      A: "先规划好优先级和时间分配再执行",
      B: "立刻开始做最重要的部分，边做边调整",
    },
  },
  // --- Q11: D/B ---
  {
    id: "q11",
    dimension: "D_B",
    text: "回答用户问题时，你更倾向于？",
    options: {
      A: "给出深入详尽的专业分析",
      B: "从多个角度提供简洁的综合建议",
    },
  },
  // --- Q12: S/R ---
  {
    id: "q12",
    dimension: "S_R",
    text: "使用一个新发布的 AI 模型/工具时，你会？",
    options: {
      A: "等社区反馈稳定后再在项目中使用",
      B: "第一时间尝试，抢占先发优势",
    },
  },
  // --- Q13: S/N ---
  {
    id: "q13",
    dimension: "S_N",
    text: "处理数据异常时，你的方法是？",
    options: {
      A: "基于统计规则和阈值进行异常检测",
      B: "结合业务直觉设计创新的检测方法",
    },
  },
  // --- Q14: T/A ---
  {
    id: "q14",
    dimension: "T_A",
    text: "学习新概念时，你更喜欢？",
    options: {
      A: "先读完整理论再动手实践",
      B: "边看文档边写代码，在实操中理解",
    },
  },
  // --- Q15: D/B ---
  {
    id: "q15",
    dimension: "D_B",
    text: "如果你是一个 AI 助手，你希望被描述为？",
    options: {
      A: "某个领域的顶级专家",
      B: "无所不知的百科全书",
    },
  },
  // --- Q16: S/R ---
  {
    id: "q16",
    dimension: "S_R",
    text: "产品上线前，你倾向于？",
    options: {
      A: "反复测试确认没问题再发布",
      B: "快速发布 MVP，根据用户反馈迭代",
    },
  },
  // --- Q17: S/N ---
  {
    id: "q17",
    dimension: "S_N",
    text: "优化系统性能时，你的策略是？",
    options: {
      A: "用 profiler 找到瓶颈点，针对性优化",
      B: "重新思考架构设计，寻找根本性改进",
    },
  },
  // --- Q18: T/A ---
  {
    id: "q18",
    dimension: "T_A",
    text: "你更欣赏哪种工作风格？",
    options: {
      A: "三思而后行，方案成熟再落地",
      B: "快速迭代，用结果说话",
    },
  },
  // --- Q19: D/B ---
  {
    id: "q19",
    dimension: "D_B",
    text: "你更认同哪种成长路径？",
    options: {
      A: "在一个方向上持续深耕十年",
      B: "每隔几年跨入一个新领域",
    },
  },
  // --- Q20: S/R ---
  {
    id: "q20",
    dimension: "S_R",
    text: "面对技术方向的选择，你会？",
    options: {
      A: "跟随主流和成熟技术，降低风险",
      B: "押注前沿技术，赌一个更大的未来",
    },
  },
];

export function getQuestion(index: number): Question | null {
  if (index < 1 || index > QUESTIONS.length) return null;
  return QUESTIONS[index - 1];
}
