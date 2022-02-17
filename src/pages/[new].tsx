import Header from "@components/header";
import { useRouter } from "next/router";
import styles from "@styles/New.module.css";
import { useEffect, useState } from "react";
import api from "@api";
import { AxiosResponse } from "axios";
import NewDetails from "@components/newDetails";

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
        const resp: AxiosResponse = await api.get(`/news/articles/${newsId}`);

        const { data }: { data: ApiResponse } = resp;

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
        <NewDetails
          category={data?.category}
          title={data?.title}
          subtitle={data?.subtitle}
          date={data?.date}
          article={data?.article}
        />
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
