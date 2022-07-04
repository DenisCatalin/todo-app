import { useState, useContext } from "react";
import { listContext } from "../../lib/listContext";
import { mainListContext } from "../../lib/mainListContext";
import { completedListContext } from "../../lib/completedListContext";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { iconColors } from "../../utils/customColors.jsx";
import { ThemeProvider } from "@mui/material/styles";
import { motion } from "framer-motion";
import styles from "./FilterTaskButton.module.css";

const FilterTask = () => {
  const { taskList, setTaskList } = useContext(listContext);
  const { mainTaskList, setMainTaskList } = useContext(mainListContext);
  const { completedTaskList, setCompletedTaskList } =
    useContext(completedListContext);

  const currencies = [
    {
      value: "All",
      label: "All (Low, Normal, High)",
    },
    {
      value: "Completed",
      label: "Completed",
    },
    {
      value: "Low",
      label: "Low",
    },
    {
      value: "Normal",
      label: "Normal",
    },
    {
      value: "High",
      label: "High",
    },
  ];
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [currency, setCurrency] = useState("All");

  const handleChange = (event) => {
    setCurrency(event.target.value);
    console.log(mainTaskList);
    handleClose();
    if (event.target.value === "All") {
      setTaskList(mainTaskList);
    } else if (event.target.value === "Completed") {
      setTaskList(completedTaskList);
    } else {
      const remainingArr = mainTaskList.filter(
        (data) => data.taskPriority === event.target.value
      );
      setTaskList(remainingArr);
    }
  };
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Tasks Filter</DialogTitle>
        <DialogContent>
          <TextField
            id="outlined-select-currency"
            select
            label="Priority"
            value={currency}
            style={{ marginTop: "20px" }}
            onChange={handleChange}
            helperText="Sort by priority"
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
      </Dialog>
      <ThemeProvider theme={iconColors}>
        <motion.button
          className={styles.button}
          animate={{ opacity: [0, 1], y: [300, 0] }}
          initial={{ opacity: 0 }}
          whileTap={{
            scale: 0.9,
          }}
          onClick={handleClickOpen}
        >
          <FilterAltIcon color="neutral" fontSize="large" />
        </motion.button>
      </ThemeProvider>
    </>
  );
};

export default FilterTask;
