import { Router } from "express";
import * as CC from "./comments.controller.js";

const router = Router()


router.post("/" , CC.addComment)
router.get("/" , CC.getComment)
router.patch("/:id" , CC.updateComment)
router.delete("/:id" , CC.deleteComment)
router.get("/:userID/:postID" , CC.getCforUP)




export default router