import "../styles/globals.css";
import { themeContext } from "../lib/themeContext";
import { nameContext } from "../lib/nameContext";
import { listContext } from "../lib/listContext";
import { mainListContext } from "../lib/mainListContext";
import { completedListContext } from "../lib/completedListContext";
import { showNavContext } from "../lib/showNavContext";
import { showGridContext } from "../lib/showGridContext";
import { useState, useEffect } from "react";
function MyApp({ Component, pageProps }) {
  const [value, setValue] = useState("");
  const [name, setName] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [mainTaskList, setMainTaskList] = useState([]);
  const [completedTaskList, setCompletedTaskList] = useState([]);
  const [showNav, setShowNav] = useState(true);
  const [showGrid, setShowGrid] = useState(true);

  useEffect(() => {
    (async () => {
      const name = localStorage.getItem("name");
      const darkmode = localStorage.getItem("darkmode");
      const mainList = localStorage.getItem("mainListOfTasks");
      const completedList = localStorage.getItem("completedTasks");
      const gridList = localStorage.getItem("gridList");

      if (mainList === null) {
        localStorage.setItem("mainListOfTasks", JSON.stringify([]));
      } else {
        setTaskList(JSON.parse(mainList));
        setMainTaskList(JSON.parse(localStorage.getItem("mainListOfTasks")));
      }
      if (completedList === null) {
        localStorage.setItem("completedTasks", JSON.stringify([]));
      } else {
        setCompletedTaskList(JSON.parse(completedList));
      }
      if (name === null) localStorage.setItem("name", "stranger");
      else setName(localStorage.getItem("name"));
      if (darkmode === null) localStorage.setItem("darkmode", false);
      else setValue(JSON.parse(localStorage.getItem("darkmode")));
      if (gridList === null) localStorage.setItem("gridList", false);
      else setShowGrid(JSON.parse(localStorage.getItem("gridList")));
    })();
  }, []);
  return (
    <mainListContext.Provider value={{ mainTaskList, setMainTaskList }}>
      <showGridContext.Provider value={{ showGrid, setShowGrid }}>
        <completedListContext.Provider
          value={{ completedTaskList, setCompletedTaskList }}
        >
          <listContext.Provider value={{ taskList, setTaskList }}>
            <showNavContext.Provider value={{ showNav, setShowNav }}>
              <nameContext.Provider value={{ name, setName }}>
                <themeContext.Provider value={{ value, setValue }}>
                  <Component {...pageProps} />
                </themeContext.Provider>
              </nameContext.Provider>
            </showNavContext.Provider>
          </listContext.Provider>
        </completedListContext.Provider>
      </showGridContext.Provider>
    </mainListContext.Provider>
  );
}

export default MyApp;
