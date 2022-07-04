import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { useContext } from "react";
import { themeContext } from "../../lib/themeContext";
import Typography from "@mui/material/Typography";
import DeleteButton from "../delete-button/delete-button";
import CompleteTask from "../complete-task/complete-task";
import EditTask from "../edit-task/edit-task-button";

const ListItemCard = ({ id, title, desc, prio }) => {
  const { value, setValue } = useContext(themeContext);

  const taskID = id;

  const border = {
    border:
      prio === "High"
        ? "3px solid var(--linearRed)"
        : prio === "Low"
        ? "3px solid var(--linearGreen)"
        : "3px solid var(--linearOrange)",
    backgroundColor: value ? "#555" : "#eee",
    transition: ".5s all ease-in-out",
  };

  return (
    <div style={{ width: "100%" }}>
      <Card style={border}>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            style={{
              color: value ? "#eee" : "#434343",
              transition: "0.5s all ease-in-out",
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{
              color: value ? "#eee" : "#434343",
              transition: "0.5s all ease-in-out",
            }}
          >
            {desc}
          </Typography>
        </CardContent>
        <CardActions
          style={{
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          {prio === "completed" ? (
            <>
              <DeleteButton id={taskID} prio={prio} />
            </>
          ) : (
            <>
              <CompleteTask id={taskID} title={title} desc={desc} />
              <EditTask id={taskID} title={title} desc={desc} prio={prio} />
              <DeleteButton id={taskID} prio={prio} />
            </>
          )}
        </CardActions>
      </Card>
    </div>
  );
};

export default ListItemCard;
