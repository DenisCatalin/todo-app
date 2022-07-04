import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext } from "react";
import { listContext } from "../../lib/listContext";
import { themeContext } from "../../lib/themeContext";
import { mainListContext } from "../../lib/mainListContext";
import { completedListContext } from "../../lib/completedListContext";

const DeleteButton = ({ id, prio }) => {
  const { taskList, setTaskList } = useContext(listContext);
  const { value, setValue } = useContext(themeContext);
  const { mainTaskList, setMainTaskList } = useContext(mainListContext);
  const { completedTaskList, setCompletedTaskList } =
    useContext(completedListContext);
  const taskID = id;

  const deleteTask = () => {
    if (prio === "completed") {
      const remainingArr = completedTaskList.filter(
        (data) => data.taskID !== taskID
      );
      setCompletedTaskList(remainingArr);
      setTaskList(remainingArr);
      console.log(remainingArr);

      if (remainingArr.length === 0) localStorage.removeItem("completedTasks");
    } else {
      const remainingArr = taskList.filter((data) => data.taskID !== taskID);
      setMainTaskList(remainingArr);
      setTaskList(remainingArr);
      console.log(remainingArr);

      if (remainingArr.length === 0) localStorage.removeItem("mainListOfTasks");
    }
  };
  return (
    <>
      <IconButton
        aria-label="delete"
        style={{
          backgroundColor: value ? "#484848" : "#E3E3E3",
          marginLeft: "10px",
          transition: "0.5s all ease-in-out",
        }}
        onClick={deleteTask}
      >
        <DeleteIcon color="error" />
      </IconButton>
    </>
  );
};

export default DeleteButton;
