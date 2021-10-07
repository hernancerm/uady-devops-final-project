import { getAllStudents } from "../controllers/student.controller";

import { Router } from "express";

const router = Router();

router.route("/students").get(getAllStudents);

export default router;
