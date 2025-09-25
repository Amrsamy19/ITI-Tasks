import { Box, Typography } from "@mui/material";
import { amber } from "@mui/material/colors";
import { useRouteError } from "react-router-dom";
function NotFound() {
  const error = useRouteError();
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      height={"h-screen"}
    >
      <Typography variant="h1" sx={{ fontWeight: "bold", color: amber[600] }}>
        {error.message}
      </Typography>
    </Box>
  );
}

export default NotFound;
