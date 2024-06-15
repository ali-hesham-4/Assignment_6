import { Router } from "express";
import * as  UC  from "./users.controller.js";
const router = Router()

router.post("/", UC.registeration)
router.get("/login", UC.login)
router.get("/logout", UC.logout)

export default router