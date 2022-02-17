import type { NextPage } from "next";
import styles from "@styles/Home.module.css";
import Header from "@components/header";
import Ads from "@components/ads";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import api from "@api";
import { AxiosResponse } from "axios";
import OtherNews from "@components/otherNews";
import PrincipalNew from "@components/principalNew";
import CardNews from "@components/cardNews";

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
            <PrincipalNew
              key={lastNewsObj?.date}
              onClick={() => router.push(`/${lastNewsObj?.categoryId}`)}
              category={lastNewsObj?.category}
              title={lastNewsObj?.title}
            />
          ) : (
            errorLastNews && (
              <h3>Ocorreu um problema ao listar a ultima noticia.</h3>
            )
          )}
          <div className={styles.rowSecondNew}>
            {lastNews &&
              lastNews
                .slice(1)
                .map((item) => (
                  <CardNews
                    onClick={() => router.push(`/${item.categoryId}`)}
                    key={item.date}
                    poster={item?.poster}
                    category={item?.category}
                    title={item?.title}
                  />
                ))}
          </div>
        </div>
        <div className={styles.listOtherNews}>
          {otherNews
            ? otherNews.map((item) => {
                return (
                  <OtherNews
                    onClick={() => router.push(`/${item.categoryId}`)}
                    title={item?.title}
                    key={item?.date}
                  />
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
