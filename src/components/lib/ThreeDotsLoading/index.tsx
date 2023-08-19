import { FC } from "react";
import styles from "./index.module.scss";

const ThreeDotsLoading: FC = () => {
  return <div className={styles["dot-flashing"]}></div>;
};

export default ThreeDotsLoading;
