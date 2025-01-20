import express from 'express';
import { handler as ssrHandler } from './build/server/entry.mjs';
import * as statusMonitor0 from "express-status-monitor";
import morgan from "morgan"
import helmet from "helmet";
const app = express();
// Change this based on your astro.config.mjs, `base` option.
// They should match. The default value is "/".
const base = '/';
app.use(helmet({
    // no csp please
    contentSecurityPolicy: false,
}))
app.use(morgan('combined'))
app.use(statusMonitor0.default());
app.use(base, express.static('build/client/'));
app.use(ssrHandler);

app.listen(process.env.PORT || process.env.SERVER_PORT || 3000, () => {
    console.log(`Running on port ::${process.env.PORT || process.env.SERVER_PORT || 3000}`);
});