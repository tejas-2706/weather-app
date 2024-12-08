import express  from "express";
import userRouter from "./user"
import ExamRouter from "./weather"

const router = express.Router();

router.use("/user", userRouter);
router.use("/weather", ExamRouter);

export default router
