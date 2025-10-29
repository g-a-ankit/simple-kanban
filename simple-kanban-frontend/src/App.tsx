import { CircularProgress, Grid } from "@mui/material";
import "./App.css";
import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { appRoutes } from "./common/routes";
const PageNotFound = lazy(() => import("./pages/PageNotFound/PageNotFound"));
const AllBoards = lazy(() => import("./pages/AllBoards/AllBoards"));
const BoardInfo = lazy(() => import("./pages/BoardInfo/BoardInfo"));
const Layout = lazy(() => import("./pages/Layout/Layout"));

function App() {
  return (
    <Router>
      <Suspense
        fallback={
          <Grid
            container
            sx={{
              height: "100vh",
              alignItems: "start",
              justifyContent: "start",
            }}
          >
            <CircularProgress
              sx={{
                color: "#F7911A",
              }}
            />
          </Grid>
        }
      >
        <Routes>
          <Route path={appRoutes.base} element={<Layout />} />

          <Route path={appRoutes.board} element={<BoardInfo />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
