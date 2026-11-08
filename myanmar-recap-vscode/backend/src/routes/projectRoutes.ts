import { Router } from "express";
import {
  listProjects,
  addProject,
  changeProjectStatus,
  removeProject
} from "../controllers/projectController";

const router = Router();

router.get("/", listProjects);
router.post("/", addProject);
router.patch("/:id/status", changeProjectStatus);
router.delete("/:id", removeProject);

export default router;
