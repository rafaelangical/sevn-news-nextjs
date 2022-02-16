import React from "react";
import styles from "@styles/Header.module.css";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();

  const isHome = router?.query?.new;

  return (
    <header className={styles.header}>
      <nav>
        <ul>
          {isHome && (
            <button onClick={() => router.push("/")}>
              <p>
                <i className={styles.arrowLeft}></i>
              </p>
            </button>
          )}
          <li>SEVN NEWS</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
