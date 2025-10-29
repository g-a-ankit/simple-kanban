import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!, $password: String!) {
    createUser(
      createUserDto: { name: $name, email: $email, password: $password }
    ) {
      id
      name
      email
    }
  }
`;

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
      createdAt
    }
  }
`;

// ===============================
// 📋 BOARD QUERIES & MUTATIONS
// ===============================

// 🔹 Create a new board
export const CREATE_BOARD = gql`
  mutation CreateBoard(
    $title: String!
    $description: String
    $ownerId: String!
  ) {
    createBoard(
      createBoardDto: {
        title: $title
        description: $description
        ownerId: $ownerId
      }
    ) {
      id
      title
      description
    }
  }
`;

// 🔹 Get all boards (with columns and tasks)
export const GET_BOARDS = gql`
  query GetBoards {
    boards {
      id
      title
      description
      owner {
        id
        name
      }
      columns {
        id
        title
        tasks {
          id
          title
          description
          status
        }
      }
    }
  }
`;

// ===============================
// 🧱 COLUMN QUERIES & MUTATIONS
// ===============================

// 🔹 Create a new column
export const CREATE_COLUMN = gql`
  mutation CreateColumn($title: String!, $boardId: String!, $position: Int) {
    createColumn(
      createColumnDto: { title: $title, boardId: $boardId, position: $position }
    ) {
      id
      title
      position
      board {
        id
        title
      }
    }
  }
`;

// 🔹 Get all columns (with board and tasks)
export const GET_COLUMNS = gql`
  query GetColumns {
    columns {
      id
      title
      position
      board {
        id
        title
      }
      tasks {
        id
        title
        status
      }
    }
  }
`;

// ===============================
// ✅ TASK QUERIES & MUTATIONS
// ===============================

// 🔹 Create a new task
export const CREATE_TASK = gql`
  mutation CreateTask(
    $title: String!
    $description: String
    $status: TaskStatus
    $columnId: String!
    $position: Int
  ) {
    createTask(
      createTaskDto: {
        title: $title
        description: $description
        status: $status
        columnId: $columnId
        position: $position
      }
    ) {
      id
      title
      description
      status
      column {
        id
        title
      }
    }
  }
`;

// 🔹 Get all tasks (with column and board info)
export const GET_TASKS = gql`
  query GetTasks {
    tasks {
      id
      title
      description
      status
      column {
        id
        title
        board {
          id
          title
        }
      }
    }
  }
`;

export const GET_BOARD_DETAILS = gql`
  query GetBoardDetails($boardId: ID!) {
    board(id: $boardId) {
      id
      title
      description
      owner {
        id
        name
      }
      columns {
        id
        title
        tasks {
          id
          title
          description
          status
          createdAt
          updatedAt
        }
      }
    }
  }
`;

// =============================================
// 🧾 Export all in one object for easy import
// =============================================

export const API = {
  // User
  CREATE_USER,
  GET_USERS,

  // Board
  CREATE_BOARD,
  GET_BOARDS,

  // Column
  CREATE_COLUMN,
  GET_COLUMNS,

  // Task
  CREATE_TASK,
  GET_TASKS,
};
