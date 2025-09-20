// save as pr-script.js
import { Octokit } from "@octokit/rest";
import fs from "fs";

// 🔑 Set your GitHub token here or via env var
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const OWNER = "NeonGamerBot-QK";
const REPO = "test-d";
const BASE_BRANCH = "main";
const FILE_NAME = "date-here" + Date.now();

if (!GITHUB_TOKEN) {
    console.error("Missing GITHUB_TOKEN env var");
    process.exit(1);
}

const octokit = new Octokit({ auth: GITHUB_TOKEN });

async function run() {
    // 1. Get latest commit sha of main
    const { data: refData } = await octokit.git.getRef({
        owner: OWNER,
        repo: REPO,
        ref: `heads/${BASE_BRANCH}`,
    });
    const latestCommitSha = refData.object.sha;

    // 2. Create a new branch
    const branchName = `add-blog-${Date.now()}`;
    await octokit.git.createRef({
        owner: OWNER,
        repo: REPO,
        ref: `refs/heads/${branchName}`,
        sha: latestCommitSha,
    });

    // 3. Create the file with today’s date
    const fileContent = new Date().toISOString();
    await octokit.repos.createOrUpdateFileContents({
        owner: OWNER,
        repo: REPO,
        path: FILE_NAME,
        // co author neon@saahild.com
        message: `Add ${FILE_NAME}\nCo-Authored-by: Neon <git@saahild.com>`,
        content: Buffer.from(fileContent).toString("base64"),
        branch: branchName,
    });

    // 4. Open a PR
    const { data: pr } = await octokit.pulls.create({
        owner: OWNER,
        repo: REPO,
        title: `feat(blog): ${FILE_NAME}`,
        head: branchName,
        base: BASE_BRANCH,
        body: "New blog post!here is the metadata::\n\n",
    });
    console.log(`PR created: ${pr.html_url}`);
    // 5. Merge the PR
    // TODO: if email includes draft, js draft ts and dont merge it
    const { data: merge } = await octokit.pulls.merge({
        owner: OWNER,
        repo: REPO,
        pull_number: pr.number,
        merge_method: "squash", // can be "merge" | "squash" | "rebase"
    });

    console.log(`PR merged: ${merge.sha}`);
}


run().catch(err => {
    console.error(err);
    process.exit(1);
});
