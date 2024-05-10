import { CircularProgress } from "@mui/material";

function LoadingScreen() {
  return (
    <div className="fixed top-0 left-0 w-svw h-svh flex items-center justify-center">
      <CircularProgress />
    </div>
  );
}

export default LoadingScreen;
