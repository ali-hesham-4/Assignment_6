import { Router } from "express";
import * as PC from "./posts.controller.js";

const router = Router()

router.post("/",PC.addPost)
router.get("/",PC.getPost)
router.patch("/:user/:id",PC.updatePost)
router.delete("/:user/:id",PC.deletepost)
router.get("/:postID" , PC.getPostWithAuthor)


export default router