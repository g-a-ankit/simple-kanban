import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import AllBoards from "../AllBoards/AllBoards";
import BoardInfo from "../BoardInfo/BoardInfo";

const Layout = () => {
  const [chosenBoardId, setChosenBoardId] = useState<string>("test");

  const handleBoardChoose = (boardId: string) => {
    setChosenBoardId(boardId);
  };

  return (
    <Grid
      container
      sx={{
        flexDirection: "row",
        height: "100vh",
        width: "100vw",
        flexWrap: "nowrap",
      }}
    >
      <Grid
        item
        container
        sx={{
          flexDirection: "column",
          minWidth: "200px",
          backgroundColor: "#2c2c37",

          gap: "2rem",
          borderRight: "1px solid #ffffff20",
        }}
      >
        <Grid item sx={{ padding: "1rem" }}>
          <Typography sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
            Kanban
          </Typography>
        </Grid>
        <Grid item>
          <AllBoards handleBoardChoose={handleBoardChoose} />
        </Grid>
      </Grid>

      <Grid item container sx={{ backgroundColor: "#21222d", flexGrow: 1 }}>
        {chosenBoardId !== "" && <BoardInfo boardId={chosenBoardId} />}
      </Grid>
    </Grid>
  );
};

export default Layout;
