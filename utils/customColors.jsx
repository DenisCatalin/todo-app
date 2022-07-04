import { createTheme } from "@mui/material/styles";

export const iconColors = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#434343",
      darker: "#434343",
    },
    neutral: {
      main: "#FFFFFF",
      contrastText: "#fff",
    },
    dark: {
      main: "#434343",
      contrastText: "#434343",
    },
  },
});
