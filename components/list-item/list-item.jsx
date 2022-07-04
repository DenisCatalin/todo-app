import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState, useContext } from "react";
import { themeContext } from "../../lib/themeContext";
import styles from "./ListItem.module.css";
import DeleteButton from "../delete-button/delete-button";
import CompleteTask from "../complete-task/complete-task";
import EditTask from "../edit-task/edit-task-button";
import { showNavContext } from "../../lib/showNavContext";

const ListItem = ({ id, title, desc, prio }) => {
  const [expanded, setExpanded] = useState(false);
  const { value, setValue } = useContext(themeContext);
  const { showNav, setShowNav } = useContext(showNavContext);
  const [show, setShow] = useState(true);
  const [openPanels, setOpenPanels] = useState(0);

  const taskID = id;

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    setShow(!show);
    setShowNav(!show);
  };

  return (
    <>
      <Accordion
        expanded={expanded === `panel${id}`}
        onChange={handleChange(`panel${id}`)}
        style={{
          backgroundColor: value ? "#555555" : "#EEEEEE",
          transition: "0.5s all ease-in-out",
        }}
        className={styles.fade}
      >
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon
              style={{
                color: value ? "var(--linearWhite)" : "var(--linearBlack)",
              }}
            />
          }
          aria-controls={`panel${id}bh-content`}
          id={`panel${id}bh-header`}
        >
          <Typography
            sx={{ width: "33%", flexShrink: 0 }}
            style={{
              color: value ? "var(--linearWhite)" : "var(--linearBlack)",
            }}
            className={styles.titleItem}
          >
            {title}
          </Typography>
          <Typography
            style={{
              color: value ? "var(--linearWhite)" : "var(--linearBlack)",
              fontFamily: "Rambla",
            }}
          >
            {prio === "completed" ? `${prio}` : `Priority: ${prio}`}
          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{ overflow: "auto" }}>
          <Typography
            style={{
              color: value ? "var(--linearWhite)" : "var(--linearBlack)",
              fontFamily: "Rambla",
            }}
          >
            {desc}
          </Typography>
          <div className={styles.container}>
            <CompleteTask id={taskID} title={title} desc={desc} />
            <EditTask id={taskID} title={title} desc={desc} prio={prio} />
            <DeleteButton id={taskID} />
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default ListItem;
