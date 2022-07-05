import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useContext, useState, useEffect } from "react";
import { nameContext } from "../lib/nameContext";
import { themeContext } from "../lib/themeContext";
import { useRouter } from "next/router";

/* 
Alerta cand dai delete
Alerta cand dai edit
Alerta cand dai switch-uri
*/

export default function Home() {
  const { name, setName } = useContext(nameContext);
  const { value, setValue } = useContext(themeContext);
  const [storedName, setStoredName] = useState("");
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/list");
    }, 3000);

    return clearTimeout();
  });

  useEffect(() => {
    setStoredName(name);
  }, [name]);
  return (
    <div
      className={styles.container}
      style={{ backgroundColor: value ? "#434343" : "#eee" }}
    >
      <Head>
        <title>Loading Your To Do List...</title>
      </Head>
      <div className={styles.header}>
        <h1 className={styles.title}>Modern To Do List</h1>
        <h2
          className={styles.subTitle}
          style={{ color: value ? "#eee" : "#434343" }}
        >
          Organize your schedule easier
        </h2>
      </div>
      <div className={styles.hero}>
        <h1 className={styles.helloMessage}>Welcome, {storedName}!</h1>
      </div>
      <div className={styles.footer}>
        <h2
          className={styles.notify}
          style={{ color: value ? "#eee" : "#434343" }}
        >
          We’re getting everything ready for you
        </h2>
        <div className={styles.wrapper}>
          <Image
            src={"/static/undraw_completed_tasks_vs6q.svg"}
            alt=""
            layout="fill"
          />
        </div>
      </div>
    </div>
  );
}
