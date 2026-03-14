-- 测试会话表
create table if not exists tests (
  id uuid primary key default gen_random_uuid(),
  agent_name text not null,
  model_name text not null,
  version text,
  personality_code text unique not null,
  current_question int not null default 1,
  mbti text,
  status text not null default 'in_progress' check (status in ('in_progress', 'completed')),
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

-- 答题记录表
create table if not exists answers (
  id uuid primary key default gen_random_uuid(),
  test_id uuid not null references tests(id) on delete cascade,
  question_index int not null check (question_index between 1 and 20),
  answer text not null check (answer in ('A', 'B')),
  created_at timestamptz not null default now(),
  unique(test_id, question_index)
);

-- 索引
create index if not exists idx_tests_personality_code on tests(personality_code);
create index if not exists idx_tests_status on tests(status);
create index if not exists idx_tests_created_at on tests(created_at);
create index if not exists idx_answers_test_id on answers(test_id);
