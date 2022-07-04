import IconButton from "@mui/material/IconButton";
import { listContext } from "../../lib/listContext";
import { themeContext } from "../../lib/themeContext";
import { mainListContext } from "../../lib/mainListContext";
import { useEffect, useContext } from "react";
import DoneIcon from "@mui/icons-material/Done";
import { completedListContext } from "../../lib/completedListContext";

const CompleteTask = ({ id, title, desc }) => {
  const { value, setValue } = useContext(themeContext);
  const { taskList, setTaskList } = useContext(listContext);
  const { mainTaskList, setMainTaskList } = useContext(mainListContext);
  const { completedTaskList, setCompletedTaskList } =
    useContext(completedListContext);

  let completedTask = [];

  const taskID = id;

  useEffect(() => {
    localStorage.setItem("completedTasks", JSON.stringify(completedTaskList));
  }, [completedTaskList]);

  const completeTask = () => {
    setTimeout(() => {
      const rarr = taskList.filter((data) => data.taskID !== taskID);
      setMainTaskList(rarr);
      setTaskList(rarr);
      console.log(rarr);

      if (rarr.length === 0) localStorage.removeItem("mainListOfTasks");
    }, 500);

    const remainingArr = mainTaskList.filter((data) => data.taskID === taskID);
    remainingArr[0].taskPriority = "completed";
    completedTask = remainingArr[0];
    console.log("array", completedTask);
    console.log("completed array", completedTask);
    setCompletedTaskList((oldArray) => [...oldArray, completedTask]);
  };
  return (
    <>
      <IconButton
        aria-label="done"
        style={{
          backgroundColor: value ? "#484848" : "#E3E3E3",
          marginLeft: "10px",
          transition: "0.5s all ease-in-out",
        }}
        onClick={completeTask}
      >
        <DoneIcon color="success" />
      </IconButton>
    </>
  );
};

export default CompleteTask;
