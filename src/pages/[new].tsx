import Header from "@components/header";
import { useRouter } from "next/router";
import styles from "@styles/New.module.css";
import Ads from "@components/ads";
import { useEffect, useState } from "react";
import api from "@api";

type ApiResponse = {
  id: number;
  date: string;
  author: string;
  category: string;
  categoryId: number;
  slug: string;
  poster: string;
  title: string;
  subtitle: string;
  article: string;
};

export const New = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState(false);
  const router = useRouter();

  const newsId = router?.query?.new;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await api.get<ApiResponse>(`/news/articles/${newsId}`);

        const { data } = resp;

        if (data) {
          setData(data);
        } else {
          setError(true);
        }
      } catch (e) {
        setError(true);
        console.error("error on fetch news data", e);
      }
    };

    fetchData();
  }, [router, newsId]);

  return (
    <>
      <Header />
      {data ? (
        <div className={styles.container}>
          <h2>{data?.category}</h2>
          <h1>{data?.title}</h1>
          <p>{data?.subtitle}</p>
          <span>{data?.date}</span>
          <Ads
            style={{
              marginBottom: 63,
              marginTop: 40,
              marginLeft: 0,
              marginRight: 0,
            }}
          />
          <p>{data?.article}</p>
        </div>
      ) : (
        error && (
          <div className={styles.container}>
            <h1>Ocorreu um problema ao buscar os dados :/</h1>
          </div>
        )
      )}
    </>
  );
};

export default New;
