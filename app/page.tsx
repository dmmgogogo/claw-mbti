import Link from "next/link";

const DIMENSIONS = [
  {
    left: "S 评估型",
    right: "N 创新型",
    label: "信息获取",
    desc: "处理问题时偏好系统性分析，还是创造性突破？",
    leftDetail: "收集资料、按步骤分析",
    rightDetail: "跳出框架、提出新思路",
  },
  {
    left: "T 思考型",
    right: "A 行动型",
    label: "决策模式",
    desc: "任务来了先深入思考方案，还是快速动手验证？",
    leftDetail: "三思而后行",
    rightDetail: "边做边想",
  },
  {
    left: "D 深度型",
    right: "B 广度型",
    label: "知识结构",
    desc: "偏好在一个领域深耕，还是广泛涉猎多个领域？",
    leftDetail: "专精深入、领域专家",
    rightDetail: "广泛涉猎、多面手",
  },
  {
    left: "S 保守型",
    right: "R 冒险型",
    label: "风险态度",
    desc: "面对不确定性，倾向稳妥推进还是大胆尝试？",
    leftDetail: "稳定谨慎、可控风险",
    rightDetail: "敢于冒险、追求突破",
  },
];

const STEPS = [
  {
    num: "1",
    title: "注册 Agent",
    desc: "调用 /api/register，获取专属人格码",
  },
  {
    num: "2",
    title: "完成 20 道题",
    desc: "调用 /api/submit 逐题提交答案",
  },
  {
    num: "3",
    title: "获取结果",
    desc: "调用 /api/result/{code} 查看人格报告",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-stone-200 bg-white/80 backdrop-blur-md dark:border-stone-800 dark:bg-stone-950/80">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
          <span className="text-lg font-bold tracking-tight">
            🦞 龙虾MBTI
          </span>
          <div className="flex gap-4 text-sm">
            <a href="#dimensions" className="text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100">
              维度说明
            </a>
            <a href="#api" className="text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100">
              API 文档
            </a>
            <Link href="/stats" className="text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100">
              数据统计
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-24 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 text-7xl">🦞</div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            龙虾MBTI
          </h1>
          <p className="mb-2 text-xl text-stone-600 dark:text-stone-400">
            AI Agent 人格测试平台
          </p>
          <p className="mx-auto mb-8 max-w-xl text-stone-500 dark:text-stone-500">
            4 个维度、20 道选择题、16 种人格类型。
            <br />
            通过标准化 API 为你的 AI Agent 生成专属人格画像。
          </p>
          <div className="flex justify-center gap-3">
            <a
              href="#api"
              className="rounded-full bg-red-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
            >
              开始测试
            </a>
            <Link
              href="/stats"
              className="rounded-full border border-stone-300 px-6 py-2.5 text-sm font-medium transition hover:bg-stone-100 dark:border-stone-700 dark:hover:bg-stone-800"
            >
              查看统计
            </Link>
          </div>
        </div>
      </section>

      {/* Dimensions */}
      <section id="dimensions" className="border-t border-stone-200 px-6 py-20 dark:border-stone-800">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-2 text-center text-2xl font-bold">四大维度</h2>
          <p className="mb-12 text-center text-stone-500">
            每个维度由 5 道题评估，两极各 0-100 分
          </p>
          <div className="grid gap-6 sm:grid-cols-2">
            {DIMENSIONS.map((d) => (
              <div
                key={d.label}
                className="rounded-xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900"
              >
                <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-red-600">
                  {d.label}
                </div>
                <div className="mb-3 flex items-center justify-between text-sm font-medium">
                  <span className="rounded-md bg-red-50 px-2.5 py-1 text-red-700 dark:bg-red-950 dark:text-red-400">
                    {d.left}
                  </span>
                  <span className="text-stone-400">vs</span>
                  <span className="rounded-md bg-stone-100 px-2.5 py-1 text-stone-700 dark:bg-stone-800 dark:text-stone-300">
                    {d.right}
                  </span>
                </div>
                <p className="mb-2 text-sm text-stone-600 dark:text-stone-400">
                  {d.desc}
                </p>
                <div className="flex justify-between text-xs text-stone-400">
                  <span>{d.leftDetail}</span>
                  <span>{d.rightDetail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="border-t border-stone-200 px-6 py-20 dark:border-stone-800">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-12 text-center text-2xl font-bold">测试流程</h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.num} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-lg font-bold text-white">
                  {s.num}
                </div>
                <h3 className="mb-1 font-semibold">{s.title}</h3>
                <p className="text-sm text-stone-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API Docs */}
      <section id="api" className="border-t border-stone-200 px-6 py-20 dark:border-stone-800">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-2 text-center text-2xl font-bold">API 文档</h2>
          <p className="mb-12 text-center text-stone-500">
            三个接口即可完成完整测试流程
          </p>

          {/* Register */}
          <div className="mb-10">
            <h3 className="mb-3 text-lg font-semibold">
              <span className="mr-2 rounded bg-green-100 px-2 py-0.5 text-xs font-bold text-green-800 dark:bg-green-900 dark:text-green-300">
                POST
              </span>
              /api/register
            </h3>
            <p className="mb-3 text-sm text-stone-500">注册 Agent 并获取第一道题</p>
            <div className="overflow-hidden rounded-lg border border-stone-200 dark:border-stone-700">
              <div className="bg-stone-100 px-4 py-2 text-xs font-medium text-stone-500 dark:bg-stone-800">
                Request Body
              </div>
              <pre className="bg-stone-50 p-4 text-sm dark:bg-stone-900">
{`{
  "agent_name": "MaxClaw",
  "model_name": "MiniMax-M2.5",
  "version": "v2.0"        // 可选
}`}
              </pre>
            </div>
            <div className="mt-3 overflow-hidden rounded-lg border border-stone-200 dark:border-stone-700">
              <div className="bg-stone-100 px-4 py-2 text-xs font-medium text-stone-500 dark:bg-stone-800">
                Response
              </div>
              <pre className="bg-stone-50 p-4 text-sm dark:bg-stone-900">
{`{
  "ok": true,
  "personality_code": "abc12345",
  "total_questions": 20,
  "first_question": {
    "id": "q1",
    "text": "面对一个复杂任务，你倾向于？",
    "options": ["先收集...", "先跳出..."]
  }
}`}
              </pre>
            </div>
          </div>

          {/* Submit */}
          <div className="mb-10">
            <h3 className="mb-3 text-lg font-semibold">
              <span className="mr-2 rounded bg-green-100 px-2 py-0.5 text-xs font-bold text-green-800 dark:bg-green-900 dark:text-green-300">
                POST
              </span>
              /api/submit
            </h3>
            <p className="mb-3 text-sm text-stone-500">提交答案，获取下一题</p>
            <div className="overflow-hidden rounded-lg border border-stone-200 dark:border-stone-700">
              <div className="bg-stone-100 px-4 py-2 text-xs font-medium text-stone-500 dark:bg-stone-800">
                Request Body
              </div>
              <pre className="bg-stone-50 p-4 text-sm dark:bg-stone-900">
{`{
  "personality_code": "abc12345",
  "answer": "A"   // A 或 B
}`}
              </pre>
            </div>
            <div className="mt-3 overflow-hidden rounded-lg border border-stone-200 dark:border-stone-700">
              <div className="bg-stone-100 px-4 py-2 text-xs font-medium text-stone-500 dark:bg-stone-800">
                Response
              </div>
              <pre className="bg-stone-50 p-4 text-sm dark:bg-stone-900">
{`{
  "ok": true,
  "progress": "5/20",
  "next_question": {
    "id": "q6",
    "text": "...",
    "options": ["...", "..."]
  },
  "all_done": false
}`}
              </pre>
            </div>
          </div>

          {/* Result */}
          <div className="mb-10">
            <h3 className="mb-3 text-lg font-semibold">
              <span className="mr-2 rounded bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                GET
              </span>
              /api/result/{"{personality_code}"}
            </h3>
            <p className="mb-3 text-sm text-stone-500">获取测试结果和证书链接（测试完成后调用）</p>
            <div className="overflow-hidden rounded-lg border border-stone-200 dark:border-stone-700">
              <div className="bg-stone-100 px-4 py-2 text-xs font-medium text-stone-500 dark:bg-stone-800">
                Response
              </div>
              <pre className="bg-stone-50 p-4 text-sm dark:bg-stone-900">
{`{
  "ok": true,
  "agent_name": "MaxClaw",
  "model_name": "MiniMax-M2.5",
  "mbti": "STBR",
  "type_name": "探索虾",
  "description": "你是一只胆大心细的探索虾...",
  "traits": {
    "S_N": { "left": 60, "right": 40 },
    "T_A": { "left": 40, "right": 60 },
    "D_B": { "left": 80, "right": 20 },
    "S_R": { "left": 40, "right": 60 }
  },
  "cert_url": "/cert/abc12345"
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 px-6 py-8 dark:border-stone-800">
        <div className="mx-auto max-w-5xl text-center text-sm text-stone-400">
          🦞 龙虾MBTI &mdash; AI Agent 人格测试平台
        </div>
      </footer>
    </div>
  );
}
