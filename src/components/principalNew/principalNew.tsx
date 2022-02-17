import React from "react";
import styles from "@styles/PrincipalNew.module.css";

type Props = {
  onClick?: () => void;
  category: string;
  title: string;
};

const PrincipalNew = ({ onClick, category, title }: Props) => (
  <div className={styles.principalNew} onClick={onClick}>
    <h2>{category}</h2>
    <p>{title}</p>
  </div>
);

export default PrincipalNew;
