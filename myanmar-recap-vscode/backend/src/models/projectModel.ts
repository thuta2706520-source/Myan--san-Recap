import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../config/database";

export interface ProjectInput {
  name: string;
  contentType: string;
  language: string;
}

export async function getAllProjects() {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT id, name, content_type AS contentType, output_language AS language, status, DATE_FORMAT(created_at, '%Y-%m-%d') AS date FROM projects ORDER BY id DESC"
  );
  return rows;
}

export async function createProject(input: ProjectInput) {
  const [result] = await pool.execute<ResultSetHeader>(
    "INSERT INTO projects (name, content_type, output_language) VALUES (?, ?, ?)",
    [input.name, input.contentType, input.language]
  );
  return result.insertId;
}

export async function updateProjectStatus(id: number, status: string) {
  const [result] = await pool.execute<ResultSetHeader>(
    "UPDATE projects SET status = ? WHERE id = ?",
    [status, id]
  );
  return result.affectedRows;
}

export async function deleteProject(id: number) {
  const [result] = await pool.execute<ResultSetHeader>(
    "DELETE FROM projects WHERE id = ?",
    [id]
  );
  return result.affectedRows;
}
