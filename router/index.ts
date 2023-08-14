import * as express from "express";

import user from "./user.router";

const router = express.Router();

router.use("/users", user);

export default router;
