import React from "react";
import styles from "@styles/NewDetails.module.css";
import Ads from "@components/ads";
type Props = {
  category: string;
  title: string;
  subtitle: string;
  date: string;
  article: string;
};

const NewDetails = ({ category, title, subtitle, date, article }: Props) => (
  <div className={styles.container}>
    <h2>{category}</h2>
    <h1>{title}</h1>
    <p>{subtitle}</p>
    <span>{date}</span>
    <Ads
      style={{
        marginBottom: 63,
        marginTop: 40,
        marginLeft: 0,
        marginRight: 0,
      }}
    />
    <p>{article}</p>
  </div>
);

export default NewDetails;
