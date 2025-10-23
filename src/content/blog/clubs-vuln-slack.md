---

title: "Hey where did all the Slack channels go?"
description: "My experience and thoughts on a recent security vuln I found which allowed you to gain Slack workspace admin (bypasses 2FA)"
date: 2025-10-22 # YYYY-MM-DD
tags: ["markdown", "hackclub", "security", "slack", "clubs"]
cover: "/images/club-vuln/banner.png"
---

Before we jump into my story, let's add some context:

## Hack Club Security program

The Hack Club security program was created by [3kh0](https://3kh0.net) so teens can earn money for security vulnerabilities they find. Many payouts have been issued through the program — ranging from leaked credentials exposing 100+ people's PII to Airtable SQL injection. The program has had its fair share of issues, but the projects that suffer most are usually Shiba and the Hack Club Clubs stuff.

## What actually happened? What do you mean by "Hey, where did all the Slack channels go?"

Well… I was looking through the [Hack Club club dashboard source code](https://github.com/hackclub/club-dashboard), and in the very long AI-generated `main.py` (authored by the lead club engineering lead) I was Ctrl+F’ing through the API endpoints. I found a URL that’s used to invite members to Slack as multi-channel guests. At first it looked normal, but then I noticed there were absolutely no authentication headers in that code — which is extremely concerning, because it provides a way into the Hack Club Slack with no logging whatsoever, making it easy for the Slack to be raided.

I then found the code on the lead club engineer’s GitHub (for some reason not on the Hack Club org). In the screenshot below you can see the code contains a clone of my own code for [explorpheus](https://github.com/hackclub/explorpheus), but this version appears to be a Python server that invites people to Slack with no auth. While browsing another folder (`attached_assets`) I found something even more concerning: **log files**.
![ss of code structure](/images/club-vuln/ss_of_stuff.png)

## The log files

These log files should never have been pushed to GitHub. While inspecting them I made a critical mistake: I didn’t record proof correctly. I opened the folder and found something absurd in the logs — a `xoxd` token belonging to a **workspace admin Slack account**. This is an **extreme** security risk. In Slack, admins cannot demote other admins, so if this token falls into malicious hands, the consequences are severe. For example, someone could mass-promote accounts to admin, run a bot to mass-delete every public channel, or raid the workspace with inappropriate content. This is essentially a root-access vulnerability.

Also in the same directory as the log files, I found a screenshot of the cookies tab uploaded directly to GitHub. When I found the token, I made another mistake: I was shocked it worked. Immediately, I hit the log-out button — which invalidated the token — but I hadn’t gathered much evidence of the finding. After I logged out I filed a security report as quickly as I could and a group chat was created to discuss the issue.
![ss of the log dir](/images/club-vuln/ss_log_dir.png)

## What happened when I reported this

Well, let’s just say the lead club engineer’s first offer was $50. I’m not greedy, but a sixth of the expected bounty felt disrespectful given the severity of the bug. I explained the vulnerability’s impact and that $50 wasn’t appropriate. He then brought up that Clubs has limited funds (which is true — bounty funds come from the [Hack Club HQ account](https://hcb.hackclub.com/hq)). He asked for proof, so I shared things I had seen in the account while logged in. He claimed those things were untrue, which I disagreed with, but I conceded that my initial evidence might not have been presented clearly.

Later, the token was compared to the one in the Coolify deployment and they matched 0 which confirmed the token was valid, but the lead engineer responded by accusing me of “snooping” and saying it “justifies nothing” (see screenshot below). Backing up claims does not equal snooping, especially when the security program owner verified it.
![ss of msg of justifies nothing](/images/club-vuln/justifies_nothing.png)

He still said there wasn’t enough proof. Then I remembered I had tested his invite flow earlier, so I showed him the account I invited using the bot. He still said it wasn’t enough evidence because I had invalidated the token. After I wrote a clearer explanation showing the invite flow and the token deactivation, he "semi-approved" and suggested a payout around $50–$75 — still far below what I consider fair. He also mentioned the commit was three months old; when I first found the token I hadn’t checked the commit timestamp, and I was surprised it had been public for so long.

After our discussion, the bounty was raised to $350 and brought to his boss. I DM’d the lead engineer asking him to remove the log files from the repo (possibly via a git force-push). I’m still waiting for a response - once that’s done I’ll link the repo.

## What I’m doing after this

I’m going to start recording when I find a vulnerability. I’m also fixing up the code and polishing this blog post.

Here are some links to what I’m working on right now:

* [Link to PR which fixes it on club-dashboard](https://github.com/hackclub/club-dashboard/pull/100)
* soon: link to commit/repo of where the vuln was (I’ll add this once the code is force-pushed)
* soon: a second PR implementing authentication
* soon: link to ACH wire
