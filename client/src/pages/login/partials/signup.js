import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import Button from "../../../components/atoms/button";
import Input from "../../../components/atoms/input";
import styles from "./partials.module.scss";

function Signup(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSignup = () => {
    // logic for signup
    if (!email.length || !password.length || !name.length) {
      toast.error("Some required field are empty");
    }
    fetch("http://localhost:3001/api/users/signup", {
      headers:{
        "Content-Type":"application/json",
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log({ data });
        if(data?.success===201) {
          toast.success("User registered Successfully");
          props.handleSwitch();
        }
        else toast.error(data?.message);
      })
      .catch((error) => {
        console.log({ error });
        toast.error("User registration failed");
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
          type="name"
          placeholder={`Type Your Name`}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        handleClick={handleSignup}
      />
    </div>
  );
}

export default Signup;
