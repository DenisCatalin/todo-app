import { createTheme } from "@mui/material/styles";

export const iconColors = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#0971f1",
      darker: "#053e85",
    },
    neutral: {
      main: "#FFFFFF",
      contrastText: "#fff",
    },
  },
});
