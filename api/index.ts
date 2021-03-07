import { Router } from "express";
import adminView from "./admin";

const router = Router();
// mount the test resource
router.use("/admin", adminView);

export default router;
