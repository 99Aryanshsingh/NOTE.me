import React from "react";
import styles from "./login.module.scss";
import Left from "./section/left";
import Form from "./section/form";
import { ToastContainer } from "react-toastify";

function Login() {
  return (
    <>
      <ToastContainer />
      <main className={styles.container}>
        <Left />
        <Form />
      </main>
    </>
  );
}

export default Login;
