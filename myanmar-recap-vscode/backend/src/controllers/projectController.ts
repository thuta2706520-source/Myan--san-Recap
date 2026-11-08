import { Request, Response } from "express";
import * as Project from "../models/projectModel";

const validStatuses = ["Draft", "In Progress", "Completed"];

export async function listProjects(_req: Request, res: Response) {
  try {
    res.json(await Project.getAllProjects());
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not load projects." });
  }
}

export async function addProject(req: Request, res: Response) {
  try {
    const { name, contentType, language } = req.body;

    if (typeof name !== "string" || !name.trim()) {
      res.status(400).json({ message: "Project name is required." });
      return;
    }

    if (typeof contentType !== "string" || typeof language !== "string") {
      res.status(400).json({ message: "Content type and language are required." });
      return;
    }

    const id = await Project.createProject({
      name: name.trim(),
      contentType,
      language
    });

    res.status(201).json({ id, message: "Project created." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not create project." });
  }
}

export async function changeProjectStatus(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const { status } = req.body;

    if (!Number.isInteger(id) || id <= 0 || !validStatuses.includes(status)) {
      res.status(400).json({ message: "Invalid project ID or status." });
      return;
    }

    const updated = await Project.updateProjectStatus(id, status);
    if (!updated) {
      res.status(404).json({ message: "Project not found." });
      return;
    }

    res.json({ message: "Project status updated." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not update project." });
  }
}

export async function removeProject(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({ message: "Invalid project ID." });
      return;
    }

    const deleted = await Project.deleteProject(id);
    if (!deleted) {
      res.status(404).json({ message: "Project not found." });
      return;
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not delete project." });
  }
}
