import { Octokit } from "@octokit/rest";
const OWNER = "NeonGamerBot-QK";
const REPO = "blog";
const BASE_BRANCH = "main";
import { v4 } from "uuid"
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export default function POST(req: Request) {
  // 1. grab the body and valideate auth or smt
  // 2. reply email?!
  // 3. p
  return new Response(JSON.stringify({ name: "Email API " + Date.now() }), {
    headers: { "Content-Type": "application/json" },
  });
}

async function createPR(
  title,
  description,
  is_draft,
  auto_merge_pr,
  blog_content,
  cover,
  date,
  flags
) {
  const { data: refData } = await octokit.git.getRef({
    owner: OWNER,
    repo: REPO,
    ref: `heads/${BASE_BRANCH}`,
  });
  const latestCommitSha = refData.object.sha;
  const branchName = `add-blog-${Date.now()}`;
  await octokit.git.createRef({
    owner: OWNER,
    repo: REPO,
    ref: `refs/heads/${branchName}`,
    sha: latestCommitSha,
  });

  const coverName = v4()
  const coverExt = cover.split(".").pop().split("?")[0];
  // upload image to img dir
  await octokit.repos.createOrUpdateFileContents({
    owner: OWNER,
    repo: REPO,
    // adding the date just incase i 
    path: `public/images/${coverName}.${coverExt}`,
    // co author neon@saahild.com
    message: `Add cover \n\nCo-Authored-by: Neon <git@saahild.com>`,
    content: Buffer.from(`--\n# Created via email automation\n  title: "${title}"\n  description: "${description}"  \n  date: ${date.toISOString().split("T")[0] || new Date().toISOString().split("T")[0]}  \n  tags: ${JSON.stringify(["created-via-zeon", "created-via-email", ...(flags || [])])} \n  cover: "/images/${coverName}.${coverExt}"\n  email: true\n  zeon: true  \n---\n${blog_content}`).toString("base64"),
    branch: branchName,
  })
  await octokit.repos.createOrUpdateFileContents({
    owner: OWNER,
    repo: REPO,
    // adding the date just incase i 
    path: `src/content/blog/${title.replace(/\s+/g, "-").toLowerCase()}--${Date.now()}.md`,
    // co author neon@saahild.com
    message: `Add ${title}\n${description}\n\nCo-Authored-by: Neon <git@saahild.com>`,
    content: Buffer.from(`--\n# Created via email automation\n  title: "${title}"\n  description: "${description}"  \n  date: ${date.toISOString().split("T")[0] || new Date().toISOString().split("T")[0]}  \n  tags: ${JSON.stringify(["created-via-zeon", "created-via-email", ...(flags || [])])} \n  cover: "/images/${coverName}.${coverExt}"\n  email: true\n  zeon: true  \n---\n${blog_content}`).toString("base64"),
    branch: branchName,
  });

}
