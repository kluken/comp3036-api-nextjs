import * as taskLib from "@/lib/tasks";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  DELETE as deleteTask,
  GET as getTask,
  PUT as putTask,
} from "./[id]/route";
import { GET as getTasks, POST as postTasks } from "./route";

describe("Tasks API", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.spyOn(taskLib, "getTasks").mockReturnValue([
      { id: 1, description: "Complete the project report", completed: false },
      { id: 2, description: "Clean the house", completed: true },
    ]);
  });

  describe("GET /api/tasks", () => {
    it("should return all tasks", async () => {
      const response = await getTasks();
      const json = await response.json();

      expect(response.status).toBe(200);
      expect(json).toEqual([
        { id: 1, description: "Complete the project report", completed: false },
        { id: 2, description: "Clean the house", completed: true },
      ]);
    });
  });

  describe("POST /api/tasks", () => {
    it("should create a new task", async () => {
      vi.spyOn(taskLib, "createTask").mockReturnValue({
        id: 3,
        description: "New task",
        completed: false,
      });

      const mockReq = {
        json: async () => ({ description: "New task", completed: false }),
      } as any;
      const response = await postTasks(mockReq);
      const json = await response.json();

      expect(response.status).toBe(201);
      expect(json).toEqual({
        id: 3,
        description: "New task",
        completed: false,
      });
    });
  });

  describe("GET /api/tasks/[id]", () => {
    it("should return a specific task", async () => {
      vi.spyOn(taskLib, "getTask").mockReturnValue({
        id: 1,
        description: "Complete the project report",
        completed: false,
      });

      const response = await getTask({} as any, { params: { id: "1" } });
      const json = await response.json();

      expect(response.status).toBe(200);
      expect(json).toEqual({
        id: 1,
        description: "Complete the project report",
        completed: false,
      });
    });

    it("should return 404 for non-existent task", async () => {
      vi.spyOn(taskLib, "getTask").mockReturnValue(undefined);
      const response = await getTask({} as any, { params: { id: "999" } });
      const json = await response.json();

      expect(response.status).toBe(404);
      expect(json).toEqual({ message: "Task not found" });
    });
  });

  describe("PUT /api/tasks/[id]", () => {
    it("should update an existing task", async () => {
      vi.spyOn(taskLib, "updateTask").mockReturnValue({
        id: 1,
        description: "Updated task",
        completed: true,
      });

      const mockReq = {
        json: async () => ({ description: "Updated task", completed: true }),
      } as any;
      const response = await putTask(mockReq, { params: { id: "1" } });
      const json = await response.json();

      expect(response.status).toBe(200);
      expect(json).toEqual({
        id: 1,
        description: "Updated task",
        completed: true,
      });
    });

    it("should return 404 for non-existent task", async () => {
      vi.spyOn(taskLib, "updateTask").mockReturnValue(undefined);
      const mockReq = {
        json: async () => ({ description: "Test", completed: true }),
      } as any;
      const response = await putTask(mockReq, { params: { id: "999" } });
      const json = await response.json();

      expect(response.status).toBe(404);
      expect(json).toEqual({ message: "Task not found" });
    });
  });

  describe("DELETE /api/tasks/[id]", () => {
    it("should delete an existing task", async () => {
      vi.spyOn(taskLib, "deleteTask").mockReturnValue(true);
      const response = await deleteTask({} as any, { params: { id: "1" } });
      const json = await response.json();

      expect(response.status).toBe(200);
      expect(json).toEqual({ message: "Task deleted" });
    });

    it("should return 404 for non-existent task", async () => {
      vi.spyOn(taskLib, "deleteTask").mockReturnValue(false);
      const response = await deleteTask({} as any, { params: { id: "999" } });
      const json = await response.json();

      expect(response.status).toBe(404);
      expect(json).toEqual({ message: "Task not found" });
    });
  });
});
