import { readFile } from "fs/promises";
import { statSync } from "fs";
import * as tar from "tar";

const PROJECT_DIR = "/Users/mmx/Documents/work/Github/claw-mbti";
const TARBALL = "/tmp/claw-mbti-deploy.tgz";

const EXCLUDE = [
  "node_modules", ".git", ".next", ".env.local", ".env",
  "scripts", "coverage", ".vercel",
];

// 1. Create tarball — only source files
console.log("Creating deployment package...");
await tar.create(
  {
    gzip: true,
    file: TARBALL,
    cwd: PROJECT_DIR,
    filter: (path) => {
      const topLevel = path.replace(/^\.\//, "").split("/")[0];
      return !EXCLUDE.includes(topLevel);
    },
  },
  ["."]
);

const tarSize = statSync(TARBALL).size;
console.log(`Package size: ${(tarSize / 1024).toFixed(1)} KB`);

// 2. Deploy via Vercel Claim Deployments API
const tarball = await readFile(TARBALL);

console.log("Uploading to Vercel...");
const resp = await fetch("https://api.vercel.com/v1/deployments?claimable=true", {
  method: "POST",
  headers: {
    "Content-Type": "application/octet-stream",
    "x-vercel-project-name": "claw-mbti",
    "x-vercel-project-framework": "nextjs",
  },
  body: tarball,
});

const text = await resp.text();
console.log("Response status:", resp.status);
try {
  const result = JSON.parse(text);
  console.log("Response:", JSON.stringify(result, null, 2));
} catch {
  console.log("Response body:", text.slice(0, 500));
}
