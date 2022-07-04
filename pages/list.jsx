import Head from "next/head";
import Header from "../components/header/header.jsx";
import { useState, useContext, useEffect } from "react";
import styles from "../styles/List.module.css";
import { themeContext } from "../lib/themeContext";
import { listContext } from "../lib/listContext";
import Alert from "@mui/material/Alert";
import { nameContext } from "../lib/nameContext";
import ListItem from "../components/list-item/list-item.jsx";
import AddTask from "../components/add-task/add-task-button.jsx";
import FilterTask from "../components/filter-task-button/filter-task-button.jsx";
import ProfileButton from "../components/profile-button/profile-button.jsx";
import { showNavContext } from "../lib/showNavContext.js";
import { motion } from "framer-motion";
import useWindowDimensions from "../utils/useWindowDimensions.jsx";

export default function ListPage() {
  const { name, setName } = useContext(nameContext);
  const { value, setValue } = useContext(themeContext);
  const { taskList, setTaskList } = useContext(listContext);
  const { showNav, setShowNav } = useContext(showNavContext);
  const { width, height } = useWindowDimensions();
  const [newName, setNewName] = useState("");

  useEffect(() => {
    setNewName(name);
  }, [name]);

  return (
    <div
      className={styles.container}
      style={{ backgroundColor: value ? "#434343" : "#eee" }}
    >
      <Head>
        <title>Your To Do List</title>
      </Head>
      <div className={styles.headerContainer}>
        <Header name={newName} />
      </div>
      <div className={styles.content}>
        <motion.div
          className={styles.mainList}
          animate={{ opacity: [0, 1], x: [-200, 0] }}
          initial={{ opacity: 0 }}
        >
          {taskList.map((item, i) => (
            <ListItem
              id={item.taskID}
              title={item.taskTitle}
              desc={item.taskDescription}
              prio={item.taskPriority}
              key={i}
            />
          ))}
        </motion.div>
        <motion.div
          className={styles.navbar}
          initial={{ scale: 1 }}
          animate={{ scale: width <= 450 ? (showNav ? 1 : 0) : 1 }}
        >
          <AddTask />
          <FilterTask />
          <ProfileButton />
        </motion.div>
      </div>
      {/* <Alert className={styles.alert} severity="error">
        This is an error alert — check it out!
      </Alert> */}
    </div>
  );
}