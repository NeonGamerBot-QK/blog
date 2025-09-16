import "dotenv/config";
import express from "express";
import { handler as ssrHandler } from "./build/server/entry.mjs";
import * as statusMonitor0 from "express-status-monitor";
import morgan from "morgan";
import helmet from "helmet";
import { exec } from "child_process";
const app = express();
// Change this based on your astro.config.mjs, `base` option.
// They should match. The default value is "/".
const base = "/";
app.use(
  helmet({
    // no csp please
    contentSecurityPolicy: false,
  }),
);
app.use(morgan("combined"));
app.use(statusMonitor0.default());
app.use(base, express.static("build/client/"));
app.use(ssrHandler);
app.use((req, res, next) => {
  res.redirect(302, `/404`);
});
app.listen(process.env.PORT || process.env.SERVER_PORT || 3000, () => {
  console.log(
    `Running on port ::${process.env.PORT || process.env.SERVER_PORT || 3000}`,
  );
  // watcher
  const timer = setInterval(() => {
    exec(`git pull -v`, (error, stdout) => {
      let response = error?.stdout ? error?.stdout[0].toString() : stdout;
      if (!error) {
        if (!response?.includes("Already up to date.")) {
          const commitMessage = require("child_process")
            .execSync("git log -1 --pretty=%B")
            .toString();
          console.log(`New git stuff wowie`);
          console.log(response);
          console.debug(commitMessage);

          setTimeout(() => {
            process.exit();
          }, 1000);
        }
      }
    });
  }, 15000);
});
