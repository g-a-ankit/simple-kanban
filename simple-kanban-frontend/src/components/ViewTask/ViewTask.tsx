import React from "react";
import type { Task } from "../../common/entities";
import { Grid } from "@mui/material";

interface ViewTaskProps {
  taskInfo: Task;
}
export const ViewTask = (props: ViewTaskProps) => {
  return (
    <Grid
      container
      sx={{
        backgroundColor: "#2c2c37",
        borderRadius: "0.5rem",
        minHeight: "5rem",
        padding: "0.5rem",
      }}
    >
      {props.taskInfo.title}
    </Grid>
  );
};
