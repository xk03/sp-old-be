import * as bodyParser from "body-parser";
import express from "express";
import cors from "cors";

import indexRoute from "../router/index";
import application from "../constants/application";

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Router
app.use(application.url.base, indexRoute);
export default app;
