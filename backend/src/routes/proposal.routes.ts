import { Router } from "express";
import { createProposal } from "../controllers/proposal.controller";

const router = Router();

router.post("/", createProposal);

export default router;
