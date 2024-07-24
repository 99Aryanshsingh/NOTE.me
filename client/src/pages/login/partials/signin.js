import React, { useState } from "react";
import styles from "./partials.module.scss";
import Button from "../../../components/atoms/button";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/atoms/input";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import utils from "../../../utils/localstorage";

function Signin(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // logic for signup
    if (!email.length || !password.length) {
      toast.error("Some required field are empty");
    }
    fetch("http://localhost:3001/api/users/signin", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log({ data });
        if (data?.success === 200) {
          toast.success("User logged in Successfully");
          utils.addToLocalStorage("auth-key", data.token);
          navigate("/notes");
        } else toast.error(data?.message);
      })
      .catch((error) => {
        console.log({ error });
        toast.error("User login failed");
      });
  };

  return (
    <div className={styles.form}>
      <Button
        text="Join With Google"
        icon="bi:google"
        className={styles.google}
      />

      <div className={styles.option}>
        <span>or join with email address</span>
      </div>
      <article className={styles.details}>
        <Input
          type="email"
          placeholder={`Type Your Email Address`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder={`Type Your Password`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </article>
      <Button
        text="Join With Email"
        icon="material-symbols:login"
        className={styles.emailbtn}
        handleClick={handleLogin}
      />
    </div>
  );
}

export default Signin;
