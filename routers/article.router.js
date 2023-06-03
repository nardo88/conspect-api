import { Router } from "express";
import articleController from "../controllers/article.controller.js";
import auth from "../middleware/auth.middleware.js";

const router = new Router();

router.post("/", articleController.add);
router.get("/", articleController.list);
router.get("/catalog", articleController.catalog);
router.get("/preview", articleController.previewList);
router.get("/:id", auth, articleController.getOne);
router.delete("/:id", articleController.delete);
router.put("/:id", articleController.update);

export default router;
