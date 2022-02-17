import React from "react";
import styles from "@styles/OtherNews.module.css";

type Props = {
  onClick?: () => void;
  title: string;
};

const OtherNews = ({ onClick, title }: Props) => (
  <div className={styles.otherNews} onClick={onClick}>
    <p>{title}</p>
  </div>
);

export default OtherNews;
