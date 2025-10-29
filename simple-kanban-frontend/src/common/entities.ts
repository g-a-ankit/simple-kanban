export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash?: string;
  createdAt: string;
  updatedAt: string;

  ownedBoards?: Board[];
  memberBoards?: BoardMember[];
  assignedTasks?: Task[];
  comments?: Comment[];
}

export interface Board {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  updatedAt: string;

  ownerId: string;
  owner?: User;

  columns?: Column[];
  members?: BoardMember[];
}

export interface Column {
  id: string;
  title: string;
  position: number;
  createdAt: string;
  updatedAt: string;

  boardId: string;
  board?: Board;

  tasks?: Task[];
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status?: TaskStatus;
  position: number;
  createdAt: string;
  updatedAt: string;

  columnId: string;
  column?: Column;

  assigneeId?: string;
  assignee?: User;

  comments?: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;

  taskId: string;
  task?: Task;

  authorId: string;
  author?: User;
}

export interface BoardMember {
  id: string;
  boardId: string;
  userId: string;
  role: string;

  board?: Board;
  user?: User;
}

export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";
