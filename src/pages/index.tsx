import type { NextPage } from "next";
import styles from "@styles/Home.module.css";
import Header from "@components/header";
import Ads from "@components/ads";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import api from "@api";
import { AxiosResponse } from "axios";

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
  const [errorNews, setErrorNews] = useState(false);
  const [errorLastNews, setErrorLastNews] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: dataLastNews }: AxiosResponse<RespLastNews[]> =
          await api.get("/news/headlines");

        const { data: dataOtherNews }: AxiosResponse<RespOtherNews[]> =
          await api.get("/news/others");

        if (dataLastNews && dataOtherNews) {
          setLastNews(dataLastNews);
          setOtherNews(dataOtherNews);
        } else {
          setErrorNews(true);
          setErrorLastNews(true);
        }
      } catch (e) {
        setErrorNews(true);
        setErrorLastNews(true);
        console.error("error on fetch news", e);
      }
    };

    fetchData();
  }, []);

  const lastNewsObj = lastNews && lastNews[0];

  return (
    <>
      <Header />
      <div className={styles.container}>
        <Ads />
        <div className={styles.mainRow}>
          {lastNews && lastNewsObj ? (
            <div
              key={lastNewsObj?.date}
              className={styles.rowFistNew}
              onClick={() => router.push(`/${lastNewsObj?.categoryId}`)}
            >
              <h2>{lastNewsObj?.category}</h2>
              <p>{lastNewsObj?.title}</p>
            </div>
          ) : (
            errorLastNews && (
              <h3>Ocorreu um problema ao listar a ultima noticia.</h3>
            )
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
          {otherNews
            ? otherNews.map((item) => {
                return (
                  <div
                    key={item?.date}
                    className={styles.otherNews}
                    onClick={() => router.push(`/${item.categoryId}`)}
                  >
                    <p>{item?.title}</p>
                  </div>
                );
              })
            : errorNews && (
                <h3>Ocorreu um problema ao listar a ultima noticia.</h3>
              )}
        </div>
      </div>
    </>
  );
};

export default Home;
