import { useState, useEffect, useContext } from "react";
import { listContext } from "../../lib/listContext";
import { mainListContext } from "../../lib/mainListContext";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import AddIcon from "@mui/icons-material/Add";
import useWindowDimensions from "../../utils/useWindowDimensions";
import { iconColors } from "../../utils/customColors.jsx";
import { ThemeProvider } from "@mui/material/styles";
import { motion } from "framer-motion";
import styles from "./AddTaskButton.module.css";

const AddTask = () => {
  const priorityTask = [
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

  const { width, height } = useWindowDimensions();
  const [open, setOpen] = useState(false);

  const { taskList, setTaskList } = useContext(listContext);
  const { mainTaskList, setMainTaskList } = useContext(mainListContext);

  const [listTask, setListTask] = useState(taskList);
  const [taskSubject, setTaskSubject] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskPriority, setTaskPriority] = useState("");
  const [priority, setPriority] = useState("");
  const [taskID, setTaskID] = useState(0);

  useEffect(() => {
    setTaskID(+localStorage.getItem("tasks") + 1);
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const clearTaskObject = () => {
    setTaskSubject("");
    setTaskDescription("");
    setTaskPriority("");
    setPriority("");
  };

  const taskToBeAdded = {
    taskID: taskID,
    taskTitle: taskSubject,
    taskDescription: taskDescription,
    taskPriority: taskPriority,
  };

  useEffect(() => {
    if (mainTaskList.length > 0) {
      console.log("Task list a fost actualizata", mainTaskList);
      localStorage.setItem("mainListOfTasks", JSON.stringify(mainTaskList));
    }
  }, [taskList]);

  const addTask = () => {
    if (taskSubject === "" || taskDescription === "" || taskPriority === "") {
    } else {
      setOpen(false);
      clearTaskObject();
      setListTask((old) => [...old, taskToBeAdded]);
      setTaskList((oldArray) => [...oldArray, taskToBeAdded]);
      setMainTaskList((oldArray) => [...oldArray, taskToBeAdded]);
      localStorage.setItem("tasks", +localStorage.getItem("tasks") + 1);
    }
  };

  const handleClose = () => {
    setOpen(false);
    clearTaskObject();
  };

  const handleChange = (event) => {
    setPriority(event.target.value);
    setTaskPriority(event.target.value);
  };
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            In order to add a task, please complete the fields here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="subject"
            label="Task Subject"
            type="test"
            fullWidth
            onChange={(e) => setTaskSubject(e.target.value)}
            variant="standard"
          />
          <TextareaAutosize
            aria-label="empty textarea"
            placeholder="Task Description"
            style={{
              width: "100%",
              height: height > 1050 ? height / 3.5 : height / 4,
              margin: "5px 5px 0 0",
              outline: "1px solid rgba(0, 0, 0, .5)",
              border: "none",
              borderRadius: "5px",
              padding: ".3rem",
            }}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
          <TextField
            id="outlined-select-currency"
            select
            label="Priority"
            value={priority}
            style={{ marginTop: "20px" }}
            onChange={handleChange}
            helperText="Please select your task priority"
          >
            {priorityTask.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addTask}>ADD TASK</Button>
        </DialogActions>
      </Dialog>
      <ThemeProvider theme={iconColors}>
        <motion.button
          className={styles.button}
          animate={{ opacity: [0, 1], y: [200, 0] }}
          initial={{ opacity: 0 }}
          whileTap={{
            scale: 0.9,
          }}
          onClick={handleClickOpen}
        >
          <AddIcon color="neutral" fontSize="large" />
        </motion.button>
      </ThemeProvider>
    </>
  );
};

export default AddTask;
