import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_BOARDS } from "../../common/apiEndpoints";
import { Button, CircularProgress, Grid, Typography } from "@mui/material";
import type { Board } from "../../common/entities";

interface GetBoardsResponse {
  boards: Board[];
}

interface BoardsProps {
  handleBoardChoose: (boardId: string) => void;
}

const AllBoards = (props: BoardsProps) => {
  const { data, loading, error } = useQuery<GetBoardsResponse>(GET_BOARDS);
  const [selectedBoard, setSelectedBoard] = useState<string>("");

  const handleBoardSelect = (id: string) => {
    setSelectedBoard(id);
    props.handleBoardChoose(id);
  };

  const handleCreateBoard = () => {};

  useEffect(() => {
    if (!loading && data?.boards.length !== 0) {
      handleBoardSelect(data?.boards[0].id || "");
    }
  }, [data, loading]);

  return (
    <Grid container sx={{ flexDirection: "column", gap: "1rem" }}>
      <Grid item sx={{ borderBottom: "1px solid #fff" }}>
        <Typography sx={{ paddingLeft: "1rem" }}> All Boards</Typography>
      </Grid>

      {loading && <CircularProgress />}

      {!loading && data?.boards.length !== 0 && (
        <Grid container sx={{ flexDirection: "column", gap: "1rem" }}>
          {data?.boards.map((board, idx) => {
            return (
              <Grid
                key={board.id}
                item
                sx={{
                  cursor: "pointer",
                  backgroundColor:
                    board.id === selectedBoard ? "#6360c7" : "none",
                  borderRadius: "0rem 1rem 1rem 0rem",
                  paddingLeft: "1rem",
                }}
                onClick={(e) => {
                  handleBoardSelect(board.id);
                }}
              >
                {" "}
                {idx + 1}. {board.title}
              </Grid>
            );
          })}
        </Grid>
      )}

      {!loading && data?.boards.length === 0 && (
        <Grid>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleCreateBoard();
            }}
          >
            Add Board
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

export default AllBoards;
