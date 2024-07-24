import React, { Suspense, useEffect } from "react";
import Loader from "../components/shared/loader";
import styles from "./layout.module.scss";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/shared/sidebar";
import Navbar from "../components/shared/navbar";
import utils from "../utils/localstorage";

function Main() {
  const navigate = useNavigate();
  useEffect(() => {
    const AuthKey = utils.getFromLocalStorage("auth-key");
    if (!AuthKey) navigate("/");
  }, []);

  return (
    <main className={styles.container}>
      <Suspense fallback={<Loader />}>
        {/* sideBar */}
        <Sidebar />
        <main className={styles.main}>
          {/* navBar */}
          <Navbar />
          <section className={styles.content}>
            <Outlet />
          </section>
        </main>
      </Suspense>
    </main>
  );
}

export default Main;
