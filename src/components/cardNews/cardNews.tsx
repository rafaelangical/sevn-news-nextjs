import React from "react";
import Image from "next/image";
import styles from "@styles/CardLastNews.module.css";

type Props = {
  poster: string;
  category: string;
  title: string;
  onClick?: () => void;
};

const CardNews = ({ onClick, poster, category, title }: Props) => (
  <div className={styles.cardTwoLastNews} onClick={onClick}>
    <Image
      src={poster}
      width={500}
      height={400}
      unoptimized
      alt="image-poster"
    />
    <h2>{category}</h2>
    <p>{title}</p>
  </div>
);

export default CardNews;
