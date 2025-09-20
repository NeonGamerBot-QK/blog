import { Octokit } from "@octokit/rest";
const OWNER = "NeonGamerBot-QK";
const REPO = "blog";
const BASE_BRANCH = "main";
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export default function POST(req: Request) {
  // 1. grab the body and valideate auth or smt
  // 2. reply email?!
  // 3. p
  return new Response(JSON.stringify({ name: "Email API " + Date.now() }), {
    headers: { "Content-Type": "application/json" },
  });
}

function createPR(title, description, is_draft, auto_merge_pr, blog_content, cover) {

}