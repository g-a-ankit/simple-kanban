import { Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { CREATE_COLUMN, GET_BOARD_DETAILS } from "../../common/apiEndpoints";
import { useMutation, useQuery } from "@apollo/client/react";
import type { Board } from "../../common/entities";
import { ColumnInfo } from "../../components/ColumnInfo/ColumnInfo";
import {
  AddColumnModal,
  type ColumnFormValues,
} from "../../components/AddColumnModal/AddColumnModal";

interface BoardInfoProps {
  boardId: string;
}

export interface GetBoardDetailsData {
  board: Board;
}

export interface GetBoardDetailsVars {
  boardId: string;
}

export interface AddColumnInput {
  title: string;
  boardId: string;
  position?: number;
}

export interface AddColumnResponse {
  createColumn: {
    id: string;
    title: string;
    position: number;
  };
}

const BoardInfo = (props: BoardInfoProps) => {
  const [open, setOpen] = useState(false);

  const {
    data: boardData,
    loading,
    error,
    refetch,
  } = useQuery<GetBoardDetailsData, GetBoardDetailsVars>(GET_BOARD_DETAILS, {
    variables: { boardId: props.boardId },
    skip: !props.boardId,
  });

  const [addColumn] = useMutation<AddColumnResponse, AddColumnInput>(
    CREATE_COLUMN
  );

  const handleAddColumn = async (data: ColumnFormValues) => {
    try {
      await addColumn({
        variables: {
          title: data.title,
          boardId: props.boardId,
          position: (boardData?.board.columns?.length || 0) + 1,
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
    <Grid
      container
      sx={{
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundColor: "#21222d",
        flexWrap: "nowrap",
      }}
    >
      {/* this can be moved out to new component */}
      <Grid
        item
        container
        sx={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#2c2c37",
          padding: "1rem",
          borderLeft: "1px solid #ffffff20",
          borderBottom: "1px solid #ffffff20",
        }}
      >
        <Typography sx={{ flexGrow: 1 }}>Platform Launch</Typography>
        <Button
          sx={{
            backgroundColor: "#6360c7",
            color: "#fff",
            textTransform: "none",
            borderRadius: "2rem",
            width: "8rem",
          }}
        >
          {" "}
          + Add Task{" "}
        </Button>
      </Grid>

      {/* columns and tasks */}
      <Grid
        item
        container
        sx={{
          flexDirection: "row",
          gap: "0.5rem",
          flexWrap: "nowrap",
          overflowX: "auto",
          overflowY: "hidden",
          whiteSpace: "nowrap",
          height: "100%",
        }}
      >
        {boardData?.board.columns?.map((col) => {
          return (
            <Grid
              item
              sx={{ padding: "1rem", minWidth: "300px", flex: "0 0 30%" }}
            >
              <ColumnInfo
                key={col.id}
                columnData={col}
                boardId={props.boardId}
              />
            </Grid>
          );
        })}

        <Grid
          item
          container
          sx={{
            flexDirection: "row",
            gap: "0.5rem",
            backgroundColor: "#24242f",
            flexBasis: "30%",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            padding: "1rem",
            minWidth: "150px",
            flex: "0 0 20%",
          }}
          onClick={(e) => {
            setOpen(true);
          }}
        >
          Add Column
        </Grid>
      </Grid>
      <AddColumnModal
        open={open}
        boardId={props.boardId}
        onClose={() => setOpen(false)}
        onSubmit={handleAddColumn}
      />
    </Grid>
  );
};

export default BoardInfo;
