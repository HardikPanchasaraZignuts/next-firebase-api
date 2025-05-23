export interface Task {
  id?: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
}

export type CreateTaskInput = Omit<Task, "id"> & {
  status?: "pending" | "in-progress" | "completed";
};