import IconButton from "@mui/material/IconButton";
import { listContext } from "../../lib/listContext";
import { themeContext } from "../../lib/themeContext";
import { mainListContext } from "../../lib/mainListContext";
import { useState, useEffect, useContext } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { completedListContext } from "../../lib/completedListContext";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import useWindowDimensions from "../../utils/useWindowDimensions";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const EditTask = ({ id, title, desc, prio }) => {
  const { value, setValue } = useContext(themeContext);
  const { taskList, setTaskList } = useContext(listContext);
  const { mainTaskList, setMainTaskList } = useContext(mainListContext);
  const [open, setOpen] = useState(false);
  const [priority, setPriority] = useState("");
  const { width, height } = useWindowDimensions();
  const [taskSubject, setTaskSubject] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskPriority, setTaskPriority] = useState("");

  const taskID = id;

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeTask = () => {
    console.log(taskID);
    setOpen(false);

    const remainingArr = taskList.filter((data) => data.taskID !== taskID);
    setMainTaskList(remainingArr);
    setTaskList(remainingArr);
    console.log(remainingArr);

    if (remainingArr.length === 0) localStorage.removeItem("mainListOfTasks");

    const rarr = taskList.filter((data) => data.taskID === taskID);
    taskSubject === ""
      ? (rarr[0].taskTitle = title)
      : (rarr[0].taskTitle = taskSubject);
    taskDescription === ""
      ? (rarr[0].taskDescription = desc)
      : (rarr[0].taskDescription = taskDescription);
    taskPriority === ""
      ? (rarr[0].taskPriority = prio)
      : (rarr[0].taskPriority = taskPriority);
    setTaskList((oldArray) => [...oldArray, rarr[0]]);
    setMainTaskList((oldArray) => [...oldArray, rarr[0]]);
    console.log(rarr[0]);
  };

  const handleChange = (event) => {
    setPriority(event.target.value);
    setTaskPriority(event.target.value);
  };
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={title}
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setTaskSubject(e.target.value)}
          />
          <TextareaAutosize
            aria-label="empty textarea"
            placeholder={desc}
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
          <Button onClick={changeTask}>Subscribe</Button>
        </DialogActions>
      </Dialog>
      <IconButton
        aria-label="edit"
        style={{
          backgroundColor: value ? "#484848" : "#E3E3E3",
          marginLeft: "10px",
          transition: "0.5s all ease-in-out",
        }}
        onClick={handleClickOpen}
      >
        <EditIcon color="warning" />
      </IconButton>
    </>
  );
};

export default EditTask;
