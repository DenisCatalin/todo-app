import styles from "./Header.module.css";
import Darkmode from "../darkmode/darkmode";
import { useContext } from "react";
import { themeContext } from "../../lib/themeContext";
import { motion } from "framer-motion";

const Header = ({ name }) => {
  const { value, setValue } = useContext(themeContext);
  return (
    <div className={styles.headerContainer}>
      <motion.h1
        className={styles.title}
        style={{ color: value ? "#EEE" : "#434343" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1], y: [-200, 0] }}
      >
        Hello, {name}!
      </motion.h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1], rotate: [100, 0] }}
      >
        <Darkmode />
      </motion.div>
    </div>
  );
};

export default Header;
