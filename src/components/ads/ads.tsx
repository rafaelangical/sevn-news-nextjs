import React from "react";
import styles from "@styles/Ads.module.css";

export const Ads = ({ style = {} }: { style?: React.CSSProperties }) => (
  <div className={styles.Ads} style={style}>
    <span>Publicicade</span>
  </div>
);

export default Ads;
