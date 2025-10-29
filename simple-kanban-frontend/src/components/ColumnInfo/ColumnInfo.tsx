import React, { useState } from "react";
import type { Column } from "../../common/entities";
import { Button, Grid, Typography } from "@mui/material";
import { ViewTask } from "../ViewTask/ViewTask";
import { AddTaskModal } from "../AddTaskModal/AddTaskModal";
import type { TaskFormValues } from "../AddTaskModal/AddTaskModal";
import { CREATE_TASK, GET_BOARD_DETAILS } from "../../common/apiEndpoints";
import { useMutation } from "@apollo/client/react";

interface ColumnInfoProps {
  columnData: Column;
  boardId: string;
}

export interface AddTaskInput {
  boardId: string;
  columnId: string;
  title: string;
  description?: string;
}

export interface AddTaskResponse {
  addTask: {
    id: string;
    title: string;
    description?: string;
    status: string;
    column: {
      id: string;
      name: string;
    };
  };
}

export const ColumnInfo = (props: ColumnInfoProps) => {
  const [open, setOpen] = useState(false);

  const [addTask, { loading }] = useMutation<AddTaskResponse, AddTaskInput>(
    CREATE_TASK
  );

  const handleAddTask = async (data: TaskFormValues) => {
    try {
      await addTask({
        variables: {
          ...data,
          boardId: props.columnData.boardId,
          columnId: props.columnData.id,
        },
        refetchQueries: [
          {
            query: GET_BOARD_DETAILS,
            variables: { boardId: props.boardId },
          },
        ],
      });
      setOpen(false);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <>
      {" "}
      <Grid container sx={{ flexDirection: "column", gap: "0.5rem" }}>
        <Grid item container sx={{ flexDirection: "row", gap: "0.2rem" }}>
          <Typography>{props.columnData.title}</Typography>
        </Grid>
        <Grid item container sx={{ flexDirection: "column", gap: "1rem" }}>
          {props.columnData.tasks?.map((task) => {
            return (
              <Grid item key={task.id}>
                <ViewTask taskInfo={task} />
              </Grid>
            );
          })}
        </Grid>

        <Grid
          item
          container
          sx={{ alignItems: "center", justifyContent: "center" }}
          onClick={() => setOpen(true)}
        >
          <Button
            fullWidth
            sx={{
              border: "1px solid #6360c7",
              color: "#fff",
              textTransform: "none",
              borderRadius: "2rem",
            }}
          >
            Add task
          </Button>
        </Grid>
      </Grid>
      <AddTaskModal
        open={open}
        columnId={props.columnData.id}
        onClose={() => setOpen(false)}
        onSubmit={handleAddTask}
      />
    </>
  );
};
