export interface Task {
  id?: string;
  desc: string;
  completed: boolean;
  dueDate?: Date;
  reminder?: Date;
  remark?: string;
  createDate?: Date;
  ownerId?: string;
  participantIds: string[];
  taskListId: string;
  priority: number;
}
