import type { NextPage } from "next";
import styles from "@styles/Home.module.css";
import Header from "@components/header";
import Ads from "@components/ads";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import api from "@api";

type RespOtherNews = {
  author: string;
  category: string;
  categoryId: number;
  date: string;
  id: number;
  slug: string;
  title: string;
};

type RespLastNews = RespOtherNews & {
  poster: string;
};

const Home: NextPage = () => {
  const [lastNews, setLastNews] = useState<RespLastNews[] | null>(null);
  const [otherNews, setOtherNews] = useState<RespOtherNews[] | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const respLastPosts = await api.get("/news/headlines");
        const { data: dataLastNews } = respLastPosts;

        const respOtherNews = await api.get("/news/others");

        const { data: dataOtherNews } = respOtherNews;

        console.log("respLastPosts", respLastPosts);
        console.log("respOtherNews", respOtherNews);

        if (dataLastNews) {
          setLastNews(dataLastNews);
        }

        if (dataOtherNews) {
          setOtherNews(dataOtherNews);
        }
      } catch (e) {
        console.error("error on fetch news");
      }
    };

    fetchData().catch((e) => console.error("error on fetch news"));
  }, []);

  const lastNewsObj = lastNews && lastNews[0];

  return (
    <>
      <Header />
      <div className={styles.container}>
        <Ads />
        <div className={styles.mainRow}>
          {lastNews && lastNewsObj && (
            <div
              key={lastNewsObj?.date}
              className={styles.rowFistNew}
              onClick={() => router.push(`/${lastNewsObj?.categoryId}`)}
            >
              <h2>{lastNewsObj?.category}</h2>
              <p>{lastNewsObj?.title}</p>
            </div>
          )}
          <div className={styles.rowSecondNew}>
            {lastNews &&
              lastNews.slice(1).map((item) => (
                <div
                  key={item.date}
                  className={styles.cardTwoLastNews}
                  onClick={() => router.push(`/${item.categoryId}`)}
                >
                  <Image
                    src={item?.poster}
                    width={500}
                    height={400}
                    unoptimized
                    alt="image-poster"
                  />
                  <h2>{item?.category}</h2>
                  <p>{item?.title}</p>
                </div>
              ))}
          </div>
        </div>
        <div className={styles.listOtherNews}>
          {otherNews &&
            otherNews.map((item) => {
              return (
                <div
                  key={item?.date}
                  className={styles.otherNews}
                  onClick={() => router.push(`/${item.categoryId}`)}
                >
                  <p>{item?.title}</p>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Home;
