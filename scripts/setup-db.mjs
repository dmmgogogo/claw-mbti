import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_KEY;

const supabase = createClient(url, serviceKey, {
  global: { headers: { apikey: serviceKey } }
});

// 策略：利用 Supabase 的 RPC 机制
// 先通过 REST API 检查 pg 内置 functions 是否可以执行 DDL
// 尝试调用 extensions.exec_sql 或直接使用 pg_catalog 内置函数

// 试探 supabase_admin 相关函数
const testFuncs = [
  { schema: "extensions", func: "exec" },
  { schema: "pg_catalog", func: "pg_reload_conf" },
  { schema: "public", func: "pg_version" },
];

for (const { schema, func } of testFuncs) {
  const res = await fetch(`${url}/rest/v1/rpc/${func}`, {
    method: "POST",
    headers: {
      "apikey": serviceKey,
      "Content-Type": "application/json",
      "Accept-Profile": schema,
    },
    body: "{}",
  });
  console.log(`${schema}.${func}: ${res.status} ${(await res.text()).slice(0, 60)}`);
}

// 再试 direct insert into information_schema workaround
// 最后手段：通过 supabase REST 的 schema header 访问 extensions schema
const res2 = await fetch(`${url}/rest/v1/`, {
  headers: {
    "apikey": serviceKey,
    "Accept-Profile": "extensions",
  }
});
const swagger = await res2.json();
const extPaths = Object.keys(swagger.paths || {});
console.log("\nextensions schema paths:", extPaths.filter(p => p.includes("exec") || p.includes("query") || p.includes("sql")).slice(0, 10));
console.log("All extensions paths:", extPaths.slice(0, 20));
